# 🚀 Quick Start Guide - UAV Course Platform

Get your course running in 5 minutes!

## ⚡ Fastest Way to Start

### Step 1: Open the Course

**Option A - Direct Open (Simplest):**
1. Navigate to the `course-platform` folder
2. Double-click `index.html`
3. Done! ✅

**Option B - Local Server (Recommended):**
```bash
# If you have Python installed:
cd course-platform
python -m http.server 8000

# Then open: http://localhost:8000
```

### Step 2: Add Your Videos

1. Open `data/course-data.json`
2. Find the `videoUrl` fields
3. Replace with your YouTube video IDs:

```json
"videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID"
```

**How to get YouTube video ID:**
- From URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID is: `dQw4w9WgXcQ`
- Use: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### Step 3: Test It!

1. Refresh the page
2. Click on a module
3. Watch the video
4. Take the quiz
5. Get your certificate! 🎓

## 📝 Quick Edits

### Change Course Title
Open `data/course-data.json` → Find `"title"` → Edit

### Change Instructor Name
Open `data/course-data.json` → Find `"instructor"` → Edit `"name"`

### Add More Quiz Questions
Open `data/course-data.json` → Find `"questions"` → Copy and paste a question block

### Change Colors
Open `css/styles.css` → Find `:root` → Change color values

## 🎯 Common Tasks

### Replace All Videos at Once

1. Open `data/course-data.json`
2. Search for `"videoUrl"`
3. Replace each one with your video links

### Edit Quiz Questions

Find this structure and modify:
```json
{
  "question": "Your question?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "explanation": "Why this is correct..."
}
```

### Change Pass Score

Open `js/quiz.js` → Search for `>= 70` → Change to your desired percentage

## 🎨 Quick Customization

### Change Main Color
```css
/* In css/styles.css */
:root {
    --primary-color: #5624d0;  /* Change this! */
}
```

### Change Logo/Icon
Replace the drone icon in `index.html`:
```html
<i class="fas fa-drone"></i>  <!-- Change to any Font Awesome icon -->
```

## 📱 Test on Mobile

1. Open on your phone's browser
2. Tap the menu button (☰)
3. Navigate through modules
4. Everything should work smoothly!

## 🏆 Enable Certificate Download

Add this line before `</body>` in `index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

## 🌐 Deploy Online (Free)

### Netlify (Easiest):
1. Go to [netlify.com](https://www.netlify.com/)
2. Drag and drop the `course-platform` folder
3. Done! You get a free URL

### GitHub Pages:
1. Create a GitHub account
2. Create a new repository
3. Upload all files
4. Enable GitHub Pages in settings
5. Your site is live!

## ❓ Quick Troubleshooting

**Videos not showing?**
- Check if you're using the embed URL
- Use: `youtube.com/embed/ID` not `youtube.com/watch?v=ID`

**Progress not saving?**
- Make sure you're not in incognito/private mode
- Clear browser cache and try again

**Quiz not working?**
- Check `correctAnswer` is a number (0, 1, 2, or 3)
- Verify JSON syntax is correct

**Mobile menu not opening?**
- Clear browser cache
- Try a different browser

## 💡 Pro Tips

1. **Test First:** Always test changes in a browser before deploying
2. **Backup:** Keep a copy of `course-data.json` before editing
3. **Validate JSON:** Use [jsonlint.com](https://jsonlint.com/) to check for errors
4. **Browser Console:** Press F12 to see any error messages
5. **Mobile First:** Always test on mobile devices

## 📚 Next Steps

Once you're comfortable with the basics:

1. Read the full `README.md` for advanced features
2. Customize the styling to match your brand
3. Add more modules and quizzes
4. Set up analytics (Google Analytics)
5. Add a custom domain

## 🎓 Your Course is Ready!

You now have a professional course platform with:
- ✅ 4 Video Modules
- ✅ 4 Interactive Quizzes
- ✅ Progress Tracking
- ✅ Certificate Generation
- ✅ Mobile Responsive Design
- ✅ Professional UI

**Start teaching and inspire your students! 🚀**

---

Need more help? Check `README.md` for detailed documentation.
