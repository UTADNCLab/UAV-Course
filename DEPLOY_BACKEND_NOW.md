# 🚨 URGENT: Deploy Updated Backend to Fix Certificate Eligibility

## The Problem
Your Google Sheets still shows "Certificates Eligible: YES" for users who only passed quizzes because **the backend code running in Google Apps Script is still the OLD version**.

The fixes are in your local files but NOT deployed yet!

---

## ✅ STEP-BY-STEP DEPLOYMENT

### Step 1: Open Google Apps Script
1. Go to: https://script.google.com/home
2. Find and click: **"UAV Course Data"** project
   (Or whatever you named your Apps Script project)

### Step 2: Replace the Code
1. In the Apps Script editor, you'll see `Code.gs` file
2. **SELECT ALL** the old code (Ctrl+A)
3. **DELETE** it
4. Open your local file: `backend/google-apps-script.js`
5. **COPY ALL** the code from that file
6. **PASTE** it into the Apps Script editor

### Step 3: Save
1. Click the **Save** icon (💾) or press Ctrl+S
2. Wait for "Saved" confirmation

### Step 4: Deploy New Version
1. Click **Deploy** → **Manage deployments**
2. Click the **pencil icon** (✏️) next to your active deployment
3. Under "Version", click **"New version"**
4. Add description: "Fix certificate eligibility - require video + quiz"
5. Click **Deploy**
6. Copy the new Web App URL (should be the same as before)

### Step 5: Test
1. Go to your Google Sheet
2. Look at the "Progress" tab
3. The "Certificates Eligible" column should now update correctly:
   - **NO** if only quiz passed (no video watched)
   - **YES** if BOTH video watched AND quiz ≥ 80%

---

## 🔍 How to Verify It's Working

### Test Case 1: Only Quiz Passed
```
User completes Quiz 1 with 85% (but didn't watch Video 1)
Expected: Certificates Eligible = NO
```

### Test Case 2: Video + Quiz Passed
```
User watches Video 1 AND scores 85% on Quiz 1
Expected: Certificates Eligible = YES
```

---

## ⚠️ Important Notes

1. **The frontend is already fixed** - it's now sending the completed modules array
2. **The backend needs deployment** - that's what you need to do now
3. **After deployment**, have a user:
   - Watch a video
   - Take the quiz
   - Check if the spreadsheet updates correctly

---

## 🆘 If You Get Errors

### Error: "Authorization required"
- Click "Review Permissions"
- Select your Google account
- Click "Advanced" → "Go to UAV Course Data (unsafe)"
- Click "Allow"

### Error: "Script function not found"
- Make sure you pasted the ENTIRE code from `backend/google-apps-script.js`
- Check that the `doPost` function exists at the top

---

## 📞 Need Help?

If deployment fails or you see errors, share:
1. Screenshot of the error
2. Which step you're on
3. Any error messages from the Apps Script console

**Deploy now to fix the certificate eligibility issue!** 🚀
