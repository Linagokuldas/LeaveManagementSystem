# 🚀 Quick Deploy to Render - Step by Step

## 📋 Step 1: Create Render Account
1. Go to https://render.com
2. Click "Sign Up" 
3. Use GitHub account (recommended)
4. Verify email

## 📋 Step 2: Push to GitHub
```bash
# In your terminal:
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## 📋 Step 3: Create PostgreSQL Database
1. In Render Dashboard → **New** → **PostgreSQL**
2. Name: `leave-management-db`
3. Database Name: `leave_management`
4. User: `leave_management_user`
5. Region: Choose nearest
6. Click **Create Database**
7. **Copy the Internal Database URL** (save for later)

## 📋 Step 4: Deploy Backend
1. In Render Dashboard → **New** → **Web Service**
2. **Connect to GitHub** → Select your repository
3. Service name: `leave-management-backend`
4. Runtime: **Docker**
5. Dockerfile path: `./backend/Dockerfile`
6. Environment Variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=paste-your-database-url-here
   JWT_SECRET=your-super-secret-jwt-key-123456789012345678901234567890
   ```
7. Click **Create Web Service**

## 📋 Step 5: Deploy Frontend
1. In Render Dashboard → **New** → **Static Site**
2. Service name: `leave-management-frontend`
3. Build command: `cd frontend && npm install && npm run build`
4. Publish directory: `frontend/dist`
5. Add redirect rule:
   - Type: **Rewrite**
   - Source: `/api/*`
   - Destination: `https://leave-management-backend.onrender.com/api/*`
6. Click **Create Static Site**

## 📋 Step 6: Wait for Deployment
- Backend: ~5-10 minutes
- Frontend: ~2-5 minutes
- Check status in Render Dashboard

## 📋 Step 7: Test Your Live App
1. Frontend URL: `https://leave-management-frontend.onrender.com`
2. Backend API: `https://leave-management-backend.onrender.com`
3. Test login with: employee@company.com / admin123

## 🎯 Success!
Your Leave Management System is now live! 🎉

## 🔧 If Issues Occur:
- Check Render logs in dashboard
- Verify DATABASE_URL format
- Ensure JWT_SECRET is set
- Check CORS configuration

## 📞 Need Help?
- Render docs: https://render.com/docs
- Support: support@render.com
