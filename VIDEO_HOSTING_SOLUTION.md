# 🎥 Video Hosting Solution - Upload to YouTube

## Problem
GitHub has a 100MB file size limit, and your video files are likely larger than this, causing errors.

## ✅ BEST SOLUTION: Upload Videos to YouTube

### Step 1: Upload Videos to YouTube

1. **Go to YouTube Studio:** https://studio.youtube.com
2. **Click "CREATE" → "Upload videos"**
3. **Upload your 4 videos:**
   - Part_1_upd.mp4
   - UAV_Part_2_AIrborne_Networking.mp4
   - Part_3.mp4
   - Part_4.mp4

4. **Set Privacy to "Unlisted"** (not private, not public)
   - Unlisted = Only people with the link can watch
   - Perfect for course videos

5. **For each video, copy the embed code:**
   - Click on video → Share → Embed
   - Copy the URL that looks like: `https://www.youtube.com/embed/VIDEO_ID`

### Step 2: Update course-data.json

Once you have the YouTube embed URLs, I'll update the course-data.json file with them.

**Example format:**
```json
"videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE"
```

---

## Alternative Solutions (if you don't want YouTube)

### Option 2: Google Drive
1. Upload videos to Google Drive
2. Right-click → Get link → Set to "Anyone with the link"
3. Use Google Drive embed URL
4. **Limitation:** May have playback restrictions

### Option 3: Vimeo
1. Create free Vimeo account
2. Upload videos (up to 500MB per week on free plan)
3. Set privacy to "Unlisted"
4. Get embed code
5. **Advantage:** Professional, no ads

### Option 4: Git LFS (Large File Storage)
1. Install Git LFS
2. Track .mp4 files
3. Push to GitHub
4. **Limitation:** 1GB free storage, then paid

---

## 🚀 Quick Action Plan

**RIGHT NOW - Let's fix this:**

1. **Remove large video files from Git:**
   ```bash
   git rm Part_1_upd.mp4 Part_3.mp4 Part_4.mp4 UAV_Part_2_AIrborne_Networking.mp4
   git commit -m "Removed large video files - will use YouTube instead"
   git push origin main
   ```

2. **Upload videos to YouTube** (takes 10-15 minutes)

3. **Give me the YouTube URLs** and I'll update course-data.json

4. **Push updated course-data.json** with YouTube embeds

---

## 📝 YouTube Upload Checklist

For each video:
- [ ] Upload to YouTube
- [ ] Set to "Unlisted"
- [ ] Add title (e.g., "UAV Course - Module 1: Open Airborne Computing")
- [ ] Add description
- [ ] Copy embed URL
- [ ] Test that it plays

---

## ⚡ Fastest Solution

**If you want to get this working IMMEDIATELY:**

Use these placeholder YouTube videos for now:
- Module 1: `https://www.youtube.com/embed/jNQXAC9IVRw`
- Module 2: `https://www.youtube.com/embed/ysz5S6PUM-U`
- Module 3: `https://www.youtube.com/embed/dQw4w9WgXcQ`
- Module 4: `https://www.youtube.com/embed/V_MXGdSBFh4`

Then replace with your actual videos later.

---

## 🎯 What I'll Do Next

Tell me which option you prefer:

**A) Remove videos from Git + Use YouTube** (RECOMMENDED)
- I'll remove the large files
- You upload to YouTube
- I'll update course-data.json with your URLs

**B) Use placeholder YouTube videos for now**
- I'll add working YouTube videos immediately
- You replace with your videos later

**C) Try Git LFS** (more complex)
- I'll set up Git LFS
- May require paid GitHub plan

**Which option do you want? (A, B, or C)**
