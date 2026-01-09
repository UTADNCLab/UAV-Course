// ===================================
// SIMPLIFIED UAV COURSE - GOOGLE APPS SCRIPT
// ===================================
// 
// SETUP INSTRUCTIONS:
// 1. Open your Google Spreadsheet: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit
// 2. Go to Extensions > Apps Script
// 3. Delete any existing code
// 4. Copy and paste this ENTIRE script
// 5. Click "Deploy" > "New deployment"
// 6. Select type: "Web app"
// 7. Execute as: "Me"
// 8. Who has access: "Anyone"
// 9. Click "Deploy"
// 10. Copy the Web App URL
// 11. Update js/auth.js with the new URL
//
// ===================================

// Spreadsheet ID (already set in your URL)
const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';

// ===================================
// MAIN FUNCTION - HANDLES ALL REQUESTS
// ===================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'register') {
      return handleRegister(data.data);
    } else if (action === 'login') {
      return handleLogin(data.data);
    } else if (action === 'progress') {
      return handleProgress(data.data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Unknown action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ===================================
// HANDLE USER REGISTRATION
// ===================================
function handleRegister(userData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Users');
  
  // Create Users sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Users');
    sheet.appendRow(['Name', 'Email', 'Registered Date', 'Last Login']);
  }
  
  // Add user data
  sheet.appendRow([
    userData.name,
    userData.email,
    new Date().toLocaleString(),
    new Date().toLocaleString()
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'User registered'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================================
// HANDLE USER LOGIN
// ===================================
function handleLogin(userData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Users');
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Users sheet not found'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Update last login time
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === userData.email) {
      sheet.getRange(i + 1, 4).setValue(new Date().toLocaleString());
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Login recorded'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================================
// HANDLE PROGRESS UPDATE
// ===================================
function handleProgress(progressData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Progress');
  
  // Create Progress sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('Progress');
    sheet.appendRow([
      'Name',
      'Email', 
      'Completion %',
      'Modules Completed',
      'Average Quiz Score',
      'Quiz 1 Score',
      'Quiz 2 Score',
      'Quiz 3 Score',
      'Quiz 4 Score',
      'Last Updated',
      'Quiz Attempts',
      'Best Qualifying Certificates Eligible'
    ]);
  }
  
  // Extract quiz scores - ONLY show if >= 80%
  // Frontend sends quiz scores with numeric keys: 1, 3, 5, 7 (module indices for quizzes)
  const quizScores = progressData.quizScores || {};
  
  // Map module indices to quiz numbers: 1->Quiz1, 3->Quiz2, 5->Quiz3, 7->Quiz4
  const quiz1 = quizScores[1] && quizScores[1].percentage >= 80 ? quizScores[1].percentage + '%' : 'Not taken';
  const quiz2 = quizScores[3] && quizScores[3].percentage >= 80 ? quizScores[3].percentage + '%' : 'Not taken';
  const quiz3 = quizScores[5] && quizScores[5].percentage >= 80 ? quizScores[5].percentage + '%' : 'Not taken';
  const quiz4 = quizScores[7] && quizScores[7].percentage >= 80 ? quizScores[7].percentage + '%' : 'Not taken';
  
  // Count total quiz attempts (including opens and closes)
  const totalAttempts = progressData.totalQuizAttempts || Object.keys(quizScores).length;
  
  // Calculate certificates eligible - only modules with 80%+
  const eligibleModules = [];
  if (quizScores[1] && quizScores[1].percentage >= 80) eligibleModules.push('Module 1');
  if (quizScores[3] && quizScores[3].percentage >= 80) eligibleModules.push('Module 2');
  if (quizScores[5] && quizScores[5].percentage >= 80) eligibleModules.push('Module 3');
  if (quizScores[7] && quizScores[7].percentage >= 80) eligibleModules.push('Module 4');
  
  const certificates = eligibleModules.length > 0 ? eligibleModules.join(', ') : 'None';
  
  // Calculate average of qualifying scores only (80%+)
  const qualifyingScores = Object.values(quizScores).filter(q => q && q.percentage >= 80);
  const avgScore = qualifyingScores.length > 0
    ? Math.round(qualifyingScores.reduce((sum, q) => sum + q.percentage, 0) / qualifyingScores.length)
    : 0;
  
  // Check if user already has a row
  const data = sheet.getDataRange().getValues();
  let userRow = -1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === progressData.email) {
      userRow = i + 1;
      break;
    }
  }
  
  // Update or add new row
  const rowData = [
    progressData.name,
    progressData.email,
    progressData.completionPercentage + '%',
    progressData.completedModules,
    avgScore > 0 ? avgScore + '%' : 'No qualifying scores',
    quiz1,
    quiz2,
    quiz3,
    quiz4,
    new Date().toLocaleString(),
    totalAttempts,
    certificates
  ];
  
  if (userRow > 0) {
    // Update existing row
    sheet.getRange(userRow, 1, 1, rowData.length).setValues([rowData]);
  } else {
    // Add new row
    sheet.appendRow(rowData);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Progress updated'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===================================
// TEST FUNCTION (Optional - for testing)
// ===================================
function testScript() {
  const testData = {
    action: 'progress',
    data: {
      name: 'Test User',
      email: 'test@example.com',
      completionPercentage: 50,
      completedModules: 4,
      quizzesTaken: 2,
      averageQuizScore: 85,
      quizScores: {
        'quiz-1': { quizId: 'Quiz 1', percentage: 90 },
        'quiz-2': { quizId: 'Quiz 2', percentage: 80 }
      }
    }
  };
  
  const result = handleProgress(testData.data);
  Logger.log(result.getContent());
}
