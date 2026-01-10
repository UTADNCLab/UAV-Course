// ===================================
// UAV COURSE - BULLETPROOF GOOGLE APPS SCRIPT
// - FORCES headers every time (no more missing columns)
// - Fixed-width header scan (not dependent on getLastColumn)
// - Locking to prevent concurrent duplicates
// - Auto-deduplication by email
// - First Name + Last Name separate fields
// - Certificate Eligible = YES/NO
// ===================================

const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const data = payload.data || {};

    if (action === 'register') return handleRegister(data);
    if (action === 'login') return handleLogin(data);
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

// ✅ FIXED: Always enforce headers (overwrite row 1 every time)
function openSheet(sheetName, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  // Always enforce headers (overwrite row 1)
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  return sheet;
}

// ✅ FIXED: Scan first 30 columns (not dependent on getLastColumn)
function getColumnIndexByHeader(sheet, headerName) {
  // scan first 30 columns no matter what lastColumn says
  const width = 30;
  const headers = sheet.getRange(1, 1, 1, width).getValues()[0]
    .map(h => (h || '').toString().trim().toLowerCase());

  const idx = headers.indexOf(headerName.trim().toLowerCase());
  return idx >= 0 ? idx + 1 : -1;
}

// Return ALL row numbers (2..N) where email matches
function findAllRowsByEmail(sheet, email) {
  const emailCol = getColumnIndexByHeader(sheet, 'Email');
  if (emailCol === -1) return [];

  const values = sheet.getDataRange().getValues();
  const target = (email || '').trim().toLowerCase();
  const rows = [];

  for (let i = 1; i < values.length; i++) {
    const cell = (values[i][emailCol - 1] || '').toString().trim().toLowerCase();
    if (cell === target) rows.push(i + 1);
  }
  return rows;
}

// Keep the first match, delete all other duplicates (bottom-up)
function dedupeByEmail(sheet, email) {
  const rows = findAllRowsByEmail(sheet, email);
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

  // Use lock to prevent concurrent duplicates
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  
  try {
    // Remove duplicates and get row
    let row = dedupeByEmail(sheet, email);

    const rowData = [name.firstName || 'Student', name.lastName || '', email];

    if (row > 0) {
      sheet.getRange(row, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }

    return json({ status: 'success', message: 'User registered/updated' });
  } finally {
    lock.releaseLock();
  }
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
// First Name | Last Name | Email | Completion% |
// Quiz1 | Quiz2 | Quiz3 | Quiz4 | Quiz Attempts | Certificates Eligible (YES/NO)
// ===================================
function handleProgress(progressData) {
  const headers = [
    'First Name',
    'Last Name',
    'Email',
    'Completion %',
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

  // Certificate eligible YES if any quiz >= 80
  const eligibleYesNo = ([q1, q2, q3, q4].some(v => typeof v === 'number' && v >= 80)) ? 'YES' : 'NO';

  // Attempts: prefer frontend totalQuizAttempts if you send it; else count saved quiz entries
  const quizAttempts = progressData.totalQuizAttempts ?? Object.keys(quizScores).length ?? 0;

  const completionPercent = progressData.completionPercentage ?? 0;

  // Use lock to prevent concurrent duplicates
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  
  try {
    // Remove duplicates and get row
    let row = dedupeByEmail(sheet, email);

    const rowData = [
      name.firstName || 'Student',
      name.lastName || '',
      email,
      `${completionPercent}%`,           // Column D: "75%" (with %)
      formatPct(q1),                      // Column E: "100%" or "Not taken"
      formatPct(q2),                      // Column F: "100%" or "Not taken"
      formatPct(q3),                      // Column G: "Not taken"
      formatPct(q4),                      // Column H: "Not taken"
      Number(quizAttempts),               // Column I: 2 (just number)
      eligibleYesNo                       // Column J: "YES" or "NO"
    ];

    if (row > 0) {
      sheet.getRange(row, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }

    return json({ status: 'success', message: 'Progress updated' });
  } finally {
    lock.releaseLock();
  }
}

// ===================================
// ✅ NEW: Reset sheets cleanly (run this ONCE)
// ===================================
function resetSheetsClean() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // Users
  let users = ss.getSheetByName('Users');
  if (!users) users = ss.insertSheet('Users');
  users.clear();
  users.getRange(1,1,1,3).setValues([['First Name','Last Name','Email']]);

  // Progress (REMOVED: Modules Completed, Total Modules)
  let progress = ss.getSheetByName('Progress');
  if (!progress) progress = ss.insertSheet('Progress');
  progress.clear();
  progress.getRange(1,1,1,10).setValues([[
    'First Name','Last Name','Email',
    'Completion %',
    'Quiz 1 Score','Quiz 2 Score','Quiz 3 Score','Quiz 4 Score',
    'Quiz Attempts','Certificates Eligible'
  ]]);

  Logger.log('Users + Progress reset cleanly.');
}

// ===================================
// UTILITY: Clear all data from sheets (keeps headers)
// ===================================
function clearAllSheetData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // Clear Users sheet
  const usersSheet = ss.getSheetByName('Users');
  if (usersSheet) {
    const lastRow = usersSheet.getLastRow();
    if (lastRow > 1) {
      usersSheet.deleteRows(2, lastRow - 1);
    }
  }
  
  // Clear Progress sheet
  const progressSheet = ss.getSheetByName('Progress');
  if (progressSheet) {
    const lastRow = progressSheet.getLastRow();
    if (lastRow > 1) {
      progressSheet.deleteRows(2, lastRow - 1);
    }
  }
  
  Logger.log('All data cleared from Users and Progress sheets');
}
