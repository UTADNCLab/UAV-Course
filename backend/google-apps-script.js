// ===================================
// GOOGLE APPS SCRIPT - BACKEND
// ===================================
// This file should be deployed as a Google Apps Script Web App
// Instructions in BACKEND_SETUP.md

// ===================================
// CONFIGURATION
// ===================================
const SPREADSHEET_ID = '18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0'; // Replace with your Google Sheets ID

// ===================================
// MAIN FUNCTION - HANDLES ALL REQUESTS 18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0
// ===================================
function doPost(e) {
  try {
    // Check if e and e.postData exist
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('Error: Invalid request - no postData');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Invalid request format'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    Logger.log('Received action: ' + action);
    
    switch(action) {
      case 'register':
        return handleRegistration(data.data);
      case 'login':
        return handleLogin(data.data);
      case 'progress':
        return handleProgress(data.data);
      default:
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Unknown action: ' + action
        })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch(error) {
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      details: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ===================================
// HANDLE USER REGISTRATION
// ===================================
function handleRegistration(userData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Users');
  
  // Create Users sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Users');
    sheet.appendRow(['Name', 'Email', 'Registered Date', 'Last Login', 'Status']);
  }
  
  // Check if user already exists
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === userData.email) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'User already exists'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  // Add new user
  sheet.appendRow([
    userData.name,
    userData.email,
    userData.registeredDate,
    userData.lastLogin,
    'Active'
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'User registered successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================================
// HANDLE USER LOGIN
// ===================================
function handleLogin(userData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Users');
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'No users found'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Update last login time
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === userData.email) {
      sheet.getRange(i + 1, 4).setValue(userData.lastLogin);
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Login recorded'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================================
// HANDLE PROGRESS UPDATES
// ===================================
function handleProgress(progressData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Progress');
  
  // Create Progress sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Progress');
    const headers = [
      'Email',
      'Name',
      'Completion %',
      'Completed Modules',
      'Total Modules',
      'Quizzes Taken',
      'Average Quiz Score',
      'Quiz 1 Score',
      'Quiz 2 Score',
      'Quiz 3 Score',
      'Quiz 4 Score',
      'Time Spent (seconds)',
      'Last Updated',
      'Quiz Attempts',
      'Best Qualifying Scores',
      'Certificates Eligible'
    ];
    sheet.appendRow(headers);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#0064A4');
    headerRange.setFontColor('#FFFFFF');
  }
  
  // Extract quiz scores and attempts
  const quizScores = progressData.quizScores || {};
  const quiz1 = quizScores['2'] ? quizScores['2'].percentage + '%' : 'Not taken';
  const quiz2 = quizScores['4'] ? quizScores['4'].percentage + '%' : 'Not taken';
  const quiz3 = quizScores['6'] ? quizScores['6'].percentage + '%' : 'Not taken';
  const quiz4 = quizScores['8'] ? quizScores['8'].percentage + '%' : 'Not taken';
  
  // Track quiz attempts (all attempts, not just latest)
  const quizAttempts = progressData.quizAttempts || buildQuizAttemptsString(quizScores);
  
  // Calculate best qualifying scores (80%+)
  const bestQualifyingScores = calculateBestQualifyingScores(quizScores);
  
  // Check certificate eligibility (per module - each module with 80%+ gets a certificate)
  const certificatesEligible = checkModuleCertificates(quizScores);
  
  // Check if user already has a progress row
  const data = sheet.getDataRange().getValues();
  let userRow = -1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === progressData.email) {
      userRow = i + 1;
      break;
    }
  }
  
  const rowData = [
    progressData.email,
    progressData.name,
    progressData.completionPercentage + '%',
    progressData.completedModules,
    progressData.totalModules,
    progressData.quizzesTaken,
    progressData.averageQuizScore + '%',
    quiz1,
    quiz2,
    quiz3,
    quiz4,
    progressData.timeSpent,
    progressData.lastUpdated,
    quizAttempts,
    bestQualifyingScores,
    certificatesEligible
  ];
  
  if (userRow > 0) {
    // Update existing row
    sheet.getRange(userRow, 1, 1, rowData.length).setValues([rowData]);
  } else {
    // Add new row
    sheet.appendRow(rowData);
  }
  
  // Remove any background colors from data rows
  if (userRow > 0) {
    sheet.getRange(userRow, 1, 1, rowData.length).setBackground(null);
  }
  
  // Also log to Activity sheet for history
  logActivity(ss, progressData);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Progress updated'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================================
// LOG ACTIVITY (HISTORY)
// ===================================
function logActivity(ss, progressData) {
  let activitySheet = ss.getSheetByName('Activity Log');
  
  if (!activitySheet) {
    activitySheet = ss.insertSheet('Activity Log');
    activitySheet.appendRow([
      'Timestamp',
      'Email',
      'Name',
      'Event Type',
      'Completion %',
      'Quiz Score',
      'Details'
    ]);
  }
  
  activitySheet.appendRow([
    new Date().toISOString(),
    progressData.email,
    progressData.name,
    progressData.eventType,
    progressData.completionPercentage + '%',
    progressData.averageQuizScore + '%',
    JSON.stringify(progressData.quizScores)
  ]);
}

// ===================================
// GET FUNCTION (FOR TESTING)
// ===================================
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'UAV Course Backend is running!'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================================
// UTILITY: GET ALL STUDENTS DATA
// ===================================
function getAllStudentsData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const progressSheet = ss.getSheetByName('Progress');
  
  if (!progressSheet) {
    return [];
  }
  
  const data = progressSheet.getDataRange().getValues();
  const headers = data[0];
  const students = [];
  
  for (let i = 1; i < data.length; i++) {
    const student = {};
    for (let j = 0; j < headers.length; j++) {
      student[headers[j]] = data[i][j];
    }
    students.push(student);
  }
  
  return students;
}

// ===================================
// HELPER: BUILD QUIZ ATTEMPTS STRING
// ===================================
function buildQuizAttemptsString(quizScores) {
  const attempts = [];
  
  for (const [quizId, scoreData] of Object.entries(quizScores)) {
    const quizNum = Math.floor(parseInt(quizId) / 2);
    const percentage = scoreData.percentage || 0;
    attempts.push(`Q${quizNum}: ${percentage}%`);
  }
  
  return attempts.join(' | ') || 'No attempts';
}

// ===================================
// HELPER: CALCULATE BEST QUALIFYING SCORES
// ===================================
function calculateBestQualifyingScores(quizScores) {
  const qualifyingScores = [];
  
  for (const [quizId, scoreData] of Object.entries(quizScores)) {
    const quizNum = Math.floor(parseInt(quizId) / 2);
    const percentage = scoreData.percentage || 0;
    
    if (percentage >= 80) {
      qualifyingScores.push(`Q${quizNum}: ${percentage}%`);
    }
  }
  
  return qualifyingScores.length > 0 ? qualifyingScores.join(' | ') : 'None';
}

// ===================================
// HELPER: CHECK MODULE CERTIFICATES
// ===================================
function checkModuleCertificates(quizScores) {
  const moduleNames = {
    1: 'Open Airborne Computing Platforms',
    2: 'UAV Communications and Networking',
    3: 'Networked Control and Co-Design',
    4: 'Airborne Computing and AI'
  };
  
  const eligibleModules = [];
  
  for (const [quizId, scoreData] of Object.entries(quizScores)) {
    const quizNum = Math.floor(parseInt(quizId) / 2);
    const percentage = scoreData.percentage || 0;
    
    if (percentage >= 80 && moduleNames[quizNum]) {
      eligibleModules.push(moduleNames[quizNum]);
    }
  }
  
  if (eligibleModules.length === 0) {
    return 'None';
  } else if (eligibleModules.length === 4) {
    return 'All Modules (Full Course Certificate)';
  } else {
    return eligibleModules.join(' | ');
  }
}

// ===================================
// UTILITY: REMOVE ALL COLUMN HIGHLIGHTING
// ===================================
function removeAllColumnHighlighting() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Progress');
  
  if (!sheet) {
    return 'No Progress sheet found';
  }
  
  // Remove all background colors except header
  const maxRows = sheet.getMaxRows();
  const maxCols = sheet.getMaxColumns();
  
  if (maxRows > 1) {
    sheet.getRange(2, 1, maxRows - 1, maxCols).setBackground(null);
  }
  
  return 'Column highlighting removed successfully';
}

// ===================================
// UTILITY: EXPORT TO CSV
// ===================================
function exportProgressToCSV() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Progress');
  
  if (!sheet) {
    return 'No progress data found';
  }
  
  const data = sheet.getDataRange().getValues();
  let csv = '';
  
  data.forEach(row => {
    csv += row.join(',') + '\n';
  });
  
  return csv;
}
