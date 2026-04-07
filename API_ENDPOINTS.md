# 🚀 Leave Management System - API Endpoints for Thunder Client

## 🌐 Base URL
```
http://localhost:8080
```

## 🔐 Authentication Endpoints

### 1. Login
```http
POST /auth/login
```

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "email": "employee@company.com",
    "password": "admin123"
}
```

**Response (200 OK):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "email": "employee@company.com",
    "name": "David Employee",
    "role": "EMPLOYEE",
    "userId": 5
}
```

**Error (400 Bad Request):**
```json
{
    "timestamp": "2024-01-15T10:30:00.000+00:00",
    "status": 400,
    "error": "Bad Request",
    "message": "Invalid credentials"
}
```

---

## 📝 Leave Management Endpoints

### 2. Apply for Leave
```http
POST /leave/apply
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
    "fromDate": "2024-02-15",
    "toDate": "2024-02-17",
    "leaveType": "SICK_LEAVE",
    "reason": "Medical appointment with specialist"
}
```

**Response (201 Created):**
```json
{
    "id": 123,
    "user": {
        "id": 5,
        "name": "David Employee",
        "email": "employee@company.com",
        "role": "EMPLOYEE"
    },
    "fromDate": "2024-02-15",
    "toDate": "2024-02-17",
    "totalDays": 3,
    "leaveType": "SICK_LEAVE",
    "reason": "Medical appointment with specialist",
    "status": "PENDING",
    "currentLevel": "TEAM_LEAD",
    "createdAt": "2024-02-15T10:30:00.000+00:00",
    "updatedAt": "2024-02-15T10:30:00.000+00:00"
}
```

### 3. Get My Leave Requests
```http
GET /leave/my-requests
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**
```json
[
    {
        "id": 123,
        "user": {
            "id": 5,
            "name": "David Employee",
            "email": "employee@company.com",
            "role": "EMPLOYEE"
        },
        "fromDate": "2024-02-15",
        "toDate": "2024-02-17",
        "totalDays": 3,
        "leaveType": "SICK_LEAVE",
        "reason": "Medical appointment with specialist",
        "status": "PENDING",
        "currentLevel": "TEAM_LEAD",
        "createdAt": "2024-02-15T10:30:00.000+00:00",
        "updatedAt": "2024-02-15T10:30:00.000+00:00"
    },
    {
        "id": 124,
        "user": {
            "id": 5,
            "name": "David Employee",
            "email": "employee@company.com",
            "role": "EMPLOYEE"
        },
        "fromDate": "2024-01-10",
        "toDate": "2024-01-12",
        "totalDays": 3,
        "leaveType": "CASUAL_LEAVE",
        "reason": "Family vacation",
        "status": "APPROVED",
        "currentLevel": "TEAM_LEAD",
        "createdAt": "2024-01-10T09:15:00.000+00:00",
        "updatedAt": "2024-01-12T14:20:00.000+00:00"
    }
]
```

### 4. Get Pending Requests by Role
```http
GET /leave/pending/{role}
```

**Available Roles:** `CEO`, `MANAGER`, `HR`, `TEAM_LEAD`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Example - Team Lead Pending Requests:**
```http
GET /leave/pending/TEAM_LEAD
```

**Response (200 OK):**
```json
[
    {
        "id": 125,
        "user": {
            "id": 6,
            "name": "Emma Employee",
            "email": "emma@company.com",
            "role": "EMPLOYEE"
        },
        "fromDate": "2024-02-20",
        "toDate": "2024-02-22",
        "totalDays": 3,
        "leaveType": "ANNUAL_LEAVE",
        "reason": "Annual vacation with family",
        "status": "PENDING",
        "currentLevel": "TEAM_LEAD",
        "createdAt": "2024-02-20T11:00:00.000+00:00",
        "updatedAt": "2024-02-20T11:00:00.000+00:00"
    },
    {
        "id": 126,
        "user": {
            "id": 7,
            "name": "Frank Employee",
            "email": "frank@company.com",
            "role": "EMPLOYEE"
        },
        "fromDate": "2024-02-25",
        "toDate": "2024-02-26",
        "totalDays": 2,
        "leaveType": "SICK_LEAVE",
        "reason": "Flu symptoms",
        "status": "PENDING",
        "currentLevel": "TEAM_LEAD",
        "createdAt": "2024-02-25T08:30:00.000+00:00",
        "updatedAt": "2024-02-25T08:30:00.000+00:00"
    }
]
```

### 5. Approve Leave Request
```http
PUT /leave/approve/{id}
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**
```json
{
    "id": 125,
    "user": {
        "id": 6,
        "name": "Emma Employee",
        "email": "emma@company.com",
        "role": "EMPLOYEE"
    },
    "fromDate": "2024-02-20",
    "toDate": "2024-02-22",
    "totalDays": 3,
    "leaveType": "ANNUAL_LEAVE",
    "reason": "Annual vacation with family",
    "status": "PENDING",
    "currentLevel": "HR",
    "createdAt": "2024-02-20T11:00:00.000+00:00",
    "updatedAt": "2024-02-20T14:30:00.000+00:00"
}
```

### 6. Reject Leave Request
```http
PUT /leave/reject/{id}
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**
```json
{
    "id": 126,
    "user": {
        "id": 7,
        "name": "Frank Employee",
        "email": "frank@company.com",
        "role": "EMPLOYEE"
    },
    "fromDate": "2024-02-25",
    "toDate": "2024-02-26",
    "totalDays": 2,
    "leaveType": "SICK_LEAVE",
    "reason": "Flu symptoms",
    "status": "REJECTED",
    "currentLevel": "TEAM_LEAD",
    "createdAt": "2024-02-25T08:30:00.000+00:00",
    "updatedAt": "2024-02-25T09:15:00.000+00:00"
}
```

### 7. Get Dashboard Statistics
```http
GET /leave/dashboard-stats
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**
```json
{
    "total": 15,
    "pending": 3,
    "approved": 10,
    "rejected": 2
}
```

---

## 🔧 Leave Types Enum

Valid values for `leaveType` field:
```json
[
    "SICK_LEAVE",
    "CASUAL_LEAVE", 
    "ANNUAL_LEAVE",
    "MATERNITY_LEAVE",
    "PATERNITY_LEAVE",
    "EMERGENCY_LEAVE",
    "UNPAID_LEAVE"
]
```

## 📊 Status Values

- `PENDING` - Leave request awaiting approval
- `APPROVED` - Leave request approved
- `REJECTED` - Leave request rejected

## 🎯 Approval Levels

- `TEAM_LEAD` - First approval level
- `HR` - Second approval level  
- `MANAGER` - Third approval level
- `CEO` - Final approval level

---

## 🧪 Thunder Client Setup Guide

### 1. Environment Setup
1. Open Thunder Client
2. Create new Environment: `Leave Management Dev`
3. Base URL: `http://localhost:8080`

### 2. Authentication Setup
1. Create collection: `Authentication`
2. Add request: `Login`
3. Method: `POST`
4. URL: `/auth/login`
5. Headers: Add `Content-Type: application/json`
6. Body: Use JSON format above

### 3. Leave Management Collection
1. Create collection: `Leave Management`
2. Add the following requests:

#### **Apply Leave**
- Method: `POST`
- URL: `/leave/apply`
- Headers: `Authorization: Bearer {{token}}`
- Body: JSON with leave details

#### **Get My Requests**
- Method: `GET`
- URL: `/leave/my-requests`
- Headers: `Authorization: Bearer {{token}}`

#### **Get Pending (Team Lead)**
- Method: `GET`
- URL: `/leave/pending/TEAM_LEAD`
- Headers: `Authorization: Bearer {{token}}`

#### **Approve Request**
- Method: `PUT`
- URL: `/leave/approve/{{requestId}}`
- Headers: `Authorization: Bearer {{token}}`

#### **Reject Request**
- Method: `PUT`
- URL: `/leave/reject/{{requestId}}`
- Headers: `Authorization: Bearer {{token}}`

### 4. Variables
Create environment variables:
- `token` - JWT token received from login
- `requestId` - ID of leave request to approve/reject

---

## 🚨 Common Error Responses

### 401 Unauthorized
```json
{
    "timestamp": "2024-02-15T10:30:00.000+00:00",
    "status": 401,
    "error": "Unauthorized",
    "message": "Full authentication is required to access this resource"
}
```

### 403 Forbidden
```json
{
    "timestamp": "2024-02-15T10:30:00.000+00:00",
    "status": 403,
    "error": "Forbidden",
    "message": "Access is denied"
}
```

### 404 Not Found
```json
{
    "timestamp": "2024-02-15T10:30:00.000+00:00",
    "status": 404,
    "error": "Not Found",
    "message": "Leave request not found"
}
```

### 500 Internal Server Error
```json
{
    "timestamp": "2024-02-15T10:30:00.000+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "message": "An unexpected error occurred"
}
```

---

## 🎯 Testing Workflow

### Complete Leave Request Flow:
1. **Login** as Employee → Get JWT token
2. **Apply Leave** → Create request (status: PENDING, level: TEAM_LEAD)
3. **Login** as Team Lead → Get pending requests
4. **Approve** → Request moves to HR level
5. **Login** as HR → Get pending requests  
6. **Approve** → Request moves to Manager level
7. **Login** as Manager → Get pending requests
8. **Approve** → Request moves to CEO level
9. **Login** as CEO → Get pending requests
10. **Approve** → Request status becomes APPROVED

### Quick Test Script:
```bash
# 1. Employee login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"employee@company.com","password":"admin123"}'

# 2. Apply leave (use token from step 1)
curl -X POST http://localhost:8080/leave/apply \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"fromDate":"2024-02-15","toDate":"2024-02-17","leaveType":"SICK_LEAVE","reason":"Test leave"}'

# 3. Get pending requests (Team Lead)
curl -X GET http://localhost:8080/leave/pending/TEAM_LEAD \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📱 Additional Notes

- **JWT Token**: Valid for 24 hours (86400000 ms)
- **Date Format**: ISO 8601 (YYYY-MM-DD)
- **Role-Based Access**: Users can only access appropriate endpoints
- **Auto-Calculation**: `totalDays` is calculated automatically
- **Approval Workflow**: Sequential through levels until CEO approval

All endpoints are ready for Thunder Client testing! 🚀
