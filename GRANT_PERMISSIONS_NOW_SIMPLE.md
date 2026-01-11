# 🔴 URGENT: Grant Email Permissions (2 Minutes)

## The Error You're Seeing:
```
Email error: Exception: You do not have permission to call MailApp.sendEmail
```

## ✅ How to Fix (EXACTLY):

### Step 1: Open Apps Script
You're already there! ✅

### Step 2: Select the Function
At the top of the editor, find the dropdown that says "Select function"
- Click it
- Select: **`testEmailPermissions`**

### Step 3: Click RUN
Click the ▶️ **Run** button (next to the function dropdown)

### Step 4: Grant Permissions
A popup will appear: **"Authorization required"**

1. Click **"Review Permissions"**
2. Select your account: **opencourse.uav@gmail.com**
3. You'll see: **"Google hasn't verified this app"**
4. Click **"Advanced"** (bottom left)
5. Click **"Go to UAV Course Data (unsafe)"**
6. Click **"Allow"**

### Step 5: Done!
- Check the execution log - should say: "✅ Email sent successfully!"
- Check opencourse.uav@gmail.com inbox - you should have a test email
- Now ALL email functions will work!

---

## After Granting Permissions:

### Test Again:
1. Go to your website: https://jaymehta12110.github.io/UAV-Course/
2. Fill out the contact form
3. Click "Send"
4. Check opencourse.uav@gmail.com - email should arrive! ✅

---

## Why This Happens:

Google Apps Script requires you to **manually grant permissions** the first time you use `MailApp`. You CANNOT grant permissions through code - you must:

1. Run a function that uses `MailApp`
2. Click "Allow" in the permission dialog
3. Done!

After this one-time setup, all emails work automatically forever! 🚀

---

## ⏱️ Time Required: 2 minutes

## 🎯 Result: All emails work perfectly!
