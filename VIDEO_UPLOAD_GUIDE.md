# 🎥 Video Upload Guide - Using Local Videos in Your Course

This guide shows you how to add your own videos to the course instead of using YouTube links.

---

## 📁 Option 1: Using Local Videos (Recommended for Testing)

### Step 1: Create Videos Folder

1. In your course directory, create a folder structure:
   ```
   course/
   ├── assets/
   │   └── videos/
   │       ├── module1.mp4
   │       ├── module2.mp4
   │       ├── module3.mp4
   │       └── module4.mp4
   ```

2. Place your video files in the `assets/videos/` folder

### Step 2: Update course-data.json

Open `data/course-data.json` and update the `videoUrl` for each module:

**Before (YouTube):**
```json
{
  "id": 1,
  "title": "Open Airborne Computing Platforms",
  "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "type": "video"
}
```

**After (Local Video):**
```json
{
  "id": 1,
  "title": "Open Airborne Computing Platforms",
  "videoUrl": "assets/videos/module1.mp4",
  "type": "video"
}
```

### Step 3: Update All Video Modules

Replace all video URLs in `course-data.json`:

```json
{
  "modules": [
    {
      "id": 1,
      "title": "Open Airborne Computing Platforms: Building Modular UAV Systems",
      "description": "Learn how modern drones are designed...",
      "videoUrl": "assets/videos/module1.mp4",
      "duration": "45 min",
      "type": "video"
    },
    {
      "id": 2,
      "title": "Quiz 1: Open Airborne Computing Platforms",
      "type": "quiz",
      ...
    },
    {
      "id": 3,
      "title": "UAV Communications and Networking",
      "videoUrl": "assets/videos/module2.mp4",
      "duration": "50 min",
      "type": "video"
    },
    {
      "id": 4,
      "title": "Quiz 2: UAV Communications and Networking",
      "type": "quiz",
      ...
    },
    {
      "id": 5,
      "title": "Networked Control and Co-Design",
      "videoUrl": "assets/videos/module3.mp4",
      "duration": "55 min",
      "type": "video"
    },
    {
      "id": 6,
      "title": "Quiz 3: Networked Control and Co-Design",
      "type": "quiz",
      ...
    },
    {
      "id": 7,
      "title": "UAV AI Applications",
      "videoUrl": "assets/videos/module4.mp4",
      "duration": "60 min",
      "type": "video"
    },
    {
      "id": 8,
      "title": "Quiz 4: UAV AI Applications",
      "type": "quiz",
      ...
    }
  ]
}
```

### Step 4: Update course.js to Support Local Videos

The current code uses `<iframe>` for YouTube videos. We need to update it to support both YouTube and local videos.

Open `js/course.js` and find the `loadVideoModule` function (around line 165). Replace it with:

