# Running the UAV Course Platform

## Quick Start

### Method 1: Using Python HTTP Server (Recommended for Local Testing)

1. **Open Terminal/Command Prompt** in the course directory
2. **Start the server:**
   ```bash
   python -m http.server 8000
   ```
3. **Open your browser** and go to:
   ```
   http://localhost:8000/index.html
   ```
4. **Keep the terminal open** while using the course
5. **To stop the server:** Press `Ctrl+C` in the terminal

### Method 2: Using Node.js HTTP Server

1. **Install http-server** (one-time setup):
   ```bash
   npm install -g http-server
   ```
2. **Start the server:**
   ```bash
   http-server -p 8000
   ```
3. **Open:** `http://localhost:8000/index.html`

### Method 3: Deploy to GitHub Pages (For Production)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy course"
   git push origin main
   ```
2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "main" branch
   - Save
3. **Access at:** `https://yourusername.github.io/repository-name/`

## Features

### ✅ Fully Responsive Design
- **Desktop (1400px+):** Full layout with sidebar
- **Tablet (768px-1024px):** Stacked layout, collapsible sections
- **Mobile (< 768px):** Optimized for small screens
- **Landscape Mode:** Adjusted video player ratio

### ✅ Video Player Features
- **Fullscreen Support:** Click fullscreen button in video player
- **Subtitles/CC:** Supported through YouTube's built-in controls
- **Playback Controls:** Play, pause, volume, quality settings
- **Cross-browser:** Works on Chrome, Firefox, Safari, Edge
- **Mobile-friendly:** Touch controls enabled

### ✅ Authentication
- **Login Persistence:** Stay logged in across sessions
- **Forgot Password:** Email-based password reset
- **User Registration:** Create new accounts
- **Secure Storage:** LocalStorage-based authentication

### ✅ Course Navigation
- **Collapsible Sections:** Click to expand/collapse modules
- **Progress Tracking:** Visual progress bar
- **Auto-expand:** Current module section opens automatically
- **Completion Markers:** Check marks for completed items

## Browser Compatibility

### Desktop Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Mobile Browsers
- ✅ Chrome Mobile
- ✅ Safari iOS
- ✅ Firefox Mobile
- ✅ Samsung Internet

### Tablet Browsers
- ✅ iPad Safari
- ✅ Android Chrome
- ✅ Surface Edge

## Screen Size Support

| Device Type | Screen Size | Layout |
|------------|-------------|---------|
| Desktop | 1400px+ | Full 2-column layout |
| Laptop | 1024px-1399px | Full 2-column layout |
| Tablet | 768px-1023px | Stacked single column |
| Mobile | 480px-767px | Mobile-optimized |
| Small Mobile | < 480px | Compact mobile view |

## Video Features

### Fullscreen Mode
1. Click the fullscreen icon in the video player
2. Press `F` key (on desktop)
3. Double-click the video (on some browsers)
4. Press `Esc` to exit fullscreen

### Subtitles/Closed Captions
- YouTube videos include built-in CC support
- Click the CC button in the video player
- Select your preferred language
- Adjust subtitle size and style in YouTube settings

### Playback Speed
- Click the settings gear icon
- Select "Playback speed"
- Choose from 0.25x to 2x speed

### Quality Settings
- Click the settings gear icon
- Select "Quality"
- Choose resolution (Auto, 1080p, 720p, 480p, etc.)

## Mobile Usage Tips

### Portrait Mode
- Scroll to see full content
- Tap module headers to expand/collapse
- Swipe to navigate between sections

### Landscape Mode
- Optimized video viewing
- Sidebar moves below video
- Better for watching lectures

### Touch Gestures
- **Tap:** Select modules
- **Scroll:** Navigate content
- **Pinch:** Zoom (if needed)
- **Swipe:** Navigate quiz questions

## Troubleshooting

### Issue: Course content not loading
**Solution:** Make sure you're running a local server (not opening file:// directly)

### Issue: Videos not playing
**Solution:** 
- Check internet connection
- Ensure YouTube is not blocked
- Try a different browser

### Issue: Login not persisting
**Solution:**
- Check browser allows localStorage
- Clear browser cache and try again
- Ensure cookies are enabled

### Issue: Mobile layout issues
**Solution:**
- Refresh the page
- Clear browser cache
- Update to latest browser version

### Issue: Fullscreen not working
**Solution:**
- Check browser permissions
- Try different browser
- Use F11 for browser fullscreen

## Performance Tips

### For Best Experience:
1. **Use modern browser** (latest version)
2. **Stable internet** for video streaming
3. **Clear cache** periodically
4. **Close unused tabs** for better performance
5. **Enable hardware acceleration** in browser settings

### For Mobile:
1. **Use WiFi** for video streaming
2. **Close background apps**
3. **Ensure sufficient battery**
4. **Use landscape mode** for videos

## Keyboard Shortcuts

### Video Player
- `Space` - Play/Pause
- `F` - Fullscreen
- `M` - Mute/Unmute
- `←/→` - Seek backward/forward
- `↑/↓` - Volume up/down

### Navigation
- `Tab` - Navigate between elements
- `Enter` - Select/Click
- `Esc` - Close modals

## Data Storage

### What's Stored Locally:
- User authentication data
- Course progress
- Quiz scores
- Completed modules
- User preferences

### Privacy:
- All data stored in browser's localStorage
- No data sent to external servers (except Google Sheets if configured)
- Clear browser data to reset

## Support

### For Issues:
1. Check this guide first
2. Clear browser cache
3. Try different browser
4. Check console for errors (F12)
5. Restart the local server

### For Development:
- See `TESTING_GUIDE.md` for testing procedures
- See `DEPLOYMENT_GUIDE.md` for deployment options
- See `BACKEND_SETUP.md` for Google Sheets integration

## Updates

To get the latest version:
```bash
git pull origin main
```

Then restart your local server.

---

**Enjoy your UAV course! 🚁**
