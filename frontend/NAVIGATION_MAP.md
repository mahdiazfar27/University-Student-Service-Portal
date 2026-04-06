# Frontend Page Structure & Navigation Map

## Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Application                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    App.jsx (Root)                          │  │
│  │  - ErrorBoundary wrapper                                  │  │
│  │  - AuthProvider                                           │  │
│  │  - ToastProvider                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│                            │                                      │
│                            ▼                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   AppRouter.jsx                           │  │
│  │         (React Router with Protected Routes)             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Route Navigation Tree

```
ROOT (/)
│
├── /login                          [PUBLIC - No Auth Required]
│   └── LoginPage
│       ├── Email/Password Input
│       ├── Form Validation
│       ├── Login API Call
│       └── Redirect to /dashboard on success
│
├── /dashboard                      [PROTECTED - Auth Required]
│   └── StudentDashboard
│       ├── User Greeting Card
│       ├── Quick Stats (GPA, Courses, Attendance %)
│       ├── Recent Grades
│       ├── Upcoming Assignments
│       └── Quick Links to other pages
│
├── /courses                        [PROTECTED]
│   └── CoursesPage
│       ├── Current Semester Display
│       ├── Available Courses DataTable
│       │   ├─ Course Code
│       │   ├─ Course Name
│       │   ├─ Instructor
│       │   ├─ Capacity
│       │   └─ Action Buttons (Enroll/Unenroll)
│       ├── Pagination Controls
│       ├── Current Enrollments List
│       └── Loading/Error States
│
├── /grades                         [PROTECTED]
│   └── GradesPage
│       ├── Semester Tabs
│       ├── GPA Summary Cards
│       │   ├─ Overall GPA
│       │   ├─ Semester GPA
│       │   └─ Grade Point Average
│       ├── Course Grades Table
│       │   ├─ Course Code
│       │   ├─ Course Name
│       │   ├─ Letter Grade (A-F)
│       │   ├─ Numeric Score
│       │   └─ Status Badge
│       ├── Overall Statistics
│       │   ├─ Total Courses
│       │   ├─ Passed Count
│       │   └─ Failed Count
│       └── Loading/Error States
│
├── /attendance                     [PROTECTED]
│   └── AttendancePage
│       ├── Enrollment Tabs (multiple courses)
│       ├── Attendance Summary Cards
│       │   ├─ Total Classes
│       │   ├─ Present Count
│       │   ├─ Absent Count
│       │   └─ Late Count
│       ├── Attendance Percentage Bar
│       ├── Detailed Attendance Table
│       │   ├─ Class Date
│       │   ├─ Duration
│       │   └─ Status (Present/Absent/Late)
│       └── Loading/Error States
│
├── /schedule                       [PROTECTED]
│   └── SchedulePage
│       ├── Today's Classes Section
│       │   └─ Quick view of today's courses
│       ├── Semester Selector (Tabs)
│       ├── Weekly Schedule Grid
│       │   ├─ Monday Classes
│       │   ├─ Tuesday Classes
│       │   ├─ Wednesday Classes
│       │   ├─ Thursday Classes
│       │   ├─ Friday Classes
│       │   └─ Saturday Classes
│       ├─ Each Class Shows:
│       │   ├─ Course Code
│       │   ├─ Course Name
│       │   ├─ Start/End Time
│       │   ├─ Room/Location
│       │   └─ Instructor Name
│       ├── Schedule Legend
│       └── Loading/Error States
│
├── /payments                       [PROTECTED]
│   └── PaymentsPage
│       ├── Summary Cards
│       │   ├─ Total Fees
│       │   ├─ Total Paid
│       │   └─ Outstanding Balance
│       ├── Payment Breakdown by Category
│       │   ├─ Fee Type
│       │   ├─ Amount
│       │   ├─ Due Date
│       │   └─ Status Badge
│       ├── Payment History Table
│       │   ├─ Transaction ID
│       │   ├─ Amount
│       │   ├─ Payment Date
│       │   ├─ Payment Method
│       │   └─ Status
│       ├── Fees Due Table
│       │   (Only unpaid fees)
│       ├── "All Paid" Success State
│       ├── Print Statement Button
│       └── Loading/Error States
│
├── /profile                        [PROTECTED]
│   └── ProfilePage
│       ├── Profile Photo Section
│       │   ├─ Photo Display/Upload
│       │   └─ Student Info Card
│       ├── Profile Information Section
│       │   ├─ View Mode
│       │   │   ├─ First Name
│       │   │   ├─ Last Name
│       │   │   ├─ Email
│       │   │   ├─ Student ID
│       │   │   ├─ Phone Number
│       │   │   ├─ Department
│       │   │   └─ Enrollment Year
│       │   ├─ Edit Mode
│       │   │   └─ Form with same fields
│       │   └─ Toggle between View/Edit
│       ├── Security Section
│       │   ├─ Password Change Form
│       │   │   ├─ Current Password
│       │   │   ├─ New Password
│       │   │   └─ Confirm Password
│       │   └─ Form Validation
│       └── Loading/Error States
│
├── /settings                       [PROTECTED]
│   └── SettingsPage
│       ├── Display Preferences Card
│       │   ├─ Dark Mode Toggle
│       │   └─ Language Select
│       ├── Notification Settings Card
│       │   ├─ Email Notifications Toggle
│       │   └─ SMS Notifications Toggle
│       ├── Privacy Settings Card
│       │   ├─ Privacy Policy Link
│       │   └─ Connected Apps Link
│       ├── Security Settings Card
│       │   ├─ Active Sessions Info
│       │   ├─ Logout All Devices Button
│       │   └─ Delete Account Button
│       ├── About Section
│       │   ├─ App Version
│       │   ├─ Last Updated Date
│       │   └─ Support Email
│       └── Save/Apply Buttons
│
└── * (Catch All)                  [PUBLIC]
    └── NotFoundPage (404)
        ├── 404 Message
        ├── Go to Dashboard Link
        └── Go to Home Link
```

