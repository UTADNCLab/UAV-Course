# Sync Existing Users to Google Sheets

## Understanding the Issue

If users registered **before** the backend was properly configured, their data might be:
- ✅ Stored in **localStorage** (on their browser)
- ❌ **NOT** in Google Sheets

## How to Check for Existing Users

### Option 1: Check Browser Console
1. Open `index.html` in your browser
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Type this command and press Enter:
```javascript
console.log(JSON.parse(localStorage.getItem('uav_course_users') || '{}'))
```

This will show you all users stored locally.

### Option 2: Check Application Storage
1. Open `index.html` in your browser
2. Press `F12` to open Developer Tools
3. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
4. Click **Local Storage** → `file://`
5. Look for key: `uav_course_users`
6. You'll see all registered users

## How to Sync Existing Users to Google Sheets

If you find existing users in localStorage, you have 2 options:

### Option A: Automatic Sync (Recommended)
I can create a script that will:
1. Read all users from localStorage
2. Send them to Google Sheets automatically
3. Update the Users sheet with all existing data

### Option B: Manual Re-registration
Each user can:
1. Clear their browser data
2. Register again through the website
3. Data will be sent to Google Sheets

## Do You Have Existing Users?

**Question for you:** 
- Did anyone register on your website before today?
- If yes, how many users approximately?

Let me know and I can create a migration script to sync them all to Google Sheets!
