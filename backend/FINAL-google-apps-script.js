// ===================================
// UAV COURSE - CLEAN GOOGLE APPS SCRIPT (FINAL)
// - No duplicates (auto-dedupe by Email)
// - No average column
// - No best qualifying column
// - Certificate Eligible = YES/NO
// - Name stored as First + Last
// ===================================

const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const data = payload.data || {};

    if (action === 'register') return handleRegister(data);
    if (action === 'login') return handleLogin(data);      // optional: no sheet changes
    if (action === 'progress') return handleProgress(data);

    return json({ status: 'error', message: 'Unknown action' });
  } catch (err) {
    Logger.log('Error: ' + err.toString());
    return json({ status: 'error', message: err.toString() });
  }
}

// -------------------------------
// Helpers
// -------------------------------
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function openSheet(sheetName, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
  } else {
    // Ensure header row exists / correct size
    const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    const isEmpty = firstRow.join('') === '';
    if (isEmpty) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

// Return ALL row numbers (2..N) where email matches, based on emailColIndex (1-based)
function findAllRowsByEmail(sheet, email, emailColIndex) {
  const values = sheet.getDataRange().getValues();
  const rows = [];
  const target = (email || '').trim().toLowerCase();

  for (let i = 1; i < values.length; i++) {
    const cell = (values[i][emailColIndex - 1] || '').toString().trim().toLowerCase();
    if (cell === target) rows.push(i + 1);
  }
  return rows;
}

// Keep the first match, delete all other duplicates (bottom-up)
function dedupeByEmail(sheet, email, emailColIndex) {
  const rows = findAllRowsByEmail(sheet, email, emailColIndex);
  if (rows.length <= 1) return rows.length ? rows[0] : -1;

  // Keep first row; delete the rest from bottom
  const keep = rows[0];
  const toDelete = rows.slice(1).sort((a, b) => b - a);
  toDelete.forEach(r => sheet.deleteRow(r));
  return keep;
}

function getFirstLast(obj) {
  const first = (obj.firstName || '').trim();
  const last = (obj.lastName || '').trim();

  // If missing, try to split name
  if ((!first || !last) && obj.name) {
    const parts = obj.name.trim().split(/\s+/);
    const f = first || (parts[0] || '');
    const l = last || (parts.slice(1).join(' ') || '');
    return { firstName: f, lastName: l };
  }

  return { firstName: first, lastName: last };
}

function getQuizPct(quizScores, quizKey) {
  const q = quizScores[quizKey];
  return (q && typeof q.percentage === 'number') ? q.percentage : null;
}

function formatPct(p) {
  return (typeof p === 'number') ? `${p}%` : 'Not taken';
}

// ===================================
// REGISTER USER (Users sheet)
// Columns: First Name | Last Name | Email
// ===================================
function handleRegister(userData) {
  const headers = ['First Name', 'Last Name', 'Email'];
  const sheet = openSheet('Users', headers);

  const email = (userData.email || '').trim();
  if (!email) return json({ status: 'error', message: 'Missing email' });

  const name = getFirstLast(userData);

  // Remove duplicates and get row (Email column = 3)
  let row = dedupeByEmail(sheet, email, 3);

  const rowData = [name.firstName || 'Student', name.lastName || '', email];

  if (row > 0) {
    sheet.getRange(row, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return json({ status: 'success', message: 'User registered/updated' });
}

// ===================================
// LOGIN (optional)
// ===================================
function handleLogin(userData) {
  return json({ status: 'success', message: 'Login received' });
}

// ===================================
// PROGRESS UPDATE (Progress sheet)
// Columns:
// First | Last | Email | Completion% | Modules Completed | Total Modules |
// Quiz1 | Quiz2 | Quiz3 | Quiz4 | Quiz Attempts | Certificates Eligible (YES/NO)
// ===================================
function handleProgress(progressData) {
  const headers = [
    'First Name',
    'Last Name',
    'Email',
    'Completion %',
    'Modules Completed',
    'Total Modules',
    'Quiz 1 Score',
    'Quiz 2 Score',
    'Quiz 3 Score',
    'Quiz 4 Score',
    'Quiz Attempts',
    'Certificates Eligible'
  ];

  const sheet = openSheet('Progress', headers);

  const email = (progressData.email || '').trim();
  if (!email) return json({ status: 'error', message: 'Missing email' });

  const name = getFirstLast(progressData);

  const quizScores = progressData.quizScores || {};
  const q1 = getQuizPct(quizScores, 'quiz-1');
  const q2 = getQuizPct(quizScores, 'quiz-2');
  const q3 = getQuizPct(quizScores, 'quiz-3');
  const q4 = getQuizPct(quizScores, 'quiz-4');

  // Certificate eligible YES if any quiz >= 80 (change to "all quizzes >= 80" if you want)
  const eligibleYesNo = ([q1, q2, q3, q4].some(v => typeof v === 'number' && v >= 80)) ? 'YES' : 'NO';

  // Attempts: prefer frontend totalQuizAttempts if you send it; else count saved quiz entries
  const quizAttempts = progressData.totalQuizAttempts ?? Object.keys(quizScores).length ?? 0;

  // IMPORTANT: your frontend sends completedModules, not modulesCompleted
  const modulesCompleted =
    progressData.completedModules ?? progressData.modulesCompleted ?? 0;

  const completionPercent = progressData.completionPercentage ?? 0;
  const totalModules = progressData.totalModules ?? 8;

  // Remove duplicates and get row (Email column = 3)
  let row = dedupeByEmail(sheet, email, 3);

  const rowData = [
    name.firstName || 'Student',
    name.lastName || '',
    email,
    `${completionPercent}%`,
    modulesCompleted,
    totalModules,
    formatPct(q1),
    formatPct(q2),
    formatPct(q3),
    formatPct(q4),
    quizAttempts,
    eligibleYesNo
  ];

  if (row > 0) {
    sheet.getRange(row, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return json({ status: 'success', message: 'Progress updated' });
}
