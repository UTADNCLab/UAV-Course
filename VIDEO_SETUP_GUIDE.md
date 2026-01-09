# 📹 How to Add Local Videos to Your Course

## Step 1: Prepare Your Video Files

You mentioned you have these videos:
- Video Part 1
- Video Part 2  
- Video Part 4
- UAV Part 2

### Recommended Video Format:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1280x720 (720p) or 1920x1080 (1080p)
- **File Size**: Keep under 100MB per video for faster loading

## Step 2: Organize Video Files

Create this folder structure:
```
course/
├── assets/
│   └── videos/
│       ├── module1-video.mp4
│       ├── module2-video.mp4
│       ├── module3-video.mp4
│       └── module4-video.mp4
```

### Rename Your Videos:
```
Video Part 1 → module1-video.mp4
Video Part 2 → module2-video.mp4
UAV Part 2 → module3-video.mp4
Video Part 4 → module4-video.mp4
```

## Step 3: Update course-data.json

Open `data/course-data.json` and update the `videoUrl` for each module:

```json
{
  "title": "Module 1: Open Airborne Computing Platforms",
  "videoUrl": "assets/videos/module1-video.mp4",
  ...
}
```

## Step 4: Test Locally

1. Place videos in `assets/videos/` folder
2. Open `index.html` in browser
3. Click on Module 1 video
4. Video should play directly

## Step 5: Deploy to GitHub

### Option A: Small Videos (< 25MB each)
```bash
git add assets/videos/*.mp4
git commit -m "Added course videos"
git push origin main
```

### Option B: Large Videos (> 25MB)
GitHub has a 100MB file size limit. For larger videos:

**Solution 1: Use Git LFS (Large File Storage)**
```bash
# Install Git LFS
git lfs install

# Track video files
git lfs track "*.mp4"
git add .gitattributes
git add assets/videos/*.mp4
git commit -m "Added videos with Git LFS"
git push origin main
```

**Solution 2: Use External Hosting**
Upload videos to:
- YouTube (unlisted)
- Google Drive
- Vimeo
- AWS S3

Then use embed URLs in course-data.json

## Step 6: Improve Module Presentation

I'll create a better module structure that shows:
```
📚 Module 1: Open Airborne Computing Platforms
  ├── 🎥 Video Lecture (45 min)
  └── 📝 Quiz (7 questions)

📚 Module 2: UAV Communications and Networking
  ├── 🎥 Video Lecture (50 min)
  └── 📝 Quiz (7 questions)
```

---

## Quick Commands:

### Check video file sizes:
```bash
# Windows
dir assets\videos\*.mp4

# Mac/Linux
ls -lh assets/videos/*.mp4
```

### Compress videos if too large:
Use HandBrake (free tool):
1. Download: https://handbrake.fr/
2. Open video
3. Preset: "Web" → "Gmail Large 3 Minutes 720p30"
4. Save

---

## Need Help?
Let me know if you need help with:
- Video compression
- Setting up Git LFS
- Using external video hosting
