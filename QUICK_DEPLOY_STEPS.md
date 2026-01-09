# 🚀 Quick Deploy Steps - Apps Script Backend

## ⚠️ CRITICAL: You're seeing the OLD version!

The "Current version" showing "9 January 14:02" is OLD. You need to deploy the NEW version.

---

## 📋 Step-by-Step Instructions:

### Step 1: Select ALL Code in Apps Script

1. In your Apps Script editor (the screenshot you showed)
2. Click inside the code editor
3. Press **Ctrl+A** (Windows) or **Cmd+A** (Mac) to select ALL code
4. Press **Delete** to remove all old code

### Step 2: Copy the New Code

1. Open the file: `backend/google-apps-script.js` in your local project
2. Press **Ctrl+A** (Windows) or **Cmd+A** (Mac) to select ALL
3. Press **Ctrl+C** (Windows) or **Cmd+C** (Mac) to copy

### Step 3: Paste the New Code

1. Go back to Apps Script editor
2. Click in the empty code area
3. Press **Ctrl+V** (Windows) or **Cmd+V** (Mac) to paste
4. You should see ALL the new code (starts with `// ===================================`)

### Step 4: Save the Project

1. Click the **💾 Save** icon (or press Ctrl+S / Cmd+S)
2. Wait for "Saved" message to appear

### Step 5: Deploy as NEW Version

1. Click **Deploy** → **Manage deployments**
2. Click the **✏️ Edit** icon (pencil) next to your existing deployment
3. Under "Version", click the dropdown
4. Select **"New version"**
5. Add description: "Updated backend - per-module certificates"
6. Click **Deploy**

### Step 6: Verify Deployment

1. After deployment, you should see a new version in "Project history"
2. The timestamp should be TODAY (not "9 January")
3. The "Current version" should update

### Step 7: Copy the Web App URL (if it changed)

1. After deployment, copy the **Web app URL**
2. It should look like: `https://script.google.com/macros/s/AKfycby.../exec`
3. If it's different from before, update `js/auth.js` line 11

---

## ✅ How to Verify It Worked:

1. **Check Project History** (right side panel)
   - Should show a new version with TODAY's date
   - Should say "Current version"

2. **Test Quiz Data Saving**
   - Take a quiz on your course
   - Check your Google Spreadsheet
   - You should see the quiz score appear in the "Progress" sheet

3. **Check Certificate Eligibility**
   - Score 80%+ on a quiz
   - Check the "Certificates Eligible" column in spreadsheet
   - Should show the module name

---

## 🐛 Troubleshooting:

### Issue: "Version not updating"
**Solution**: Make sure you clicked "New version" in step 5, not just "Deploy"

### Issue: "Authorization required"
**Solution**: Click "Authorize access" and follow the prompts

### Issue: "Script function not found"
**Solution**: Make sure you copied ALL the code, including the `doPost` function

---

## 📝 What Changed in the New Version:

1. ✅ Removed "Event Type" and "Timestamp" columns
2. ✅ Added "Quiz Attempts" tracking
3. ✅ Added "Best Qualifying Scores" (80%+)
4. ✅ Added "Certificates Eligible" per module
5. ✅ Each quiz with 80%+ earns a certificate for that module
6. ✅ Removed column highlighting (columns C and O)

---

## 🎉 After Deployment:

Your course will:
- ✅ Save quiz attempts to Google Sheets
- ✅ Track all quiz scores (not just latest)
- ✅ Show certificate eligibility per module
- ✅ Filter for 80%+ scores
- ✅ Display certificates in sidebar

---

**Need Help?** Check BACKEND_DEPLOYMENT_GUIDE.md for detailed instructions with screenshots.
