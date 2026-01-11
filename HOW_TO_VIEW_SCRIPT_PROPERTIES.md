# 📋 How to View Script Properties (Without Code)

## What Are Script Properties?

Script Properties are key-value pairs that store configuration data like:
- API keys
- Spreadsheet IDs
- Email addresses
- Other settings

---

## ✅ How to View Script Properties in Google Apps Script

### Method 1: Project Settings (Where You Are Now!)

You're already in the right place! Here's what to do:

1. **You're in Project Settings** (⚙️ icon)
2. **Scroll down** to the **"Script properties"** section
3. You'll see a table with two columns:
   - **Property** (the name/key)
   - **Value** (the stored value)

### What You'll See:

#### If Properties Exist:
```
┌─────────────────────────────────────────┐
│ Script properties                       │
├─────────────────────────────────────────┤
│ Property          │ Value               │
├───────────────────┼─────────────────────┤
│ SPREADSHEET_ID    │ 1EToB-Hs0GLOnB3E... │
│ ADMIN_EMAIL       │ opencourse.uav@...  │
│ API_KEY           │ ****************    │
└─────────────────────────────────────────┘
```

#### If No Properties Exist:
```
┌─────────────────────────────────────────┐
│ Script properties                       │
├─────────────────────────────────────────┤
│ No properties have been added yet       │
│                                         │
│ [Add script property]                   │
└─────────────────────────────────────────┘
```

---

## 🔍 For Your UAV Course Project:

### You Probably DON'T Need Script Properties

Your current script uses **hardcoded values** instead of script properties:

```javascript
// In your script, you have:
const SPREADSHEET_ID = '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc';

// This is HARDCODED in the script
// NOT stored as a script property
```

### Why You Might See Nothing:

If you see **"No properties have been added yet"** under Script properties, that's **completely normal** for your project because:

1. ✅ Your Spreadsheet ID is hardcoded in the script
2. ✅ Your email addresses are hardcoded in the script
3. ✅ You don't need external API keys
4. ✅ Everything is configured directly in the code

**This is fine! Your script will work perfectly without script properties.**

---

## 📊 What You're Looking For vs What You Need

### What You're Looking For:
- **OAuth Scopes** (email permissions)
- Located: Below "Script properties" section
- Shows: `https://www.googleapis.com/auth/script.send_mail`

### What You Found:
- **Script properties** section (configuration values)
- Shows: Empty or "No properties added"
- This is normal! ✅

### What This Means:
```
Script Properties (Empty) ✅ = Normal, not needed
         +
OAuth Scopes (Empty) ⚠️ = Need to grant permissions
```

---

## 🎯 So What Should You Do?

Since you found:
- ✅ Script properties section (empty - that's fine!)
- ⚠️ Nothing below it (no OAuth Scopes - need permissions!)

**Next step:** Grant email permissions!

### Quick Action:
1. Go to **Editor** (</> icon on left)
2. Follow **GRANT_PERMISSIONS_NOW.md**
3. Run `authorizeEmailSending` function
4. Grant permissions
5. Come back to Project Settings
6. You'll now see OAuth Scopes! ✅

---

## 📋 Visual Guide: What's What

### In Project Settings Page:

```
┌─────────────────────────────────────────┐
│ ⚙️ Project Settings                     │
├─────────────────────────────────────────┤
│                                         │
│ Time zone: Central Time                 │
│ ☑ Log exceptions                        │
│ ☑ Enable Chrome V8                      │
│                                         │
├─────────────────────────────────────────┤
│ IDs                                     │
│ Script ID: 1Q6fv5xthn...                │
├─────────────────────────────────────────┤
│ Google Cloud Platform                   │
│ GCP: Default                            │
├─────────────────────────────────────────┤
│ Script properties  ← YOU ARE HERE       │
│ (Empty or has values)                   │
│ ✅ This is fine either way!             │
├─────────────────────────────────────────┤
│ OAuth Scopes  ← WHAT YOU NEED           │
│ (Empty = need permissions)              │
│ ⚠️ This needs to have email scope!      │
└─────────────────────────────────────────┘
```

---

## ❓ FAQ

### Q: Should I add script properties?
**A:** No! Your script already has everything hardcoded. You don't need to add any properties.

### Q: Is it bad that script properties is empty?
**A:** No! It's perfectly fine. Your configuration is in the code itself.

### Q: What's the difference between Script Properties and OAuth Scopes?
**A:** 
- **Script Properties** = Configuration values you store (optional)
- **OAuth Scopes** = Permissions for what the script can do (required for email)

### Q: So I just need OAuth Scopes?
**A:** Yes! That's what you need to grant permissions for email sending.

### Q: Where do I see OAuth Scopes?
**A:** In Project Settings, scroll down past "Script properties" section. If you don't see it, permissions haven't been granted yet.

---

## ✅ Summary

**Script Properties:**
- Shows configuration values
- Empty = Normal for your project ✅
- You don't need to add anything

**OAuth Scopes:**
- Shows granted permissions
- Empty = Need to grant permissions ⚠️
- This is what you need to fix

**Next Step:**
Follow **GRANT_PERMISSIONS_NOW.md** to grant email permissions!

---

## 🚀 Quick Decision:

```
Do you see "Script properties" section?
│
├─ YES (You do!) ✅
│   │
│   ├─ Is it empty?
│   │   └─ That's fine! ✅
│   │
│   └─ Has values?
│       └─ That's fine too! ✅
│
└─ Below "Script properties", do you see "OAuth Scopes"?
    │
    ├─ YES → Check if it has "script.send_mail"
    │   ├─ Has it → Permissions granted! ✅
    │   └─ Doesn't have it → Need permissions ⚠️
    │
    └─ NO → Need to grant permissions ⚠️
        └─ Follow GRANT_PERMISSIONS_NOW.md
```

---

**Bottom line:** Script properties being empty is fine! You just need to grant OAuth permissions for email sending. Follow GRANT_PERMISSIONS_NOW.md! 🎯
