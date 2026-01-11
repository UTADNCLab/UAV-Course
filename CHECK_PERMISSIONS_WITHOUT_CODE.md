# 🔍 How to Check Email Permissions in Google Apps Script (Without Running Code)

## Method 1: Check Project Settings (EASIEST)

### Step 1: Open Google Apps Script
1. Go to: https://script.google.com/home
2. Click on your "UAV Course Backend" project

### Step 2: Check OAuth Scopes
1. Click on **Project Settings** (⚙️ gear icon on the left sidebar)
2. Scroll down to **"OAuth Scopes"** section
3. Look for these scopes:

**If you see these, permissions ARE granted:**
```
✅ https://www.googleapis.com/auth/script.send_mail
✅ https://www.googleapis.com/auth/spreadsheets
```

**If you DON'T see them, permissions are NOT granted yet.**

---

## Method 2: Check Execution History

### Step 1: Open Executions
1. In Google Apps Script, click **"Executions"** (📊 icon on left sidebar)
2. Look at recent executions

### Step 2: Check Status
**If you see:**
- ✅ "Completed" with no errors → Permissions granted
- ❌ "Authorization required" → Permissions NOT granted
- ❌ "Exception: Authorization is required" → Permissions NOT granted

---

## Method 3: Check Triggers

### Step 1: Open Triggers
1. Click **"Triggers"** (⏰ clock icon on left sidebar)
2. Look at any existing triggers

### Step 2: Check Authorization
**If triggers exist and are active:**
- ✅ Permissions are granted

**If you see "Authorization required" warning:**
- ❌ Permissions NOT granted

---

## Method 4: Check Deployment Settings

### Step 1: Open Deployments
1. Click **"Deploy"** → **"Manage deployments"**
2. Look at your active deployment

### Step 2: Check Access
**If deployment shows:**
- "Execute as: Me (your-email@gmail.com)" → ✅ Permissions granted
- "Who has access: Anyone" → ✅ Deployment is active

**If you see warnings or errors:**
- ❌ Permissions may not be granted

---

## 🎯 SIMPLEST WAY: Just Try to Grant Permissions

Since you're not sure if permissions are granted, the easiest way is to just run the authorization function:

### Quick Steps:
1. Open Google Apps Script
2. Select function: `authorizeEmailSending`
3. Click Run (▶️)

**What will happen:**

### If Permissions ARE Already Granted:
- ✅ Function runs immediately
- ✅ You see: "✅ Permissions granted! You can send X emails today"
- ✅ No popup appears
- ✅ You're done!

### If Permissions are NOT Granted:
- ⚠️ Popup appears: "Authorization required"
- ⚠️ You need to click "Review Permissions"
- ⚠️ Follow the steps to grant permissions
- ✅ Then you're done!

---

## 📋 Visual Guide: What to Look For

### In Project Settings:

```
┌─────────────────────────────────────────┐
│ Project Settings                        │
├─────────────────────────────────────────┤
│                                         │
│ OAuth Scopes                            │
│                                         │
│ ✅ .../auth/script.send_mail           │
│    (Send email as you)                  │
│                                         │
│ ✅ .../auth/spreadsheets               │
│    (See, edit, create, delete sheets)   │
│                                         │
└─────────────────────────────────────────┘
```

**If you see these ✅ → Permissions granted!**

---

### In Executions:

```
┌─────────────────────────────────────────┐
│ Executions                              │
├─────────────────────────────────────────┤
│ Function          Status      Time      │
├─────────────────────────────────────────┤
│ doPost           ✅ Completed  2:30 PM  │
│ handleProgress   ✅ Completed  2:25 PM  │
│ handleRegister   ✅ Completed  2:20 PM  │
└─────────────────────────────────────────┘
```

**If you see ✅ Completed → Permissions working!**

---

### In Executions (No Permissions):

```
┌─────────────────────────────────────────┐
│ Executions                              │
├─────────────────────────────────────────┤
│ Function          Status      Time      │
├─────────────────────────────────────────┤
│ testEmail        ❌ Failed     2:30 PM  │
│   Error: Authorization required         │
└─────────────────────────────────────────┘
```

**If you see ❌ Authorization required → Need to grant permissions!**

---

## 🔐 How Permissions Work in Google Apps Script

### When You First Create a Script:
- ❌ No permissions granted
- ❌ Can't send emails
- ❌ Can't access spreadsheets

### After You Run a Function That Needs Permissions:
- ⚠️ Google shows "Authorization required" popup
- ⚠️ You must click "Review Permissions"
- ⚠️ You must click "Allow"

### After You Grant Permissions:
- ✅ Permissions stored permanently
- ✅ All functions can send emails
- ✅ All functions can access spreadsheets
- ✅ No need to grant again (unless you revoke them)

---

## 🎯 Recommended Approach

Since you're asking how to check permissions, I assume you haven't granted them yet. Here's what to do:

### Option 1: Just Grant Permissions Now (RECOMMENDED)
1. Open Google Apps Script
2. Copy the script from `SIMPLE_PERMISSION_GRANT.md`
3. Paste into Google Apps Script
4. Run `authorizeEmailSending` function
5. Grant permissions when asked
6. Done! ✅

### Option 2: Check First, Then Grant
1. Open Google Apps Script
2. Click "Project Settings" (⚙️)
3. Scroll to "OAuth Scopes"
4. If you see email scopes → Already granted ✅
5. If you don't see them → Need to grant (follow Option 1)

---

## ❓ FAQ

### Q: Will granting permissions affect my existing code?
**A:** No! Granting permissions only allows the script to send emails. Your code stays the same.

### Q: Do I need to grant permissions every time?
**A:** No! Once granted, permissions stay until you revoke them.

### Q: Can I revoke permissions later?
**A:** Yes! Go to: https://myaccount.google.com/permissions
Find "UAV Course Backend" and click "Remove Access"

### Q: Is it safe to grant permissions?
**A:** Yes! You're granting permissions to YOUR OWN script. It's completely safe.

### Q: What if I see "This app isn't verified"?
**A:** That's normal for personal scripts. Click "Advanced" → "Go to UAV Course Backend (unsafe)" → "Allow"

---

## ✅ Summary

**To check permissions WITHOUT running code:**
1. Go to Project Settings → OAuth Scopes
2. Look for `script.send_mail` scope
3. If present → Permissions granted ✅
4. If not present → Need to grant permissions ⚠️

**To grant permissions:**
1. Run `authorizeEmailSending` function
2. Click "Review Permissions"
3. Click "Allow"
4. Done! ✅

**After granting permissions:**
- ✅ All email functions work
- ✅ Website contact forms work
- ✅ Professor emails work
- ✅ No more errors!

---

**Need help?** Follow the complete guide in `SIMPLE_PERMISSION_GRANT.md`
