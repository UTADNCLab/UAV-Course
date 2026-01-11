# 🎯 Simple Guide: Hide Quiz Scores Below 80%

## ✅ What Changed:

**Only ONE function was updated:** `formatQuiz_`

### Before:
```javascript
function formatQuiz_(p) {
  return (typeof p === "number") ? `${Math.round(p)}%` : "Not taken";
}
```

### After:
```javascript
function formatQuiz_(p) {
  if (typeof p !== "number") return "Not taken";
  if (p >= 80) return `${Math.round(p)}%`;
  return "Below 80%";  // Hide actual score if below threshold
}
```

---

## 🚀 How to Deploy (3 Steps):

### Step 1: Open Google Apps Script
1. Go to your Google Sheets
2. Click **Extensions** → **Apps Script**

### Step 2: Find and Replace the Function
1. Press **Ctrl+F** (Find)
2. Search for: `function formatQuiz_`
3. You'll find this function (around line 180):
```javascript
function formatQuiz_(p) {
  return (typeof p === "number") ? `${Math.round(p)}%` : "Not taken";
}
```

4. **Replace it with:**
```javascript
function formatQuiz_(p) {
  if (typeof p !== "number") return "Not taken";
  if (p >= 80) return `${Math.round(p)}%`;
  return "Below 80%";
}
```

### Step 3: Save and Deploy
1. Click **Save** (💾 icon)
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (✏️) on your deployment
4. Change **Version** to "New version"
5. Click **Deploy**

---

## ✅ Test It:

1. Go to your course website
2. Open console (F12)
3. Run: `window.authFunctions.sendProgressUpdate('manual')`
4. Wait 10 seconds
5. Check Google Sheets "Progress" tab
6. Quiz 2 should show "Below 80%" instead of "67%"

---

## 📊 Result:

**Your Google Sheets will show:**
```
Quiz 1 Score: 100%
Quiz 2 Score: Below 80%    ← Changed!
Quiz 3 Score: 100%
Quiz 4 Score: 100%
```

---

## 📝 Alternative File:

If you want to copy the entire updated script, use:
**`backend/UPDATED-google-apps-script-hide-scores.js`**

This file has the complete script with the change already applied.

---

## ✅ That's It!

Just replace that one function and deploy. Quiz scores below 80% will be hidden!
