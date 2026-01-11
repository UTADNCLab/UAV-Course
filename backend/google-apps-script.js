// ===================================
// UAV COURSE - STABLE GOOGLE APPS SCRIPT (FIXED)
// - Stable Users/Progress schemas
// - Header-based column detection (no hardcoded indices)
// - Locking + upsert by Email (no duplicates)
// - Fixes 600% issues via enforced formats
// - Cross-device login supported by storing passwordHash
// - Email sending (requires one-time authorization)
// - UPDATED: Hides quiz scores below 80%
// ===================================

const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const action = payload.action;
    const data = payload.data || {};

    switch (action) {
      case "register": return handleRegister(data);
      case "login": return handleLogin(data);               // verifies against Users sheet
      case "checkUser": return handleCheckUser(data);       // used for cross-device user existence
      case "progress": return handleProgress(data);
      case "sendEmail": return handleSendEmail(data);
      case "sendProfessorEmail": return handleSendProfessorEmail(data);
      default: return json({ status: "error", message: "Unknown action" });
    }
  } catch (err) {
    Logger.log(err);
    return json({ status: "error", message: String(err) });
  }
}

// -------------------------------
// JSON response
// -------------------------------
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// -------------------------------
// SCHEMAS (single source of truth)
// -------------------------------
const USERS_HEADERS = ["First Name", "Last Name", "Email", "Password Hash", "Registered At"];
const PROGRESS_HEADERS = [
  "First Name",
  "Last Name",
  "Email",
  "Completion %",
  "Modules Completed",
  "Total Modules",
  "Quiz 1 Score",
  "Quiz 2 Score",
  "Quiz 3 Score",
  "Quiz 4 Score",
  "Quiz Attempts",
  "Certificates Eligible" // YES/NO
];

// -------------------------------
// Sheet helpers
// -------------------------------
function getOrCreateSheet_(name, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);

  // Ensure header row EXACTLY matches what we expect
  const existing = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), headers.length)).getValues()[0];
  const existingTrim = existing.map(x => (x || "").toString().trim());
  const expectedTrim = headers.map(x => x.trim());

  const matches = expectedTrim.every((h, i) => existingTrim[i] === h);
  if (!matches) {
    sh.clear();                 // IMPORTANT: wipe old mixed schemas
    sh.appendRow(headers);
  }

  return sh;
}

function headerIndexMap_(sh) {
  const headerRow = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const map = {};
  headerRow.forEach((h, i) => {
    const key = (h || "").toString().trim().toLowerCase();
    if (key) map[key] = i + 1; // 1-based
  });
  return map;
}

function normalizeEmail_(email) {
  return (email || "").toString().trim().toLowerCase();
}

function findRowByEmail_(sh, email) {
  const map = headerIndexMap_(sh);
  const emailCol = map["email"];
  if (!emailCol) return -1;

  const target = normalizeEmail_(email);
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return -1;

  const values = sh.getRange(2, emailCol, lastRow - 1, 1).getValues();
  for (let r = 0; r < values.length; r++) {
    if (normalizeEmail_(values[r][0]) === target) return r + 2; // actual sheet row
  }
  return -1;
}

// Delete all duplicate rows for an email except the first encountered
function dedupeEmail_(sh, email) {
  const map = headerIndexMap_(sh);
  const emailCol = map["email"];
  if (!emailCol) return -1;

  const target = normalizeEmail_(email);
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return -1;

  const values = sh.getRange(2, emailCol, lastRow - 1, 1).getValues().map(r => normalizeEmail_(r[0]));
  const rows = [];
  values.forEach((v, i) => { if (v === target) rows.push(i + 2); });

  if (rows.length === 0) return -1;
  if (rows.length === 1) return rows[0];

  const keep = rows[0];
  rows.slice(1).sort((a, b) => b - a).forEach(r => sh.deleteRow(r));
  return keep;
}

function enforceProgressFormats_(sh) {
  const map = headerIndexMap_(sh);
  const lastRow = Math.max(sh.getLastRow(), 2);

  // Completion % should be percent
  if (map["completion %"]) sh.getRange(2, map["completion %"], lastRow - 1, 1).setNumberFormat("0%");

  // Modules Completed, Total Modules, Quiz Attempts should be plain numbers
  ["modules completed", "total modules", "quiz attempts"].forEach(k => {
    if (map[k]) sh.getRange(2, map[k], lastRow - 1, 1).setNumberFormat("0");
  });

  // Quiz scores show like "100%" or "Not taken" -> we store TEXT, so force plain text
  ["quiz 1 score", "quiz 2 score", "quiz 3 score", "quiz 4 score"].forEach(k => {
    if (map[k]) sh.getRange(2, map[k], lastRow - 1, 1).setNumberFormat("@");
  });

  // Certificates Eligible is YES/NO (text)
  if (map["certificates eligible"]) sh.getRange(2, map["certificates eligible"], lastRow - 1, 1).setNumberFormat("@");
}

