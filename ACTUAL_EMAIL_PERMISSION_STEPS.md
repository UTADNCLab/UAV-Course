# ✅ ACTUAL Steps to Grant Email Permissions (That Work!)

## ❌ What DOESN'T Work:
- Running `authorizeEmailSending` function
- Adding code to grant permissions
- Checking Project Settings first

## ✅ What ACTUALLY Works:

### Step 1: Open Google Apps Script
1. Go to: https://script.google.com/home
2. Open your "UAV Course Data" project

### Step 2: Select ANY Function That Uses Email
In the function dropdown at the top, select: **`testEmailPermissions`**

(This function is already in your script - it sends a test email)

### Step 3: Click RUN
Click the **Run** button (▶️ play icon)

### Step 4: Grant Permissions
You'll see a popup: **"Authorization required"**

1. Click **"Review Permissions"**
2. Choose **opencourse.uav@gmail.com**
3. You'll see: "Google hasn't verified this app"
4. Click **"Advanced"** (at the bottom left)
5. Click **"Go to UAV Course Data (unsafe)"**
6. Click **"Allow"**

### Step 5: Done!
- Check the execution log - you should see: "✅ Email sent successfully!"
- Check opencourse.uav@gmail.com inbox - you should have a test email
- Now ALL email functions will work!

---

## 🎯 Why This Works:

Google Apps Script requires you to **manually grant permissions** the first time you run a function that needs them. You CANNOT grant permissions through code - you must:

1. Run a function that uses `MailApp`
2. Google shows permission dialog
3. You click "Allow"
4. Done!

After this, permissions are granted permanently (until you revoke them).

---

## 📧 After Granting Permissions:

### Test from Website:
1. Go to: https://jaymehta12110.github.io/UAV-Course/landing.html
2. Fill out the contact form
3. Submit
4. Check opencourse.uav@gmail.com - you should receive the email!

### Test Professor Emails:
1. Go to: https://jaymehta12110.github.io/UAV-Course/course.html
2. Click "Contact" on any professor
3. Fill the form and send
4. Check both:
   - Professor's email (yan.wan@uta.edu, etc.)
   - opencourse.uav@gmail.com (copy)

---

## 🔧 If You Get Errors:

### Error: "Script function not found"
- Make sure you selected `testEmailPermissions` from the dropdown
- Make sure you saved the script (Ctrl+S)

### Error: "Authorization required" keeps appearing
- You need to complete ALL steps in Step 4 above
- Don't skip clicking "Advanced" and "Go to UAV Course Data (unsafe)"

### Error: "Permission denied"
- Make sure you're logged in as opencourse.uav@gmail.com
- Try logging out and back in to Google

---

## ✅ Summary:

**The ONLY way to grant email permissions:**
1. Select `testEmailPermissions` function
2. Click Run
3. Click "Review Permissions"
4. Click "Advanced"
5. Click "Go to UAV Course Data (unsafe)"
6. Click "Allow"
7. Done!

**Time needed:** 2 minutes

**After this:** All email functions work automatically from your website!

---

## 🎉 What You Get:

After granting permissions:
- ✅ Landing page contact form sends to opencourse.uav@gmail.com
- ✅ Professor contact buttons send to professor emails
- ✅ Copy of all professor emails sent to opencourse.uav@gmail.com
- ✅ Cross-device login works (checks Google Sheets backend)
- ✅ Everything automatic!

No more authorization functions needed - just run `testEmailPermissions` once and you're done! 🚀
