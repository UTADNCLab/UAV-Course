# 🚁 UAV Computing & Networking Course Platform

A professional, interactive online course platform built with HTML, CSS, and JavaScript. Features video lessons, quizzes, progress tracking, and certificate generation.

## 📋 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [How to Edit Course Content](#how-to-edit-course-content)
- [Adding/Changing Videos](#addingchanging-videos)
- [Editing Quiz Questions](#editing-quiz-questions)
- [Customizing Styling](#customizing-styling)
- [Progress Tracking](#progress-tracking)
- [Certificate Generation](#certificate-generation)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### 🎥 Video Learning
- Wide, responsive video player
- Support for YouTube, Vimeo, and local videos
- Module descriptions and metadata
- Progress tracking per video

### 📝 Interactive Quizzes
- Multiple choice questions
- Instant feedback with explanations
- Pass/fail system (70% required)
- Retry option for failed quizzes
- Score tracking and analytics

### 📊 Progress Tracking
- Visual progress bars
- Module completion checkmarks
- Time spent tracking
- Learning streak counter
- Achievement system

### 🏆 Certificate Generation
- Automatic certificate upon course completion
- Personalized with student name
- Professional design
- Downloadable

### 📱 Responsive Design
- Mobile-friendly interface
- Collapsible sidebar on mobile
- Touch-optimized controls
- Works on all devices

### 🎨 Modern UI
- Udemy-inspired design
- Smooth animations
- Professional color scheme
- Clean typography

## 🚀 Getting Started

### Option 1: Open Directly in Browser

1. Navigate to the `course-platform` folder
2. Double-click `index.html`
3. The course will open in your default browser

### Option 2: Use a Local Server (Recommended)

Using a local server prevents CORS issues when loading JSON data.

**Using Python:**
```bash
cd course-platform
python -m http.server 8000
```
Then open: `http://localhost:8000`

**Using Node.js (http-server):**
```bash
npm install -g http-server
cd course-platform
http-server
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

## 📝 How to Edit Course Content

All course content is stored in `data/course-data.json`. This makes it easy to update without touching the code.

### Editing Course Information

Open `data/course-data.json` and modify the `course` section:

```json
{
  "course": {
    "title": "Your Course Title",
    "subtitle": "Your Course Subtitle",
    "description": "Your detailed course description...",
    "welcomeMessage": "Your welcome message...",
    "congratulationsMessage": "Your completion message...",
    "learningOutcomes": [
      "Outcome 1",
      "Outcome 2"
    ],
    "prerequisites": [
      "Prerequisite 1",
      "Prerequisite 2"
    ],
    "targetAudience": [
      "Audience 1",
      "Audience 2"
    ]
  }
}
```

### Editing Instructor Information

```json
{
  "instructor": {
    "name": "Your Name",
    "title": "Your Title",
    "bio": "Your bio...",
    "image": "assets/images/instructor.jpg"
  }
}
```

## 🎥 Adding/Changing Videos

### Using YouTube Videos

1. Get the YouTube video ID from the URL
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ`

2. Update the module in `course-data.json`:

```json
{
  "id": 1,
  "title": "Your Video Title",
  "description": "Your video description...",
  "videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  "duration": "45 min",
  "type": "video"
}
```

### Using Vimeo Videos

```json
{
  "videoUrl": "https://player.vimeo.com/video/YOUR_VIDEO_ID"
}
```

### Using Local Video Files

1. Create a `videos` folder inside `assets`:
   ```
   course-platform/
   └── assets/
       └── videos/
           └── module1.mp4
   ```

2. Update the module:

```json
{
  "videoUrl": "assets/videos/module1.mp4"
}
```

**Note:** For local videos, you'll need to modify the HTML to use a `<video>` tag instead of `<iframe>`. Contact me if you need help with this.

## 📝 Editing Quiz Questions

Each quiz module in `course-data.json` has a `questions` array:

```json
{
  "id": 2,
  "title": "Quiz 1: Module Name",
  "description": "Test your understanding...",
  "type": "quiz",
  "questions": [
    {
      "question": "Your question here?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": 1,
      "explanation": "Explanation of the correct answer..."
    }
  ]
}
```

### Important Notes:
- `correctAnswer` is the **index** of the correct option (0, 1, 2, or 3)
- Option 0 = first option, Option 1 = second option, etc.
- Always provide an explanation for learning purposes

### Adding More Questions

Simply add more question objects to the `questions` array:

```json
{
  "questions": [
    {
      "question": "Question 1?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "Explanation..."
    },
    {
      "question": "Question 2?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 2,
      "explanation": "Explanation..."
    }
  ]
}
```

## 🎨 Customizing Styling

### Changing Colors

Open `css/styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #5624d0;        /* Main brand color */
    --primary-dark: #401b9c;         /* Darker shade */
    --primary-light: #7c4dff;        /* Lighter shade */
    --accent-color: #f3722c;         /* Accent color */
    --success-color: #28a745;        /* Success messages */
    --text-primary: #1c1d1f;         /* Main text color */
    --bg-primary: #ffffff;           /* Background color */
}
```

### Changing Fonts

Add your font import at the top of `styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
    font-family: 'Your Font', sans-serif;
}
```

### Modifying Layout

- **Sidebar width:** Search for `.sidebar { width: 350px; }` in `styles.css`
- **Video aspect ratio:** Modify `.video-container { padding-bottom: 56.25%; }` (56.25% = 16:9)
- **Content width:** Change `.main-container { max-width: 1400px; }`

## 📊 Progress Tracking

Progress is automatically saved to the browser's localStorage:

- **Completed modules** are tracked
- **Quiz scores** are saved
- **Time spent** is recorded
- **Learning streak** is maintained

### Resetting Progress

Users can reset their progress by opening the browser console (F12) and typing:

```javascript
resetProgress()
```

### Exporting Progress

Add this button to your HTML if you want users to export their progress:

```javascript
downloadProgress()  // In browser console
```

## 🏆 Certificate Generation

Certificates are automatically generated when a student completes all modules.

### Customizing the Certificate

Edit the certificate template in `index.html`:

```html
<div id="certificateTemplate" style="display: none;">
    <!-- Modify the certificate design here -->
</div>
```

### Certificate Download

The certificate can be downloaded as an image. For better quality, you can integrate `html2canvas`:

Add this before the closing `</body>` tag in `index.html`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

## 🌐 Deployment

### GitHub Pages

1. Create a GitHub repository
2. Upload all files from `course-platform` folder
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify

1. Drag and drop the `course-platform` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site is instantly live!

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to `course-platform` folder
3. Run: `vercel`
4. Follow the prompts

### Traditional Web Hosting

Upload all files from `course-platform` folder to your web host via FTP.

## 🔧 Troubleshooting

### Videos Not Loading

**Problem:** Videos show a blank screen

**Solutions:**
- Check if the video URL is correct
- Ensure you're using the embed URL (not the watch URL)
- For YouTube: Use `https://www.youtube.com/embed/VIDEO_ID`
- For local videos, use a local server (not file://)

### JSON Data Not Loading

**Problem:** Course content doesn't appear

**Solutions:**
- Use a local server instead of opening the file directly
- Check browser console (F12) for errors
- Verify `course-data.json` is valid JSON (use [JSONLint](https://jsonlint.com/))

### Progress Not Saving

**Problem:** Progress resets on page reload

**Solutions:**
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Check browser console for errors

### Mobile Menu Not Working

**Problem:** Sidebar doesn't open on mobile

**Solutions:**
- Clear browser cache
- Check if JavaScript is enabled
- Try a different browser

### Certificate Not Downloading

**Problem:** Certificate download doesn't work

**Solutions:**
- Add the html2canvas library (see Certificate Generation section)
- Allow pop-ups in your browser
- Try right-clicking and "Save image as..."

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Adding More Modules

To add more video/quiz modules:

1. Open `data/course-data.json`
2. Add a new module object to the `modules` array:

```json
{
  "id": 9,
  "title": "New Module Title",
  "description": "Module description...",
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "duration": "30 min",
  "type": "video"
}
```

3. Add a corresponding quiz:

```json
{
  "id": 10,
  "title": "Quiz 5: New Module",
  "description": "Test your knowledge...",
  "type": "quiz",
  "questions": [...]
}
```

The platform will automatically update!

## 💡 Tips for Best Results

1. **Video Quality:** Use 1080p videos for best viewing experience
2. **Quiz Design:** Keep questions clear and concise
3. **Explanations:** Always provide detailed explanations for quiz answers
4. **Module Length:** Keep videos between 30-60 minutes for optimal engagement
5. **Testing:** Test on multiple devices before deploying

## 🆘 Need Help?

If you encounter any issues or need customization:

1. Check the browser console (F12) for error messages
2. Verify all file paths are correct
3. Ensure JSON syntax is valid
4. Test in a different browser

## 📄 License

This course platform is provided as-is for educational purposes.

## 🎓 Credits

Built with:
- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

---

**Happy Teaching! 🚀**

For questions or support, refer to the troubleshooting section above.
