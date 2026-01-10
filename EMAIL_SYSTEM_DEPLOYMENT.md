# Email System Deployment Guide

## Overview
This guide explains how to deploy the updated email system that sends contact form submissions and professor questions directly to email inboxes without opening the email client.

## Changes Made

### 1. Backend (Google Apps Script)
**File:** `backend/google-apps-script.js`

Added two new email handling functions:
- `handleSendEmail()` - Handles contact form submissions
- `handleSendProfessorEmail()` - Handles professor question submissions

**What it does:**
- Receives form data from the website
- Sends emails using Google's MailApp service
- Sends to `opencourse.uav@gmail.com` for contact forms
- Sends to specific professor emails for questions
- Also sends a copy of professor questions to the main course email

### 2. Frontend Updates

#### Landing Page Contact Form
**File:** `js/landing-contact.js`
- Updated to send data to Google Apps Script backend
- No longer opens email client
- Shows success message after sending
- Emails go directly to `opencourse.uav@gmail.com`

#### Professor Contact System
**File:** `js/contact-new.js`
- New simplified system without dropdown
- Sends questions directly to professor emails
- Also sends copy to course email

#### Landing Page
**File:** `index.html`
- Added Dr. Yan Wan's introduction video link
- Removed visible email addresses from instructor cards

#### Styling
**File:** `css/landing-styles.css`
- Added styling for video link button

## Deployment Steps

### Step 1: Update Google Apps Script

1. Go to your Google Apps Script project:
   https://script.google.com/home/projects/YOUR_PROJECT_ID

2. Open the script editor

3. Replace the entire code with the content from `backend/google-apps-script.js`

4. Click **Deploy** → **New deployment**

5. Select type: **Web app**

6. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**

7. Click **Deploy**

8. **IMPORTANT:** Copy the new Web App URL

9. Update the URL in these files:
   - `js/auth.js` (line with `GOOGLE_SHEETS_CONFIG.WEB_APP_URL`)
   - `js/landing-contact.js` (line with `BACKEND_URL`)
   - `js/contact-new.js` (line with `BACKEND_URL`)

### Step 2: Test Email Functionality

1. **Test Contact Form:**
   - Go to landing page
   - Fill out contact form
   - Click Send
   - Check `opencourse.uav@gmail.com` inbox

2. **Test Professor Questions:**
   - Login to course
   - Try to send a question to a professor
   - Check professor's email inbox
   - Check `opencourse.uav@gmail.com` for copy

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Add direct email sending functionality"
git push origin main
```

### Step 4: Verify on Live Site

1. Wait 2-3 minutes for GitHub Pages to deploy
2. Clear browser cache (Ctrl + Shift + R)
3. Test all email functionality on live site

## Professor Email Addresses

The system uses these email addresses:
- Dr. Yan Wan: `yan.wan@uta.edu`
- Dr. Junfei Xie: `jxie4@sdsu.edu`
- Dr. Kejie Lu: `kejie.lu@upr.edu`
- Dr. Shengli Fu: `Shengli.Fu@unt.edu`

## Troubleshooting

### Emails Not Sending

1. **Check Google Apps Script Logs:**
   - Open Apps Script editor
   - Click **Executions** in left sidebar
   - Look for errors

2. **Verify Permissions:**
   - Script must have permission to send emails
   - Re-authorize if needed

3. **Check Spam Folder:**
   - Emails might be in spam initially
   - Mark as "Not Spam" to train filter

### Form Shows Error

1. **Check Backend URL:**
   - Ensure URL is correct in all JS files
   - URL should end with `/exec`

2. **Check CORS:**
   - Using `mode: 'no-cors'` in fetch requests
   - This is correct for Google Apps Script

### No Response from Backend

1. **Verify Deployment:**
   - Make sure you deployed as "Web app"
   - Access should be set to "Anyone"

2. **Test Backend Directly:**
   - Use Postman or similar tool
   - Send POST request with test data

## Email Format

### Contact Form Email
```
Subject: Contact Form: Message from [Name]

You have received a new message from the UAV Course contact form.

Name: [Name]
Email: [Email]

Message:
[Message]

---
Sent via UAV Course Platform
[Timestamp]
```

### Professor Question Email
```
Subject: [UAV Course Question] [Subject]

Dear [Professor Name],

You have received a question from a student in the UAV Course.

Student Name: [Name]
Student Email: [Email]

Subject: [Subject]

Question:
[Question]

---
Sent via UAV Course Platform
[Timestamp]
```

## Security Notes

- All emails are sent through Google's secure MailApp service
- Student email addresses are included for reply purposes
- No sensitive data is stored in the script
- All communication is logged in Google Apps Script execution logs

## Support

If you encounter issues:
1. Check Google Apps Script execution logs
2. Verify all email addresses are correct
3. Test with a simple message first
4. Check spam folders
5. Ensure Google Apps Script has email sending permissions
