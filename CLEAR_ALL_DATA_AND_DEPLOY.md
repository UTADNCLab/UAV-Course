# 🔥 CLEAR ALL DATA & DEPLOY FIXED SCRIPT

## ⚠️ IMPORTANT: Follow Steps in Exact Order

---

## STEP 1: Clear Browser Data (LocalStorage)

### Option A: Use Clear Data Page (Easiest)
1. Go to: https://jaymehta12110.github.io/UAV-Course/clear-data.html
2. Click "Clear All Data"
3. Confirm the action

### Option B: Browser Console
1. Open your course page: https://jaymehta12110.github.io/UAV-Course/
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Type: `localStorage.clear()`
5. Press Enter
6. Type: `location.reload()`
7. Press Enter

### Option C: Browser Settings
**Chrome:**
1. Press Ctrl+Shift+Delete
2. Select "Cookies and other site data"
3. Time range: "All time"
4. Click "Clear data"

**Edge:**
1. Press Ctrl+Shift+Delete
2. Select "Cookies and other site data"
3. Time range: "All time"
4. Click "Clear now"

---

## STEP 2: Clear Google Sheets Data

### Method 1: Delete All Rows (Recommended)
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit
2. Go to **Users** sheet
3. Select all rows EXCEPT row 1 (header)
   - Click on row 2
   - Scroll to bottom
   - Hold Shift and click last row
4. Right-click → Delete rows
5. Repeat for **Progress** sheet

### Method 2: Use Apps Script Function (Advanced)
1. Go to: https://script.google.com/home/projects/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit
2. In the script editor, find the function `clearAllSheetData()`
3. Click the function dropdown at top
4. Select `clearAllSheetData`
5. Click Run (▶️ button)
6. Authorize if prompted
7. Check Execution log to confirm "All data cleared"

---

## STEP 3: Update Google Apps Script

1. Go to: https://script.google.com/home/projects/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit

2. **DELETE ALL EXISTING CODE**
   - Select all (Ctrl+A)
   - Delete

3. **Copy New Script**
   - Open file: `backend/FINAL-FIXED-google-apps-script.js`
   - Copy ENTIRE contents (Ctrl+A, Ctrl+C)

4. **Paste into Apps Script**
   - Paste in the editor (Ctrl+V)

5. **Save**
   - Click Save icon (💾) or Ctrl+S

6. **Deploy New Version**
   - Click "Deploy" → "Manage deployments"
   - Click ✏️ (Edit) next to your active deployment
   - Under "Version", select "New version"
   - Add description: "Fixed duplicate detection + locking"
   - Click "Deploy"
   - Copy the new Web App URL (should be same as before)

---

## STEP 4: Verify Web App URL

Your Web App URL should be:
```
https://script.google.com/macros/s/AKfycbzs7oApM-gF5Eb_AaGHPxaFSeyzXhfcuGPWLzyOyEalyXKgiVkHkPqXwZASGjmOGe8w/exec
```

If it's different, update `js/auth.js`:
- Find `WEB_APP_URL` constant
- Replace with your new URL

---

## STEP 5: Test Everything

### Test 1: Registration
1. Go to: https://jaymehta12110.github.io/UAV-Course/
2. Click "Register"
3. Enter:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: test123
4. Click Register
5. **Check Google Sheets** → Users sheet should have 1 row

### Test 2: Login
1. Logout
2. Login with same credentials
3. Should login successfully

### Test 3: Progress Tracking
1. Complete Module 1 video (mark as complete)
2. **Check Google Sheets** → Progress sheet should have 1 row
3. Complete Quiz 1 with 80%+
4. **Check Google Sheets** → Progress sheet should UPDATE (not add new row)

### Test 4: Certificate
1. After completing quiz with 80%+
2. Click "Module 5: Course Certificate"
3. Certificate should open showing your completed module

### Test 5: No Duplicates
1. Complete another module
2. Take another quiz
3. **Check Google Sheets** → Should still be 1 row per user (no duplicates)

---

## 🎯 What's Fixed in New Script:

### 1. Dynamic Column Detection ✅
- **Old**: Hardcoded column 3 for email
- **New**: Finds email column by header name
- **Benefit**: Works even if columns are rearranged

### 2. Locking Mechanism ✅
- **Old**: No concurrency protection
- **New**: Uses `LockService` to prevent simultaneous writes
- **Benefit**: No duplicates from concurrent requests

### 3. Better Deduplication ✅
- **Old**: Only checked one column
- **New**: Finds ALL rows with matching email, keeps first, deletes rest
- **Benefit**: Cleans up existing duplicates automatically

### 4. Correct Field Names ✅
- **Old**: Expected `modulesCompleted`
- **New**: Handles both `completedModules` and `modulesCompleted`
- **Benefit**: Works with frontend data structure

### 5. Clear Data Function ✅
- **New**: Added `clearAllSheetData()` function
- **Benefit**: Easy way to reset all data from Apps Script

---

## 📊 Expected Google Sheets Structure:

### Users Sheet:
```
First Name | Last Name | Email
Test       | User      | test@example.com
```

### Progress Sheet:
```
First Name | Last Name | Email            | Completion % | Modules Completed | Total Modules | Quiz 1 Score | Quiz 2 Score | Quiz 3 Score | Quiz 4 Score | Quiz Attempts | Certificates Eligible
Test       | User      | test@example.com | 25%          | 2                 | 8             | 85%          | Not taken    | Not taken    | Not taken    | 1             | YES
```

---

## ⚠️ Troubleshooting:

### Issue: Still seeing duplicates
**Solution**: 
1. Manually delete duplicate rows from Google Sheets
2. The script will prevent new duplicates

### Issue: Certificate not working
**Solution**:
1. Clear browser data (localStorage)
2. Login again
3. Complete quiz again

### Issue: Progress not updating
**Solution**:
1. Check browser console for errors (F12)
2. Verify Web App URL is correct in `js/auth.js`
3. Check Apps Script execution logs

### Issue: "Authorization required"
**Solution**:
1. In Apps Script, click Run
2. Authorize the script
3. Try again

---

## ✅ Checklist:

- [ ] Cleared browser localStorage
- [ ] Cleared all rows from Users sheet (except header)
- [ ] Cleared all rows from Progress sheet (except header)
- [ ] Copied new script to Apps Script editor
- [ ] Saved the script
- [ ] Deployed new version
- [ ] Tested registration (1 row in Users)
- [ ] Tested progress update (1 row in Progress, no duplicates)
- [ ] Tested certificate download
- [ ] Verified no duplicates after multiple actions

---

## 🎉 After Completion:

You should have:
- ✅ Clean Google Sheets with no duplicates
- ✅ Clean browser with no old data
- ✅ Working registration and login
- ✅ Working progress tracking (no duplicates)
- ✅ Working certificate download
- ✅ Per-user data isolation

**Everything starts fresh!** 🚀
