# 🚀 Deploy Leave Management System on Render

## 📋 Prerequisites
- Render account (free tier available)
- GitHub repository with the project
- PostgreSQL database (Render free tier)

## 🌐 Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Create PostgreSQL Database
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **PostgreSQL**
3. Database name: `leave-management-db`
4. User: `leave_management_user`
5. Region: Choose nearest
6. Click **Create Database**

### 3. Deploy Backend Service
1. In Render Dashboard: **New** → **Web Service**
2. Connect your GitHub repository
3. Service name: `leave-management-backend`
4. Runtime: **Docker**
5. Dockerfile path: `./backend/Dockerfile`
6. Environment Variables:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=postgresql://username:password@host:5432/database
   JWT_SECRET=your-super-secret-jwt-key-here
   ```
7. Click **Create Web Service**

### 4. Deploy Frontend Service
1. In Render Dashboard: **New** → **Static Site**
2. Service name: `leave-management-frontend`
3. Build command: `cd frontend && npm install && npm run build`
4. Publish directory: `frontend/dist`
5. Add redirect rule:
   - Type: **Rewrite**
   - Source: `/api/*`
   - Destination: `https://leave-management-backend.onrender.com/api/*`
6. Click **Create Static Site**

## 🔗 Live URLs (After Deployment)

### Frontend URL:
```
https://leave-management-frontend.onrender.com
```

### Backend API URL:
```
https://leave-management-backend.onrender.com
```

### API Endpoints:
```
POST https://leave-management-backend.onrender.com/auth/login
POST https://leave-management-backend.onrender.com/leave/apply
GET  https://leave-management-backend.onrender.com/leave/my-requests
```

## ⚙️ Environment Variables

### Backend Required Variables:
- `SPRING_PROFILES_ACTIVE=prod`
- `DATABASE_URL` (from PostgreSQL service)
- `JWT_SECRET` (generate secure random string)

### Frontend Build Variables:
- `NODE_ENV=production`

## 🔄 Auto-Deploy Configuration

Both services are configured for auto-deployment:
- Push to main branch → Automatic deployment
- Build logs available in Render dashboard
- Zero-downtime deployments

## 🧪 Testing the Deployment

### 1. Frontend Test:
1. Visit: `https://leave-management-frontend.onrender.com`
2. Should load the login page
3. Test login with credentials

### 2. Backend Test:
1. Visit: `https://leave-management-backend.onrender.com/actuator/health`
2. Should return: `{"status":"UP"}`

### 3. API Test:
```bash
curl -X POST https://leave-management-backend.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"employee@company.com","password":"admin123"}'
```

## 🐛 Troubleshooting

### Common Issues:
1. **Database Connection**: Check DATABASE_URL format
2. **CORS Errors**: Verify frontend URL in CORS config
3. **Build Failures**: Check package.json dependencies
4. **404 Errors**: Verify API proxy configuration

### Debug Commands:
```bash
# Check backend logs (Render Dashboard)
# Check frontend build logs
# Test individual API endpoints
```

## 📊 Monitoring

### Render Dashboard Features:
- Real-time metrics
- Error logs
- Build history
- Resource usage
- Auto-scaling options

## 🔒 Security Considerations

### Production Setup:
- Use HTTPS (automatic on Render)
- Environment variables for secrets
- Database connection encryption
- JWT token security
- CORS restrictions

## 💰 Cost

### Render Free Tier:
- **750 hours/month** web service
- **PostgreSQL** free tier
- **Static sites** unlimited
- **Custom domains** supported
- **SSL certificates** included

### Upgrade Options:
- Professional: $7/month
- Standard: $25/month
- Plus: $100/month

## 🎯 Success Checklist

- [ ] GitHub repository updated
- [ ] PostgreSQL database created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Frontend loads correctly
- [ ] Login functionality works
- [ ] Leave application works
- [ ] Approval workflow works

## 🌟 Final Live URL

Once deployed successfully, your Leave Management System will be available at:

**Main Application**: `https://leave-management-frontend.onrender.com`

**API Documentation**: `https://leave-management-backend.onrender.com/swagger-ui.html`

**Health Check**: `https://leave-management-backend.onrender.com/actuator/health`

---

🎉 **Your Leave Management System will be live and accessible worldwide!**
