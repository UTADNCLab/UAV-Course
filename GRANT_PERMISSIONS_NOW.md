# 🔐 Grant Email Permissions - Simple Steps

## ✅ You Found It! No OAuth Scopes = Permissions Not Granted Yet

If you see nothing below "Script properties" in Project Settings, that's normal! It means permissions haven't been granted yet.

---

## 🚀 EASIEST WAY: Run Authorization Function

### Step 1: Go to Editor
1. In Google Apps Script, click **"Editor"** (</> icon) on the left sidebar
2. You should see your script code

### Step 2: Add Authorization Function
**Copy this function and paste it at the TOP of your script (after line 5):**

```javascript
/**
 * AUTHORIZATION FUNCTION - RUN THIS FIRST!
 * This grants email sending permissions
 */
function authorizeEmailSending() {
  Logger.log('Requesting email permissions...');
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log('✅ Permissions granted! You can send ' + emailQuotaRemaining + ' emails today.');
  return 'Success! Permissions granted.';
}
```

### Step 3: Save the Script
- Press **Ctrl+S** or click the **Save** icon (💾)

### Step 4: Run the Function
1. In the function dropdown (top of editor), select: **`authorizeEmailSending`**
2. Click the **Run** button (▶️)

### Step 5: Grant Permissions
You'll see a popup: **"Authorization required"**

1. Click **"Review Permissions"**
2. Choose **opencourse.uav@gmail.com**
3. Click **"Advanced"** (at the bottom)
4. Click **"Go to UAV Course Backend (unsafe)"**
5. Click **"Allow"**

### Step 6: Check the Log
After granting permissions, you should see in the execution log:
```
✅ Permissions granted! You can send 100 emails today.
```

### Step 7: Verify Permissions
1. Go back to **Project Settings** (⚙️ icon)
2. Scroll down to "OAuth Scopes"
3. You should now see:
   ```
   ✅ https://www.googleapis.com/auth/script.send_mail
   ✅ https://www.googleapis.com/auth/spreadsheets
   ```

---

## 📋 Complete Script (Copy This Entire Thing)

If you want to replace your entire script with a fresh version that includes the authorization function, copy this:

```javascript
// ===================================
// UAV COURSE - GOOGLE APPS SCRIPT
// ===================================

const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';

/**
 * AUTHORIZATION FUNCTION - RUN THIS FIRST!
 * This grants email sending permissions
 */
function authorizeEmailSending() {
  Logger.log('Requesting email permissions...');
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log('✅ Permissions granted! You can send ' + emailQuotaRemaining + ' emails today.');
  return 'Success! Permissions granted.';
}

/**
 * Main entry point for web requests
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const data = payload.data || {};

    if (action === 'register') return handleRegister(data);
    if (action === 'login') return handleLogin(data);
    if (action === 'progress') return handleProgress(data);
    if (action === 'sendEmail') return handleSendEmail(data);
    if (action === 'sendProfessorEmail') return handleSendProfessorEmail(data);

    return json({ status: 'error', message: 'Unknown action' });

  } catch (err) {
    Logger.log('Error: ' + err.toString());
    return json({ status: 'error', message: err.toString() });
  }
}

/**
 * Test email permissions
 */
function testEmailPermissions() {
  try {
    MailApp.sendEmail({
      to: 'opencourse.uav@gmail.com',
      subject: 'Test Email - Permission Check',
      body: 'This is a test email to verify permissions.\n\nIf you receive this, email permissions are working!\n\nTimestamp: ' + new Date().toLocaleString()
    });
    Logger.log('✅ Email sent successfully!');
    return 'Success';
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    return 'Error: ' + error.toString();
  }
}

/**
 * Test complete email system
 */
function testEmailSystem() {
  Logger.log('Testing email system...');
  
  // Test 1: Contact form email
  const testContactEmail = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the contact form.'
  };
  
  Logger.log('Sending test contact email...');
  handleSendEmail(testContactEmail);
  
  // Test 2: Professor email
  const testProfessorEmail = {
    studentName: 'Test Student',
    studentEmail: 'student@example.com',
    professorEmail: 'yan.wan@uta.edu',
    professorName: 'Dr. Yan Wan',
    subject: 'Test Question',
    question: 'This is a test question to the professor.'
  };
  
  Logger.log('Sending test professor email...');
  handleSendProfessorEmail(testProfessorEmail);
  
  Logger.log('✅ Email tests completed! Check opencourse.uav@gmail.com inbox.');
}

// -------------------------------
// Helper Functions
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
      return i + 1;
    }
  }
  return -1;
}

function buildFullName(obj) {
  const first = (obj.firstName || '').trim();
  const last = (obj.lastName || '').trim();
  if (first || last) return `${first} ${last}`.trim();
  return (obj.name || '').trim();
}

// ===================================
// REGISTER USER
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
// LOGIN
// ===================================
function handleLogin(userData) {
  return json({ status: 'success', message: 'Login recorded' });
}

// ===================================
// PROGRESS UPDATE
// ===================================
function handleProgress(progressData) {
  const headers = [
    'Full Name', 'Email', 'Completion %', 'Modules Completed', 'Total Modules',
    'Average Quiz Score', 'Quiz 1 Score', 'Quiz 2 Score', 'Quiz 3 Score', 'Quiz 4 Score',
    'Quiz Attempts', 'Certificates Eligible'
  ];

  const sheet = openSheet('Progress', headers);
  const fullName = buildFullName(progressData) || 'Student';
  const email = (progressData.email || '').trim();

  if (!email) return json({ status: 'error', message: 'Missing email' });

  const quizScores = progressData.quizScores || {};

  function getQuizPercentage(key) {
    const q = quizScores[key];
    return (q && typeof q.percentage === 'number') ? q.percentage : null;
  }

  const q1 = getQuizPercentage('quiz-1');
  const q2 = getQuizPercentage('quiz-2');
  const q3 = getQuizPercentage('quiz-3');
  const q4 = getQuizPercentage('quiz-4');

  const scores = [q1, q2, q3, q4].filter(s => s !== null);
  const avgScore = scores.length > 0
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
    : 'N/A';

  const formatScore = (score) => score !== null ? `${score}%` : 'Not taken';

  const eligibleModules = [];
  if (q1 !== null && q1 >= 80) eligibleModules.push('Module 1: Open Airborne Computing Platforms');
  if (q2 !== null && q2 >= 80) eligibleModules.push('Module 2: UAV Communications and Networking');
  if (q3 !== null && q3 >= 80) eligibleModules.push('Module 3: Networked Control and Co-Design');
  if (q4 !== null && q4 >= 80) eligibleModules.push('Module 4: Airborne Computing and AI');

  const certificatesEligible = eligibleModules.length > 0 ? eligibleModules.join(' | ') : 'None';
  const quizAttempts = Object.keys(quizScores).length;

  const completionPercent = progressData.completionPercentage || 0;
  const modulesCompleted = progressData.modulesCompleted || 0;
  const totalModules = progressData.totalModules || 8;

  const rowData = [
    fullName, email, `${completionPercent}%`, modulesCompleted, totalModules,
    avgScore, formatScore(q1), formatScore(q2), formatScore(q3), formatScore(q4),
    quizAttempts, certificatesEligible
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
    
    const recipient = 'opencourse.uav@gmail.com';
    const subject = `Contact Form: Message from ${name}`;
    
    let body = `You have received a new message from the UAV Course contact form.\n\n`;
    body += `Name: ${name}\n`;
    body += `Email: ${email}\n\n`;
    body += `Message:\n${message}\n\n`;
    body += `---\n`;
    body += `Sent via UAV Course Platform\n`;
    body += `${new Date().toLocaleString()}`;
    
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
    
    // Send to professor
    MailApp.sendEmail({
      to: professorEmail,
      subject: `[UAV Course Question] ${subject}`,
      body: body,
      replyTo: studentEmail
    });
    
    // Send copy to admin
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
```

---

## ✅ After Granting Permissions

### You Can Test:
1. Run `testEmailPermissions` - Sends one test email
2. Run `testEmailSystem` - Sends three test emails
3. Test from your website - Both contact forms will work

### Deploy New Version:
1. Click **"Deploy"** → **"Manage deployments"**
2. Click ✏️ (edit) on your active deployment
3. Change "Version" to **"New version"**
4. Click **"Deploy"**

---

## 🎯 Quick Summary

**Problem:** No OAuth Scopes showing = Permissions not granted yet

**Solution:**
1. Add `authorizeEmailSending` function to your script
2. Run it
3. Grant permissions when asked
4. Done! ✅

**Time needed:** 5 minutes

---

**Need the complete script?** Copy the full script above and paste it into Google Apps Script editor!
