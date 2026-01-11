# 🔐 How to Grant Email Permissions in Google Apps Script

## Step-by-Step Visual Guide

---

## Step 1: Open Google Apps Script

1. Go to: **https://script.google.com/home**
2. You'll see a list of your projects
3. Find and click on: **"UAV Course Backend"** (or whatever you named it)

---

## Step 2: Copy the Updated Script

### In Your Computer:
1. Open the file: `backend/google-apps-script.js`
2. Select ALL the code (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)

### In Google Apps Script:
1. You'll see the script editor with your current code
2. Select ALL existing code (Ctrl+A or Cmd+A)
3. Delete it (press Delete)
4. Paste the new code (Ctrl+V or Cmd+V)
5. Click the **Save icon** (💾) or press Ctrl+S

---

## Step 3: Grant Email Permissions

### Method 1: Run Test Function (RECOMMENDED)

1. **Find the function dropdown** at the top of the screen
   - It's a dropdown menu that says "Select function" or shows a function name
   - Located next to the Run button (▶️)

2. **Click the dropdown** and select: `testEmailPermissions`

3. **Click the Run button** (▶️ play icon)

4. **You'll see a popup:** "Authorization required"
   - This is NORMAL and EXPECTED
   - Click the **"Review Permissions"** button

5. **Choose your Google account:**
   - Select: **opencourse.uav@gmail.com**
   - (Make sure you're using the correct account)

6. **You'll see:** "Google hasn't verified this app"
   - This is NORMAL for personal scripts
   - Click **"Advanced"** (bottom left corner)

7. **Click:** "Go to UAV Course Backend (unsafe)"
   - Don't worry - this is YOUR script, it's safe
   - Google just shows this warning for all custom scripts

8. **Review the permissions:**
   You'll see a list of what the script needs:
   - ✅ Send email as you
   - ✅ See, edit, create, and delete your spreadsheets in Google Drive
   
9. **Click "Allow"**

10. **Success!** The function will run and send a test email

11. **Check the Execution log** (bottom of screen):
    - You should see: `✅ Email sent successfully!`

12. **Check your email:**
    - Go to **opencourse.uav@gmail.com**
    - Look for: "Test Email - Permission Check"
    - If you see it, **permissions are working!** 🎉

---

## Step 4: Deploy the Updated Script

1. **Click "Deploy"** (top right)
2. **Select "Manage deployments"**
3. **Click the pencil icon** (✏️) next to your existing deployment
4. **Under "Version"**, click the dropdown
5. **Select "New version"**
6. **Add description:** "Email permissions granted and test functions added"
7. **Click "Deploy"**
8. **Copy the Web App URL** (should be the same as before)
   - Should end with: `...YMQctXUkTw/exec`

---

## Step 5: Test from Your Website

### Test 1: Landing Page Contact Form

1. Go to: **https://jaymehta12110.github.io/UAV-Course/**
2. Scroll down to the **Contact** section
3. Fill in:
   - **Name:** Your Name
   - **Email:** your-email@example.com
   - **Message:** Testing email system
4. Click **"Send"**
5. You should see: "Message sent successfully!"
6. **Check opencourse.uav@gmail.com inbox**
   - Wait 1-2 minutes
   - Look for email with subject: "Contact Form: Message from [Your Name]"

### Test 2: Professor Contact Form

1. Go to the **course page**
2. Scroll to the **instructors section**
3. Click **"Contact"** on Dr. Yan Wan's card
4. A modal will open showing:
   - Dr. Yan Wan's name and title
   - Her expertise
   - Subject and question fields
5. Fill in:
   - **Subject:** Test Question
   - **Question:** Testing professor email system
6. Click **"Send Question"**
7. You should see: "Question sent to Dr. Yan Wan successfully!"
8. **Check TWO inboxes:**
   - **yan.wan@uta.edu** - Professor receives the question
   - **opencourse.uav@gmail.com** - You receive a copy

---

## 🎯 What Each Permission Does

### "Send email as you"
- Allows the script to send emails from opencourse.uav@gmail.com
- Used for:
  - Landing page contact form emails
  - Professor question emails
  - All email notifications

### "See, edit, create, and delete your spreadsheets"
- Allows the script to update Google Sheets
- Used for:
  - Storing user registrations
  - Tracking progress
  - Recording quiz scores

---

## 🔍 Troubleshooting

### "Authorization required" keeps appearing
**Solution:** You need to complete ALL steps in Step 3. Don't skip the "Advanced" → "Go to unsafe" part.

### "Access denied" error
**Solution:** Make sure you're logged in as **opencourse.uav@gmail.com** when granting permissions.

### Emails not arriving
**Check:**
1. **Spam folder** - Check both inbox and spam
2. **Wait time** - Google Apps Script can take 1-2 minutes
3. **Execution log** - Check for errors in Google Apps Script
4. **Permissions** - Make sure you clicked "Allow" in Step 3

### "This app is blocked"
**Solution:** 
1. Go to Google Account settings
2. Security → Less secure app access
3. Turn ON (only if needed)
4. Or use an App Password

---

## ✅ Verification Checklist

After completing all steps, verify:

- [ ] Script updated in Google Apps Script
- [ ] `testEmailPermissions` function ran successfully
- [ ] Test email received in opencourse.uav@gmail.com
- [ ] New version deployed
- [ ] Landing page contact form sends emails
- [ ] Professor contact form sends emails
- [ ] Emails arrive in correct inboxes
- [ ] Reply-to address is set correctly

---

## 📧 Expected Email Examples

### Landing Page Contact Email:
```
To: opencourse.uav@gmail.com
From: opencourse.uav@gmail.com
Reply-To: student@example.com
Subject: Contact Form: Message from John Doe

You have received a new message from the UAV Course contact form.

Name: John Doe
Email: student@example.com

Message:
I have a question about the course...

---
Sent via UAV Course Platform
12/20/2024, 5:30 PM
```

### Professor Question Email:
```
To: yan.wan@uta.edu
From: opencourse.uav@gmail.com
Reply-To: student@example.com
Subject: [UAV Course Question] Question about Module 1

Dear Dr. Yan Wan,

You have received a question from a student in the UAV Course.

Student Name: John Doe
Student Email: student@example.com

Subject: Question about Module 1

Question:
Can you explain more about UAV control systems?

---
Sent via UAV Course Platform
12/20/2024, 5:30 PM
```

### Copy Email (to opencourse.uav@gmail.com):
```
To: opencourse.uav@gmail.com
From: opencourse.uav@gmail.com
Reply-To: student@example.com
Subject: [Copy] Question to Dr. Yan Wan: Question about Module 1

[Same content as professor email]
```

---

## 🎉 Success!

Once you complete all steps:
- ✅ Email permissions granted
- ✅ Both contact forms working
- ✅ Emails sent to correct addresses
- ✅ You receive copies of all professor questions
- ✅ Students can contact professors directly

**Total time:** 10-15 minutes

---

## 📝 Important Notes

1. **Permissions are permanent** - You only need to grant them once
2. **Same account** - Make sure you're always logged in as opencourse.uav@gmail.com
3. **Test first** - Always run `testEmailPermissions` before deploying
4. **Check spam** - First emails might go to spam folder
5. **Reply-to works** - When professors reply, it goes directly to the student

---

**Need help?** Check the execution log in Google Apps Script for detailed error messages.
