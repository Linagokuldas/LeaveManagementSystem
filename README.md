# Leave Management System

A professional enterprise-grade leave management platform with role-based authentication and multi-level approval workflow.

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React DatePicker

### Backend
- Spring Boot 3.x
- Spring Security
- JWT Authentication
- JPA/Hibernate
- MySQL

## Setup Instructions

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### Database Setup
```sql
CREATE DATABASE leave_management;
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Default Users

| Email | Password | Role |
|-------|----------|------|
| ceo@company.com | admin123 | CEO |
| manager@company.com | admin123 | MANAGER |
| hr@company.com | admin123 | HR |
| tl@company.com | admin123 | TEAM_LEAD |
| employee@company.com | admin123 | EMPLOYEE |

## Features

- Role-based authentication (CEO, Manager, HR, Team Lead, Employee)
- Multi-level approval workflow
- Real-time leave status tracking
- Professional UI with enterprise-grade design
- Toast notifications
- KPI dashboard
- Search and filter functionality

## API Endpoints

- POST `/auth/login` - User authentication
- POST `/leave/apply` - Apply for leave
- GET `/leave/my-requests` - Get user's leave requests
- GET `/leave/pending/{role}` - Get pending requests for role
- PUT `/leave/approve/{id}` - Approve leave request
- PUT `/leave/reject/{id}` - Reject leave request
