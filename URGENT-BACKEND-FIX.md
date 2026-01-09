# 🚨 URGENT: Backend Fix Required

## Problem
Quiz scores (86% on Quiz 4) are not showing in the spreadsheet because the backend script has the wrong key mapping.

## Solution
You need to **redeploy** the Google Apps Script with the fixed code.

---

## Step-by-Step Instructions:

### 1. Open Google Apps Script
1. Go to your spreadsheet: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit
2. Click **Extensions** → **Apps Script**

### 2. Replace the Code
1. **DELETE** all existing code in the editor
2. **COPY** the entire content from `backend/NEW-google-apps-script.js`
3. **PASTE** it into the Apps Script editor
4. Click **Save** (💾 icon)

### 3. Deploy the Updated Script
1. Click **Deploy** → **Manage deployments**
2. Click the **✏️ Edit** icon (pencil) next to your existing deployment
3. Under "Version", select **New version**
4. Add description: "Fixed quiz score key mapping"
5. Click **Deploy**
6. **IMPORTANT**: Copy the new Web App URL if it changed

### 4. Update Frontend (if URL changed)
If you got a new Web App URL:
1. Open `js/auth.js`
2. Find line 11: `WEB_APP_URL:`
3. Replace with your new URL
4. Save and push to GitHub

### 5. Test
1. Clear browser cache (Ctrl+Shift+R)
2. Clear localStorage: Open browser console and run:
   ```javascript
   localStorage.clear()
   ```
3. Refresh page and login again
4. Take a quiz or wait 5 minutes for auto-sync
5. Check spreadsheet - scores should now appear!

---

## What Was Fixed?

**Before (Wrong):**
```javascript
const quiz1 = quizScores['quiz-1'] && ...  // ❌ Looking for 'quiz-1'
const quiz2 = quizScores['quiz-2'] && ...  // ❌ Looking for 'quiz-2'
```

**After (Correct):**
```javascript
const quiz1 = quizScores[1] && ...  // ✅ Looking for 1 (module index)
const quiz2 = quizScores[3] && ...  // ✅ Looking for 3 (module index)
const quiz3 = quizScores[5] && ...  // ✅ Looking for 5 (module index)
const quiz4 = quizScores[7] && ...  // ✅ Looking for 7 (module index)
```

The frontend stores quiz scores using module indices (1, 3, 5, 7), not string keys.

---

## Current Status:
- ✅ Backend code fixed in `backend/NEW-google-apps-script.js`
- ⏳ **WAITING**: You need to redeploy to Google Apps Script
- ⏳ **WAITING**: Test to confirm scores appear in spreadsheet

---

## Need Help?
If you get stuck, let me know which step you're on!
