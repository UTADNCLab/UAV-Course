# 🧹 Clean Start Guide - Remove Everything & Start Fresh

## 📋 What Gets Deleted:

### In Google Sheets:
- ✅ All entries in **Users** sheet
- ✅ All entries in **Progress** sheet
- ⚠️ Headers will remain (First Name, Last Name, Email, etc.)

### In Browser (Your Computer):
- ✅ All localStorage data (saved login, progress, quiz scores)
- ✅ Cached user data

### Result:
- ✅ Like a brand new installation
- ✅ Can register again with correct names
- ✅ All progress starts from 0%

---

## 🚀 OPTION 1: Clean Google Sheets Only (Recommended)

### Step 1: Clean Users Sheet
1. Open: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc
2. Click on **Users** tab
3. Select row 2 (first data row after header)
4. Hold Shift and click the last row with data
5. Right-click → **Delete rows**
6. **Keep row 1 (headers)!**

Result: Users sheet is empty, ready for fresh registrations ✅

### Step 2: Clean Progress Sheet (Optional)
1. Click on **Progress** tab
2. Select row 2 (first data row after header)
3. Hold Shift and click the last row with data
4. Right-click → **Delete rows**
5. **Keep row 1 (headers)!**

Result: Progress sheet is empty, all course progress reset ✅

### Step 3: Clear Browser Data
1. Open your website
2. Press **F12** (opens Developer Tools)
3. Go to **Console** tab
4. Type this and press Enter:
```javascript
localStorage.clear();
location.reload();
```

Result: All saved data cleared from browser ✅

---

## 🔥 OPTION 2: Complete Reset (Nuclear Option)

This uses the built-in reset function in your backend.

### Step 1: Run Reset Function
1. Go to: https://script.google.com/home
2. Open: **UAV Course Data** project
3. At the top, find the function dropdown (says "doPost")
4. Change it to: **RESET_SHEETS_ONE_TIME**
5. Click **Run** (▶️ button)
6. Authorize if asked
7. Wait for "Execution completed"

Result: Both Users and Progress sheets completely wiped and recreated with fresh headers ✅

### Step 2: Clear Browser Data
Same as Option 1, Step 3 above.

---

## ✅ After Cleaning - Fresh Start:

### What You Can Do Now:

**1. Register with Correct Names:**
```
1. Go to your website
2. Click Register
3. Enter:
   - First Name: Jay
   - Last Name: Mehta
   - Email: 28jaymehta@gmail.com
   - Password: (your password)
4. Click Register
5. Check Users sheet - should show "Jay" and "Mehta" ✅
```

**2. Progress Tracking:**
```
- Start course from Module 1
- Take quizzes
- Progress will be saved to Progress sheet
- Names will match Users sheet ✅
```

---

## 🎯 Understanding the System:

### Users Sheet:
- **Purpose:** Login credentials
- **When data is added:** When you register
- **If you delete:** Can't login anymore (need to register again)

### Progress Sheet:
- **Purpose:** Course progress, quiz scores
- **When data is added:** When you watch videos, take quizzes
- **If you delete:** Progress resets to 0%, but can still login

### Browser localStorage:
- **Purpose:** Remember login, cache progress
- **When data is added:** When you login, take quizzes
- **If you delete:** Need to login again, but data still in Google Sheets

---

## 💡 Recommended Approach:

### If Names Are Wrong in Users Sheet:
```
1. Delete rows in Users sheet (keep headers)
2. Clear browser localStorage
3. Deploy updated backend (if not done yet)
4. Register again
5. Backend will copy correct names from Progress (if exists)
   OR use names you enter in registration form
```

### If You Want Complete Fresh Start:
```
1. Delete rows in BOTH Users and Progress sheets
2. Clear browser localStorage
3. Register with correct First Name and Last Name
4. Start course from beginning
5. Everything will be tracked correctly ✅
```

---

## ⚠️ Important Notes:

1. **Always keep row 1 (headers)** - Don't delete the header row!
2. **Clear browser data** - Otherwise old data stays cached
3. **Deploy backend first** - So new registrations work correctly
4. **Backup if needed** - Copy data to another sheet before deleting

---

## 🎊 Summary:

**YES, you can delete everything and start fresh!**

**Easiest method:**
1. Delete rows 2+ in Users sheet (keep headers)
2. Clear browser localStorage (F12 → Console → `localStorage.clear()`)
3. Register again with correct names
4. Done! ✅

**Your registration will NOT disappear if you delete from spreadsheet** - you'll just need to register again (which is what you want for a fresh start with correct names).
