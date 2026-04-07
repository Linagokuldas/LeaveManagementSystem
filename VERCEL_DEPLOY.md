# FRONTEND VERCEL DEPLOYMENT

## Step 1: Go to Vercel
**URL**: https://vercel.com

## Step 2: Sign Up/Login
- Use GitHub account (recommended)
- Click "Sign Up" or "Login"

## Step 3: Import Project
1. Click **"Add New..."** button
2. Select **"Project"**
3. **Import Git Repository**
4. Select: `Linagokuldas/LeaveManagementSystem`

## Step 4: Configure Build Settings
**Framework Preset**: Vite
**Root Directory**: `./frontend`
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

## Step 5: Environment Variables (Optional)
```
NODE_ENV=production
VITE_API_URL=https://leave-management-backend.onrender.com
```

## Step 6: Deploy
Click **"Deploy"** button

## Step 7: Wait for Build
- Takes 2-3 minutes
- Watch the build logs
- Success message appears

## Step 8: Get Your Live URL
Your app will be live at:
**https://leave-management-frontend.vercel.app**

## Step 9: Test Your App
1. Visit your URL
2. Test login: employee@company.com / admin123
3. Check all pages work

## SUCCESS! Your frontend is live! 

## Note: Backend Still Needed
The frontend will work but needs the backend API. You'll need to deploy the backend separately (Render, Railway, etc.)

## API Proxy Configuration
The vercel.json file automatically routes /api/* requests to your backend.

## If Issues Occur:
1. Check build logs in Vercel dashboard
2. Verify frontend/package.json exists
3. Make sure vite.config.js is correct

## Your Live Frontend URL:
**https://leave-management-frontend.vercel.app**

GO DEPLOY NOW! Your frontend will be live in 3 minutes!
