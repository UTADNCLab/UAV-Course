# 🌐 How to Share Your Course with Others

This guide explains how to share your UAV course with people outside your local setup.

---

## 📍 Current Setup (Local Only)

Right now, your course runs on your computer at:
```
http://localhost:8000/landing.html
```

**Problem:** This URL only works on YOUR computer. Others cannot access it.

---

## 🚀 Solution: Deploy to the Internet

To share with others, you need to deploy your course to a web hosting service. Here are the best options:

---

### Option 1: GitHub Pages (FREE & Easy) ⭐ RECOMMENDED

**Steps:**

1. **Create GitHub Account**
   - Go to https://github.com
   - Sign up for free

2. **Create New Repository**
   - Click "New Repository"
   - Name it: `uav-course`
   - Make it Public
   - Click "Create repository"

3. **Upload Your Files**
   - Click "uploading an existing file"
   - Drag and drop ALL your course files
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "main" branch
   - Click "Save"

5. **Get Your URL**
   - Your course will be live at:
   ```
   https://YOUR-USERNAME.github.io/uav-course/landing.html
   ```
   - Share this URL with anyone!

**Pros:**
- ✅ Completely FREE
- ✅ Easy to update
- ✅ Reliable hosting
- ✅ HTTPS included

**Cons:**
- ❌ Repository must be public (or pay for private)
- ❌ URL includes github.io

---

### Option 2: Netlify (FREE with Custom Domain)

**Steps:**

1. **Sign Up**
   - Go to https://netlify.com
   - Sign up for free

2. **Deploy**
   - Drag and drop your course folder
   - Netlify will deploy automatically

3. **Get URL**
   - You'll get: `https://random-name.netlify.app`
   - Can add custom domain (optional)

**Pros:**
- ✅ FREE
- ✅ Super easy (drag & drop)
- ✅ Custom domain support
- ✅ Automatic HTTPS

---

### Option 3: Vercel (FREE)

**Steps:**

1. **Sign Up**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import from GitHub
   - Deploy

3. **Get URL**
   - You'll get: `https://your-project.vercel.app`

**Pros:**
- ✅ FREE
- ✅ Fast deployment
- ✅ Custom domain support

---

### Option 4: Custom Domain (Professional)

**If you want: `https://utauavcourse.com`**

1. **Buy Domain**
   - Go to: Namecheap, GoDaddy, or Google Domains
   - Search for: `utauavcourse.com`
   - Purchase (~$10-15/year)

2. **Choose Hosting**
   - Use GitHub Pages, Netlify, or Vercel (above)
   - Connect your custom domain

3. **Update DNS**
   - Point domain to hosting service
   - Wait 24-48 hours for propagation

4. **Update Code**
   - In `index.html`, change:
   ```javascript
   const COURSE_URL = 'https://utauavcourse.com';
   ```

---

## 🎯 Quick Start: GitHub Pages (Recommended)

### Step-by-Step for Beginners:

**1. Prepare Your Files**
```
Your course folder should contain:
- index.html
- landing.html
- css/
- js/
- data/
- assets/
- backend/
```

**2. Create GitHub Repository**
- Go to https://github.com/new
- Repository name: `uav-course`
- Public
- Create

**3. Upload Files**
- Click "uploading an existing file"
- Select ALL files from your course folder
- Commit

**4. Enable Pages**
- Settings → Pages
- Source: main branch
- Save

**5. Share Your Link**
```
https://YOUR-USERNAME.github.io/uav-course/landing.html
```

---

## 📱 What to Share

### For Students:
```
Landing Page: https://YOUR-SITE.com/landing.html

Tell them:
1. Click "Start Learning"
2. Register with email
3. Start the course!
```

### For Social Media:
```
Check out this UAV Design course! 🚁✨
Learn cyber-physical systems, drone technology, and more.

🔗 https://YOUR-SITE.com/landing.html

#UAV #Drones #Engineering #OnlineLearning
```

---

## 🔒 Important: Google Sheets Backend

**Before sharing publicly:**

1. **Deploy Google Apps Script**
   - Copy code from `backend/google-apps-script.js`
   - Paste in Google Apps Script
   - Deploy as Web App
   - Set access to "Anyone"

2. **Update URLs**
   - Make sure `js/auth.js` has correct Web App URL
   - Test registration works

3. **Test Everything**
   - Register a test account
   - Complete a module
   - Check Google Sheets for data

---

## 🧪 Testing Before Sharing

**Test Checklist:**

- [ ] Landing page loads
- [ ] "Start Learning" button works
- [ ] Registration works
- [ ] Login works
- [ ] Videos play
- [ ] Quizzes work
- [ ] Progress saves
- [ ] Certificate downloads
- [ ] Google Sheets receives data

---

## 💡 Pro Tips

1. **Use HTTPS**
   - All modern hosting provides free HTTPS
   - Required for secure login

2. **Test on Mobile**
   - Open on phone/tablet
   - Ensure responsive design works

3. **Monitor Usage**
   - Check Google Sheets regularly
   - See who's registered
   - Track progress

4. **Update Content**
   - Edit files locally
   - Re-upload to hosting
   - Changes go live immediately

---

## 🆘 Troubleshooting

**"Link doesn't work"**
- Wait 5-10 minutes after deployment
- Clear browser cache
- Try incognito mode

**"Registration fails"**
- Check Google Apps Script is deployed
- Verify Web App URL in `js/auth.js`
- Check Google Sheets permissions

**"Videos don't play"**
- Ensure video URLs are correct
- Check internet connection
- Try different browser

---

## 📊 Current URLs

**Local (Your Computer Only):**
```
Landing: http://localhost:8000/landing.html
Course:  http://localhost:8000/index.html
```

**After Deployment (Example):**
```
Landing: https://yourusername.github.io/uav-course/landing.html
Course:  https://yourusername.github.io/uav-course/index.html
```

**Custom Domain (Future):**
```
Landing: https://utauavcourse.com/landing.html
Course:  https://utauavcourse.com/index.html
```

---

## ✅ Summary

**To share your course:**

1. ✅ Deploy to GitHub Pages (easiest)
2. ✅ Get your public URL
3. ✅ Test everything works
4. ✅ Share the landing page URL
5. ✅ Monitor Google Sheets for registrations

**Your students will:**
1. Visit landing page
2. Click "Start Learning"
3. Register/Login
4. Access full course
5. Earn certificate

---

**Need help? The course is ready to deploy! Just follow the GitHub Pages steps above.** 🚀
