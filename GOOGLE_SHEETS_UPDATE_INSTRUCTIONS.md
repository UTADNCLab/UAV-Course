# 🔧 GOOGLE SHEETS BACKEND UPDATE REQUIRED

## ⚠️ IMPORTANT: You Must Update Your Google Apps Script

The frontend has been updated to fix the Google Sheets integration, but you need to update your Google Apps Script deployment to match.

---

## 📋 What Changed:

### Frontend Changes (Already Deployed):
1. ✅ Changed fetch to use `text/plain` instead of `no-cors` + JSON
2. ✅ Quiz keys are sent as `quiz-1`, `quiz-2`, `quiz-3`, `quiz-4`

### Backend Changes (You Need to Deploy):
1. ✅ Updated to read quiz keys as `quiz-1`, `quiz-2`, etc. (not numeric)
2. ✅ Updated certificate eligibility checking

---

## 🚀 How to Update Your Google Apps Script:

### Step 1: Open Your Apps Script
1. Go to: https://script.google.com
2. Open your "UAV Course Backend" project

### Step 2: Replace the Code
1. Open the file `backend/google-apps-script.js` in this repository
2. Copy ALL the code from that file
3. Paste it into your Apps Script editor (replace everything)

### Step 3: Update the Spreadsheet ID
Find this line at the top:
```javascript
const SPREADSHEET_ID = '18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0';
```

Replace with YOUR spreadsheet ID:
```javascript
const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';
```

### Step 4: Deploy
1. Click **Deploy** → **Manage deployments**
2. Click the **pencil icon** (Edit) next to your active deployment
3. Change "Version" to **New version**
4. Click **Deploy**
5. Copy the new Web App URL (it should be the same)

### Step 5: Verify
1. The URL should still be: `https://script.google.com/macros/s/AKfycbydIxbmfk7UIZVRsdDocnECUJByx8VWExiE2aRmYrnQ5-Hetn4H3oF0vriBZe0dj_i9Mg/exec`
2. If it changed, update `js/auth.js` with the new URL

---

## 🧪 Test After Updating:

1. **Complete a quiz** with 80%+ score
2. **Check your Google Sheet** - Progress tab should show:
   - Quiz scores in the correct columns
   - Certificate eligibility showing module names
3. **Check Activity Log** tab - should show quiz completion events

---

## 📊 What the Updated Script Does:

### Before (Wrong):
```javascript
const quiz1 = quizScores['2'] ? ...  // ❌ Looking for numeric key
```

### After (Correct):
```javascript
const quiz1 = quizScores['quiz-1'] && quizScores['quiz-1'].percentage >= 80 ? ... // ✅ String key
```

### Certificate Checking (Before):
```javascript
const quizNum = Math.floor(parseInt(quizId) / 2);  // ❌ Math on string
```

### Certificate Checking (After):
```javascript
if (quizScores['quiz-1'] && quizScores['quiz-1'].percentage >= 80) {  // ✅ Direct check
  eligibleModules.push('Module 1: Open Airborne Computing Platforms');
}
```

---

## ✅ After Update, Your Sheet Will Show:

**Progress Tab:**
- Email: 28jaymehta@gmail.com
- Name: Jay Mehta
- Completion %: 100% (when all 8 modules done)
- Quiz 1 Score: 85% (or "Not taken")
- Quiz 2 Score: 90% (or "Not taken")
- Quiz 3 Score: Not taken
- Quiz 4 Score: Not taken
- Certificates Eligible: "Module 1: Open Airborne Computing Platforms | Module 2: UAV Communications and Networking"

---

## 🆘 If You Need Help:

1. Make sure you're editing the CORRECT Apps Script project
2. Make sure you deployed as **New version**
3. Make sure the Web App URL is set to "Anyone" access
4. Check the Execution log in Apps Script for errors

---

## 📝 Summary:

**Frontend (Already Done):** ✅
- Progress bar excludes certificate (8/8 = 100%)
- CORS fixed (text/plain)
- User-specific progress storage
- Load progress before rendering UI

**Backend (You Need to Do):** ⚠️
- Update Google Apps Script code
- Deploy new version
- Verify data appears in sheet

Once you update the Apps Script, the Google Sheets integration will work perfectly!
