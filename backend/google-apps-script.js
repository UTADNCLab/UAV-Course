// ===================================
// UAV COURSE - CLEAN GOOGLE APPS SCRIPT
// (No last-login timestamps, no best-qualifying column)
// ===================================

const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const data = payload.data || {};

    if (action === 'register') return handleRegister(data);
    if (action === 'login') return handleLogin(data);     // optional, does nothing now
    if (action === 'progress') return handleProgress(data);
    if (action === 'sendEmail') return handleSendEmail(data);
    if (action === 'sendProfessorEmail') return handleSendProfessorEmail(data);

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

function openSheet(name, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
  } else {
    // Ensure header row exists (optional safeguard)
    const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (firstRow.join('') === '') {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  }
  return sheet;
}

function findRowByEmail(sheet, email) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if ((values[i][1] || '').toString().trim() === email.trim()) {
      return i + 1; // sheet row number
    }
  }
  return -1;
}

function buildFullName(obj) {
  // Prefer firstName + lastName if provided
  const first = (obj.firstName || '').trim();
  const last = (obj.lastName || '').trim();

  if (first || last) return `${first} ${last}`.trim();

  // Otherwise fall back to name field
  return (obj.name || '').trim();
}

// ===================================
// REGISTER USER (Users sheet)
// ===================================
function handleRegister(userData) {
  const headers = ['Full Name', 'Email'];
  const sheet = openSheet('Users', headers);

  const fullName = buildFullName(userData) || 'Student';
  const email = (userData.email || '').trim();

  if (!email) return json({ status: 'error', message: 'Missing email' });

  const row = findRowByEmail(sheet, email);

  const rowData = [fullName, email];

  if (row > 0) {
    sheet.getRange(row, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return json({ status: 'success', message: 'User registered/updated' });
}

// ===================================
// LOGIN (optional: keep for compatibility)
// Now it just returns success and does not store timestamps.
// ===================================
function handleLogin(userData) {
  return json({ status: 'success', message: 'Login recorded (no timestamp stored)' });
}

// ===================================
// PROGRESS UPDATE (Progress sheet)
// ===================================
function handleProgress(progressData) {
  const headers = [
    'Full Name',
    'Email',
    'Completion %',
    'Modules Completed',
    'Total Modules',
    'Average Quiz Score',
    'Quiz 1 Score',
    'Quiz 2 Score',
    'Quiz 3 Score',
    'Quiz 4 Score',
    'Quiz Attempts',
    'Certificates Eligible'
  ];

  const sheet = openSheet('Progress', headers);

  const fullName = buildFullName(progressData) || 'Student';
  const email = (progressData.email || '').trim();

  if (!email) return json({ status: 'error', message: 'Missing email' });

  // quizScores coming from frontend: usually { "quiz-1": {...}, "quiz-2": {...} }
  const quizScores = progressData.quizScores || {};

  // Read quiz % safely (support both string keys like "quiz-1" and numeric)
  function getQuizPercentage(key) {
    const q = quizScores[key];
    return (q && typeof q.percentage === 'number') ? q.percentage : null;
  }

  const q1 = getQuizPercentage('quiz-1');
  const q2 = getQuizPercentage('quiz-2');
  const q3 = getQuizPercentage('quiz-3');
  const q4 = getQuizPercentage('quiz-4');

  // Calculate average of taken quizzes
  const scores = [q1, q2, q3, q4].filter(s => s !== null);
  const avgScore = scores.length > 0
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
    : 'N/A';

  // Format quiz scores for display
  const formatScore = (score) => score !== null ? `${score}%` : 'Not taken';

  // Check certificate eligibility (80%+ on quiz)
  const eligibleModules = [];
  if (q1 !== null && q1 >= 80) eligibleModules.push('Module 1: Open Airborne Computing Platforms');
  if (q2 !== null && q2 >= 80) eligibleModules.push('Module 2: UAV Communications and Networking');
  if (q3 !== null && q3 >= 80) eligibleModules.push('Module 3: Networked Control and Co-Design');
  if (q4 !== null && q4 >= 80) eligibleModules.push('Module 4: Airborne Computing and AI');

  const certificatesEligible = eligibleModules.length > 0
    ? eligibleModules.join(' | ')
    : 'None';

  // Count total quiz attempts
  const quizAttempts = Object.keys(quizScores).length;

  const completionPercent = progressData.completionPercentage || 0;
  const modulesCompleted = progressData.modulesCompleted || 0;
  const totalModules = progressData.totalModules || 8;

  const rowData = [
    fullName,
    email,
    `${completionPercent}%`,
    modulesCompleted,
    totalModules,
    avgScore,
    formatScore(q1),
    formatScore(q2),
    formatScore(q3),
    formatScore(q4),
    quizAttempts,
    certificatesEligible
  ];

  const row = findRowByEmail(sheet, email);

  if (row > 0) {
    sheet.getRange(row, 1, 1, rowData.length).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }

  return json({ status: 'success', message: 'Progress updated' });
}

// ===================================
// SEND CONTACT FORM EMAIL
// ===================================
function handleSendEmail(emailData) {
  try {
    const name = emailData.name || 'Anonymous';
    const email = emailData.email || 'no-reply@example.com';
    const message = emailData.message || '';
    const attachment = emailData.attachment || null;
    
    const recipient = 'opencourse.uav@gmail.com';
    const subject = `Contact Form: Message from ${name}`;
    
    let body = `You have received a new message from the UAV Course contact form.\n\n`;
    body += `Name: ${name}\n`;
    body += `Email: ${email}\n\n`;
    body += `Message:\n${message}\n\n`;
    body += `---\n`;
    body += `Sent via UAV Course Platform\n`;
    body += `${new Date().toLocaleString()}`;
    
    // Send email
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body,
      replyTo: email
    });
    
    return json({ status: 'success', message: 'Email sent successfully' });
    
  } catch (err) {
    Logger.log('Email error: ' + err.toString());
    return json({ status: 'error', message: 'Failed to send email: ' + err.toString() });
  }
}

