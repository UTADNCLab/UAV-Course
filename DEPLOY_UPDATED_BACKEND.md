# 🚀 Deploy Updated Backend Script

## What's New:
The backend now:
1. ✅ **Prevents duplicate registrations** - checks if email exists in Users OR Progress sheet
2. ✅ **Copies names from Progress sheet** - if email exists in Progress, uses those First Name and Last Name
3. ✅ **Shows clear error message** - "Email already registered. Please login instead."

---

## 📋 Deployment Steps:

### Step 1: Open Google Apps Script
1. Go to: https://script.google.com/home
2. Find your project: **UAV Course Data**
3. Click to open it

### Step 2: Replace the Code
1. Click on **Code.gs** file
2. **Select ALL** the existing code (Ctrl+A)
3. **Delete** it
4. **Copy** the entire content from: `backend/google-apps-script.js`
5. **Paste** into Code.gs
6. Click **Save** (💾 icon or Ctrl+S)

### Step 3: Deploy New Version
1. Click **Deploy** → **Manage deployments**
2. Click the **✏️ Edit** icon (pencil) next to your active deployment
3. Under "Version", click **New version**
4. Add description: "Prevent duplicate registrations + copy names from Progress"
5. Click **Deploy**
6. Copy the new Web App URL (should be the same)

### Step 4: Test
1. Try registering with `28jaymehta@gmail.com` again
2. You should see: **"Email already registered. Please login instead."**
3. This means it's working! ✅

---

## 🎯 How It Works Now:

### Scenario 1: Email exists in Progress sheet
```
User tries to register: 28jaymehta@gmail.com
Backend checks Progress sheet → FOUND!
Backend copies: First Name = "Jay", Last Name = "Mehta"
Backend adds to Users sheet with those names
Result: User registered with correct names from Progress! ✅
```

### Scenario 2: Email already in Users sheet
```
User tries to register: 28jaymehta@gmail.com
Backend checks Users sheet → FOUND!
Backend returns error: "Email already registered. Please login instead."
Result: No duplicate created! ✅
```

### Scenario 3: New user (not in Progress or Users)
```
User tries to register: newuser@gmail.com
Backend checks both sheets → NOT FOUND
Backend uses provided First Name and Last Name from registration form
Backend adds to Users sheet
Result: New user registered! ✅
```

---

## ✨ Benefits:

1. **No more duplicates** - System prevents re-registration
2. **Correct names** - Automatically copies from Progress sheet
3. **Better UX** - Clear error messages guide users
4. **Data integrity** - One source of truth for names

---

## 🔧 Troubleshooting:

### If you get "Email already registered" but can't login:
- The email might be in Progress but not Users
- Use the migration tool to add it to Users sheet
- Then login will work

### If names are still wrong:
- Check the Progress sheet - make sure First Name and Last Name columns are correct there
- The backend copies exactly what's in Progress
- Update Progress sheet first, then re-register

---

## 📝 Summary:

After deploying this update:
- ✅ No duplicate registrations possible
- ✅ Names automatically copied from Progress sheet
- ✅ Clear error messages for users
- ✅ Better data management

Deploy this update to your Google Apps Script and test it!
