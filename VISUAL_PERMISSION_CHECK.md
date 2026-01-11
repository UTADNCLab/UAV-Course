# 🔍 Visual Guide: Check Permissions in Google Apps Script

## You're in the Right Place! (Project Settings)

Based on your screenshot, you're already in **Project Settings** - perfect!

---

## ✅ How to Check OAuth Scopes (Permissions)

### What You're Seeing Now:
```
┌─────────────────────────────────────────┐
│ Project Settings                        │
├─────────────────────────────────────────┤
│ Time zone: (GMT-06:00) Central Time     │
│ ☑ Log uncaught exceptions               │
│ ☑ Enable Chrome V8 runtime              │
│ ☐ Show 'appsscript.json' manifest       │
├─────────────────────────────────────────┤
│ IDs                                     │
│ Script ID: 1Q6fv5xthnXWHeH9UcMs9ZcUGL... │
├─────────────────────────────────────────┤
│ Google Cloud Platform (GCP) project     │
│ GCP: Default                            │
└─────────────────────────────────────────┘
```

### What You Need to Do:

**SCROLL DOWN** on this same page!

Below the "Script properties" section, you'll find:

```
┌─────────────────────────────────────────┐
│ OAuth Scopes                            │
├─────────────────────────────────────────┤
│ This section shows the permissions      │
│ your script has been granted            │
└─────────────────────────────────────────┘
```

---

## 🔍 What to Look For in OAuth Scopes

### If Permissions ARE Granted, You'll See:

```
┌─────────────────────────────────────────────────────┐
│ OAuth Scopes                                        │
├─────────────────────────────────────────────────────┤
│ ✅ https://www.googleapis.com/auth/script.send_mail│
│    Send email as you                                │
│                                                     │
│ ✅ https://www.googleapis.com/auth/spreadsheets    │
│    See, edit, create, and delete your spreadsheets │
└─────────────────────────────────────────────────────┘
```

**If you see these ✅ → Permissions are GRANTED! Emails will work!**

---

### If Permissions are NOT Granted, You'll See:

```
┌─────────────────────────────────────────┐
│ OAuth Scopes                            │
├─────────────────────────────────────────┤
│ No scopes have been granted yet         │
│                                         │
│ OR                                      │
│                                         │
│ (Empty section)                         │
└─────────────────────────────────────────┘
```

**If you see this ⚠️ → Need to grant permissions!**

---

## 📋 Step-by-Step: What to Do Now

### Step 1: Scroll Down
On the Project Settings page you're currently on, **scroll down** until you see "OAuth Scopes" section.

### Step 2: Check the Scopes

**Look for this specific scope:**
```
https://www.googleapis.com/auth/script.send_mail
```

### Step 3A: If You See the Email Scope ✅
**Great! Permissions are granted!**
- Your email system is ready
- Test from your website
- Both contact forms should work

### Step 3B: If You DON'T See the Email Scope ⚠️
**You need to grant permissions:**
1. Go back to the script editor (click "Editor" on left sidebar)
2. Follow the guide in `SIMPLE_PERMISSION_GRANT.md`
3. Run the `authorizeEmailSending` function
4. Grant permissions when asked

---

## 🎯 Quick Decision Tree

```
Are you in Project Settings? 
│
├─ YES (You are!) ✅
│   │
│   └─ Scroll down to "OAuth Scopes"
│       │
│       ├─ See "script.send_mail"? ✅
│       │   └─ Permissions granted! Test from website!
│       │
│       └─ Don't see it? ⚠️
│           └─ Need to grant permissions
│               └─ Follow SIMPLE_PERMISSION_GRANT.md
│
└─ NO
    └─ Click ⚙️ (gear icon) on left sidebar
```

---

## 🔐 Alternative: Check in Editor

If you can't find OAuth Scopes in Project Settings, try this:

### Method 1: Run a Function
1. Click "Editor" (</> icon) on left sidebar
2. In function dropdown, select: `authorizeEmailSending`
3. Click Run (▶️)

**What happens:**
- If permissions granted → Runs immediately ✅
- If not granted → Shows "Authorization required" popup ⚠️

### Method 2: Check Executions
1. Click "Executions" (📊 icon) on left sidebar
2. Look at recent runs
3. If you see "Authorization required" → Need to grant permissions

---

## ✅ Summary

**You're in the right place!** Just scroll down on the Project Settings page to find "OAuth Scopes".

**What you're looking for:**
```
✅ https://www.googleapis.com/auth/script.send_mail
```

**If you see it:** Permissions granted! ✅
**If you don't see it:** Follow SIMPLE_PERMISSION_GRANT.md to grant permissions ⚠️

---

## 🚀 Next Steps

### If Permissions Are Granted:
1. ✅ Test landing page contact form
2. ✅ Test professor contact buttons
3. ✅ Check opencourse.uav@gmail.com inbox
4. ✅ Done!

### If Permissions Are NOT Granted:
1. ⚠️ Open `SIMPLE_PERMISSION_GRANT.md`
2. ⚠️ Copy the complete script
3. ⚠️ Paste into Google Apps Script editor
4. ⚠️ Run `authorizeEmailSending` function
5. ⚠️ Grant permissions
6. ✅ Done!

---

**Need the complete script?** It's in `SIMPLE_PERMISSION_GRANT.md`

**Need step-by-step permission granting?** It's in `GRANT_EMAIL_PERMISSIONS.md`

**Want to understand the email flow?** It's in `EMAIL_FLOW_EXPLAINED.md`