---

## Component Dependency Tree

```
App
├── ErrorBoundary (main.jsx)
├── AuthProvider
│   └── ToastProvider
│       ├── AppRouter
│       │   ├── LoginPage
│       │   │   ├── Input
│       │   │   ├── Button
│       │   │   ├── Card
│       │   │   └── useAuth()
│       │   │
│       │   └── ProtectedRoute
│       │       ├── StudentDashboard
│       │       │   ├── Card
│       │       │   ├── Button
│       │       │   ├── Loading
│       │       │   ├── useAuth()
│       │       │   └── useToast()
│       │       │
│       │       ├── CoursesPage
│       │       │   ├── Card
│       │       │   ├── DataTable
│       │       │   ├── Pagination
│       │       │   ├── Button
│       │       │   ├── Badge
│       │       │   ├── Loading
│       │       │   ├── useAuth()
│       │       │   ├── useToast()
│       │       │   └── Axios API
│       │       │
│       │       ├── GradesPage
│       │       │   ├── Card
│       │       │   ├── Tabs
│       │       │   ├── DataTable
│       │       │   ├── Badge
│       │       │   ├── Loading
│       │       │   ├── useAuth()
│       │       │   ├── useToast()
│       │       │   └── Axios API
│       │       │
│       │       ├── AttendancePage
│       │       │   ├── Card
│       │       │   ├── Tabs
│       │       │   ├── DataTable
│       │       │   ├── Badge
│       │       │   ├── Loading
│       │       │   ├── useAuth()
│       │       │   ├── useToast()
│       │       │   └── Axios API
│       │       │
│       │       ├── ProfilePage
│       │       │   ├── Card
│       │       │   ├── Input
│       │       │   ├── Button
│       │       │   ├── Loading
│       │       │   ├── useAuth()
│       │       │   ├── useToast()
│       │       │   ├── useForm()
│       │       │   └── Axios API
│       │       │
│       │       ├── SchedulePage
│       │       │   ├── Card
│       │       │   ├── Tabs
│       │       │   ├── Badge
│       │       │   ├── Loading
│       │       │   ├── useAuth()
│       │       │   ├── useToast()
│       │       │   └── Axios API
│       │       │
│       │       ├── PaymentsPage
│       │       │   ├── Card
│       │       │   ├── DataTable
│       │       │   ├── Badge
│       │       │   ├── Button
│       │       │   ├── Loading
│       │       │   ├── useAuth()
│       │       │   ├── useToast()
│       │       │   └── Axios API
│       │       │
│       │       ├── SettingsPage
│       │       │   ├── Card
│       │       │   ├── Input
│       │       │   ├── Button
│       │       │   ├── useAuth()
│       │       │   ├── useToast()
│       │       │   └── Axios API
│       │       │
│       │       └── NotFoundPage
│       │           ├── Card
│       │           ├── Button
│       │           └── Link
│       │
│       └── ToastContainer
│           └── Toast Notifications
```

---

## Data Flow Diagram

