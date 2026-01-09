# 🚀 Google Apps Script Backend Deployment Guide

## ⚠️ IMPORTANT: Why Quiz Data Isn't Saving

Your quiz attempts are **NOT being saved to the spreadsheet** because the updated backend code hasn't been deployed to Google Apps Script yet. Follow this guide to deploy it.

---

## 📋 Prerequisites

1. ✅ Google Account (you already have this)
2. ✅ Google Spreadsheet created (you already have this)
3. ✅ Updated backend code in `backend/google-apps-script.js`

---

## 🔧 Step-by-Step Deployment Instructions

### Step 1: Open Your Google Spreadsheet

1. Go to: https://docs.google.com/spreadsheets/d/18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0/edit
2. This is your UAV Course spreadsheet

### Step 2: Open Apps Script Editor

1. In your spreadsheet, click **Extensions** → **Apps Script**
2. This will open the Apps Script editor in a new tab

### Step 3: Replace the Existing Code

1. You should see a file called `Code.gs` in the left sidebar
2. **DELETE ALL** the existing code in `Code.gs`
3. Open the file `backend/google-apps-script.js` from your local project
4. **COPY ALL** the code from that file
5. **PASTE** it into the `Code.gs` file in Apps Script editor

### Step 4: Save the Project

1. Click the **💾 Save** icon (or press `Ctrl+S` / `Cmd+S`)
2. Give your project a name if prompted (e.g., "UAV Course Backend")

### Step 5: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "UAV Course Backend v2" (or any description)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**

### Step 6: Authorize the Script

1. You'll see a popup asking for authorization
2. Click **Authorize access**
3. Choose your Google account
4. Click **Advanced** (if you see a warning)
5. Click **Go to [Your Project Name] (unsafe)**
6. Click **Allow**

### Step 7: Copy the New Web App URL

1. After authorization, you'll see a **Web app URL**
2. It will look like: `https://script.google.com/macros/s/AKfycby.../exec`
3. **COPY THIS URL** - you'll need it in the next step

### Step 8: Update the Frontend Code

1. Open `js/auth.js` in your local project
2. Find this line (around line 11):
   ```javascript
   WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzs7oApM-gF5Eb_AaGHPxaFSeyzXhfcuGPWLzyOyEalyXKgiVkHkPqXwZASGjmOGe8w/exec',
   ```
3. **REPLACE** the URL with your new Web App URL from Step 7
4. Save the file

### Step 9: Push Changes to GitHub

1. Open terminal in your project directory
2. Run these commands:
   ```bash
   git add js/auth.js
   git commit -m "Updated Google Apps Script Web App URL"
   git push origin main
   ```

### Step 10: Wait for GitHub Pages to Deploy

1. Wait 2-3 minutes for GitHub Pages to rebuild
2. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Reload your course page

---

## ✅ Verify It's Working

### Test Quiz Data Saving:

1. **Login** to your course
2. **Take a quiz** (any quiz)
3. **Complete the quiz** and see your score
4. **Open your Google Spreadsheet**
5. **Check the "User Progress" sheet** - you should see:
   - Your email
   - Your name
   - Module name
   - Quiz score
   - Percentage
   - Timestamp

### Test Certificate Eligibility:

1. **Score 80%+ on a quiz**
2. **Check the sidebar** - you should see the certificate section appear
3. **Click "Download Certificates"** - it should show which modules you're eligible for

---

## 🐛 Troubleshooting

### Issue: "Authorization required" error

**Solution**: 
- Go back to Apps Script editor
- Click **Deploy** → **Manage deployments**
- Click **Edit** (pencil icon)
- Change version to **New version**
- Click **Deploy**
- Copy the new URL and update `js/auth.js`

### Issue: Data still not saving

**Solution**:
1. Open browser console (F12)
2. Look for errors
3. Check if the Web App URL in `js/auth.js` matches the deployed URL
4. Make sure you cleared browser cache

### Issue: "Script function not found" error

**Solution**:
- Make sure you copied the ENTIRE code from `backend/google-apps-script.js`
- Check that there are no syntax errors in the Apps Script editor
- Save and redeploy

---

## 📊 What the Backend Does

The updated backend code:

1. ✅ **Saves quiz attempts** to Google Sheets
2. ✅ **Tracks quiz scores** (percentage, score, total questions)
3. ✅ **Filters for 80%+ scores** for certificate eligibility
4. ✅ **Removes Event Type and Timestamp columns** (cleaner data)
5. ✅ **Supports per-module certificates** (each quiz with 80%+ earns a certificate)

---

## 📝 Important Notes

- **Always deploy a NEW version** when you update the code
- **Never share your Web App URL publicly** (it's tied to your Google account)
- **The spreadsheet must remain accessible** to the script
- **Quiz data is saved in real-time** as students complete quizzes

---

## 🎉 Success!

Once deployed, your course will:
- ✅ Save all quiz attempts to Google Sheets
- ✅ Track student progress automatically
- ✅ Show certificate eligibility for 80%+ scores
- ✅ Allow students to retry quizzes
- ✅ Display certificates in the sidebar

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors (F12)
2. Check the Apps Script execution logs (View → Logs)
3. Verify the Web App URL is correct in `js/auth.js`
4. Make sure the spreadsheet is accessible

---

**Last Updated**: January 9, 2026
**Backend Version**: v2.0 (Per-module certificates)
