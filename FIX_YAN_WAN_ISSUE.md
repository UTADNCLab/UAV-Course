# 🔧 Fix: Yan Wan in Progress but Not in Users Sheet

## 📋 The Problem:

**Yan Wan** (and possibly others) appear in the **"Progress"** sheet but NOT in the **"Users"** sheet.

**Why?** They were added to the system BEFORE the new registration system was implemented.

**Result:** They can't login because they don't have accounts in the Users sheet!

---

## ✅ The Solution:

I've created a migration tool that will:
1. Find all users in "Progress" sheet
2. Check if they exist in "Users" sheet
3. Create accounts for missing users
4. Set a temporary password you choose

---

## 🚀 How to Fix It:

### **Step 1: Deploy Updated Backend**

1. Open Google Apps Script: https://script.google.com/home/projects/1sFmXxqJLqNqQxJxQxQxQxQxQxQxQxQxQxQxQxQxQxQ

2. Replace ALL the code with the contents of `backend/google-apps-script.js`

3. Click **Deploy** → **Manage deployments**

4. Click ✏️ **Edit** on your existing deployment

5. Change **Version** to "New version"

6. Click **Deploy**

7. Copy the new Web App URL (should be the same as before)

---

### **Step 2: Use Migration Tool**

1. Open the migration tool:
   ```
   migrate-existing-users-to-users-sheet.html
   ```
   (Double-click to open in browser, or open from GitHub Pages after pushing)

2. Enter a **temporary password** (e.g., "TempPass2024!")

3. Click **"🔄 Migrate Users"**

4. Wait for confirmation

---

### **Step 3: Verify**

1. Open your Google Spreadsheet

2. Click the **"Users"** tab

3. Check if **Yan Wan** now appears there with:
   - First Name: Yan
   - Last Name: Wan
   - Email: yan.wan@uta.edu
   - Password Hash: [generated hash]
   - Registered At: [current date]

---

### **Step 4: Notify Users**

Tell Yan Wan (and any other migrated users):

**Email Template:**
```
Hi Yan,

Your account has been set up in our UAV Course system!

Login Details:
- Website: https://jaymehta12110.github.io/UAV-Course/
- Email: yan.wan@uta.edu
- Temporary Password: TempPass2024!

Please login and change your password immediately.

Best regards,
Course Admin
```

---

## 📊 What Gets Migrated:

**From Progress Sheet:**
- First Name
- Last Name
- Email

**Added to Users Sheet:**
- First Name (from Progress)
- Last Name (from Progress)
- Email (from Progress)
- Password Hash (from your temporary password)
- Registered At (current date/time)

---

## ⚠️ Important Notes:

1. **Users already in Users sheet are skipped** (no duplicates)

2. **The temporary password is the same for all migrated users**
   - Make sure to tell them to change it!

3. **Progress data is NOT affected**
   - Their quiz scores, completion %, etc. remain unchanged

4. **After migration, users can login normally**
   - They use their email and the temporary password
   - Then they can change their password

---

## 🔍 Who Will Be Migrated?

Based on your screenshots, these users will likely be migrated:

1. **Yan Wan** (yan.wan@uta.edu)
   - Currently in Progress: YES
   - Currently in Users: NO
   - Will be migrated: ✅ YES

2. **James will** (28jaymehta@gmail.com)
   - Currently in Progress: YES
   - Currently in Users: YES (already registered)
   - Will be migrated: ❌ NO (skipped - already exists)

3. **James Luiz** (2810jaymehta@gmail.com)
   - Currently in Progress: NO (hasn't started course yet)
   - Currently in Users: YES (just registered)
   - Will be migrated: ❌ NO (already exists)

---

## 🎯 Expected Result:

**Before Migration:**
- Users sheet: 2 users (James will, James Luiz)
- Progress sheet: 3 users (Yan Wan, James will, James Luiz)

**After Migration:**
- Users sheet: 3 users (Yan Wan ✨, James will, James Luiz)
- Progress sheet: 3 users (unchanged)

**Now Yan Wan can login!** ✅

---

## 🆘 Troubleshooting:

### Problem: Migration tool doesn't work
**Solution:** Make sure you deployed the updated backend script first!

### Problem: User still can't login
**Solution:** 
1. Check if they're using the correct temporary password
2. Verify they appear in the Users sheet
3. Check browser console for errors

### Problem: Want to change someone's password
**Solution:** Use the admin password reset tool:
```
admin-password-reset.html
```

---

## 📝 Summary:

1. ✅ Deploy updated backend (adds migration function)
2. ✅ Open migration tool
3. ✅ Enter temporary password
4. ✅ Click migrate
5. ✅ Verify Yan Wan appears in Users sheet
6. ✅ Tell Yan Wan the temporary password
7. ✅ Done!

**Yan Wan can now login and use the course!** 🎉
