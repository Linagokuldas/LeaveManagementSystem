# 🚀 Leave Management System - Startup Guide

## Prerequisites

### Required Software
1. **Node.js 18+** - Download from https://nodejs.org
2. **Java 17+** - Download from https://adoptium.net
3. **Maven 3.6+** - Download from https://maven.apache.org
4. **MySQL 8.0+** - Download from https://mysql.com

### Verify Installation
```bash
node --version
java --version
mvn --version
mysql --version
```

## Database Setup

1. **Start MySQL Service**
   ```bash
   # Windows
   net start mysql
   
   # Mac/Linux
   sudo systemctl start mysql
   ```

2. **Create Database**
   ```bash
   mysql -u root -p < database-setup.sql
   ```

3. **Default Credentials**
   - Username: `root`
   - Password: `root`
   - Database: `leave_management`

## Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Install Dependencies & Compile**
   ```bash
   mvn clean install
   ```

3. **Start Spring Boot Application**
   ```bash
   mvn spring-boot:run
   ```

4. **Backend will be available at**: http://localhost:8080

## Frontend Setup

1. **Navigate to Frontend Directory** (in new terminal)
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Frontend will be available at**: http://localhost:5173

## Default Users

| Role | Email | Password |
|------|-------|----------|
| CEO | ceo@company.com | admin123 |
| Manager | manager@company.com | admin123 |
| HR | hr@company.com | admin123 |
| Team Lead | tl@company.com | admin123 |
| Employee | employee@company.com | admin123 |
| Employee | emma@company.com | admin123 |
| Employee | frank@company.com | admin123 |

## 🎯 System Features

### Authentication
- JWT-based authentication
- Role-based access control
- Secure password storage with BCrypt

### Leave Workflow
1. **Employee** applies for leave → **PENDING** at **Team Lead** level
2. **Team Lead** approves → moves to **HR** level
3. **HR** approves → moves to **Manager** level  
4. **Manager** approves → moves to **CEO** level
5. **CEO** approves → **APPROVED** (final)

### Dashboard Features
- **Employee Dashboard**: Apply leave, view history
- **Team Lead Dashboard**: Approve/reject team member requests
- **HR Dashboard**: Review and approve requests
- **Manager Dashboard**: Management-level approvals
- **CEO Dashboard**: Final approval authority

### UI Features
- Professional enterprise design
- Real-time status updates
- Search and filter functionality
- Responsive layout
- Date picker with validation
- Auto-calculated leave days

## API Endpoints

### Authentication
- `POST /auth/login` - User login

### Leave Management
- `POST /leave/apply` - Apply for leave
- `GET /leave/my-requests` - Get user's leave requests
- `GET /leave/pending/{role}` - Get pending requests for role
- `PUT /leave/approve/{id}` - Approve leave request
- `PUT /leave/reject/{id}` - Reject leave request
- `GET /leave/dashboard-stats` - Get dashboard statistics

## 🎨 Design System

### Colors
- Primary: #2563EB (Blue)
- Success: #10B981 (Green)
- Warning: #F59E0B (Yellow)
- Danger: #EF4444 (Red)
- Background: #FFFFFF (White)
- Secondary: #F5F7FA (Light Gray)

### Typography
- Font: Inter
- Clean hierarchy and spacing
- 8px grid system

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 8080 (backend)
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   
   # Kill process on port 5173 (frontend)
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   ```

2. **Database Connection Error**
   - Check MySQL service is running
   - Verify database credentials in `application.properties`
   - Ensure database `leave_management` exists

3. **Frontend Build Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Backend Compilation Issues**
   ```bash
   # Clean Maven cache
   mvn clean
   mvn dependency:resolve
   mvn install
   ```

## 📱 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  Spring Boot    │    │    MySQL DB     │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Port: 5173    │    │   Port: 8080    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with BCrypt
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

## 📊 Leave Status Flow

```
Employee Apply → Team Lead → HR → Manager → CEO
     ↓              ↓         ↓          ↓       ↓
   PENDING       PENDING   PENDING   PENDING   APPROVED
```

## 🎯 Success Criteria

✅ **Complete Authentication System**
✅ **Multi-level Approval Workflow**
✅ **Role-based Dashboards**
✅ **Professional UI/UX Design**
✅ **Real-time Status Updates**
✅ **Search and Filter**
✅ **Date Picker Integration**
✅ **Responsive Design**
✅ **Enterprise-grade Architecture**

---

**🎉 Your Leave Management System is ready to use!**
