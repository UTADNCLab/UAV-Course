# 📊 Where to Find User Registration Data

## ✅ Your Registrations ARE Working!

**Good news:** New user registrations are being saved successfully!

**The confusion:** You have TWO different sheets in your Google Spreadsheet.

---

## 📋 Your Two Sheets Explained:

### **Sheet 1: "Users"** ✅ (Registration Data)
**Columns:**
- First Name
- Last Name  
- Email
- Password Hash
- Registered At

**Purpose:** Stores user registration and login credentials

**Your screenshot shows:** James Luiz registered successfully! ✅

---

### **Sheet 2: "UAV Course Data"** (Progress Data)
**Columns:**
- First Name
- Last Name
- Email
- Completion %
- Modules Completed
- Total Modules
- Quiz 1 Score
- Quiz 2 Score
- Quiz 3 Score
- Quiz 4 Score
- Quiz Attempts
- Certificates Eligible

**Purpose:** Stores course progress (videos watched, quizzes taken, etc.)

**Note:** This sheet does NOT have "Password Hash" column because it's for progress tracking, not authentication.

---

## 🔍 How to View User Registrations:

### **In Google Sheets:**

1. Open your spreadsheet: https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit

2. Look at the **bottom tabs** of the spreadsheet

3. Click on the **"Users"** tab (not "UAV Course Data")

4. You'll see all registered users with their:
   - Names
   - Emails
   - Password Hashes
   - Registration dates

---

## 📊 How the System Works:

### **When a user registers:**
1. ✅ Data goes to **"Users" sheet**
2. ✅ Includes: Name, Email, Password Hash, Date

### **When a user takes the course:**
1. ✅ Progress goes to **"UAV Course Data"** (or "Progress") sheet
2. ✅ Includes: Completion %, Quiz scores, Certificates

### **Why two sheets?**
- **Security:** Password hashes are separate from progress data
- **Organization:** Registration data vs. course progress data
- **Efficiency:** Easier to manage and query

---

## 🎯 Quick Check - Is Registration Working?

**YES!** Your screenshot proves it:

**"Users" sheet shows:**
```
Row 2: James | will | 28jaymehta@gmail.com | [hash] | 2026-01-11
Row 3: James | Luiz | 2810jaymehta@gmail.com | [hash] | 2026-01-11
```

**Both registrations worked perfectly!** ✅

---

## 📝 Common Questions:

### Q: Why don't I see new users in "UAV Course Data" sheet?
**A:** That sheet is for course PROGRESS, not registration. New users appear there only AFTER they start taking the course (watch videos, take quizzes).

### Q: Where can I see who registered?
**A:** Click the **"Users"** tab at the bottom of your Google Spreadsheet.

### Q: Can I see both registration and progress data together?
**A:** Not in one sheet, but you can:
1. Check "Users" sheet for who registered
2. Check "UAV Course Data" sheet for their progress
3. Match by email address

### Q: What if a user registers but never takes the course?
**A:** They'll appear in "Users" sheet but NOT in "UAV Course Data" sheet (because they have no progress yet).

---

## 🔗 Direct Links to Your Sheets:

**Main Spreadsheet:**
```
https://docs.google.com/spreadsheets/d/1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc/edit
```

**To view Users sheet:**
1. Open the link above
2. Click "Users" tab at the bottom

**To view Progress sheet:**
1. Open the link above  
2. Click "UAV Course Data" (or "Progress") tab at the bottom

---

## ✅ Summary:

**Your System is Working Correctly!**

- ✅ New registrations → "Users" sheet
- ✅ Course progress → "UAV Course Data" sheet
- ✅ Both sheets are separate by design
- ✅ James Luiz successfully registered (visible in "Users" sheet)

**To see new registrations:** Always check the **"Users"** tab, not "UAV Course Data" tab!

---

## 💡 Pro Tip:

If you want to see which registered users have started the course:

1. Open "Users" sheet → Note the emails
2. Open "UAV Course Data" sheet → Check if those emails appear
3. If email is in Users but NOT in UAV Course Data = User registered but hasn't started course yet

---

## 🎉 Everything is Working!

Your registration system is functioning perfectly. New users are being saved to the "Users" sheet with all their information including password hashes.

**Just remember:** 
- **"Users" sheet** = Who registered
- **"UAV Course Data" sheet** = Who's taking the course

Both are working as designed! ✅
