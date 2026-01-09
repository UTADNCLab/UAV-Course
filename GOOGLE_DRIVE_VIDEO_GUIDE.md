# 🎥 Upload Videos to Google Drive (Private & Secure)

## ✅ Why Google Drive?
- ✅ **Private** - Only people with the link can access
- ✅ **Free** - 15GB free storage
- ✅ **No public listing** - Videos won't appear in search
- ✅ **Easy embedding** - Works directly in your course
- ✅ **Your control** - You can revoke access anytime

---

## 📋 Step-by-Step Instructions

### Step 1: Upload Videos to Google Drive

1. **Go to Google Drive:** https://drive.google.com
2. **Click "New" → "File upload"**
3. **Select your 4 video files:**
   - Part_1_upd.mp4
   - UAV_Part_2_AIrborne_Networking.mp4
   - Part_3.mp4
   - Part_4.mp4
4. **Wait for upload to complete** (may take 10-30 minutes depending on file size)

---

### Step 2: Get Shareable Links for Each Video

**For EACH video file:**

1. **Right-click on the video** → Select "Share"
2. **Click "Change to anyone with the link"**
3. **Set permission to "Viewer"** (not Editor)
4. **Copy the link** - it will look like:
   ```
   https://drive.google.com/file/d/1ABC123XYZ456/view?usp=sharing
   ```
5. **Extract the FILE_ID** from the link:
   - The FILE_ID is the part between `/d/` and `/view`
   - Example: `1ABC123XYZ456`

---

### Step 3: Convert to Embed URLs

For each video, convert the Google Drive link to an embed URL:

**Format:**
```
https://drive.google.com/file/d/FILE_ID/preview
```

**Example:**
- Original link: `https://drive.google.com/file/d/1ABC123XYZ456/view?usp=sharing`
- Embed URL: `https://drive.google.com/file/d/1ABC123XYZ456/preview`

---

### Step 4: Give Me Your Embed URLs

Once you have all 4 embed URLs, provide them to me in this format:

```
Module 1: https://drive.google.com/file/d/YOUR_FILE_ID_1/preview
Module 2: https://drive.google.com/file/d/YOUR_FILE_ID_2/preview
Module 3: https://drive.google.com/file/d/YOUR_FILE_ID_3/preview
Module 4: https://drive.google.com/file/d/YOUR_FILE_ID_4/preview
```

I'll then update the course-data.json file with these URLs.

---

## 🎯 Quick Checklist

- [ ] Upload Part_1_upd.mp4 to Google Drive
- [ ] Upload UAV_Part_2_AIrborne_Networking.mp4 to Google Drive
- [ ] Upload Part_3.mp4 to Google Drive
- [ ] Upload Part_4.mp4 to Google Drive
- [ ] Set each video to "Anyone with the link can view"
- [ ] Copy FILE_ID from each video's share link
- [ ] Convert to embed URLs (replace `/view` with `/preview`)
- [ ] Provide all 4 embed URLs to me

---

## 📝 Example

**Video 1 - Part_1_upd.mp4:**
1. Upload to Drive ✅
2. Share link: `https://drive.google.com/file/d/1XyZ789AbC123/view?usp=sharing`
3. Extract FILE_ID: `1XyZ789AbC123`
4. Embed URL: `https://drive.google.com/file/d/1XyZ789AbC123/preview`

**Repeat for all 4 videos!**

---

## ⚠️ Important Notes

1. **Don't make videos "Public"** - Use "Anyone with the link" instead
2. **Keep the FILE_IDs safe** - Anyone with the link can watch
3. **Test each video** - Click the embed URL to make sure it plays
4. **Storage limit** - Google Drive free tier has 15GB limit

---

## 🚀 What Happens Next

Once you give me the 4 embed URLs:
1. I'll update course-data.json with your Google Drive links
2. Commit and push changes to GitHub
3. Your course will load videos from Google Drive
4. Videos will be private and only accessible through your course

---

## 💡 Alternative: Use Existing Videos Temporarily

If you want to test the course NOW while uploading:
- I can use placeholder videos temporarily
- You replace them with your Google Drive links later
- Course will work immediately

**Would you like me to:**
- **A)** Wait for your Google Drive links (recommended)
- **B)** Use placeholder videos now, you replace later

---

## 🆘 Need Help?

If you have trouble:
1. Make sure videos are uploaded completely
2. Check that sharing is set to "Anyone with the link"
3. Verify the embed URL format is correct
4. Test the embed URL in a browser first

**Ready to upload? Start with Step 1 above!** 🎬
