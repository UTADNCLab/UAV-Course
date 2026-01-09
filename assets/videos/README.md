# 🎥 Video Files Directory

Place your course video files here.

## 📁 Required Video Files:

1. **module1.mp4** - Open Airborne Computing Platforms (45 min)
2. **module2.mp4** - UAV Communications and Networking (50 min)
3. **module3.mp4** - Networked Control and Co-Design (55 min)
4. **module4.mp4** - UAV AI Applications (60 min)

## 📝 File Naming Convention:

- Use lowercase names
- No spaces in filenames
- Format: `moduleX.mp4` where X is the module number

## ✅ Supported Formats:

- **MP4** (H.264) - Recommended ✅
- **WebM** - Alternative
- **OGG** - Alternative

## 📊 Recommended Video Specifications:

- **Resolution:** 1280x720 (720p HD)
- **Codec:** H.264
- **Audio:** AAC
- **Bitrate:** 1000-2000 kbps
- **Frame Rate:** 30 fps
- **File Size:** Under 200 MB per video

## 🔄 How to Convert Videos:

### Using FFmpeg (Free):

```bash
# Convert to MP4
ffmpeg -i input.avi -c:v libx264 -c:a aac output.mp4

# Compress video
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1500k module1.mp4
```

### Online Converters:
- CloudConvert.com
- Online-Convert.com
- Convertio.co

## 📂 Current Status:

- [ ] module1.mp4
- [ ] module2.mp4
- [ ] module3.mp4
- [ ] module4.mp4

## 🚀 After Adding Videos:

1. Place video files in this directory
2. Make sure they're named correctly (module1.mp4, module2.mp4, etc.)
3. Refresh your course page: http://localhost:8000/index.html
4. Videos should play automatically!

## 💡 Tips:

- Keep file sizes reasonable (under 200 MB)
- Use 720p resolution for best balance of quality and size
- Test videos in the browser before deploying
- Consider using YouTube for very large files

## 🆘 Troubleshooting:

**Video not playing?**
- Check file name matches exactly (case-sensitive)
- Ensure video is in MP4 format
- Try converting with FFmpeg
- Check browser console (F12) for errors

**Video too large?**
- Compress using FFmpeg
- Reduce resolution to 720p
- Lower bitrate to 1000-1500 kbps
- Consider uploading to YouTube instead
