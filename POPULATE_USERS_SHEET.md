# 🔧 How to Populate Your Users Sheet

## Problem
Your Users sheet is empty because:
1. Your 2 existing users (28jaymehta@gmail.com and another) were registered before the Users sheet was created
2. Their data is in the Progress sheet, but the backend looks in the Users sheet for login
3. Cross-device login fails because the Users sheet is empty

## Solution: Manual Data Entry (Easiest & Fastest)

### Step 1: Open Your Google Sheet
Go to: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc

### Step 2: Click on the "Users" Tab
You should see these column headers:
- First Name
- Last Name  
- Email
- Password Hash
- Registered At

### Step 3: Add Your User Data Manually

For **28jaymehta@gmail.com**:
1. Click on cell A2 (First Name column, row 2)
2. Enter your first name (e.g., "Jay")
3. Press Tab, enter your last name (e.g., "Mehta")
4. Press Tab, enter email: **28jaymehta@gmail.com** (must be lowercase!)
5. Press Tab, enter password hash: You need to calculate this

### Step 4: Calculate Password Hash

**Option A: Use Browser Console**
1. On your website (index.html), press F12 to open Developer Tools
2. Go to the "Console" tab
3. Type this command (replace 'yourpassword' with your actual password):
```javascript
let hash = 0;
const password = 'yourpassword';
for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
}
console.log(hash.toString(36));
```
4. Press Enter
5. Copy the result (it will look something like: "1a2b3c4d")
6. Paste this into the Password Hash column in your Users sheet

**Option B: Register Again with Same Email**
1. Clear your browser's localStorage (F12 → Application → Local Storage → Clear)
2. Go to your website and register again with the same email
3. The system will now save to the Users sheet automatically

### Step 5: Add Registered At Date
In the "Registered At" column, enter today's date in ISO format:
- Example: `2024-01-15T10:30:00.000Z`
- Or just enter: `2024-01-15`

### Step 6: Repeat for Other Users
If you have other users, repeat steps 3-5 for each one.

---

## Alternative: Use the Migration Tool

If you have many users or want an automated solution:

### Step 1: Open sync-users.html
1. Navigate to: `c:/Users/2810j/OneDrive/Desktop/course`
2. Double-click `sync-users.html`

### Step 2: Click "Sync Users"
- The tool will find users in localStorage
- Click the green button to sync them to Google Sheets

**Note:** This only works for users stored in your browser's localStorage on your computer.

---

## Quick Fix for Your Specific Case

Since you mentioned you have **28jaymehta@gmail.com**, here's the fastest solution:

### On Your Computer:
1. Open `index.html` in your browser
2. Click "Register" 
3. Fill in:
   - First Name: Jay
   - Last Name: Mehta
   - Email: **28jaymehta@gmail.com** (lowercase!)
   - Password: (your password)
4. Click Register

This will:
- ✅ Save to localStorage (for this device)
- ✅ Save to Google Sheets Users tab (for cross-device login)
- ✅ Allow you to login from your phone

### On Your Phone:
1. Go to your website
2. Login with: **28jaymehta@gmail.com** (lowercase!)
3. Enter your password
4. It will now work! ✅

---

## Verification

After adding users to the Users sheet:

1. **Check the Sheet:**
   - Open your Google Sheet
   - Go to Users tab
   - You should see rows with user data

2. **Test Login:**
   - Clear browser cache/localStorage
   - Go to your website
   - Try logging in
   - Should work now!

3. **Test Cross-Device:**
   - Open website on your phone
   - Login with same email
   - Should work!

---

## Important Notes

✅ **Email MUST be lowercase** - The system converts all emails to lowercase
✅ **Password Hash** - Must match the hash of your actual password
✅ **Users Sheet** - Must have the correct column headers
✅ **Backend Script** - Must be deployed and URL must match in auth.js

---

## Still Having Issues?

If cross-device login still doesn't work:

1. **Check Backend Script:**
   - Open Google Apps Script
   - Make sure the script is deployed as a web app
   - URL should match the one in `js/auth.js`

2. **Check Console Logs:**
   - Press F12 on your website
   - Go to Console tab
   - Look for any error messages when logging in

3. **Verify Email Format:**
   - Make sure email in Users sheet is lowercase
   - No extra spaces before or after

4. **Test with New Registration:**
   - Register a completely new user
   - Check if it appears in Users sheet
   - Try logging in from another device
