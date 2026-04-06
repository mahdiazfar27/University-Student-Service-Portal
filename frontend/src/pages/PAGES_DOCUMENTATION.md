# Pages Documentation

## Overview
This document provides a comprehensive overview of all the page components in the University Academic Management System frontend, including their functionality, API integration, and features.

---

## Pages List

### 1. **LoginPage**
- **Path**: `/login`
- **Access**: Public (no authentication required)
- **Purpose**: User authentication and login
- **Features**:
  - Email/Username input
  - Password input with show/hide toggle
  - Form validation
  - Error handling with toast notifications
  - Redirect to dashboard on successful login
  - Register link for new users

---

### 2. **StudentDashboard** 
- **Path**: `/dashboard`
- **Access**: Protected (requires authentication)
- **Purpose**: Main dashboard showing user overview and key information
- **Features**:
  - User greeting with profile picture
  - Quick stats cards (GPA, Current Courses, Attendance %)
  - Recent grades overview
  - Upcoming assignments/deadlines
  - Quick links to main pages

---

### 3. **CoursesPage**
- **Path**: `/courses`
- **Access**: Protected
- **Purpose**: View available courses and manage enrollments
- **Features**:
  - List of available courses for current semester
  - Course details (code, name, instructor, capacity)
  - Pagination for large course lists
  - Enrollment status indicators
  - Enroll/Unenroll functionality
  - Current enrollments display
  - DataTable component for course listing
- **API Endpoints**:
  - `GET /api/course/list` - Get available courses
  - `POST /api/enrollment/create` - Enroll in course
  - `DELETE /api/enrollment/{id}` - Unenroll from course
  - `GET /api/enrollment/student` - Get student enrollments
  - `GET /api/semester/current` - Get current semester

---

### 4. **GradesPage**
- **Path**: `/grades`
- **Access**: Protected
- **Purpose**: View academic performance and grades by semester
- **Features**:
  - Semester selection via tabs
  - GPA display (Overall and Semester-specific)
  - Course grades table with:
    - Course code and name
    - Letter grade (A-F)
    - Numeric score
    - Grade status
  - Overall statistics:
    - Total courses taken
    - Passed courses count
    - Failed courses count
  - Color-coded badges for grades
  - Grade calculation utilities
- **API Endpoints**:
  - `GET /api/result/student` - Get student results/grades
  - `GET /api/semester/list` - Get all semesters
- **Helper Functions**:
  - `calculateGPA()` - Compute GPA from grades
  - `getGradeLetter()` - Convert score to letter grade
  - `getGradeColor()` - Get color for grade display

---

### 5. **AttendancePage**
- **Path**: `/attendance`
- **Access**: Protected
- **Purpose**: View attendance records for enrolled courses
- **Features**:
  - Enrollment tabs (if multiple enrollments)
  - Attendance summary cards:
    - Total classes
    - Present count
    - Absent count
    - Late count
  - Attendance percentage bar with color coding
  - Detailed attendance table:
    - Class date
    - Duration
    - Attendance status (Present/Absent/Late)
  - Loading states and error handling
- **API Endpoints**:
  - `GET /api/enrollment/student` - Get enrolled courses
  - `GET /api/attendance/enrollment/{id}` - Get attendance records
- **Helper Functions**:
  - `getAttendancePercentage()` - Calculate attendance %
  - `getStatusColor()` - Color code attendance status

---

### 6. **ProfilePage**
- **Path**: `/profile`
- **Access**: Protected
- **Purpose**: View and manage user profile information
- **Features**:
  - Profile photo display/upload
  - Profile information:
    - First name, Last name
    - Email address
    - Student ID
    - Phone number
    - Department
    - Enrollment year
  - Edit mode toggle
  - Profile information form
  - Photo upload with preview
  - Password change functionality:
    - Current password validation
    - New password confirmation
    - Password strength requirements (min 8 chars)
  - Form validation and error handling
- **API Endpoints**:
  - `POST /api/student/update-profile` - Update profile (supports multipart/form-data)
  - `POST /api/auth/change-password` - Change password

---

### 7. **SchedulePage**
- **Path**: `/schedule`
- **Access**: Protected
- **Purpose**: View class schedule and timetable
- **Features**:
  - Today's classes section
  - Weekly schedule grid organized by day
  - Per-course class details:
    - Course code and name
    - Start/end time
    - Course duration
    - Room/location
    - Instructor name
  - Semester selector for multiple semesters
  - Schedule legend explaining symbols
  - Responsive mobile view
  - Loading states
- **API Endpoints**:
  - `GET /api/semester/list` - Get semesters
  - `GET /api/student/schedule` - Get student schedule
- **Helper Functions**:
  - `groupScheduleByDay()` - Organize schedule by day
  - `getCurrentWeekSchedule()` - Get today's classes
  - `getScheduleByDay()` - Filter schedule by day name

---

### 8. **PaymentsPage**
- **Path**: `/payments`
- **Access**: Protected
- **Purpose**: View payment history and fee status
- **Features**:
  - Summary cards:
    - Total fees
    - Total amount paid
    - Outstanding balance
  - Payment breakdown by category
  - Payment history table:
    - Transaction ID
    - Amount paid
    - Payment date
    - Payment method
    - Payment status (Paid/Pending/Overdue)
  - Fees due table:
    - Fee type
    - Amount
    - Due date
    - Status
  - All paid status with checkmark
  - Print statement functionality
  - Color-coded status badges
- **API Endpoints**:
  - `GET /api/student/payments` - Get payment history
  - `GET /api/student/fees` - Get fees/charges
- **Features**:
  - Status color mapping (Paid=green, Pending=yellow, Overdue=red)
  - Print-friendly styling
  - Currency formatting

---

