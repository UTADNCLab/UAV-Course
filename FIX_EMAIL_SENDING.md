# 🔧 FIX EMAIL SENDING - Step by Step Guide

## Problem
Contact form shows "Message sent successfully" but emails don't arrive in opencourse.uav@gmail.com inbox.

## Root Cause
Google Apps Script doesn't have permission to send emails from your account.

---

## ✅ SOLUTION - Grant Email Permissions

### Step 1: Open Google Apps Script
1. Go to: https://script.google.com/home
2. Find your "UAV Course Backend" project
3. Click to open it

### Step 2: Test the Email Function
1. In the script editor, find the `handleSendEmail` function
2. Click on the function name in the dropdown at the top (where it says "Select function")
3. Select `handleSendEmail`
4. Click the **Run** button (▶️ play icon)

### Step 3: Grant Permissions (CRITICAL)
When you click Run, you'll see:
1. **"Authorization required"** popup
2. Click **"Review Permissions"**
3. Choose your Google account (opencourse.uav@gmail.com)
4. You'll see: **"Google hasn't verified this app"**
5. Click **"Advanced"** (bottom left)
6. Click **"Go to UAV Course Backend (unsafe)"**
7. Review the permissions:
   - ✅ Send email as you
   - ✅ See, edit, create, and delete your spreadsheets
8. Click **"Allow"**

### Step 4: Verify Permissions Granted
After granting permissions:
1. The script will run
2. You might see an error (that's okay - we're just testing)
3. The important part is: **Permissions are now granted!**

### Step 5: Re-deploy the Script
1. Click **Deploy** → **Manage deployments**
2. Click the pencil icon (✏️) next to your deployment
3. Under "Version", select **"New version"**
4. Description: "Email permissions granted"
5. Click **"Deploy"**
6. Copy the new Web App URL (should be the same)

---

## 🧪 TEST THE EMAIL SYSTEM

### Test 1: Landing Page Contact Form
1. Go to: https://jaymehta12110.github.io/UAV-Course/
2. Scroll down to the Contact section
3. Fill in:
   - Name: Test User
   - Email: your-email@example.com
   - Message: Testing email system
4. Click **"Send"**
5. **Check opencourse.uav@gmail.com inbox** (wait 1-2 minutes)

### Test 2: Professor Contact Form
1. Go to the course page
2. Scroll to instructors section
3. Click **"Contact"** on Dr. Yan Wan
4. Fill in:
   - Subject: Test Question
   - Question: Testing professor email
5. Click **"Send Question"**
6. **Check TWO inboxes:**
   - yan.wan@uta.edu (professor's email)
   - opencourse.uav@gmail.com (copy)

---

## 📧 What Emails Should Look Like

### Landing Page Contact Email:
```
To: opencourse.uav@gmail.com
From: opencourse.uav@gmail.com
Reply-To: student-email@example.com
Subject: Contact Form: Message from [Student Name]

You have received a new message from the UAV Course contact form.

Name: [Student Name]
Email: [Student Email]

Message:
[Student's message]

---
Sent via UAV Course Platform
[Timestamp]
```

### Professor Question Email:
```
To: professor-email@university.edu
From: opencourse.uav@gmail.com
Reply-To: student-email@example.com
Subject: [UAV Course Question] [Subject]

Dear [Professor Name],

You have received a question from a student in the UAV Course.

Student Name: [Student Name]
Student Email: [Student Email]

Subject: [Question Subject]

Question:
[Student's question]

---
Sent via UAV Course Platform
[Timestamp]
```

---

## 🔍 Troubleshooting

### Issue 1: Still No Emails After Granting Permissions
**Solution:**
1. Check **Spam folder** in opencourse.uav@gmail.com
2. Add opencourse.uav@gmail.com to your contacts
3. Wait 2-3 minutes (Google Apps Script can be slow)

### Issue 2: "Authorization required" Error
**Solution:**
1. You need to grant permissions (see Step 3 above)
2. Make sure you're logged in as opencourse.uav@gmail.com
3. Try running the function again

### Issue 3: Emails Go to Spam
**Solution:**
1. Mark the email as "Not Spam"
2. Add opencourse.uav@gmail.com to your contacts
3. Create a filter to always deliver to inbox

### Issue 4: Wrong Email Address
**Current Setup:**
- Landing page → opencourse.uav@gmail.com ✅
- Professor questions → professor's email + copy to opencourse.uav@gmail.com ✅

If you want to change the recipient email, edit `backend/google-apps-script.js`:
```javascript
// Line 186 in handleSendEmail function
const recipient = 'YOUR-NEW-EMAIL@gmail.com';

// Line 234 in handleSendProfessorEmail function
MailApp.sendEmail({
  to: 'YOUR-NEW-EMAIL@gmail.com',
  ...
});
```

---

## ✅ Verification Checklist

After following all steps, verify:
- [ ] Permissions granted in Google Apps Script
- [ ] Script re-deployed with new version
- [ ] Test email sent from landing page
- [ ] Email received in opencourse.uav@gmail.com
- [ ] Test email sent to professor
- [ ] Email received by professor
- [ ] Copy received in opencourse.uav@gmail.com

---

## 📝 Important Notes

1. **First-time setup**: You MUST grant email permissions before emails will work
2. **Permissions persist**: Once granted, you don't need to do this again
3. **Spam folder**: Check spam if emails don't appear in inbox
4. **Delay**: Google Apps Script emails can take 1-2 minutes to arrive
5. **Reply-To**: Emails have student's email as reply-to, so you can reply directly

---

## 🆘 Still Not Working?

If emails still don't arrive after following ALL steps:

1. **Check Google Apps Script Logs:**
   - Open your script
   - Click "Executions" (left sidebar)
   - Look for errors in recent executions

2. **Verify Script URL:**
   - Current URL: `AKfycbxz-4ZhhhuSxBWs8cZ5NMnBlHf-Q_PdYwhxWjQOizXSP69U9l4EqkJYWWu7YMQctXUkTw`
   - Make sure this matches in:
     - `js/landing-contact.js` (line 5)
     - `js/contact-new.js` (line 5)

3. **Test Directly in Script:**
   - In Google Apps Script, add this test function:
   ```javascript
   function testEmail() {
     MailApp.sendEmail({
       to: 'opencourse.uav@gmail.com',
       subject: 'Test Email',
       body: 'This is a test email from Google Apps Script'
     });
   }
   ```
   - Run it and check if email arrives

---

## 🎯 Expected Result

After completing all steps:
✅ Contact form sends emails to opencourse.uav@gmail.com
✅ Professor questions send to professor + copy to opencourse.uav@gmail.com
✅ Emails arrive within 1-2 minutes
✅ Reply-to address is set to student's email
✅ All email content is properly formatted

---

**Last Updated:** December 2024
**Script Version:** With email sending functionality
**Deployment URL:** AKfycbxz-4ZhhhuSxBWs8cZ5NMnBlHf-Q_PdYwhxWjQOizXSP69U9l4EqkJYWWu7YMQctXUkTw
