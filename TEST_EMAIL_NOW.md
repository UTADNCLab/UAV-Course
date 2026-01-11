# 🧪 Test Email System - Simple Steps

## The Error You Saw

```
Error: TypeError: Cannot read properties of undefined (reading 'postData')
```

**Why it happened:** You tried to run `handleSendEmail` directly, but it expects data from a web request (POST). When you run it manually, there's no `e.postData`.

---

## ✅ SOLUTION: Use Test Functions

I've added two test functions you can run directly in Google Apps Script:

---

## Step 1: Test Email Permissions (MOST IMPORTANT)

### In Google Apps Script:

1. **Open your script** at https://script.google.com/home
2. **Find the function dropdown** at the top (says "Select function")
3. **Select:** `testEmailPermissions`
4. **Click the Run button** (▶️ play icon)

### What Will Happen:

1. **First time:** You'll see "Authorization required"
   - Click **"Review Permissions"**
   - Choose **opencourse.uav@gmail.com**
   - Click **"Advanced"** → **"Go to UAV Course Backend (unsafe)"**
   - Click **"Allow"**

2. **After granting permissions:**
   - The function will send a test email
   - Check the **Execution log** (bottom of screen)
   - You should see: `✅ Email sent successfully!`

3. **Check your inbox:**
   - Go to **opencourse.uav@gmail.com**
   - Look for email with subject: **"Test Email - Permission Check"**
   - If you see it, **permissions are working!** ✅

---

## Step 2: Test Both Email Systems

### In Google Apps Script:

1. **Select function:** `testEmailSystem`
2. **Click Run** (▶️)

### What Will Happen:

This will send **3 test emails:**

1. **Contact form email** → opencourse.uav@gmail.com
2. **Professor question** → yan.wan@uta.edu
3. **Copy of professor question** → opencourse.uav@gmail.com

### Check Your Inbox:

Go to **opencourse.uav@gmail.com** and look for:

✅ **Email 1:** "Contact Form: Message from Test User"
✅ **Email 2:** "[Copy] Question to Dr. Yan Wan: Test Question"

Also check **yan.wan@uta.edu** for:
✅ **Email 3:** "[UAV Course Question] Test Question"

---

## Step 3: Deploy New Version

After testing successfully:

1. Click **Deploy** → **Manage deployments**
2. Click the **pencil icon** (✏️)
3. Under "Version", select **"New version"**
4. Description: "Added email test functions"
5. Click **"Deploy"**

---

## Step 4: Test from Website

### Test Landing Page Contact:
1. Go to: https://jaymehta12110.github.io/UAV-Course/
2. Scroll to Contact section
3. Fill in form and click "Send"
4. Check **opencourse.uav@gmail.com** inbox

### Test Professor Contact:
1. Go to course page
2. Scroll to instructors
3. Click "Contact" on any professor
4. Fill in form and click "Send Question"
5. Check **both** inboxes:
   - Professor's email
   - opencourse.uav@gmail.com (copy)

---

## 🎯 Expected Results

After Step 1 (testEmailPermissions):
- ✅ Permissions granted
- ✅ Test email received in opencourse.uav@gmail.com

After Step 2 (testEmailSystem):
- ✅ 2 emails in opencourse.uav@gmail.com
- ✅ 1 email in yan.wan@uta.edu

After Step 4 (website test):
- ✅ Contact form sends to opencourse.uav@gmail.com
- ✅ Professor questions send to professor + copy to opencourse.uav@gmail.com

---

## 🔍 Troubleshooting

### "Authorization required" keeps appearing
**Solution:** You need to grant permissions. Follow Step 1 carefully.

### Emails not arriving
**Check:**
1. Spam folder
2. Wait 1-2 minutes (Google Apps Script can be slow)
3. Check Execution log for errors

### "Permission denied" error
**Solution:** Make sure you're logged in as opencourse.uav@gmail.com when granting permissions.

---

## 📝 Quick Summary

1. Run `testEmailPermissions` → Grant permissions
2. Run `testEmailSystem` → Verify emails work
3. Deploy new version
4. Test from website

**Total time:** 5-10 minutes

After this, both contact forms will work perfectly! 🎉
