# DEPLOY NOW - Live in 10 Minutes

## Step 1: Go to Render Dashboard
**URL**: https://dashboard.render.com

## Step 2: Create PostgreSQL Database
1. Click **"New"** button
2. Select **"PostgreSQL"**
3. Fill in:
   - Name: `leave-management-db`
   - Database Name: `leave_management`
   - User: `leave_management_user`
4. Click **"Create Database"**
5. **Copy the Internal Database URL** (save it!)

## Step 3: Deploy Backend Service
1. Click **"New"** button
2. Select **"Web Service"**
3. **Connect GitHub** - Select your repository
4. **Service Settings**:
   - Name: `leave-management-backend`
   - Runtime: **Docker**
   - Dockerfile path: `backend/Dockerfile`
5. **Environment Variables**:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=paste-your-database-url-here
   JWT_SECRET=mySecretKey123456789012345678901234567890
   ```
6. Click **"Create Web Service"**

## Step 4: Deploy Frontend Service
1. Click **"New"** button
2. Select **"Static Site"**
3. **Service Settings**:
   - Name: `leave-management-frontend`
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
4. **Add Redirect Rule**:
   - Type: **Rewrite**
   - Source: `/api/*`
   - Destination: `https://leave-management-backend.onrender.com/api/*`
5. Click **"Create Static Site"**

## Step 5: Wait for Deployment
- Backend: 5-10 minutes
- Frontend: 2-5 minutes
- Watch the build logs in Render

## Step 6: Test Your Live App
**Frontend URL**: https://leave-management-frontend.onrender.com
**Backend API**: https://leave-management-backend.onrender.com

**Test Login**:
- Email: employee@company.com
- Password: admin123

## SUCCESS! Your app is live! 

## If You Get Errors:
1. **Database Connection**: Check DATABASE_URL format
2. **Build Failures**: Look at Render logs
3. **CORS Issues**: Wait for both services to finish

## Your Live URLs:
- **Main App**: https://leave-management-frontend.onrender.com
- **API Docs**: https://leave-management-backend.onrender.com/swagger-ui.html

GO DEPLOY NOW! Your Leave Management System will be live worldwide!
