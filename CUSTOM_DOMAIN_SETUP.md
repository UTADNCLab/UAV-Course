# 🌐 Custom Domain Setup for GitHub Pages

## ✅ Yes, You Can Use Your Own Domain!

Instead of: `https://jaymehta12110.github.io/UAV-Course/`  
You can use: `https://yourdomain.com` or `https://course.yourdomain.com`

---

## 📋 Steps to Set Up Custom Domain:

### **Step 1: Buy a Domain (if you don't have one)**

Popular domain registrars:
- **Namecheap** - https://www.namecheap.com
- **GoDaddy** - https://www.godaddy.com
- **Google Domains** - https://domains.google
- **Cloudflare** - https://www.cloudflare.com

Cost: Usually $10-15/year

---

### **Step 2: Configure DNS Settings**

Go to your domain registrar's DNS settings and add these records:

#### **Option A: Use Root Domain (yourdomain.com)**

Add these **A Records**:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

#### **Option B: Use Subdomain (course.yourdomain.com)**

Add this **CNAME Record**:
```
Type: CNAME
Name: course
Value: jaymehta12110.github.io
```

---

### **Step 3: Configure GitHub Pages**

1. Go to your GitHub repository: https://github.com/jaymehta12110/UAV-Course
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Custom domain", enter your domain:
   - For root: `yourdomain.com`
   - For subdomain: `course.yourdomain.com`
5. Click **Save**
6. Check **"Enforce HTTPS"** (wait a few minutes for it to activate)

---

### **Step 4: Wait for DNS Propagation**

- DNS changes can take 24-48 hours to fully propagate
- Usually works within 1-2 hours
- Check status at: https://www.whatsmydns.net

---

## 🎯 After Setup:

Your website will be accessible at:
- **Main site:** `https://yourdomain.com` or `https://course.yourdomain.com`
- **Admin tool:** `https://yourdomain.com/admin-password-reset.html`

---

## 💡 Recommended Setup:

**Best Option:** Use a subdomain like `course.yourdomain.com`

**Why?**
- Easier to set up (just one CNAME record)
- Keeps your main domain free for other uses
- Professional looking
- Faster DNS propagation

**Example:**
- Main domain: `yourdomain.com` → Your personal website
- Course: `course.yourdomain.com` → UAV Course
- Admin: `course.yourdomain.com/admin-password-reset.html`

---

## 🔧 Example with Real Domain:

Let's say you buy `uavcourse.com`:

### DNS Settings (at your registrar):
```
Type: CNAME
Name: www
Value: jaymehta12110.github.io
```

### GitHub Pages Settings:
```
Custom domain: www.uavcourse.com
✅ Enforce HTTPS
```

### Result:
- Website: `https://www.uavcourse.com`
- Admin tool: `https://www.uavcourse.com/admin-password-reset.html`

---

## ❓ Common Questions:

### **Q: Do I need to buy a domain?**
A: No, GitHub Pages works fine with `jaymehta12110.github.io/UAV-Course/`. Custom domain is optional but more professional.

### **Q: How much does a domain cost?**
A: Usually $10-15 per year. Some registrars offer first year discounts.

### **Q: Will my current links break?**
A: No! GitHub automatically redirects old links to your new domain.

### **Q: Can I use a free domain?**
A: Yes, services like Freenom offer free domains, but they're less professional and may have limitations.

### **Q: Do I need to change anything in my code?**
A: No! GitHub Pages handles everything automatically.

---

## 🎉 Benefits of Custom Domain:

✅ **Professional** - `uavcourse.com` vs `jaymehta12110.github.io/UAV-Course/`  
✅ **Memorable** - Easier for users to remember  
✅ **Branding** - Your own brand identity  
✅ **SEO** - Better for search engine optimization  
✅ **Credibility** - Looks more trustworthy  

---

## 📝 Quick Summary:

1. **Buy domain** (optional, ~$10-15/year)
2. **Add DNS records** (CNAME for subdomain)
3. **Configure GitHub Pages** (add custom domain)
4. **Wait 1-24 hours** (DNS propagation)
5. **Done!** Your site is live on your domain

---

## 🔗 Current URLs (No Custom Domain):

- **Main site:** https://jaymehta12110.github.io/UAV-Course/
- **Admin tool:** https://jaymehta12110.github.io/UAV-Course/admin-password-reset.html

These work perfectly fine! Custom domain is just for a more professional look.

---

## 💬 Need Help?

If you want to set up a custom domain, let me know:
1. What domain name you want
2. Whether you want root domain or subdomain
3. Which registrar you're using

I can provide specific instructions for your setup!
