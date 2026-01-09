# 🧪 Testing Guide - Verify Registration Data

## Step 1: Check Your Google Sheet

1. Open your Google Sheet:
   - Go to: https://docs.google.com/spreadsheets/d/18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0/edit

2. Look for these tabs at the bottom:
   - **Users** - Should show your registration data
   - **Progress** - Will show your course progress
   - **Activity Log** - Shows all activities

3. In the **Users** tab, you should see:
   - Your Name
   - Your Email
   - Registered Date
   - Last Login
   - Status: Active

## Step 2: If Data is NOT Appearing

This means the Google Apps Script needs to be deployed. Follow these steps:

### Deploy Google Apps Script:

1. **Open Google Apps Script:**
   - In your Google Sheet, click **Extensions** → **Apps Script**

2. **Copy the Updated Code:**
   - Open the file `backend/google-apps-script.js` from your project folder
   - Copy ALL the code (it already has your Spreadsheet ID)

3. **Paste into Apps Script:**
   - Delete any existing code in the Apps Script editor
   - Paste the copied code
   - Click **Save** (💾 icon)
   - Name the project: "UAV Course Backend"

4. **Deploy as Web App:**
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **Web app**
   - Fill in:
     - **Description:** UAV Course Backend
     - **Execute as:** Me (your email)
     - **Who has access:** Anyone
   - Click **Deploy**

5. **Authorize Access:**
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to UAV Course Backend (unsafe)**
   - Click **Allow**

6. **Verify the Web App URL:**
   - After deployment, you'll see a Web App URL
   - It should match: `https://script.google.com/macros/s/AKfycbwac7C1hTJQ1sJA0ykd9SFg7Q0FMcBIbYgUEacqwmkRn2vzKyCJEwlhOy6MiQqP9J49/exec`
   - If it's different, you'll need to update `js/auth.js` with the new URL

## Step 3: Test Again

1. **Clear your browser data:**
   - Press `Ctrl + Shift + Delete`
   - Clear "Cached images and files" and "Cookies"
   - Or use Incognito/Private mode

2. **Register again:**
   - Go to: http://localhost:8000/index.html
   - Click "Login / Register"
   - Click "Register here"
   - Fill in your details
   - Click Register

3. **Check Google Sheet:**
   - Refresh your Google Sheet
   - Wait 5-10 seconds
   - Check the **Users** tab for your data

## Step 4: Check Browser Console for Errors

1. **Open Developer Tools:**
   - Press `F12` or `Ctrl + Shift + I`
   - Click on the **Console** tab

2. **Look for errors:**
   - Red error messages indicate problems
   - Look for messages about "Google Sheets" or "fetch"

3. **Check Network Tab:**
   - Click the **Network** tab
   - Try registering again
   - Look for a request to your Google Apps Script URL
   - Check if it shows "200 OK" or an error

## Common Issues & Solutions

### Issue 1: "Google Sheets not configured" warning
**Solution:** The Web App URL in `js/auth.js` is incorrect or Google Apps Script is not deployed.

### Issue 2: CORS errors in console
**Solution:** This is normal with `mode: 'no-cors'`. Data is still being sent. Check the Google Sheet to confirm.

### Issue 3: No data in Google Sheet
**Solution:** 
- Verify Google Apps Script is deployed with "Anyone" access
- Check that the Spreadsheet ID in the script matches your sheet
- Wait 10-15 seconds and refresh the sheet

### Issue 4: "Failed to load course data"
**Solution:** Make sure you're accessing via `http://localhost:8000/index.html` not `file:///`

## Step 5: Test Course Progress Tracking

Once registration works:

1. **Complete a module:**
   - Watch a video module
   - Click "Mark as Complete"

2. **Take a quiz:**
   - Navigate to a quiz module
   - Answer the questions
   - Complete the quiz

3. **Check Google Sheet:**
   - Go to the **Progress** tab
   - You should see:
     - Your email
     - Completion percentage
     - Quiz scores
     - Time spent

4. **Check Activity Log:**
   - Go to the **Activity Log** tab
   - You should see all your activities timestamped

## Need Help?

If data is still not appearing:
1. Share a screenshot of your browser console (F12)
2. Share a screenshot of your Google Apps Script deployment settings
3. Confirm the Web App URL matches the one in `js/auth.js`

---

**Your course is now ready to use! The local server will keep running until you close the terminal.**

To stop the server: Press `Ctrl + C` in the terminal
To restart: Run `python -m http.server 8000` again
