# 📁 Images Folder

Place your course images here.

## Recommended Images

### Instructor Photo
- **Filename:** `instructor.jpg` or `instructor.png`
- **Size:** 400x400px (square)
- **Format:** JPG or PNG
- **Usage:** Displayed in the sidebar instructor card

### Course Thumbnail (Optional)
- **Filename:** `course-thumbnail.jpg`
- **Size:** 1280x720px (16:9 ratio)
- **Format:** JPG
- **Usage:** Can be used for social media sharing

### Module Images (Optional)
- **Filenames:** `module1.jpg`, `module2.jpg`, etc.
- **Size:** 1920x1080px
- **Format:** JPG
- **Usage:** Can be added to module descriptions

### Certificate Logo (Optional)
- **Filename:** `certificate-logo.png`
- **Size:** 200x200px
- **Format:** PNG with transparency
- **Usage:** Can be added to the certificate

## How to Add Images

### 1. Instructor Photo

1. Save your photo as `instructor.jpg` in this folder
2. The platform will automatically use it
3. If it doesn't show, update `course-data.json`:

```json
{
  "instructor": {
    "image": "assets/images/instructor.jpg"
  }
}
```

### 2. Module Images

Add images to module descriptions in `course-data.json`:

```json
{
  "description": "Your description here. <img src='assets/images/module1.jpg' alt='Module 1' style='max-width: 100%; border-radius: 8px; margin: 1rem 0;'>"
}
```

### 3. Course Banner

Add a banner to the welcome modal by editing `index.html`:

```html
<div class="modal-body" id="welcomeText">
    <img src="assets/images/course-banner.jpg" alt="Course Banner" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
</div>
```

## Image Optimization Tips

1. **Compress images** before uploading (use [TinyPNG](https://tinypng.com/))
2. **Use appropriate formats:**
   - JPG for photos
   - PNG for graphics with transparency
   - WebP for best compression (modern browsers)
3. **Resize images** to the recommended dimensions
4. **Use descriptive filenames:** `uav-drone-system.jpg` not `img1.jpg`

## Current Structure

```
assets/
└── images/
    ├── README.md (this file)
    ├── instructor.jpg (add your photo here)
    ├── course-thumbnail.jpg (optional)
    ├── module1.jpg (optional)
    ├── module2.jpg (optional)
    ├── module3.jpg (optional)
    └── module4.jpg (optional)
```

## Need Help?

If images aren't showing:
1. Check the file path is correct
2. Ensure the filename matches exactly (case-sensitive)
3. Clear browser cache (Ctrl+F5)
4. Check browser console (F12) for errors
