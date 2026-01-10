# 🚀 FINAL DEPLOYMENT INSTRUCTIONS

## ✅ Step 1: Update Google Apps Script

1. Go to: https://script.google.com/home/projects/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit
2. **Delete ALL existing code**
3. **Copy the ENTIRE contents** from `backend/FINAL-google-apps-script.js`
4. **Paste** into the Apps Script editor
5. Click **Deploy** → **Manage deployments**
6. Click the **Edit** icon (pencil) on your existing deployment
7. Click **New Version**
8. Click **Deploy**
9. **Copy the new Web App URL** (it should be the same as before)

## ✅ Step 2: Verify Web App URL in auth.js

The NEW URL in `js/auth.js` has been updated to:
```
https://script.google.com/macros/s/AKfycbydIxbmfk7UIZVRsdDocnECUJByx8VWExiE2aRmYrnQ5-Hetn4H3oF0vriBZe0dj_i9Mg/exec
```

This should match your new deployment URL from Step 1.

## ✅ Step 3: Deploy Frontend Changes

The following files have been updated and need to be deployed:
- `js/auth.js` - Now uses per-user keys and sends firstName/lastName
- `js/course.js` - Auto-cleanup of old global data
- `js/quiz.js` - Per-user quiz scores
- `clear-data.html` - Data clearing utility

Run these commands:
```bash
git add .
git commit -m "Final fix: per-user storage + Google Sheets deduplication"
git push origin main
```

## ✅ Step 4: Clear Old Data (IMPORTANT!)

After deployment, users need to clear old global data. They have 2 options:

### Option A: Automatic (Recommended)
Just **logout and login again**. The system will automatically remove old global keys.

### Option B: Manual Clear
Visit: https://jaymehta12110.github.io/UAV-Course/clear-data.html
Click "Delete All Data"

### Option C: Browser Console
Open browser console and run:
```javascript
localStorage.removeItem('uav_course_progress');
localStorage.removeItem('uav_course_quiz_scores');
localStorage.removeItem('uav_course_total_modules');
location.reload();
```

## ✅ What's Fixed:

### Frontend (js/auth.js):
- ✅ Added `userKey()` helper function for per-user storage
- ✅ `sendProgressUpdate()` now reads from per-user keys
- ✅ Sends `firstName` and `lastName` to Google Sheets
- ✅ Sends `completedModules` (not modulesCompleted)
- ✅ Sends `totalQuizAttempts`

### Frontend (js/course.js):
- ✅ Auto-removes old global keys on login
- ✅ Per-user progress storage
- ✅ New users start at 0%

### Frontend (js/quiz.js):
- ✅ Per-user quiz scores storage

### Backend (Google Apps Script):
- ✅ Auto-deduplicates by email
- ✅ Keeps first row, deletes duplicates
- ✅ Stores First Name + Last Name separately
- ✅ Certificate Eligible: YES/NO (if any quiz >= 80%)
- ✅ No average column
- ✅ No "best qualifying" column
- ✅ Clean column structure

## ✅ Google Sheets Structure:

### Users Sheet:
| First Name | Last Name | Email |
|------------|-----------|-------|

### Progress Sheet:
| First Name | Last Name | Email | Completion % | Modules Completed | Total Modules | Quiz 1 Score | Quiz 2 Score | Quiz 3 Score | Quiz 4 Score | Quiz Attempts | Certificates Eligible |
|------------|-----------|-------|--------------|-------------------|---------------|--------------|--------------|--------------|--------------|---------------|----------------------|

## ✅ Testing Checklist:

1. [ ] Clear old data (use one of the 3 options above)
2. [ ] Register a new user
3. [ ] Check Google Sheets - should see First Name, Last Name
4. [ ] Complete a module
5. [ ] Check progress updates in Google Sheets
6. [ ] Take a quiz and score 80%+
7. [ ] Check "Certificates Eligible" = YES
8. [ ] Logout and login as different user
9. [ ] Verify progress is isolated (0% for new user)
10. [ ] Check Google Sheets - no duplicates

## 🎉 All Done!

Your system now has:
- ✅ Per-user progress storage
- ✅ Per-user quiz scores
- ✅ Auto-deduplication in Google Sheets
- ✅ First Name + Last Name storage
- ✅ Certificate eligibility tracking
- ✅ Clean data structure
