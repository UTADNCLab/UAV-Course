# 🔒 Hide Quiz Scores Below 80% in Google Sheets

## ✅ What Was Changed:

The backend script now hides the actual quiz scores if they're below 80%. Instead of showing "67%", it will show "Below 80%".

---

## 📊 How It Works Now:

### Before (Old Behavior):
```
Quiz 1 Score: 100%
Quiz 2 Score: 67%    ← Shows actual score
Quiz 3 Score: 100%
Quiz 4 Score: 100%
```

### After (New Behavior):
```
Quiz 1 Score: 100%
Quiz 2 Score: Below 80%    ← Hides actual score
Quiz 3 Score: 100%
Quiz 4 Score: 100%
```

---

## 🔧 Technical Details:

### Code Change:
```javascript
// OLD CODE:
const formatScore = (score) => score !== null ? `${score}%` : 'Not taken';

// NEW CODE:
const formatScore = (score) => {
  if (score === null) return 'Not taken';
  if (score >= 80) return `${score}%`;      // Show score if 80%+
  return 'Below 80%';                        // Hide score if below 80%
};
```

### Logic:
1. **Not taken** → Shows "Not taken"
2. **Score ≥ 80%** → Shows actual percentage (e.g., "100%", "85%")
3. **Score < 80%** → Shows "Below 80%" (hides actual score)

---

## 📋 What Shows in Google Sheets:

### Quiz Score Columns:
- **100%** → Passing score, shows actual percentage ✅
- **85%** → Passing score, shows actual percentage ✅
- **Below 80%** → Failing score, actual percentage hidden ❌
- **Not taken** → Quiz not attempted yet ⏳

### Average Quiz Score:
- Still calculates using actual scores
- Shows the real average (not affected by hiding)

### Certificates Eligible:
- Only lists modules with 80%+ quiz scores
- Modules with "Below 80%" won't be listed

---

## 🚀 How to Deploy This Change:

### Step 1: Copy the Updated Script

1. Open your Google Sheets
2. Go to **Extensions** → **Apps Script**
3. You'll see your current script

### Step 2: Update the Code

Find this line (around line 267):
```javascript
const formatScore = (score) => score !== null ? `${score}%` : 'Not taken';
```

Replace it with:
```javascript
const formatScore = (score) => {
  if (score === null) return 'Not taken';
  if (score >= 80) return `${score}%`;
  return 'Below 80%';
};
```

### Step 3: Save and Deploy

1. Click **Save** (💾 icon)
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (✏️ icon) on your current deployment
4. Change **Version** to "New version"
5. Click **Deploy**
6. Copy the new Web App URL (if it changed)

### Step 4: Test

1. Go to your course website
2. Complete a module or wait 5 minutes
3. Check Google Sheets "Progress" tab
4. Quiz scores below 80% should now show "Below 80%"

---

## 📸 Expected Result:

### Your Current Data Will Show:
```
Full Name: James Luiz
Email: 2810jaymehta@gmail.com
Completion %: 88%
Modules: 7/8
Average Quiz Score: 91.8%  (still shows real average)
Quiz 1 Score: 100%
Quiz 2 Score: Below 80%    ← Changed from "67%"
Quiz 3 Score: 100%
Quiz 4 Score: 100%
Quiz Attempts: 4
Certificates: Module 1, 3, 4
```

---

## 🎯 Benefits:

1. **Privacy** - Students can't see exact failing scores
2. **Motivation** - Focuses on passing threshold (80%)
3. **Clarity** - Clear distinction between pass/fail
4. **Consistency** - Matches frontend behavior (no checkmark below 80%)

---

## ⚠️ Important Notes:

### What's Hidden:
- ❌ Exact quiz scores below 80% (e.g., "67%", "75%")

### What's Still Visible:
- ✅ Scores 80% and above (e.g., "100%", "85%")
- ✅ Average quiz score (calculated from actual scores)
- ✅ Completion percentage
- ✅ Modules completed
- ✅ Certificate eligibility

### Why Average Still Shows Real Number:
The average is calculated from actual scores before formatting, so it shows the true average (e.g., 91.8%) even if some individual scores are hidden.

---

## 🔄 Alternative Options:

If you want different behavior, you can modify the `formatScore` function:

### Option 1: Show "Failed" instead:
```javascript
return 'Failed';
```

### Option 2: Show nothing (blank):
```javascript
return '';
```

### Option 3: Show "Needs Retake":
```javascript
return 'Needs Retake';
```

### Option 4: Show range:
```javascript
return '< 80%';
```

---

## ✅ Deployment Checklist:

- [ ] Open Google Apps Script
- [ ] Find `formatScore` function
- [ ] Update the code
- [ ] Save the script
- [ ] Deploy new version
- [ ] Test with a progress update
- [ ] Verify in Google Sheets
- [ ] Confirm scores below 80% show "Below 80%"

---

## 🎉 Done!

After deploying this change, all quiz scores below 80% will show as "Below 80%" in your Google Sheets, while scores 80% and above will show the actual percentage.

This matches the frontend behavior where only quizzes with 80%+ get a checkmark!
