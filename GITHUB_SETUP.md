# 🚀 GitHub Pages Setup - Step by Step

Follow these exact steps to deploy your course to GitHub Pages.

---

## 📋 Prerequisites

You need:
- A GitHub account (free)
- Git installed on your computer

---

## ✅ Step 1: Create GitHub Account (if you don't have one)

1. Go to: https://github.com/signup
2. Enter your email
3. Create password
4. Choose username
5. Verify email

---

## ✅ Step 2: Install Git (if not installed)

### Windows:
1. Download: https://git-scm.com/download/win
2. Run installer
3. Use default settings

### Check if Git is installed:
```bash
git --version
```

---

## ✅ Step 3: Initialize Git in Your Project

Open terminal in your course folder and run:

```bash
# Navigate to your course folder
cd c:/Users/2810j/OneDrive/Desktop/course

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - UAV Course"
```

---

## ✅ Step 4: Create GitHub Repository

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `uav-course`
   - **Description:** UAV Design: Foundations of Cyber-Physical Systems
   - **Public** (select this)
   - **DO NOT** check "Add README"
3. Click **"Create repository"**

---

## ✅ Step 5: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add GitHub as remote (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/uav-course.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
If your username is `john123`, the command would be:
```bash
git remote add origin https://github.com/john123/uav-course.git
```

---

## ✅ Step 6: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR-USERNAME/uav-course`
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in left sidebar
4. Under **"Source"**:
   - Select **"main"** branch
   - Keep **"/ (root)"** selected
5. Click **"Save"**

---

## ✅ Step 7: Get Your Live URL

After 2-3 minutes, your site will be live at:

```
https://YOUR-USERNAME.github.io/uav-course/landing.html
```

**Example:**
If your username is `john123`:
```
https://john123.github.io/uav-course/landing.html
```

---

## 🎯 Quick Commands Summary

```bash
# 1. Navigate to course folder
cd c:/Users/2810j/OneDrive/Desktop/course

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit - UAV Course"

# 5. Add remote (REPLACE YOUR-USERNAME!)
git remote add origin https://github.com/YOUR-USERNAME/uav-course.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔄 How to Update Your Course Later

When you make changes to your course:

```bash
# 1. Navigate to course folder
cd c:/Users/2810j/OneDrive/Desktop/course

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Updated course content"

# 4. Push to GitHub
git push
```

Your site will update automatically in 1-2 minutes!

---

## 🆘 Troubleshooting

### "git: command not found"
- Install Git from https://git-scm.com/download/win
- Restart terminal

### "Permission denied"
- You may need to authenticate with GitHub
- Use GitHub Desktop (easier): https://desktop.github.com

### "Repository not found"
- Check you replaced YOUR-USERNAME with your actual username
- Make sure repository exists on GitHub

### Site not loading
- Wait 5-10 minutes after enabling Pages
- Check Settings → Pages shows green checkmark
- Try incognito mode

---

## 💡 Alternative: Use GitHub Desktop (Easier!)

If command line is confusing:

1. **Download GitHub Desktop:** https://desktop.github.com
2. **Install and sign in**
3. **Add your course folder:**
   - File → Add Local Repository
   - Choose: `c:/Users/2810j/OneDrive/Desktop/course`
4. **Publish to GitHub:**
   - Click "Publish repository"
   - Name: `uav-course`
   - Public
   - Publish
5. **Enable Pages** (same as Step 6 above)

---

## ✅ Verification Checklist

After deployment:

- [ ] Repository created on GitHub
- [ ] All files uploaded
- [ ] GitHub Pages enabled
- [ ] Site loads at: `https://YOUR-USERNAME.github.io/uav-course/landing.html`
- [ ] Can register/login
- [ ] Videos play
- [ ] Quizzes work

---

## 📱 Share Your Course

Once live, share this URL:

```
https://YOUR-USERNAME.github.io/uav-course/landing.html
```

**For social media:**
```
🚁 Check out my UAV Design course!
Learn cyber-physical systems, drone technology & more.

🔗 https://YOUR-USERNAME.github.io/uav-course/landing.html

#UAV #Drones #Engineering #OnlineLearning
```

---

## 🎉 You're Done!

Your course is now live on the internet and anyone can access it!

**Need help?** 
- GitHub Docs: https://docs.github.com/en/pages
- GitHub Desktop: https://desktop.github.com
