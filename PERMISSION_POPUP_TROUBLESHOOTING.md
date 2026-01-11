# 🔴 Permission Popup Not Appearing? Here's How to Fix It

## Issue: When you click Run, you see the error log but NO popup

## ✅ Solution 1: Check for Popup Blocker

### The popup might be blocked! Look for:

**Top Right Corner of Browser:**
- Look for a popup blocker icon (🚫 or blocked popup symbol)
- Click it and select "Always allow popups from script.google.com"
- Click Run again

**OR**

**Address Bar:**
- Look for a small icon next to the URL
- It might say "Popup blocked"
- Click it and allow popups

---

## ✅ Solution 2: Use the Authorization Link Directly

If popup doesn't appear, Google Apps Script shows a link in the execution log:

### Look in the Execution Log for:
```
Authorization is required to perform that action.
```

**There should be a BLUE LINK that says:**
- "Review Permissions" or
- "Authorize" or
- A URL link

**Click that link!** It will open the permission dialog.

---

## ✅ Solution 3: Manual Authorization

### Step-by-Step:

1. **In Apps Script Editor:**
   - Click the ⚙️ **Settings** icon (left sidebar)
   - OR click **Project Settings** (left menu)

2. **Scroll down to "OAuth Scopes"**
   - You should see: `https://www.googleapis.com/auth/script.send_mail`

3. **Go back to Editor**
   - Click **< > Editor** (left sidebar)

4. **Try Running Again:**
   - Select `testEmailPermissions`
   - Click Run
   - **This time, look CAREFULLY for:**
     - A popup window (might be behind other windows)
     - A notification at top of browser
     - A link in the execution log

---

## ✅ Solution 4: Check Browser Permissions

### Chrome/Edge:
1. Click the 🔒 lock icon in address bar
2. Find "Popups and redirects"
3. Set to "Allow"
4. Refresh page and try again

### Firefox:
1. Click the shield icon in address bar
2. Turn off "Enhanced Tracking Protection" for this site
3. Try again

---

## ✅ Solution 5: Alternative Method

If nothing works, try this:

1. **Create a NEW function** in your Apps Script:
```javascript
function forceAuthorization() {
  MailApp.sendEmail('opencourse.uav@gmail.com', 'Test', 'Testing permissions');
}
```

2. **Select this NEW function** from dropdown
3. **Click Run**
4. **The authorization popup MUST appear** for new functions

---

## 🎯 What the Popup Should Look Like:

When it appears, you'll see:

1. **"Authorization required"** - Click "Review Permissions"
2. **Choose account** - Select opencourse.uav@gmail.com
3. **"Google hasn't verified this app"** - Click "Advanced"
4. **"Go to [Your Project Name] (unsafe)"** - Click this
5. **Permissions list** - Click "Allow"

---

## 📧 Alternative: Use Gmail API Instead

If MailApp permissions are too difficult, we can switch to Gmail API:

1. In Apps Script, go to Services (+ icon)
2. Add "Gmail API"
3. Use Gmail API instead of MailApp

Let me know if you want me to update the code for this!

---

## 🆘 Still Not Working?

Try these:

1. **Log out and log back in** to Google
2. **Use Incognito/Private window**
3. **Try a different browser**
4. **Clear browser cache**
5. **Check if you're logged in as opencourse.uav@gmail.com** (not another account)

---

## ⚡ Quick Check:

**Are you logged in as the correct account?**
- Top right of Apps Script - should show opencourse.uav@gmail.com
- If it shows a different email, switch accounts!

This is the #1 reason permissions fail!