```javascript
function loadVideoModule(module) {
    document.getElementById('videoSection').style.display = 'block';

    // Set module information
    document.getElementById('moduleBadge').textContent = `Module ${Math.floor(currentModuleIndex / 2) + 1}`;
    document.getElementById('moduleTitle').textContent = module.title;
    document.getElementById('moduleDescription').textContent = module.description;
    document.getElementById('moduleDuration').innerHTML = `<i class="fas fa-clock"></i> ${module.duration}`;

    // Check if it's a YouTube video or local video
    const videoContainer = document.querySelector('.video-container');
    const videoUrl = module.videoUrl;
    
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        // YouTube video - use iframe
        videoContainer.innerHTML = `
            <iframe id="videoPlayer" 
                    src="${videoUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        `;
    } else {
        // Local video - use HTML5 video player
        videoContainer.innerHTML = `
            <video id="videoPlayer" controls controlsList="nodownload" style="width: 100%; height: 100%; background: #000;">
                <source src="${videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }

    // Update complete button
    const completeBtn = document.getElementById('completeBtn');
    if (completedModules.has(currentModuleIndex)) {
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
        completeBtn.disabled = true;
    } else {
        completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark as Complete';
        completeBtn.disabled = false;
    }
}
```

---

## 📁 Option 2: Using Google Drive (For Online Hosting)

### Step 1: Upload Videos to Google Drive

1. Go to [Google Drive](https://drive.google.com/)
2. Create a folder: "UAV Course Videos"
3. Upload your video files
4. For each video:
   - Right-click → "Get link"
   - Change to "Anyone with the link"
   - Copy the link

### Step 2: Get Embeddable Link

Google Drive link format:
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

Convert to embeddable format:
```
https://drive.google.com/file/d/FILE_ID/preview
```

### Step 3: Update course-data.json

```json
{
  "id": 1,
  "videoUrl": "https://drive.google.com/file/d/YOUR_FILE_ID/preview",
  "type": "video"
}
```

---

## 📁 Option 3: Using YouTube (Current Setup)

### Step 1: Upload to YouTube

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click "Create" → "Upload videos"
3. Upload your video
4. Set visibility (Public, Unlisted, or Private)
5. Copy the video URL

### Step 2: Get Embed URL

YouTube URL format:
```
https://www.youtube.com/watch?v=VIDEO_ID
```

Convert to embed format:
```
https://www.youtube.com/embed/VIDEO_ID
```

### Step 3: Update course-data.json

```json
{
  "id": 1,
  "videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  "type": "video"
}
```

---

## 🎬 Supported Video Formats

### For Local Videos:
- ✅ MP4 (H.264) - **Recommended**
- ✅ WebM
- ✅ OGG
- ❌ AVI (not supported in browsers)
- ❌ MOV (limited support)

### Converting Videos to MP4:

**Using FFmpeg (Free):**
```bash
# Install FFmpeg first
# Windows: Download from ffmpeg.org
# Mac: brew install ffmpeg
# Linux: sudo apt-get install ffmpeg

# Convert video to MP4
ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4

# Compress video (reduce file size)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1000k output.mp4
```

**Using Online Converters:**
- CloudConvert.com
- Online-Convert.com
- Convertio.co

---

## 📊 Video File Size Recommendations

### For Local Hosting:
- **720p (HD):** 50-100 MB per 10 minutes
- **1080p (Full HD):** 100-200 MB per 10 minutes
- **Compression:** Use H.264 codec with AAC audio

### For Better Performance:
1. Keep videos under 200 MB each
2. Use 720p resolution (1280x720)
3. Bitrate: 1000-2000 kbps
4. Frame rate: 30 fps

---

## 🚀 Quick Setup Script

I'll create a script to help you set up the video structure:

**Create this file: `setup-videos.bat` (Windows) or `setup-videos.sh` (Mac/Linux)**

**Windows (setup-videos.bat):**
```batch
@echo off
echo Creating video directories...
mkdir assets\videos 2>nul
echo.
echo Video directory created at: assets\videos\
echo.
echo Please place your video files here:
echo - module1.mp4 (Open Airborne Computing Platforms)
echo - module2.mp4 (UAV Communications and Networking)
echo - module3.mp4 (Networked Control and Co-Design)
echo - module4.mp4 (UAV AI Applications)
echo.
pause
```

**Mac/Linux (setup-videos.sh):**
```bash
#!/bin/bash
echo "Creating video directories..."
mkdir -p assets/videos
echo ""
echo "Video directory created at: assets/videos/"
echo ""
echo "Please place your video files here:"
echo "- module1.mp4 (Open Airborne Computing Platforms)"
echo "- module2.mp4 (UAV Communications and Networking)"
echo "- module3.mp4 (Networked Control and Co-Design)"
echo "- module4.mp4 (UAV AI Applications)"
echo ""
```

---

## 🧪 Testing Your Videos

### Step 1: Place Videos
1. Put your MP4 files in `assets/videos/`
2. Name them: `module1.mp4`, `module2.mp4`, etc.

### Step 2: Update course-data.json
Run this command to update all video URLs at once:

**I'll create an automated script for you in the next step**

### Step 3: Test
1. Make sure your local server is running: `python -m http.server 8000`
2. Go to: http://localhost:8000/index.html
3. Click on a video module
4. Video should play in the browser

---

## 🔧 Troubleshooting

### Video Not Playing
**Problem:** Video shows black screen or "Video format not supported"
**Solution:** 
- Convert video to MP4 (H.264)
- Check file path is correct
- Ensure video file is not corrupted

### Video Too Large
**Problem:** Video takes too long to load
**Solution:**
- Compress video using FFmpeg
- Reduce resolution to 720p
- Use lower bitrate (1000-1500 kbps)

### CORS Error with Local Videos
**Problem:** "Cross-origin request blocked"
**Solution:**
- Make sure you're using `http://localhost:8000` (not `file:///`)
- Videos must be in the same directory structure
- Server must be running

---

## 📝 Complete Example

Here's a complete example of updating one module:

**1. Place video file:**
```
course/assets/videos/module1.mp4
```

**2. Update course-data.json:**
```json
{
  "id": 1,
  "title": "Open Airborne Computing Platforms: Building Modular UAV Systems",
  "description": "Learn how modern drones are designed...",
  "videoUrl": "assets/videos/module1.mp4",
  "duration": "45 min",
  "type": "video"
}
```

**3. Test:**
- Start server: `python -m http.server 8000`
- Open: http://localhost:8000/index.html
- Click on Module 1
- Video should play!

---

## 🎯 Next Steps

1. ✅ Create `assets/videos/` folder
2. ✅ Place your MP4 videos in the folder
3. ✅ Update `course.js` with the new video player code
4. ✅ Update `course-data.json` with local video paths
5. ✅ Test each video module

**Need help? Let me know which option you prefer (Local, Google Drive, or YouTube) and I'll help you set it up!**