### 9. **SettingsPage**
- **Path**: `/settings`
- **Access**: Protected
- **Purpose**: Manage account preferences and settings
- **Features**:
  - Display Preferences:
    - Dark mode toggle
    - Language selection (EN, ES, FR, DE)
  - Notification Settings:
    - Email notifications toggle
    - SMS notifications toggle
  - Privacy Settings:
    - Privacy policy link
    - Connected apps management
  - Security Settings:
    - Active sessions info
    - Logout all devices
    - Delete account (permanent)
  - About section:
    - App version
    - Last updated date
    - Support email
- **API Endpoints**:
  - `POST /api/student/update-preferences` - Save user preferences
  - `POST /api/auth/logout-all-devices` - Logout from all sessions
  - `POST /api/student/delete-account` - Request account deletion

---

### 10. **NotFoundPage**
- **Path**: `*` (all undefined routes)
- **Access**: Public
- **Purpose**: Display 404 error for undefined routes
- **Features**:
  - 404 error message
  - Navigation link to dashboard/home
  - Styled error page

---

## Page Navigation

### Main Navigation Links (typically in header/sidebar):
- Dashboard → `/dashboard`
- Courses → `/courses`
- Grades → `/grades`
- Attendance → `/attendance`
- Schedule → `/schedule`
- Payments → `/payments`
- Profile → `/profile`
- Settings → `/settings`

---

## Common Components Used Across Pages

All pages utilize the following shared components:

1. **Card** - Container for grouping content
2. **Button** - Action buttons (variants: primary, secondary, danger, etc.)
3. **Input** - Form fields for text input
4. **DataTable** - Display tabular data with sorting/pagination
5. **Tabs** - Switch between different data views
6. **Loading** - Spinner/loading state indicator
7. **Badge** - Status indicators
8. **Dropdown** - Select menus
9. **Modal** - Dialog boxes
10. **Alert** - Info/warning/error messages
11. **ErrorBoundary** - Error catching
12. **ToastContainer** - Toast notifications

---

## State Management

### Context APIs Used:
1. **AuthContext** - User authentication state
   - `useAuth()` hook for accessing auth methods
   - Manages login, logout, user data, tokens

2. **ToastContext** - Toast notifications
   - `useToast()` hook for showing notifications
   - Methods: `showSuccess()`, `showError()`, `showWarning()`, `showInfo()`

### Custom Hooks Used:
- **useForm** - Form state management
- **usePagination** - Pagination logic
- **useAsync** - Async data fetching
- **useDebounce** - Debounced values
- **useLocalStorage** - Local storage sync

---

## API Integration Pattern

All pages follow consistent API integration:

```javascript
import axios from 'axios';
import { transformError } from '../utils/apiErrors';
import { useToast } from '../context/ToastContext';

// In component:
try {
  const response = await axios.get(endpoint);
  if (response.data.success) {
    // Handle data
  }
} catch (error) {
  const errorMessage = transformError(error);
  showError(errorMessage);
}
```

---

## Styling

### CSS Files:
- Each page has a corresponding `.css` file
- Global styles in `App.css`
- Dark mode support with `body.dark-mode` selector
- Responsive design with mobile breakpoints (768px, 480px)

### Common Classes:
- `.container` - Max-width container
- `.flex` - Flexbox utilities
- `.grid` - Grid layouts
- `.text-center` - Text alignment
- Various spacing utilities (`.mt-1`, `.mb-2`, etc.)

---

## Error Handling

All pages implement:
1. Try-catch blocks for async operations
2. `transformError()` utility for consistent error messages
3. Toast notifications for user feedback
4. Loading states during data fetch
5. Error boundary component at root level

---

## Performance Considerations

1. **Lazy Loading**: Pages are code-split via React Router
2. **Memoization**: Components use `React.memo()` where appropriate
3. **Pagination**: DataTables implement pagination for large datasets
4. **Debouncing**: Search/filter inputs use debounce hooks
5. **Caching**: LocalStorage for preferences and auth tokens

---

## Security

Pages implement:
1. **Protected Routes**: All pages except login require authentication
2. **Token Management**: Axios interceptors handle token injection
3. **Password Requirements**: Min 8 characters enforced
4. **Secure Logout**: Session invalidation on logout
5. **Account Deletion**: Requires account deletion confirmation

---

## Future Enhancements

Potential additions to pages:
1. Export to PDF functionality for grades/payments
2. Calendar view for schedule
3. Real-time notifications
4. Two-factor authentication setup
5. Advanced filtering and search
6. Assignment submission interface
7. GPA trends visualization
8. Attendance analytics
9. Course recommendations
10. Mobile app versions

---

## File Structure

```
src/pages/
├── LoginPage.jsx
├── LoginPage.css
├── StudentDashboard.jsx
├── StudentDashboard.css
├── CoursesPage.jsx
├── CoursesPage.css
├── GradesPage.jsx
├── GradesPage.css
├── AttendancePage.jsx
├── AttendancePage.css
├── ProfilePage.jsx
├── ProfilePage.css
├── SchedulePage.jsx
├── SchedulePage.css
├── PaymentsPage.jsx
├── PaymentsPage.css
├── SettingsPage.jsx
├── SettingsPage.css
├── NotFoundPage.jsx
├── NotFoundPage.css
└── index.js (exports all pages)
```

---

## Testing Recommendations

1. **Unit Tests**: Test page-level logic
2. **Integration Tests**: Test API integration
3. **E2E Tests**: Test user workflows
4. **Responsive Tests**: Test mobile/tablet views
5. **Dark Mode Tests**: Verify dark mode styling

---

## Accessibility

All pages should include:
1. Proper semantic HTML
2. ARIA labels for interactive elements
3. Keyboard navigation support
4. Color contrast compliance
5. Screen reader friendly text
6. Form label associations

---