function splitName_(obj) {
  const first = (obj.firstName || "").toString().trim();
  const last = (obj.lastName || "").toString().trim();
  if (first || last) return { firstName: first, lastName: last };

  const full = (obj.name || "").toString().trim();
  if (!full) return { firstName: "", lastName: "" };
  const parts = full.split(/\s+/);
  return { firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "" };
}

function quizPct_(quizScores, key) {
  const q = quizScores ? quizScores[key] : null;
  const p = q && typeof q.percentage === "number" ? q.percentage : null;
  return (typeof p === "number" && isFinite(p)) ? p : null;
}

// ===================================
// UPDATED: Hide scores below 80%
// ===================================
function formatQuiz_(p) {
  if (typeof p !== "number") return "Not taken";
  if (p >= 80) return `${Math.round(p)}%`;
  return "Below 80%";  // Hide actual score if below threshold
}

// ===================================
// REGISTER (stores passwordHash for cross-device login)
// UPDATED: Check if email exists in Progress or Users sheet
// If exists in Progress, copy First Name and Last Name from there
// ===================================
function handleRegister(userData) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const usersSheet = getOrCreateSheet_("Users", USERS_HEADERS);
    const progressSheet = getOrCreateSheet_("Progress", PROGRESS_HEADERS);
    
    const email = normalizeEmail_(userData.email);
    const passwordHash = (userData.passwordHash || "").toString().trim();

    if (!email) return json({ status: "error", message: "Missing email" });
    if (!passwordHash) return json({ status: "error", message: "Missing passwordHash" });

    // Check if email already exists in Users sheet
    const existingUserRow = findRowByEmail_(usersSheet, email);
    if (existingUserRow > 0) {
      return json({ status: "error", message: "Email already registered. Please login instead." });
    }

    // Check if email exists in Progress sheet
    const progressRow = findRowByEmail_(progressSheet, email);
    let firstName, lastName;
    
    if (progressRow > 0) {
      // Email exists in Progress - copy First Name and Last Name from there
      const progressMap = headerIndexMap_(progressSheet);
      firstName = (progressSheet.getRange(progressRow, progressMap["first name"], 1, 1).getValue() || "").toString().trim();
      lastName = (progressSheet.getRange(progressRow, progressMap["last name"], 1, 1).getValue() || "").toString().trim();
    } else {
      // Email not in Progress - use provided names or defaults
      const name = splitName_(userData);
      firstName = name.firstName || "Student";
      lastName = name.lastName || "";
    }

    const now = new Date().toISOString();

    // Add to Users sheet
    const rowData = [firstName, lastName, email, passwordHash, now];
    usersSheet.appendRow(rowData);

    return json({ status: "success", message: "User registered successfully" });
  } finally {
    lock.releaseLock();
  }
}

// ===================================
// LOGIN (verify passwordHash matches Users sheet)
// ===================================
function handleLogin(userData) {
  const sh = getOrCreateSheet_("Users", USERS_HEADERS);
  const email = normalizeEmail_(userData.email);
  const passwordHash = (userData.passwordHash || "").toString().trim();

  if (!email || !passwordHash) return json({ status: "error", message: "Missing email or passwordHash" });

  const row = findRowByEmail_(sh, email);
  if (row < 0) return json({ status: "success", ok: false, message: "User not found" });

  const map = headerIndexMap_(sh);
  const storedHash = (sh.getRange(row, map["password hash"], 1, 1).getValue() || "").toString().trim();

  if (storedHash && storedHash === passwordHash) {
    const firstName = sh.getRange(row, map["first name"], 1, 1).getValue();
    const lastName = sh.getRange(row, map["last name"], 1, 1).getValue();
    return json({
      status: "success",
      ok: true,
      userData: { firstName, lastName, email }
    });
  }
  return json({ status: "success", ok: false, message: "Invalid password" });
}

// ===================================
// CHECK USER (exists + return names, NOT password)
// ===================================
function handleCheckUser(data) {
  const sh = getOrCreateSheet_("Users", USERS_HEADERS);
  const email = normalizeEmail_(data.email);
  if (!email) return json({ status: "error", message: "Missing email", userExists: false });

  const row = findRowByEmail_(sh, email);
  if (row < 0) return json({ status: "success", userExists: false });

  const map = headerIndexMap_(sh);
  return json({
    status: "success",
    userExists: true,
    userData: {
      firstName: sh.getRange(row, map["first name"], 1, 1).getValue(),
      lastName: sh.getRange(row, map["last name"], 1, 1).getValue(),
      email
    }
  });
}

