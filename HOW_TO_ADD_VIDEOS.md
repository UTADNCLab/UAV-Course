# 📹 How to Add Your Videos to the Course

This guide shows you exactly how to add your 4 UAV course videos to the platform.

## 🎯 Quick Overview

You have **3 options** for adding videos:
1. **YouTube** (Recommended - Easy & Free)
2. **Vimeo** (Professional option)
3. **Local Files** (Videos stored on your server)

---

## ✅ Option 1: YouTube Videos (RECOMMENDED)

### Why YouTube?
- ✅ Free hosting
- ✅ Reliable streaming
- ✅ Automatic quality adjustment
- ✅ Works on all devices
- ✅ No bandwidth costs

### Step-by-Step Instructions:

#### 1. Upload Your Videos to YouTube

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Click "CREATE" → "Upload videos"
3. Upload your 4 module videos:
   - Module 1: Open Airborne Computing Platforms
   - Module 2: UAV Communications and Networking
   - Module 3: Networked Control and Co-Design
   - Module 4: UAV AI Applications

#### 2. Set Video Privacy

For each video, choose:
- **Public** - Anyone can find and watch
- **Unlisted** - Only people with the link can watch (RECOMMENDED for courses)
- **Private** - Only you can watch

**Recommendation:** Use "Unlisted" so only your students can access them.

#### 3. Get the Video ID

After uploading, your video URL will look like:
```
https://www.youtube.com/watch?v=ABC123XYZ456
```

The Video ID is: `ABC123XYZ456` (the part after `v=`)

#### 4. Update course-data.json

Open `course-platform/data/course-data.json` and find the video modules:

**Module 1 (Line ~50):**
```json
{
  "id": 1,
  "title": "Open Airborne Computing Platforms: Building Modular UAV Systems",
  "videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
  "duration": "45 min",
  "type": "video"
}
```

Replace `YOUR_VIDEO_ID_HERE` with your actual video ID:
```json
"videoUrl": "https://www.youtube.com/embed/ABC123XYZ456"
```

**Repeat for all 4 video modules:**
- Module 1 (id: 1) - Line ~50
- Module 2 (id: 3) - Line ~120
- Module 3 (id: 5) - Line ~190
- Module 4 (id: 7) - Line ~260

#### 5. Test Your Videos

1. Save `course-data.json`
2. Open `landing.html` in your browser
3. Click "Start Learning"
4. Check if videos play correctly

---

## 🎬 Option 2: Vimeo Videos

### Why Vimeo?
- ✅ Professional appearance
- ✅ No ads
- ✅ Better privacy controls
- ✅ Higher quality
- ❌ Requires paid account for more storage

### Step-by-Step Instructions:

#### 1. Upload to Vimeo

