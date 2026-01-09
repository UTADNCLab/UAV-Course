# 🎯 HOW TO RUN THE BAT FILES

## 📍 Where Are The Files?

The bat files are in your course folder:
```
c:\Users\2810j\OneDrive\Desktop\course
```

---

## 🖱️ How to Run Bat Files (3 Ways)

### Method 1: Double-Click (EASIEST) ⭐

1. Open File Explorer (Windows key + E)
2. Navigate to: `c:\Users\2810j\OneDrive\Desktop\course`
3. Find the file: **EASY-SETUP.bat**
4. **Double-click** on it
5. A black window will open - follow the instructions!

### Method 2: Right-Click

1. Find **EASY-SETUP.bat** in File Explorer
2. **Right-click** on it
3. Click **"Open"** or **"Run"**

### Method 3: From Command Prompt

1. Press **Windows key + R**
2. Type: `cmd`
3. Press Enter
4. Type: `cd c:\Users\2810j\OneDrive\Desktop\course`
5. Press Enter
6. Type: `EASY-SETUP.bat`
7. Press Enter

---

## 📋 Step-by-Step Instructions

### STEP 1: Run EASY-SETUP.bat

**What it looks like:**
```
📁 course folder
   📄 EASY-SETUP.bat  ← Double-click this!
   📄 PUSH-TO-GITHUB.bat
   📄 index.html
   📄 landing.html
   📁 css
   📁 js
   ... (other files)
```

**What happens:**
1. Black window opens
2. Shows menu with email options:
   ```
   Select your email:
   1. Use: 2810j@example.com
   2. Use: jay@example.com
   3. Use: your.email@gmail.com
   4. Enter custom email
   ```
3. Type **1**, **2**, **3**, or **4** and press Enter
4. It will configure Git and commit your files
5. Browser opens to GitHub
6. Window stays open with instructions

### STEP 2: Create GitHub Repository

**In the browser that just opened:**

1. You'll see "Create a new repository" page
2. Fill in:
   - **Repository name:** `uav-course`
   - **Description:** (optional) UAV Design Course
   - **Public** ← Make sure this is selected!
   - **DO NOT** check "Add a README file"
3. Click green **"Create repository"** button

### STEP 3: Run PUSH-TO-GITHUB.bat

**Back in File Explorer:**
1. Find **PUSH-TO-GITHUB.bat**
2. **Double-click** it
3. Black window opens
4. Type your GitHub username
5. Press Enter
6. It will push your files to GitHub
7. Browser opens to your repository

### STEP 4: Enable GitHub Pages

**In the browser:**
1. Click **"Settings"** tab (top of page)
2. Scroll down left sidebar
3. Click **"Pages"**
4. Under "Source":
   - Select **"main"** from dropdown
   - Keep **"/ (root)"** selected
5. Click **"Save"**
6. Wait 2-3 minutes
7. Refresh page - you'll see a green box with your URL!

---

## 🎬 Visual Guide

### Finding the Files:

```
1. Open File Explorer
   [Windows Key] + [E]

2. Navigate to Desktop
   This PC → Desktop → course

3. You'll see these files:
   📄 EASY-SETUP.bat       ← Run this FIRST
   📄 PUSH-TO-GITHUB.bat   ← Run this SECOND
   📄 index.html
   📄 landing.html
   📁 css
   📁 js
```

### Running EASY-SETUP.bat:

```
[File Explorer Window]
┌─────────────────────────────────────┐
│ course                              │
├─────────────────────────────────────┤
│ 📄 EASY-SETUP.bat  ← Double-click! │
│ 📄 PUSH-TO-GITHUB.bat               │
│ 📄 index.html                       │
│ 📄 landing.html                     │
│ 📁 css                              │
│ 📁 js                               │
└─────────────────────────────────────┘

↓ Double-click

[Black Command Window Opens]
┌─────────────────────────────────────┐
│ UAV COURSE - GITHUB SETUP           │
│                                     │
│ Select your email:                  │
│ 1. Use: 2810j@example.com          │
│ 2. Use: jay@example.com            │
│ 3. Use: your.email@gmail.com       │
│ 4. Enter custom email              │
│                                     │
│ Enter your choice (1-4): _         │
└─────────────────────────────────────┘
```

---

## ❓ Troubleshooting

### "Nothing happens when I double-click"
- Try right-click → "Run as administrator"
- Or use Command Prompt method

### "Window closes immediately"
- The bat file has `pause` commands, so it should stay open
- If it closes, there might be an error
- Try running from Command Prompt to see errors

### "Git is not recognized"
- Git is already installed (we checked)
- Try restarting your computer
- Or run from Command Prompt

### "Permission denied"
- Right-click the bat file
- Select "Run as administrator"

---

## 🎯 Quick Summary

**Just do this:**

1. **Double-click:** `EASY-SETUP.bat`
   - Select email option
   - Wait for it to finish

2. **Create repository** on GitHub
   - Name: `uav-course`
   - Public
   - Create

3. **Double-click:** `PUSH-TO-GITHUB.bat`
   - Enter your GitHub username
   - Wait for it to finish

4. **Enable Pages** on GitHub
   - Settings → Pages
   - Source: main
   - Save

**Done! Your course is live!** 🎉

---

## 📱 Your Live URL

After completing all steps, your course will be at:
```
https://YOUR-USERNAME.github.io/uav-course/landing.html
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## 💡 Tips

- Keep the black windows open until they say "Press any key"
- Read the messages in the windows
- If something goes wrong, the window will tell you
- You can run the bat files multiple times if needed

---

**Need more help? All the files are in:**
```
c:\Users\2810j\OneDrive\Desktop\course
```

**Just double-click EASY-SETUP.bat to start!** 🚀
