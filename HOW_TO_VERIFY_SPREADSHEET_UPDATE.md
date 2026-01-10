# How to Verify Your Google Sheets is Using the New Version

## Step 1: Check the Script Version

### Method 1: Check Script Deployment
1. Go to https://script.google.com/home
2. Find and open your "UAV Course Backend" project
3. Look at the top of the code - you should see this comment:
   ```javascript
   // UAV Course Backend - Google Apps Script
   // This script handles user registration, login, progress tracking, and quiz results
   ```
4. Check if the `doPost` function includes the Quiz Attempts fix:
   - Look for the line: `quizAttempts: userData.quizAttempts || 0,`
   - There should be a comment above it: `// Quiz Attempts: stores the count (1, 2, 3, 4), not percentage`

### Method 2: Check Deployment URL
1. In Google Apps Script, click **Deploy** → **Manage deployments**
2. Verify the Web app URL matches: 
   ```
   https://script.google.com/macros/s/AKfycbxz-4ZhhhuSxBWs8cZ5NMnBlHf-Q_PdYwhxWjQOizXSP69U9l4EqkJYWWu7YMQctXUkTw/exec
   ```
3. Check the version number - it should be the latest version

## Step 2: Test Quiz Attempts in Spreadsheet

### Before Testing - Clear Old Data (Optional)
If you want to start fresh:
1. Open your Google Sheet
2. Go to the "Users" tab
3. Delete all rows except the header row
4. This ensures you're testing with clean data

### Test the Quiz Attempts Feature
1. **Register a New Test Account:**
   - Go to: https://jaymehta12110.github.io/UAV-Course/
   - Click "Login" → "Register"
   - Create a test account (e.g., test@example.com)

2. **Take a Quiz:**
   - Navigate to Module 1
   - Complete Quiz 1
   - Submit your answers

3. **Check the Spreadsheet:**
   - Open your Google Sheet
   - Go to the "Users" tab
   - Find your test account row
   - Look at the "Quiz Attempts" column

### What You Should See:

#### ✅ CORRECT (New Version):
```
Quiz Attempts column shows: 1
(After taking quiz again: 2, then 3, then 4, etc.)
```

#### ❌ INCORRECT (Old Version):
```
Quiz Attempts column shows: 100%, 200%, 300%, 400%
```

## Step 3: Verify All Columns Are Working

Check that your spreadsheet has these columns with correct data:

| Column Name | Expected Data | Example |
|------------|---------------|---------|
| Timestamp | Date/Time | 1/15/2025, 10:30:45 AM |
| Name | User's full name | John Doe |
| Email | User's email | john@example.com |
| Total Progress | Percentage (0-100) | 25% |
| Module 1 Progress | Percentage | 100% |
| Module 2 Progress | Percentage | 0% |
| Module 3 Progress | Percentage | 0% |
| Module 4 Progress | Percentage | 0% |
| Quiz 1 Score | Percentage | 85% |
| Quiz 2 Score | Percentage | 0% |
| Quiz 3 Score | Percentage | 0% |
| Quiz 4 Score | Percentage | 0% |
| Quiz Attempts | **Number (1, 2, 3, 4)** | **1** ← Should be a number! |
| Last Updated | Date/Time | 1/15/2025, 10:35:20 AM |

## Step 4: Force Script Update (If Needed)

If you're still seeing percentages in Quiz Attempts:

### Option A: Redeploy the Script
1. Go to https://script.google.com/home
2. Open your UAV Course project
3. Click **Deploy** → **Manage deployments**
4. Click the pencil icon (✏️) next to your deployment
5. Under "Version", select **New version**
6. Add description: "Fix Quiz Attempts to show numbers"
7. Click **Deploy**
8. The URL should remain the same

### Option B: Replace and Redeploy
1. Go to https://script.google.com/home
2. Open your UAV Course project
3. **Select ALL code** (Ctrl+A) and delete it
4. Open `backend/google-apps-script.js` from your project folder
5. Copy ALL the code
6. Paste it into Google Apps Script
7. Click **Save** (💾)
8. Click **Deploy** → **New deployment**
9. Choose **Web app**
10. Set "Execute as": **Me**
11. Set "Who has access": **Anyone**
12. Click **Deploy**
13. Copy the new URL and update it in your JavaScript files

## Step 5: Verify Website is Using Correct URL

Check that all your JavaScript files use the correct backend URL:

### Files to Check:
1. **js/auth.js** - Line ~15
2. **js/landing-contact.js** - Line ~3
3. **js/contact-new.js** - Line ~32

### Correct URL:
```javascript
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbxz-4ZhhhuSxBWs8cZ5NMnBlHf-Q_PdYwhxWjQOizXSP69U9l4EqkJYWWu7YMQctXUkTw/exec';
```

## Troubleshooting

### Problem: Still seeing percentages in Quiz Attempts

**Solution 1: Clear Browser Cache**
- Press Ctrl + Shift + Delete
- Clear cached images and files
- Reload the page

**Solution 2: Check Script Execution Log**
1. In Google Apps Script, click **Executions** (⚡) on the left
2. Look for recent executions
3. Check if there are any errors
4. If you see errors, click on them to see details

**Solution 3: Test with Incognito Mode**
- Open your site in incognito/private browsing
- Register a new test account
- Take a quiz
- Check the spreadsheet

### Problem: Data not appearing in spreadsheet

**Check:**
1. Script has permission to access the spreadsheet
2. Spreadsheet ID in the script matches your actual spreadsheet
3. The "Users" sheet tab exists and is spelled correctly

### Problem: Getting "Script not found" error

**Solution:**
1. The deployment URL might have changed
2. Go to **Deploy** → **Manage deployments**
3. Copy the current Web app URL
4. Update all JavaScript files with the new URL
5. Commit and push changes to GitHub

## Quick Verification Checklist

- [ ] Script code includes Quiz Attempts fix comment
- [ ] Deployment URL matches in all JavaScript files
- [ ] Test account created successfully
- [ ] Quiz taken and submitted
- [ ] Spreadsheet shows Quiz Attempts as **number** (not percentage)
- [ ] All other columns showing correct data
- [ ] No errors in Script Execution log

## Need Help?

If you're still having issues:
1. Check the Script Execution log for errors
2. Verify the spreadsheet ID in the script
3. Make sure the "Users" sheet exists
4. Try creating a new deployment with a new version
5. Clear browser cache and test in incognito mode

---

**Note:** After updating the script, it may take 1-2 minutes for changes to take effect. Always test with a new quiz attempt to see the changes.
