# 🚀 Quick Deploy Instructions - Google Apps Script

## Your Google Sheet is Empty Because:
The Google Apps Script backend needs to be deployed to receive data from your course registration.

---

## ⚡ Quick 5-Minute Setup:

### Step 1: Open Apps Script Editor
1. In your Google Sheet (the one you just showed me)
2. Click **Extensions** (top menu)
3. Click **Apps Script**
4. A new tab will open with the Apps Script editor

### Step 2: Copy & Paste the Code
1. In the Apps Script editor, you'll see some default code
2. **DELETE ALL** the existing code
3. Open the file `backend/google-apps-script.js` from your project folder
4. **COPY ALL** the code from that file (it already has your Spreadsheet ID configured)
5. **PASTE** it into the Apps Script editor
6. Click the **Save** icon (💾) or press `Ctrl + S`
7. Name the project: **UAV Course Backend**

### Step 3: Deploy as Web App
1. Click **Deploy** button (top right)
2. Select **New deployment**
3. Click the **gear icon** ⚙️ next to "Select type"
4. Choose **Web app**
5. Configure the deployment:
   - **Description:** UAV Course Backend
   - **Execute as:** Me (your-email@gmail.com)
   - **Who has access:** **Anyone** ⚠️ (This is important!)
6. Click **Deploy**

### Step 4: Authorize the Script
1. A popup will appear asking for authorization
2. Click **Authorize access**
3. Choose your Google account
4. You'll see a warning "Google hasn't verified this app"
5. Click **Advanced**
6. Click **Go to UAV Course Backend (unsafe)**
7. Click **Allow**

### Step 5: Verify Deployment
1. After authorization, you'll see a success message
2. You'll see a **Web App URL** like:
   ```
   https://script.google.com/macros/s/SOME_LONG_ID/exec
   ```
3. **IMPORTANT:** Check if this URL matches the one in your `js/auth.js` file:
   ```
   Expected: https://script.google.com/macros/s/AKfycbwac7C1hTJQ1sJA0ykd9SFg7Q0FMcBIbYgUEacqwmkRn2vzKyCJEwlhOy6MiQqP9J49/exec

   https://script.google.com/macros/s/AKfycbzs7oApM-gF5Eb_AaGHPxaFSeyzXhfcuGPWLzyOyEalyXKgiVkHkPqXwZASGjmOGe8w/exec
   ```
4. If they match, you're good! If not, let me know and I'll update the auth.js file.

### Step 6: Test the Setup
1. Click **Copy** to copy the Web App URL
2. Open a new browser tab
3. Paste the URL and press Enter
4. You should see: `{"status":"success","message":"UAV Course Backend is running!"}`
5. If you see this, the backend is working! ✅

---

## 🧪 Now Test Your Registration:

### Option A: Register Again (Recommended)
1. Go back to: http://localhost:8000/index.html
2. Open browser console (F12)
3. Clear localStorage: Type `localStorage.clear()` and press Enter
4. Refresh the page (F5)
5. Click **Login / Register**
6. Click **Register here**
7. Fill in your details
8. Click **Register**

### Option B: Check Existing Registration
1. Go back to your Google Sheet
2. Wait 10-15 seconds
3. Press F5 to refresh
4. Look for these tabs at the bottom:
   - **Users** (should appear automatically)
   - **Progress**
   - **Activity Log**

---

## ✅ What You Should See After Successful Setup:

### In Google Sheet - "Users" Tab:
| Name | Email | Registered Date | Last Login | Status |
|------|-------|----------------|------------|--------|
| Your Name | your@email.com | 2024-01-XX... | 2024-01-XX... | Active |

### In Google Sheet - "Progress" Tab:
| Email | Name | Event Type | Completion % | ... |
|-------|------|------------|--------------|-----|
| your@email.com | Your Name | register | 0% | ... |

### In Google Sheet - "Activity Log" Tab:
| Timestamp | Email | Name | Event Type | ... |
|-----------|-------|------|------------|-----|
| 2024-01-XX... | your@email.com | Your Name | register | ... |

---

## 🆘 Troubleshooting:

### Problem 1: "Authorization Required" Error
**Solution:** You need to complete Step 4 (Authorize the Script) above.

### Problem 2: Still No Data in Sheet
**Check these:**
1. ✅ Apps Script is deployed with "Who has access" = **Anyone**
2. ✅ Web App URL in `js/auth.js` matches the deployed URL
3. ✅ You're accessing the course via `http://localhost:8000` (not `file:///`)
4. ✅ Browser console (F12) shows no red errors

### Problem 3: Different Web App URL
If the deployed URL is different from what's in `js/auth.js`:
1. Copy the new Web App URL
2. Let me know, and I'll update the `js/auth.js` file with the correct URL

### Problem 4: "Script function not found: doPost"
**Solution:** Make sure you copied ALL the code from `backend/google-apps-script.js` including the `doPost` function.

---

## 📞 Need Help?

If you're stuck, share:
1. Screenshot of the Apps Script deployment screen
2. Screenshot of browser console (F12) when you try to register
3. The Web App URL you got after deployment

---

**Once deployed, your course will automatically:**
- ✅ Save all user registrations
- ✅ Track course progress in real-time
- ✅ Record quiz scores
- ✅ Log all student activities
- ✅ Calculate completion percentages

**Let's get this working! Follow the steps above and let me know if you need any help.** 🚀