1. Go to [Vimeo](https://vimeo.com/)
2. Sign up/Login
3. Click "New video" → Upload your videos
4. Set privacy to "Hide from Vimeo"

#### 2. Get the Embed Code

1. Click on your video
2. Click "Share" button
3. Copy the embed URL (looks like: `https://player.vimeo.com/video/123456789`)

#### 3. Update course-data.json

```json
{
  "id": 1,
  "videoUrl": "https://player.vimeo.com/video/123456789",
  "duration": "45 min",
  "type": "video"
}
```

---

## 💾 Option 3: Local Video Files

### Why Local Files?
- ✅ Complete control
- ✅ No third-party dependencies
- ✅ Works offline
- ❌ Requires web hosting
- ❌ Uses your bandwidth
- ❌ Larger file sizes

### Step-by-Step Instructions:

#### 1. Prepare Your Videos

**Recommended format:**
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 (1080p) or 1280x720 (720p)
- Bitrate: 5-8 Mbps for 1080p, 2.5-4 Mbps for 720p

**Compress your videos** (to reduce file size):
- Use [HandBrake](https://handbrake.fr/) (Free)
- Or [Adobe Media Encoder](https://www.adobe.com/products/media-encoder.html)

#### 2. Create Videos Folder

Create this folder structure:
```
course-platform/
└── assets/
    └── videos/
        ├── module1.mp4
        ├── module2.mp4
        ├── module3.mp4
        └── module4.mp4
```

#### 3. Copy Your Videos

Copy your 4 video files to `course-platform/assets/videos/`

Name them clearly:
- `module1.mp4` - Open Airborne Computing Platforms
- `module2.mp4` - UAV Communications and Networking
- `module3.mp4` - Networked Control and Co-Design
- `module4.mp4` - UAV AI Applications

#### 4. Update course-data.json

```json
{
  "id": 1,
  "videoUrl": "assets/videos/module1.mp4",
  "duration": "45 min",
  "type": "video"
}
```

#### 5. Modify index.html for Local Videos

Since local videos use `<video>` tag instead of `<iframe>`, you need to update the HTML.

Open `course-platform/index.html` and find this section (around line 120):

**Replace this:**
```html
<div class="video-container">
    <iframe id="videoPlayer" 
            src="" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
    </iframe>
</div>
```

**With this:**
```html
<div class="video-container">
    <video id="videoPlayer" controls style="width: 100%; height: 100%;">
        <source src="" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>
```

#### 6. Update course.js

Open `course-platform/js/course.js` and find the `loadVideoModule` function (around line 100).

**Find this line:**
```javascript
document.getElementById('videoPlayer').src = module.videoUrl;
```

**Replace with:**
```javascript
const videoPlayer = document.getElementById('videoPlayer');
if (videoPlayer.tagName === 'VIDEO') {
    videoPlayer.querySelector('source').src = module.videoUrl;
    videoPlayer.load();
} else {
    videoPlayer.src = module.videoUrl;
}
```

---

## 📊 Comparison Table

| Feature | YouTube | Vimeo | Local Files |
|---------|---------|-------|-------------|
| **Cost** | Free | Free/Paid | Hosting cost |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Quality** | Good | Excellent | Depends |
| **Privacy** | Unlisted option | Better control | Full control |
| **Bandwidth** | YouTube's | Vimeo's | Your server's |
| **Setup Time** | 10 minutes | 15 minutes | 30 minutes |
| **Best For** | Most users | Professionals | Advanced users |

---

## 🎯 Recommended Approach

### For Most Users:
**Use YouTube with Unlisted videos**

1. Upload all 4 videos to YouTube
2. Set them as "Unlisted"
3. Get the video IDs
4. Update `course-data.json`
5. Done! ✅

### Example course-data.json Update:

```json
{
  "modules": [
    {
      "id": 1,
      "title": "Open Airborne Computing Platforms: Building Modular UAV Systems",
      "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "duration": "45 min",
      "type": "video"
    },
    {
      "id": 2,
      "title": "Quiz 1: Open Airborne Computing Platforms",
      "type": "quiz",
      "questions": [...]
    },
    {
      "id": 3,
      "title": "UAV Communications and Networking",
      "videoUrl": "https://www.youtube.com/embed/ANOTHER_VIDEO_ID",
      "duration": "50 min",
      "type": "video"
    }
  ]
}
```

---

## 🔧 Troubleshooting

### Video Not Playing?

**Problem:** Black screen or "Video unavailable"

**Solutions:**
1. Check if video ID is correct
2. Verify video is not set to "Private"
3. Make sure you're using the embed URL format
4. Clear browser cache (Ctrl+F5)

### Video Too Slow?

**Problem:** Video buffers constantly

**Solutions:**
1. Use YouTube (better CDN)
2. Compress your local videos
3. Lower video quality in settings

### Can't See Video?

**Problem:** Video player doesn't appear

**Solutions:**
1. Check browser console (F12) for errors
2. Verify JSON syntax is correct
3. Make sure videoUrl is properly formatted

---

## 📝 Quick Checklist

Before going live, verify:

- [ ] All 4 videos are uploaded
- [ ] Video IDs are correct in course-data.json
- [ ] Videos play in the course platform
- [ ] Video quality is acceptable
- [ ] Privacy settings are correct (Unlisted for YouTube)
- [ ] All videos have proper titles and descriptions
- [ ] Duration is accurate for each video

---

## 💡 Pro Tips

1. **Video Length:** Keep videos between 30-60 minutes for best engagement
2. **Quality:** Use at least 720p resolution
3. **Audio:** Ensure clear audio with no background noise
4. **Captions:** Add subtitles/captions for accessibility
5. **Thumbnails:** Create custom thumbnails for better appearance
6. **Testing:** Always test videos before sharing with students

---

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console (F12) for error messages
2. Verify your JSON syntax at [JSONLint](https://jsonlint.com/)
3. Test with a single video first before adding all 4
4. Make sure you're using the correct URL format

---

## 📧 Example Email to Students

Once your videos are uploaded, you can send this to students:

```
Subject: Your UAV Design Course is Ready!

Hi [Student Name],

Your course "UAV Design: Foundations of Cyber-Physical Systems" is now live!

Access it here: [YOUR_COURSE_URL]

The course includes:
✅ 4 comprehensive video modules
✅ 4 interactive quizzes (8 questions each)
✅ Progress tracking
✅ Certificate of completion

Start learning today!

Best regards,
Dr. Yan Wan, Dr. Junfei Xie, Dr. Kejie Lu, Dr. Shengli Fu
```

---

**You're all set! Upload your videos and start teaching! 🚀**