// ===================================
// SEND PROFESSOR QUESTION EMAIL
// ===================================
function handleSendProfessorEmail(emailData) {
  try {
    const studentName = emailData.studentName || 'Anonymous';
    const studentEmail = emailData.studentEmail || 'no-reply@example.com';
    const professorEmail = emailData.professorEmail || '';
    const professorName = emailData.professorName || 'Professor';
    const subject = emailData.subject || 'Question from UAV Course';
    const question = emailData.question || '';
    
    if (!professorEmail) {
      return json({ status: 'error', message: 'Professor email is required' });
    }
    
    let body = `Dear ${professorName},\n\n`;
    body += `You have received a question from a student in the UAV Course.\n\n`;
    body += `Student Name: ${studentName}\n`;
    body += `Student Email: ${studentEmail}\n\n`;
    body += `Subject: ${subject}\n\n`;
    body += `Question:\n${question}\n\n`;
    body += `---\n`;
    body += `Sent via UAV Course Platform\n`;
    body += `${new Date().toLocaleString()}`;
    
    // Send email to professor
    MailApp.sendEmail({
      to: professorEmail,
      subject: `[UAV Course Question] ${subject}`,
      body: body,
      replyTo: studentEmail
    });
    
    // Also send a copy to the main course email
    MailApp.sendEmail({
      to: 'opencourse.uav@gmail.com',
      subject: `[Copy] Question to ${professorName}: ${subject}`,
      body: body,
      replyTo: studentEmail
    });
    
    return json({ status: 'success', message: 'Question sent successfully' });
    
  } catch (err) {
    Logger.log('Professor email error: ' + err.toString());
    return json({ status: 'error', message: 'Failed to send question: ' + err.toString() });
  }
}
