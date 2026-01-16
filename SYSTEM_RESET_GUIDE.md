# 🔄 Complete System Reset Guide

## Quick Reset Instructions

### 1. Clear All User Data from Backend (Google Sheets)

**Steps:**
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc
2. Go to **"Users"** tab
3. Select all rows with data (except header row)
4. Right-click → Delete rows
5. Go to **"Progress"** tab
6. Select all rows with data (except header row)
7. Right-click → Delete rows

**Result:** Backend is now clean ✅

---

### 2. Clear Browser Cache & Local Storage

**For Users to Reset Their Login:**

**Chrome/Edge:**
```
1. Press F12 (open DevTools)
2. Go to "Application" tab
3. Click "Local Storage" → Your site URL
4. Right-click → Clear
5. Close DevTools
6. Press Ctrl+Shift+Delete
7. Select "Cached images and files"
8. Click "Clear data"
9. Refresh page (F5)
```

**Firefox:**
```
1. Press F12 (open DevTools)
2. Go to "Storage" tab
3. Click "Local Storage" → Your site URL
4. Right-click → "Delete All"
5. Close DevTools
6. Press Ctrl+Shift+Delete
7. Select "Cache"
8. Click "Clear Now"
9. Refresh page (F5)
```

**Quick Method (All Browsers):**
```
1. Open your course website
2. Press F12
3. In Console, paste this:
   localStorage.clear();
   location.reload();
4. Press Enter
```

**Result:** User will need to login again ✅

---

### 3. Reset Password for Existing User

**Option A: Admin Tool (Recommended)**
1. Open: `admin-password-reset.html`
2. Enter user email
3. Enter new password
4. Click "Reset Password"
5. User can now login with new password

**Option B: Manual (Google Sheets)**
1. Open Google Sheet
2. Go to "Users" tab
3. Find user's row
4. Delete the entire row
5. User must register again

---

### 4. Keep System Running with Same Address

**After Backend Reset:**

✅ **Website URL stays the same**
- https://jaymehta12110.github.io/UAV-Course/
- OR your custom domain (if configured)

✅ **Backend stays connected**
- Google Sheets URL: Same
- Web App URL: Same
- No code changes needed

✅ **Users can register again**
- Same email addresses can be used
- Fresh start with 0% progress
- All quiz scores reset

❌ **No auto-login**
- Users must login manually
- No saved sessions
- Clean slate

---

### 5. Complete Fresh Start Checklist

**Backend (Google Sheets):**
- [ ] Clear "Users" tab
- [ ] Clear "Progress" tab
- [ ] Keep "Professors" tab (optional)

**User Browsers:**
- [ ] Clear localStorage
- [ ] Clear cache
- [ ] Close all tabs
- [ ] Reopen website

**Result:**
- [ ] Users see login screen
- [ ] No auto-login
- [ ] Can register with same emails
- [ ] 0% progress for everyone
- [ ] Fresh quiz attempts

---

### 6. Prevent Auto-Login After Reset

**Already Built-In:**
The system checks localStorage for `uav_course_current_user`. When cleared:
- ✅ No auto-login
- ✅ Shows login modal
- ✅ Requires manual login
- ✅ Fresh session

**To Force Logout All Users:**
1. Change the localStorage key name in code
2. Deploy the change
3. All users will be logged out automatically

---

### 7. Migration from Old System

**If you had old data:**

**Step 1: Export Old Data**
```javascript
// Run in browser console on old system
const oldData = {
    users: localStorage.getItem('uav_course_users'),
    progress: localStorage.getItem('uav_course_progress'),
    scores: localStorage.getItem('uav_course_quiz_scores')
};
console.log(JSON.stringify(oldData));
// Copy the output
```

**Step 2: Use Migration Tool**
1. Open: `migrate-existing-users-to-users-sheet.html`
2. Paste old data
3. Click "Migrate"
4. Data moves to Google Sheets

**Step 3: Users Clear Cache**
- Users clear localStorage
- Login with existing credentials
- Progress restored from backend

---

### 8. Quick Commands

**Clear Everything (Run in Browser Console):**
```javascript
// Clear all course data
localStorage.removeItem('uav_course_current_user');
localStorage.removeItem('uav_course_users');
localStorage.removeItem('uav_course_progress');
localStorage.removeItem('uav_course_quiz_scores');
localStorage.removeItem('uav_course_total_modules');

// Clear all user-specific data
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('uav_course_')) {
        localStorage.removeItem(key);
    }
});

// Reload page
location.reload();
```

**Check Current User:**
```javascript
const user = JSON.parse(localStorage.getItem('uav_course_current_user'));
console.log('Current user:', user);
```

**Force Logout:**
```javascript
localStorage.removeItem('uav_course_current_user');
location.reload();
```

---

### 9. System Architecture

**Data Storage:**
```
Frontend (Browser):
├── localStorage (temporary cache)
│   ├── uav_course_current_user (session)
│   ├── uav_course_progress_{email} (cache)
│   └── uav_course_quiz_scores_{email} (cache)
│
Backend (Google Sheets):
├── Users tab (permanent)
├── Progress tab (permanent)
└── Source of truth ✅
```

**Data Flow:**
```
1. User logs in → Checks Google Sheets
2. Data cached in localStorage
3. User makes progress → Saves to both
4. Clear cache → Data still in Sheets ✅
5. Login again → Data restored from Sheets
```

---

### 10. Troubleshooting

**Problem: User can't login after reset**
- Solution: Clear browser cache completely
- Solution: Try incognito/private mode
- Solution: Check Google Sheets has user data

**Problem: Progress not saving**
- Solution: Check Web App URL is correct
- Solution: Check Google Sheets permissions
- Solution: Check browser console for errors

**Problem: Auto-login still happening**
- Solution: Clear localStorage manually
- Solution: Use incognito mode
- Solution: Check `uav_course_current_user` key

---

## Summary

**To Reset Everything:**
1. Clear Google Sheets (Users + Progress tabs)
2. Users clear browser cache/localStorage
3. Users register again
4. Fresh start! 🎉

**System Stays:**
- ✅ Same website URL
- ✅ Same backend connection
- ✅ Same functionality
- ✅ No code changes needed

**Users Get:**
- ❌ No auto-login
- ✅ Must login manually
- ✅ Can use same email
- ✅ Fresh progress (0%)
