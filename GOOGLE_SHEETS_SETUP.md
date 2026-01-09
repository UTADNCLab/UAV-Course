# 📊 Google Sheets Backend Setup Guide

## ✅ What Was Fixed

1. **Removed navigation buttons from quiz intro** - Only "Start Quiz" button shows now
2. **Navigation buttons only appear after quiz completion** - Previous/Next Module buttons below results
3. **Updated to new Spreadsheet ID**: `1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc`
4. **Created simplified Google Apps Script** - No timestamp or time spent columns

---

## 🚀 Setup Instructions

### Step 1: Open Your Spreadsheet
Open this link: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit

### Step 2: Open Apps Script Editor
1. In your spreadsheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor

### Step 3: Copy the New Script
1. Open the file: `backend/NEW-google-apps-script.js`
2. Copy **ALL** the code
3. Paste it into the Apps Script editor

### Step 4: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description**: UAV Course Backend
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to [Project Name] (unsafe)**
9. Click **Allow**

### Step 5: Copy the Web App URL
1. After deployment, you'll see a **Web App URL**
2. It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
3. **Copy this entire URL**

### Step 6: Update the Code
1. Open `js/auth.js` in your project
2. Find this line (around line 13):
   ```javascript
   WEB_APP_URL: 'YOUR_NEW_WEB_APP_URL_HERE',
   ```
3. Replace `'YOUR_NEW_WEB_APP_URL_HERE'` with your copied URL
4. Save the file

### Step 7: Commit and Push
```bash
git add js/auth.js
git commit -m "Updated Google Apps Script Web App URL"
git push origin main
```

---

## 📋 What the Script Does

### Creates 2 Sheets Automatically:

#### 1. **Users Sheet**
Columns:
- Name
- Email
- Registered Date
- Last Login

#### 2. **Progress Sheet**
Columns:
- Name
- Email
- Completion %
- Modules Completed
- Quizzes Taken
- Average Quiz Score
- Quiz 1 Score
- Quiz 2 Score
- Quiz 3 Score
- Quiz 4 Score
- Last Updated
- Quiz Attempts
- Best Qualifying Certificates Eligible

**Note**: No timestamp or time spent columns as requested!

---

## 🔄 How to Clear Progress and Start Fresh

### Option 1: Clear Browser Data (Recommended)
1. Open browser console (F12)
2. Go to **Console** tab
3. Run these commands:
```javascript
localStorage.removeItem('uav_course_progress');
localStorage.removeItem('uav_course_current_user');
localStorage.removeItem('uav_course_users');
```
4. Refresh the page

### Option 2: Clear Spreadsheet Data
1. Open your Google Spreadsheet
2. Delete rows 2 onwards in both sheets (keep headers)
3. Clear browser localStorage (see Option 1)

---

## ✨ Features

### Automatic Data Sync
- **Registration**: Saves to Users sheet
- **Login**: Updates last login time
- **Quiz Completion**: Updates Progress sheet with scores
- **Module Completion**: Updates completion percentage

### Certificate Tracking
- Automatically tracks quizzes with 80%+ scores
- Shows which certificates user is eligible for
- Updates in real-time

### No Duplicate Entries
- Each user has only ONE row in Progress sheet
- Updates existing row instead of creating new ones

---

## 🐛 Troubleshooting

### "Invalid email or password" Error
**Solution**: Clear localStorage and re-register
```javascript
localStorage.clear();
```

### Progress Not Updating
**Solution**: 
1. Check if Web App URL is correct in `js/auth.js`
2. Make sure you deployed as "Anyone" can access
3. Clear cache and try again

### Spreadsheet Not Creating Sheets
**Solution**: 
1. Manually create sheets named "Users" and "Progress"
2. Add the column headers as listed above
3. Script will then update these sheets

---

## 📞 Need Help?

If you encounter any issues:
1. Check browser console (F12) for errors
2. Check Apps Script logs: Apps Script Editor → Executions
3. Verify the Web App URL is correct
4. Make sure spreadsheet permissions allow editing

---

## ✅ Final Checklist

- [ ] Opened spreadsheet
- [ ] Copied new script to Apps Script editor
- [ ] Deployed as Web App
- [ ] Copied Web App URL
- [ ] Updated `js/auth.js` with new URL
- [ ] Committed and pushed changes
- [ ] Cleared browser cache
- [ ] Tested registration
- [ ] Tested quiz completion
- [ ] Verified data appears in spreadsheet

---

**Your Spreadsheet**: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit
