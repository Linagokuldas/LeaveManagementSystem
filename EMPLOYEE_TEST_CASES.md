# Employee Management System - Test Cases

## Test Case Documentation

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC001 | Employee Login - Valid Credentials | Backend server running, Employee account exists in database | 1. Open login page<br>2. Enter valid employee email (employee@company.com)<br>3. Enter valid password (admin123)<br>4. Click Login button | Employee successfully logged in<br>Redirected to dashboard<br>User role displayed as EMPLOYEE<br>JWT token generated and stored |
| TC002 | Employee Login - Invalid Email | Backend server running | 1. Open login page<br>2. Enter invalid email (wrong@company.com)<br>3. Enter valid password (admin123)<br>4. Click Login button | Error message displayed: "Invalid credentials"<br>Stay on login page<br>No token generated |
| TC003 | Employee Login - Invalid Password | Backend server running, Employee account exists | 1. Open login page<br>2. Enter valid employee email (employee@company.com)<br>3. Enter invalid password (wrongpass)<br>4. Click Login button | Error message displayed: "Invalid credentials"<br>Stay on login page<br>No token generated |
| TC004 | Employee Login - Empty Fields | Backend server running | 1. Open login page<br>2. Leave email field empty<br>3. Leave password field empty<br>4. Click Login button | Validation error: "Email and password required"<br>Form validation prevents submission |
| TC005 | Apply Leave - Valid Request | Employee logged in, Backend server running | 1. Navigate to Apply Leave page<br>2. Select recipient (HR)<br>3. Select leave type (SICK_LEAVE)<br>4. Select valid date range (future dates)<br>5. Enter number of days<br>6. Enter valid reason<br>7. Click Submit button | Leave request created successfully<br>Status set to PENDING<br>Current level set to TEAM_LEAD<br>Success message displayed<br>Redirected to dashboard |
| TC006 | Apply Leave - Past Date | Employee logged in | 1. Navigate to Apply Leave page<br>2. Select past date in calendar<br>3. Fill other required fields<br>4. Click Submit button | Validation error: "Date cannot be in the past"<br>Form submission prevented |
| TC007 | Apply Leave - Invalid Date Range | Employee logged in | 1. Navigate to Apply Leave page<br>2. Select From date after To date<br>3. Fill other required fields<br>4. Click Submit button | Validation error: "From date cannot be after To date"<br>Form submission prevented |
| TC008 | Apply Leave - Empty Required Fields | Employee logged in | 1. Navigate to Apply Leave page<br>2. Leave reason field empty<br>3. Fill other fields<br>4. Click Submit button | Validation error: "Reason is required"<br>Form submission prevented |
| TC009 | View My Leave Requests - Employee | Employee logged in, Has existing leave requests | 1. Navigate to Leave Status page<br>2. View table of requests | All employee's leave requests displayed<br>Correct status badges shown<br>Dates formatted correctly<br>Actions column shows View button only |
| TC010 | View Leave Request Details - Employee | Employee logged in, Has leave requests | 1. Navigate to Leave Status page<br>2. Click View button on any request | Modal/popup shows full request details<br>All fields displayed correctly<br>Status clearly shown<br>Close button functional |
| TC011 | Search Leave Requests - Employee | Employee logged in, Has multiple requests | 1. Navigate to Leave Status page<br>2. Enter search term in search box<br>3. Press Enter or click search | Table filtered to show matching requests<br>Search works on employee name and reason<br>Clear search resets table |
| TC012 | Filter Leave Requests by Status - Employee | Employee logged in, Has requests with different statuses | 1. Navigate to Leave Status page<br>2. Select status from filter dropdown<br>3. Choose "Approved" | Table shows only approved requests<br>Filter applied correctly<br>"All Status" resets filter |
| TC013 | Logout - Employee | Employee logged in | 1. Click user avatar dropdown<br>2. Click Logout option | User logged out successfully<br>JWT token cleared<br>Redirected to login page<br>Success message displayed |
| TC014 | Dashboard Access - Employee | Employee logged in | 1. Navigate to Dashboard page | Employee sees role cards<br>Staff card highlighted/available<br>Other role cards disabled/hidden<br>Professional layout displayed |
| TC015 | Session Expiration - Employee | Employee logged in, JWT token expired | 1. Wait 24 hours for token expiration<br>2. Try to access protected endpoint | 401 Unauthorized error<br>Redirected to login page<br>Message: "Session expired" |
| TC016 | Unauthorized Access - Employee | Employee logged in | 1. Try to access admin-only endpoint<br>2. Attempt to approve/reject own request | 403 Forbidden error<br>Access denied message<br>No approval/reject buttons for own requests |
| TC017 | Employee Profile View - Employee | Employee logged in | 1. Click user avatar dropdown<br>2. Click Profile option | Profile information displayed<br>Name, email, role shown<br>Edit profile options available |
| TC018 | Settings Access - Employee | Employee logged in | 1. Click Settings in navbar<br>2. Navigate to Settings page | Settings page loads<br>Email notification preferences<br>Default leave duration options<br>Save settings functionality |
| TC019 | Notification Badge - Employee | Employee logged in, Has pending approvals | 1. View navbar notification bell | Badge shows number of pending requests<br>Clicking bell shows notification list<br>Mark as read functionality |
| TC020 | Responsive Design - Mobile | Employee logged in, Mobile device | 1. Access application on mobile<br>2. Navigate through all pages | Responsive layout works<br>All buttons accessible<br>Tables scroll horizontally<br>Form fields properly sized |

## Team Lead Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC021 | Team Lead Login - Valid Credentials | Backend server running, Team Lead account exists | 1. Open login page<br>2. Enter valid TL email (tl@company.com)<br>3. Enter valid password (admin123)<br>4. Click Login button | Team Lead successfully logged in<br>Redirected to dashboard<br>User role displayed as TEAM_LEAD<br>JWT token generated |
| TC022 | View Pending Approvals - Team Lead | Team Lead logged in, Has pending requests | 1. Navigate to Leave Status page<br>2. Filter by status "Pending" | All pending requests at TEAM_LEAD level shown<br>Approval/Reject buttons visible<br>Employee information displayed |
| TC023 | Approve Leave Request - Team Lead | Team Lead logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Approve button on pending request<br>3. Confirm approval | Request status remains PENDING<br>Current level changes to HR<br>Approval timestamp recorded<br>Success message displayed |
| TC024 | Reject Leave Request - Team Lead | Team Lead logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Reject button on pending request<br>3. Confirm rejection | Request status changes to REJECTED<br>Workflow stops<br>Rejection timestamp recorded<br>Success message displayed |
| TC025 | View Team Member Requests - Team Lead | Team Lead logged in, Team has requests | 1. Navigate to Leave Status page<br>2. View all requests | Can see all team member requests<br>Cannot see requests from other teams<br>Proper filtering by team |

## HR Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC026 | HR Login - Valid Credentials | Backend server running, HR account exists | 1. Open login page<br>2. Enter valid HR email (hr@company.com)<br>3. Enter valid password (admin123)<br>4. Click Login button | HR successfully logged in<br>Redirected to dashboard<br>User role displayed as HR<br>JWT token generated |
| TC027 | View HR Pending Approvals | HR logged in, Has requests at HR level | 1. Navigate to Leave Status page<br>2. Filter by status "Pending" | Only requests at HR level shown<br>Previous approval history visible<br>Employee details displayed |
| TC028 | HR Approve Request | HR logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Approve on pending request<br>3. Confirm approval | Request moves to MANAGER level<br>Status remains PENDING<br>Approval logged<br>Success message shown |
| TC029 | HR Reject Request | HR logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Reject on pending request<br>3. Confirm rejection | Request status becomes REJECTED<br>Workflow terminated<br>Rejection reason logged |
| TC030 | View Company-wide Statistics | HR logged in | 1. Navigate to Dashboard<br>2. View KPI cards | Company-wide leave statistics shown<br>Approval rates visible<br>Trends and patterns displayed |

## Manager Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC031 | Manager Login - Valid Credentials | Backend server running, Manager account exists | 1. Open login page<br>2. Enter valid Manager email (manager@company.com)<br>3. Enter valid password (admin123)<br>4. Click Login button | Manager successfully logged in<br>Redirected to dashboard<br>User role displayed as MANAGER<br>JWT token generated |
| TC032 | Manager Pending Approvals | Manager logged in, Has requests at Manager level | 1. Navigate to Leave Status page<br>2. Filter by status "Pending" | Only requests at MANAGER level shown<br>Department statistics visible<br>Leave balance information |
| TC033 | Manager Approve Request | Manager logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Approve on pending request<br>3. Confirm approval | Request moves to CEO level<br>Status remains PENDING<br>Department impact assessed |
| TC034 | Manager Reject Request | Manager logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Reject on pending request<br>3. Confirm rejection | Request becomes REJECTED<br>Department coverage checked<br>Rejection documented |
| TC035 | Department Leave Calendar | Manager logged in | 1. Navigate to Dashboard<br>2. View calendar view | Department leave calendar shown<br>Overlapping periods highlighted<br>Staffing levels displayed |

## CEO Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC036 | CEO Login - Valid Credentials | Backend server running, CEO account exists | 1. Open login page<br>2. Enter valid CEO email (ceo@company.com)<br>3. Enter valid password (admin123)<br>4. Click Login button | CEO successfully logged in<br>Redirected to dashboard<br>User role displayed as CEO<br>JWT token generated |
| TC037 | CEO Final Approvals | CEO logged in, Has requests at CEO level | 1. Navigate to Leave Status page<br>2. Filter by status "Pending" | Only final approval requests shown<br>Company-wide impact visible<br>Executive summary available |
| TC038 | CEO Approve Request | CEO logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Approve on pending request<br>3. Confirm final approval | Request status becomes APPROVED<br>Workflow completed<br>Final approval recorded |
| TC039 | CEO Reject Request | CEO logged in, Has pending request | 1. Navigate to Leave Status page<br>2. Click Reject on pending request<br>3. Confirm rejection | Request becomes REJECTED<br>Final decision made<br>Executive override logged |
| TC040 | Company-wide Analytics | CEO logged in | 1. Navigate to Dashboard<br>2. View analytics section | Comprehensive company analytics<br>Leave trends over time<br>Cost impact analysis<br>Department comparisons |

## Integration Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC041 | Complete Approval Workflow | All user accounts exist, Backend running | 1. Employee applies for leave<br>2. Team Lead approves<br>3. HR approves<br>4. Manager approves<br>5. CEO approves | Request progresses through all levels<br>Final status APPROVED<br>All timestamps recorded<br>Notifications sent at each step |
| TC042 | Rejection at Any Level | All user accounts exist, Backend running | 1. Employee applies for leave<br>2. Team Lead rejects | Request immediately REJECTED<br>Workflow stops<br>No further approvals possible<br>Employee notified |
| TC043 | Concurrent Leave Requests | Multiple employees, Same time period | 1. Multiple employees apply for overlapping dates<br>2. System processes all requests | All requests handled independently<br>No conflicts in processing<br>Proper queue management |
| TC044 | Database Consistency | Full system operation | 1. Perform multiple operations<br>2. Check database integrity | All data consistent<br>No orphaned records<br>Foreign keys maintained<br>Audit trail complete |

## Performance Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC045 | Load Testing - Login | 100 concurrent users | 1. 100 users login simultaneously | All logins processed<br>Response time < 2 seconds<br>No database errors<br>System remains stable |
| TC046 | Load Testing - Leave Application | 50 concurrent employees | 1. 50 employees apply for leave simultaneously | All requests processed<br>No duplicate entries<br>Proper sequencing maintained |
| TC047 | Stress Testing - Maximum Load | System at capacity | 1. Simulate maximum user load<br>2. Monitor system performance | System handles load gracefully<br>Degraded performance but functional<br>No data corruption |
| TC048 | Database Performance | Large dataset | 1. Generate 10,000 leave requests<br>2. Test query performance | Queries complete < 1 second<br>Indexes working properly<br>No performance bottlenecks |

## Security Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC049 | SQL Injection Protection | Backend running | 1. Attempt SQL injection in login form<br>2. Attempt injection in search fields | Input sanitized properly<br>No SQL errors<br>Application remains secure |
| TC050 | XSS Protection | Backend running | 1. Submit XSS payload in form fields<br>2. Check response rendering | XSS encoded properly<br>No script execution<br>Safe HTML output |
| TC051 | JWT Token Security | Valid token | 1. Manipulate JWT token<br>2. Use expired token<br>3. Use invalid token | Invalid tokens rejected<br>Expired tokens rejected<br>Proper error messages |
| TC052 | Authorization Bypass | Various user roles | 1. Try to access other users' data<br>2. Try to access unauthorized endpoints | Access properly denied<br>403/401 errors returned<br>No data leakage |

## Error Handling Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC053 | Network Connection Loss | During operation | 1. Start form submission<br>2. Disconnect network<br>3. Reconnect | Graceful error handling<br>User informed of issue<br>Data preserved if possible |
| TC054 | Server Error Simulation | Backend running | 1. Trigger server error<br>2. Check client response | Proper error message displayed<br>No application crash<br>Recovery options available |
| TC055 | Database Connection Error | Backend running | 1. Stop database service<br>2. Try to access data | User-friendly error message<br>Service unavailable indication<br>Retry mechanism available |
| TC056 | File Upload Error | If file upload feature exists | 1. Upload invalid file type<br>2. Upload oversized file | Proper validation<br>Clear error messages<br>No server corruption |

## Usability Test Cases

| Test Case ID | Description | Preconditions | Steps | Expected Result |
|--------------|-------------|----------------|-------|-----------------|
| TC057 | Form Validation Messages | User on form page | 1. Submit empty form<br>2. Enter invalid data<br>3. Check validation messages | Clear, helpful error messages<br>Field highlighting for errors<br>Success messages for valid input |
| TC058 | Navigation Ease | User logged in | 1. Navigate through all pages<br>2. Test all menu items | Intuitive navigation<br>Breadcrumbs work correctly<br>Back/forward browser buttons work |
| TC059 | Mobile Usability | Mobile device | 1. Test all features on mobile<br>2. Check touch interactions | All features accessible<br>Touch targets properly sized<br>Scrolling works correctly |
| TC060 | Accessibility | Screen reader enabled | 1. Test with screen reader<br>2. Check keyboard navigation | All elements accessible<br>Proper ARIA labels<br>Keyboard navigation complete |

---

## Test Execution Summary

### Total Test Cases: 60
- **Employee Tests**: 20
- **Team Lead Tests**: 5
- **HR Tests**: 5
- **Manager Tests**: 5
- **CEO Tests**: 5
- **Integration Tests**: 4
- **Performance Tests**: 4
- **Security Tests**: 4
- **Error Handling Tests**: 4
- **Usability Tests**: 4

### Priority Levels:
- **P0 (Critical)**: Core functionality (TC001, TC005, TC023, TC028, TC033, TC038)
- **P1 (High)**: Important features (TC002, TC006, TC021, TC026, TC031, TC036)
- **P2 (Medium)**: Additional features (TC009, TC012, TC024, TC029, TC034, TC039)
- **P3 (Low)**: Nice to have (TC018, TC019, TC020, TC041, TC045, TC057)

### Test Environment Requirements:
- Backend server running on localhost:8080
- Frontend accessible on localhost:5173
- Database with sample data
- Valid user accounts for all roles
- Network connectivity for API testing

### Success Criteria:
- All P0 test cases must pass
- 95% of P1 test cases must pass
- 90% of P2 test cases must pass
- 80% of P3 test cases must pass
- No critical security vulnerabilities
- Performance benchmarks met