// ===================================
// PROGRESS (upsert by email + correct formats)
// UPDATED: Get First Name and Last Name from Users sheet
// ===================================
function handleProgress(progressData) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sh = getOrCreateSheet_("Progress", PROGRESS_HEADERS);
    const usersSheet = getOrCreateSheet_("Users", USERS_HEADERS);

    const email = normalizeEmail_(progressData.email);
    if (!email) return json({ status: "error", message: "Missing email" });

    // Get First Name and Last Name from Users sheet
    let firstName = "Student";
    let lastName = "";
    
    const userRow = findRowByEmail_(usersSheet, email);
    if (userRow > 0) {
      const usersMap = headerIndexMap_(usersSheet);
      firstName = (usersSheet.getRange(userRow, usersMap["first name"], 1, 1).getValue() || "").toString().trim() || "Student";
      lastName = (usersSheet.getRange(userRow, usersMap["last name"], 1, 1).getValue() || "").toString().trim();
    } else {
      // Fallback: use provided data if user not in Users sheet
      const name = splitName_(progressData);
      firstName = name.firstName || "Student";
      lastName = name.lastName || "";
    }

    const totalModules = Number(progressData.totalModules ?? 8);
    const modulesCompleted = Number(progressData.completedModules ?? progressData.modulesCompleted ?? 0);

    // IMPORTANT: completionPercentage should be 0..100 in frontend
    const completionPct100 = Number(progressData.completionPercentage ?? 0);
    const completionDecimal = isFinite(completionPct100) ? (completionPct100 / 100) : 0; // store as decimal for percent format

    const quizScores = progressData.quizScores || {};
    const q1 = quizPct_(quizScores, "quiz-1");
    const q2 = quizPct_(quizScores, "quiz-2");
    const q3 = quizPct_(quizScores, "quiz-3");
    const q4 = quizPct_(quizScores, "quiz-4");

    const quizAttempts = Number(progressData.totalQuizAttempts ?? Object.keys(quizScores).length ?? 0);

    // YES if at least one quiz >= 80 (change rule if you want)
    const eligible = [q1, q2, q3, q4].some(v => typeof v === "number" && v >= 80) ? "YES" : "NO";

    // Remove duplicates then upsert
    let row = dedupeEmail_(sh, email);

    const rowData = [
      firstName,
      lastName,
      email,
      completionDecimal,
      modulesCompleted,
      totalModules,
      formatQuiz_(q1),
      formatQuiz_(q2),
      formatQuiz_(q3),
      formatQuiz_(q4),
      quizAttempts,
      eligible
    ];

    if (row > 0) sh.getRange(row, 1, 1, PROGRESS_HEADERS.length).setValues([rowData]);
    else sh.appendRow(rowData);

    enforceProgressFormats_(sh);

    return json({ status: "success", message: "Progress updated" });
  } finally {
    lock.releaseLock();
  }
}

// ===================================
// EMAIL SENDING (requires authorization by script owner)
// ===================================
function handleSendEmail(emailData) {
  const recipient = "opencourse.uav@gmail.com";
  const fromName = emailData.name || "Anonymous";
  const fromEmail = emailData.email || "no-reply@example.com";
  const msg = emailData.message || "";

  const subject = `Contact Form: Message from ${fromName}`;
  const body =
    `UAV Course contact form message\n\n` +
    `Name: ${fromName}\n` +
    `Email: ${fromEmail}\n\n` +
    `Message:\n${msg}\n\n` +
    `Sent: ${new Date().toLocaleString()}`;

  MailApp.sendEmail({ to: recipient, subject, body, replyTo: fromEmail });
  return json({ status: "success", message: "Email sent" });
}

function handleSendProfessorEmail(emailData) {
  const studentName = emailData.studentName || "Anonymous";
  const studentEmail = emailData.studentEmail || "no-reply@example.com";
  const professorEmail = emailData.professorEmail || "";
  const professorName = emailData.professorName || "Professor";
  const subject = emailData.subject || "Question from UAV Course";
  const question = emailData.question || "";

  if (!professorEmail) return json({ status: "error", message: "Professor email required" });

  const body =
    `Dear ${professorName},\n\n` +
    `You received a question from the UAV course platform.\n\n` +
    `Student: ${studentName}\n` +
    `Email: ${studentEmail}\n\n` +
    `Subject: ${subject}\n\n` +
    `Question:\n${question}\n\n` +
    `Sent: ${new Date().toLocaleString()}`;

  MailApp.sendEmail({ to: professorEmail, subject: `[UAV Course Question] ${subject}`, body, replyTo: studentEmail });
  MailApp.sendEmail({ to: "opencourse.uav@gmail.com", subject: `[Copy] To ${professorName}: ${subject}`, body, replyTo: studentEmail });

  return json({ status: "success", message: "Professor email sent" });
}

// ===================================
// ONE-TIME RESET (run manually in Apps Script editor)
// This will wipe the sheets and recreate correct headers.
// ===================================
function RESET_SHEETS_ONE_TIME() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  ["Users", "Progress"].forEach(name => {
    const sh = ss.getSheetByName(name);
    if (sh) ss.deleteSheet(sh);
  });

  const users = ss.insertSheet("Users");
  users.appendRow(USERS_HEADERS);

  const prog = ss.insertSheet("Progress");
  prog.appendRow(PROGRESS_HEADERS);

  enforceProgressFormats_(prog);

  Logger.log("Reset complete: Users + Progress recreated.");
}