```
User Interaction (Click, Submit, etc.)
        │
        ▼
Component Event Handler
        │
        ▼
State Update (useState)
        │
        ▼
Side Effect (useEffect)
        │
        ▼
API Call (axios)
        │
    ┌───┴───┐
    │       │
Success   Error
    │       │
    ▼       ▼
Parse   transformError()
Data        │
    │       ▼
    │   Show Error Toast
    │       │
    └───┬───┘
        │
        ▼
Update State
        │
        ▼
Component Re-render
        │
        ▼
UI Updated
```

---

## Authentication Flow

```
┌─────────────────────────────────────────┐
│         User Visits Application          │
└──────────────────┬──────────────────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │ Check Auth Token in │
         │    localStorage     │
         └────┬──────────┬─────┘
              │          │
          Token      No Token
          Found      Found
              │          │
              ▼          ▼
         ┌─────────┐  ┌──────────┐
         │ Restore │  │ Redirect │
         │  User   │  │ to Login │
         │ Session │  └──────────┘
         └────┬────┘
              │
              ▼
    ┌─────────────────────────┐
    │ Display Protected Page  │
    │   or Show Dashboard     │
    └─────────────────────────┘

LoginPage:
┌──────────────────────────────┐
│ User Enters Credentials      │
└──────────────┬───────────────┘
               │
               ▼
        API Call: POST /auth/login
               │
         ┌─────┴─────┐
         │           │
      Success      Error
         │           │
         ▼           ▼
    Store Token  Show Error Toast
    in Storage   (Invalid Credentials)
         │           │
         │◄───────────┘
         │
         ▼
    Redirect to
    /dashboard
```

---

## State Management Overview

```
AuthContext
├── State:
│   ├── user (User object)
│   ├── token (Auth token)
│   ├── isAuthenticated (boolean)
│   └── loading (boolean)
├── Methods:
│   ├── login(email, password)
│   ├── logout()
│   ├── register(userData)
│   ├── updateProfile(data)
│   └── changePassword(oldPass, newPass)
└── Provides: useAuth() hook

ToastContext
├── State:
│   ├── toasts (Array of toast objects)
│   └── autoRemove timer IDs
├── Methods:
│   ├── addToast(message, type, duration)
│   ├── showSuccess(message)
│   ├── showError(message)
│   ├── showWarning(message)
│   └── showInfo(message)
└── Provides: useToast() hook
```

---

## CSS Architecture

```
Global Styles (App.css)
├── Reset & Normalize
├── Typography
├── Form Elements
├── Utilities (.container, .flex, etc.)
├── Animations (@keyframes)
└── Dark Mode (body.dark-mode)

Component Styles (Component.css)
├── Component-specific classes
├── Dark mode variants
└── Responsive media queries

Page Styles (PageName.css)
├── Page layout
├── Component composition
├── Responsive design
├── Print styles (where applicable)
└── Dark mode support

Responsive Breakpoints:
├── Desktop (1200px+)
├── Tablet (768px - 1199px)
└── Mobile (0px - 767px)

Dark Mode:
├── Triggered by: body.dark-mode class
├── Stored in: localStorage (darkMode key)
├── Color scheme:
│   ├── Background: #1a1a2e / #16213e
│   ├── Surface: #1e293b / #0f172a
│   ├── Text: #ecf0f1
│   └── Accent: #a5b4fc (from #667eea)
```

---

## API Integration Architecture

```
axios (HTTP Client)
    │
    ├── Request Interceptor
    │   └── Inject Authorization header with token
    │
    ├── API Endpoints (20+ used)
    │   ├── Authentication
    │   ├── Courses & Enrollment
    │   ├── Grades & Results
    │   ├── Attendance
    │   ├── Schedule
    │   ├── Payments
    │   └── Profile
    │
    └── Response Handling
        ├── Success: Parse & return data
        └── Error: Pass to transformError()
                   ├── Validation errors
                   ├── Auth errors (401)
                   ├── Permission errors (403)
                   ├── Not found (404)
                   ├── Server errors (5xx)
                   └── Network errors
                       │
                       ▼
                   displayError Toast
```

---

## Summary

- **10 Pages**: All built with consistent patterns
- **13 Components**: Reusable and composable
- **2 Contexts**: Auth and Toast management
- **5 Custom Hooks**: for common functionality
- **3 Utility Files**: 50+ helper functions
- **Fully Responsive**: Mobile-first design
- **Dark Mode Ready**: Complete support
- **Error Handling**: Comprehensive throughout
- **API Integrated**: 20+ endpoints connected
- **Documentation**: Complete and detailed

---
