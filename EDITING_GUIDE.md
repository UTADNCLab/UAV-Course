# ✏️ Complete Editing Guide - UAV Course Platform

This guide shows you exactly how to customize every aspect of your course.

## 📋 Table of Contents

1. [Editing Course Data](#editing-course-data)
2. [Video Management](#video-management)
3. [Quiz Customization](#quiz-customization)
4. [Styling Changes](#styling-changes)
5. [Advanced Customization](#advanced-customization)

---

## 1️⃣ Editing Course Data

All course content is in `data/course-data.json`. Open it with any text editor.

### Course Title & Description

```json
{
  "course": {
    "title": "UAV - Computing & Networking: From Basics to Advanced",
    "subtitle": "Master the foundations of UAV computing, networking, and AI-based control",
    "description": "Your full course description here..."
  }
}
```

**To Edit:**
1. Open `data/course-data.json`
2. Find the `"course"` section
3. Change the text between the quotes
4. Save the file
5. Refresh your browser

### Welcome & Congratulations Messages

```json
{
  "course": {
    "welcomeMessage": "Hello and welcome to...",
    "congratulationsMessage": "Congratulations on completing..."
  }
}
```

**Tips:**
- Keep welcome message friendly and encouraging
- Congratulations message should celebrate achievement
- Use `\n\n` for paragraph breaks in JSON

### Learning Outcomes

```json
{
  "learningOutcomes": [
    "Fundamentals of UAV systems",
    "The concept of an Open Airborne Computing Platform",
    "Basics of UAV communication"
  ]
}
```

**To Add More:**
```json
{
  "learningOutcomes": [
    "Existing outcome 1",
    "Existing outcome 2",
    "NEW OUTCOME HERE",
    "Another new outcome"
  ]
}
```

### Prerequisites

```json
{
  "prerequisites": [
    "Basic understanding of computer networks",
    "Familiarity with electronics"
  ]
}
```

**To Edit:**
- Add or remove items from the array
- Keep them realistic and helpful
- Don't make them too restrictive

### Target Audience

```json
{
  "targetAudience": [
    "Students in Electrical Engineering",
    "Researchers exploring drone technology",
    "Hobbyists and drone enthusiasts"
  ]
}
```

---

## 2️⃣ Video Management

### Current Video Structure

Each video module looks like this:

```json
{
  "id": 1,
  "title": "Open Airborne Computing Platforms",
  "description": "Learn how modern drones are designed...",
  "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "duration": "45 min",
  "type": "video"
}
```

### Adding Your YouTube Videos

**Step 1: Get Video ID**
- Your video URL: `https://www.youtube.com/watch?v=ABC123XYZ`
- Video ID is: `ABC123XYZ`

**Step 2: Create Embed URL**
- Format: `https://www.youtube.com/embed/ABC123XYZ`

**Step 3: Update JSON**
```json
{
  "videoUrl": "https://www.youtube.com/embed/ABC123XYZ"
}
```

### Using Vimeo Videos

```json
{
  "videoUrl": "https://player.vimeo.com/video/123456789"
}
```

### Using Local Video Files

**Step 1: Create videos folder**
```
course-platform/
└── assets/
    └── videos/
        ├── module1.mp4
        ├── module2.mp4
        └── module3.mp4
```

**Step 2: Update JSON**
```json
{
  "videoUrl": "assets/videos/module1.mp4"
}
```

**Step 3: Modify HTML** (for local videos only)

In `index.html`, find the video player section and replace the iframe with:

```html
<video id="videoPlayer" controls style="width: 100%; height: 100%;">
    <source src="" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

Then in `js/course.js`, find this line:
```javascript
document.getElementById('videoPlayer').src = module.videoUrl;
```

And replace with:
```javascript
const videoPlayer = document.getElementById('videoPlayer');
if (videoPlayer.tagName === 'VIDEO') {
    videoPlayer.querySelector('source').src = module.videoUrl;
    videoPlayer.load();
} else {
    videoPlayer.src = module.videoUrl;
}
```

### Changing Video Duration

```json
{
  "duration": "45 min"  // Change to any text: "1 hour", "30 minutes", etc.
}
```

### Changing Video Descriptions

```json
{
  "description": "Your new description here. You can make it as long as needed. Include key points students should know before watching."
}
```

---

## 3️⃣ Quiz Customization

### Quiz Structure

```json
{
  "id": 2,
  "title": "Quiz 1: Open Airborne Computing Platforms",
  "description": "Test your understanding...",
  "type": "quiz",
  "questions": [
    {
      "question": "What is the primary advantage?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": 1,
      "explanation": "Explanation here..."
    }
  ]
}
```

### Adding New Questions

Copy this template and add to the `questions` array:

```json
{
  "question": "Your question here?",
  "options": [
    "First option",
    "Second option",
    "Third option",
    "Fourth option"
  ],
  "correctAnswer": 0,
  "explanation": "Detailed explanation of why this is correct and why others are wrong."
}
```

**Important:**
- `correctAnswer` is the index (0, 1, 2, or 3)
- 0 = first option, 1 = second option, etc.
- Always provide a clear explanation

### Editing Existing Questions

1. Find the question in `course-data.json`
2. Edit the text between quotes
3. To change correct answer, change the number (0-3)
4. Update explanation if needed

### Changing Pass Score

Open `js/quiz.js` and find:

```javascript
const passed = percentage >= 70;
```

Change `70` to your desired percentage (e.g., `80` for 80%)

Also update the quiz intro text in `index.html`:

```html
<li><i class="fas fa-check"></i> Pass score: 70% (3 out of 4)</li>
```

### Quiz Question Types

**Current:** Multiple choice only

**To add True/False:**
```json
{
  "question": "UAVs can only fly during daytime. True or False?",
  "options": [
    "True",
    "False"
  ],
  "correctAnswer": 1,
  "explanation": "False. UAVs can fly at night with proper lighting and permissions."
}
```

---

## 4️⃣ Styling Changes

### Changing Colors

Open `css/styles.css` and find the `:root` section:

```css
:root {
    --primary-color: #5624d0;      /* Main purple */
    --primary-dark: #401b9c;       /* Darker purple */
    --primary-light: #7c4dff;      /* Lighter purple */
    --accent-color: #f3722c;       /* Orange accent */
    --success-color: #28a745;      /* Green for success */
}
```

**Popular Color Schemes:**

**Blue Theme:**
```css
--primary-color: #0066cc;
--primary-dark: #004499;
--primary-light: #3399ff;
```

**Green Theme:**
```css
--primary-color: #28a745;
--primary-dark: #1e7e34;
--primary-light: #48c774;
```

**Red Theme:**
```css
--primary-color: #dc3545;
--primary-dark: #c82333;
--primary-light: #e4606d;
```

### Changing Fonts

**Step 1:** Add font import at top of `css/styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
```

**Step 2:** Update body font:

```css
body {
    font-family: 'Poppins', sans-serif;
}
```

**Popular Fonts:**
- Poppins (modern, clean)
- Roboto (professional)
- Open Sans (readable)
- Montserrat (bold, modern)
- Lato (friendly)

### Changing Layout Width

Find in `css/styles.css`:

```css
.main-container {
    max-width: 1400px;  /* Change this */
}
```

**Recommendations:**
- 1200px - Compact
- 1400px - Default (balanced)
- 1600px - Wide
- 100% - Full width

### Changing Sidebar Width

```css
.sidebar {
    width: 350px;  /* Change this */
}
```

### Changing Video Aspect Ratio

```css
.video-container {
    padding-bottom: 56.25%;  /* 16:9 ratio */
}
```

**Other ratios:**
- 75% = 4:3 ratio
- 56.25% = 16:9 ratio (default)
- 42.86% = 21:9 ratio (ultrawide)

---

## 5️⃣ Advanced Customization

### Adding a Logo

**Step 1:** Add logo image to `assets/images/logo.png`

**Step 2:** In `index.html`, find the header and add:

```html
<div class="header-content">
    <img src="assets/images/logo.png" alt="Logo" style="height: 40px; margin-right: 1rem;">
    <h1><i class="fas fa-drone"></i> UAV Course Platform</h1>
</div>
```

### Adding Social Share Buttons

Add this to `index.html` after the course description:

```html
<div class="social-share">
    <h3>Share this course:</h3>
    <a href="https://twitter.com/intent/tweet?text=Check out this UAV course!" target="_blank">
        <i class="fab fa-twitter"></i> Twitter
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank">
        <i class="fab fa-facebook"></i> Facebook
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=YOUR_URL" target="_blank">
        <i class="fab fa-linkedin"></i> LinkedIn
    </a>
</div>
```

### Adding Google Analytics

Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Adding a Comments Section

Add this where you want comments in `index.html`:

```html
<div id="disqus_thread"></div>
<script>
    var disqus_config = function () {
        this.page.url = window.location.href;
        this.page.identifier = 'uav-course';
    };
    (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://YOUR-DISQUS-SHORTNAME.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
```

### Adding More Modules

To add a 5th video and quiz:

**Step 1:** Add video module to `course-data.json`:

```json
{
  "id": 9,
  "title": "Advanced UAV Topics",
  "description": "Explore cutting-edge UAV technologies...",
  "videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  "duration": "50 min",
  "type": "video"
}
```

**Step 2:** Add quiz module:

```json
{
  "id": 10,
  "title": "Quiz 5: Advanced UAV Topics",
  "description": "Test your advanced knowledge...",
  "type": "quiz",
  "questions": [
    {
      "question": "Your question?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "Explanation..."
    }
  ]
}
```

The platform will automatically update!

---

## 🎯 Quick Reference

### File Locations

- **Course Content:** `data/course-data.json`
- **Styling:** `css/styles.css`
- **Main Logic:** `js/course.js`
- **Quiz Logic:** `js/quiz.js`
- **Progress:** `js/progress.js`
- **Images:** `assets/images/`
- **Videos:** `assets/videos/` (if local)

### Common Edits

| What to Change | File | Search For |
|----------------|------|------------|
| Course title | course-data.json | `"title"` |
| Video URL | course-data.json | `"videoUrl"` |
| Quiz questions | course-data.json | `"questions"` |
| Colors | styles.css | `:root` |
| Fonts | styles.css | `font-family` |
| Pass score | quiz.js | `>= 70` |

### Testing Checklist

After making changes:

- [ ] Refresh browser (Ctrl+F5)
- [ ] Check browser console for errors (F12)
- [ ] Test on mobile device
- [ ] Verify all videos load
- [ ] Complete a quiz
- [ ] Check progress saves
- [ ] Test certificate generation

---

## 💡 Pro Tips

1. **Always backup** `course-data.json` before editing
2. **Validate JSON** at [jsonlint.com](https://jsonlint.com/) after changes
3. **Test incrementally** - make one change at a time
4. **Use browser console** (F12) to debug issues
5. **Clear cache** (Ctrl+F5) after CSS changes

## 🆘 Common Mistakes

### JSON Syntax Errors

**Wrong:**
```json
{
  "title": "My Course"  // Missing comma
  "subtitle": "Learn UAV"
}
```

**Correct:**
```json
{
  "title": "My Course",
  "subtitle": "Learn UAV"
}
```

### Incorrect Video URLs

**Wrong:**
```json
"videoUrl": "https://www.youtube.com/watch?v=ABC123"
```

**Correct:**
```json
"videoUrl": "https://www.youtube.com/embed/ABC123"
```

### Wrong correctAnswer Index

**Wrong:**
```json
{
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 4  // Out of range!
}
```

**Correct:**
```json
{
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0  // 0-3 only
}
```

---

**Happy Editing! 🎨**

Need more help? Check `README.md` or `QUICK_START.md`
