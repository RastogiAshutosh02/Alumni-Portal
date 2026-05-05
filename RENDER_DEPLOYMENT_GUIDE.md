# 🚀 Deploying Backend to Render - Complete Guide

## **Prerequisites**
- GitHub account (free)
- Render account (free with optional paid features)
- PostgreSQL database (use Render's free database or external provider)

---

## **Step 1: Push Code to GitHub**

### 1.1 Initialize Git (if not already done)
```bash
cd /Users/ashutoshrastogi/Downloads/integrated_public_html
git init
git add .
git commit -m "Initial commit: Alumni portal project"
```

### 1.2 Create GitHub Repository
1. Go to https://github.com/new
2. Create new repo named `alumni-portal` (or your preferred name)
3. **DO NOT** initialize with README/gitignore
4. Copy the commands from GitHub and run them:
```bash
git remote add origin https://github.com/YOUR_USERNAME/alumni-portal.git
git branch -M main
git push -u origin main
```

### 1.3 Create `.gitignore` to exclude sensitive files
```bash
cat > .gitignore << 'EOF'
node_modules/
.env
.DS_Store
*.log
uploads/*
!uploads/.gitkeep
EOF
git add .gitignore
git commit -m "Add gitignore"
git push
```

---

## **Step 2: Prepare Environment Variables**

The `.env.example` is already created. Ensure it has all variables:
- PORT
- NODE_ENV
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- JWT_SECRET
- SMTP settings (email)
- FRONTEND_URL

---

## **Step 3: Set Up PostgreSQL Database**

You have 3 options:

### **Option A: Render's Free PostgreSQL** (Recommended)
1. Go to https://dashboard.render.com
2. Sign up (free)
3. Click "New" → "PostgreSQL"
4. Name it: `ism-alumni-db`
5. Choose "Free" plan
6. Copy connection details (Host, Port, DB, User, Password)

### **Option B: External PostgreSQL Service**
- Neon: https://neon.tech (free tier available)
- ElephantSQL: https://elephantsql.com (free tier available)
- Railway: https://railway.app

### **Option C: Local Database**
Only works if your Render backend can connect to your local machine (not recommended for production)

---

## **Step 4: Deploy on Render**

### 4.1 Create Web Service on Render
1. Go to https://dashboard.render.com
2. Click **"New"** → **"Web Service"**
3. Select **"Build and deploy from a Git repository"**
4. Click **"Connect account"** to authorize GitHub
5. Find and select your `alumni-portal` repository
6. Select branch: `main`

### 4.2 Configure Web Service
Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `alumni-portal-backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node src/server.js` |
| **Plan** | `Free` (or Starter) |

### 4.3 Add Environment Variables
Click **"Environment"** and add:

```
PORT=3000
NODE_ENV=production
DB_HOST=[from PostgreSQL]
DB_PORT=[from PostgreSQL]
DB_NAME=[from PostgreSQL]
DB_USER=[from PostgreSQL]
DB_PASSWORD=[from PostgreSQL]
JWT_SECRET=[generate random string - use: openssl rand -base64 32]
JWT_EXPIRES_IN=7d
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[your-email@gmail.com]
SMTP_PASS=[your-app-password - NOT regular password]
FRONTEND_URL=https://your-frontend-domain.com
```

**⚠️ Important Notes:**
- Don't use `localhost` for DB_HOST
- For Gmail SMTP: Use "App Passwords" (not your regular password)
  - Enable 2FA on Gmail
  - Go to myaccount.google.com/apppasswords
  - Create app-specific password for "Mail"

### 4.4 Deploy
1. Click **"Create Web Service"**
2. Render will automatically:
   - Install dependencies
   - Build the app
   - Deploy it

3. Wait for deployment (2-5 minutes)
4. Get your URL: `https://alumni-portal-backend.onrender.com`

---

## **Step 5: Run Database Migrations**

Once backend is deployed:

### 5.1 Connect to Backend via Web Shell (on Render dashboard)
1. Go to your service on Render
2. Click **"Shell"** tab
3. Run migrations:
```bash
node migrations/run.js
node migrations/v2_approval_system.js
node migrations/seed.js
```

### 5.2 Alternative: SSH & Run Locally
```bash
# If your database allows remote connections
npm run migrate
npm run migrate:v2
npm run seed
```

---

## **Step 6: Update Frontend to Use Deployed Backend**

Update the fetch URL redirector in **`alumni-portal/index.html`**:

Find this script (around line 13):
```javascript
(function(){
  const OLD = 'http://localhost:5000/api';
  const NEW = 'http://localhost:5001/api';
  // ... rest of script
})();
```

Change it to:
```javascript
(function(){
  const OLD = 'http://localhost:5000/api';
  const NEW = 'https://alumni-portal-backend.onrender.com/api';
  // ... rest of script
})();
```

Then push this change to GitHub:
```bash
git add alumni-portal/index.html
git commit -m "Update backend API URL for production"
git push
```

---

## **Step 7: Verify Deployment**

Test your backend:
```bash
curl https://alumni-portal-backend.onrender.com/
```

Should return: `{"message":"..."}` or similar

Test an API endpoint:
```bash
curl https://alumni-portal-backend.onrender.com/api/auth/health
```

---

## **Troubleshooting**

| Issue | Solution |
|-------|----------|
| **Build fails** | Check build logs in Render dashboard |
| **Database connection error** | Verify DB_HOST, DB_USER, DB_PASSWORD in environment |
| **CORS errors** | Update FRONTEND_URL in environment variables |
| **Service not starting** | Check `PORT=3000` is set (Render assigns dynamic port) |
| **Migrations fail** | Run migrations in Render Web Shell |

---

## **Important: Render Auto-Sleep (Free Plan)**

Free tier services sleep after 15 minutes of inactivity. To prevent:
- Upgrade to Starter plan ($7/month)
- Or use a monitoring service to ping it regularly
- Or manually wake it up when needed

---

## **Quick Commands Reference**

```bash
# Generate JWT secret
openssl rand -base64 32

# Test local before deploying
PORT=5001 npm run dev

# Check git status
git status

# Push to GitHub
git push origin main

# View Render logs
# Go to Render Dashboard → Your Service → Logs
```

---

## **Summary**

✅ Backend prepared with Procfile
✅ Code pushed to GitHub  
✅ PostgreSQL database set up
✅ Render web service created with environment variables
✅ Migrations run
✅ Frontend updated to use production backend URL

Your backend is now live and accessible globally! 🎉

