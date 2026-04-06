# Frontend Architecture & Setup Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Installation & Setup](#installation--setup)
4. [Directory Structure](#directory-structure)
5. [Core Concepts](#core-concepts)
6. [Component System](#component-system)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Form Handling](#form-handling)
10. [Error Handling](#error-handling)
11. [Styling Guide](#styling-guide)
12. [Development Workflow](#development-workflow)
13. [Deployment](#deployment)
14. [FAQ](#faq)

---

## Project Overview

The University Academic Management System (IUMS) frontend is a modern React application built with:
- **Vite** for fast development and builds
- **React 18** for UI rendering
- **React Router** for client-side routing
- **Axios** for HTTP requests
- **Custom Context API** for state management
- **Custom hooks** and utility functions for common operations

### Key Features

- ✅ User authentication and authorization
- ✅ Protected routes with role-based access
- ✅ Responsive design for all devices
- ✅ Dark mode support
- ✅ Comprehensive component library
- ✅ Form validation and error handling
- ✅ Toast notifications
- ✅ Error boundaries
- ✅ Accessibility features (ARIA, semantic HTML)
- ✅ Optimized performance

---

## Architecture Overview

### Application Structure

```
┌─────────────────────────────────────────┐
│          React Application              │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │      Error Boundary                │ │
│  │                                    │ │
│  │  ┌──────────────────────────────┐ │ │
│  │  │   Auth Provider              │ │ │
│  │  │                              │ │ │
│  │  │  ┌────────────────────────┐ │ │ │
│  │  │  │  Toast Provider        │ │ │ │
│  │  │  │                        │ │ │ │
│  │  │  │  ┌────────────────────┐│ │ │ │
│  │  │  │  │   App Router       ││ │ │ │
│  │  │  │  │   (Routes)         ││ │ │ │
│  │  │  │  └────────────────────┘│ │ │ │
│  │  │  │                        │ │ │ │
│  │  │  │  ┌────────────────────┐│ │ │ │
│  │  │  │  │ Toast Container    ││ │ │ │
│  │  │  │  │ (Notifications)    ││ │ │ │
│  │  │  │  └────────────────────┘│ │ │ │
│  │  │  └────────────────────────┘ │ │ │
│  │  └──────────────────────────────┘ │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Data Flow

```
┌──────────────────────────────────────────────┐
│          Client Application                  │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Components (Pages, Compound)          │ │
│  │                                        │ │
│  │  useAuth() → AuthContext              │ │
│  │  useToast() → ToastContext            │ │
│  │  useForm() → Form State               │ │
│  └────────────┬───────────────────────────┘ │
│               │                             │
│               ↓                             │
│  ┌────────────────────────────────────────┐ │
│  │  API Client (Axios)                   │ │
│  │  - Interceptors                       │ │
│  │  - Token management                   │ │
│  │  - Error handling                     │ │
│  └────────────┬───────────────────────────┘ │
│               │                             │
└───────────────┼─────────────────────────────┘
                │
                ↓
        ┌───────────────┐
        │  Backend API  │
        │  (Laravel)    │
        └───────────────┘
```

---

## Installation & Setup

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm 7+ or yarn 3+
- Git
- Modern web browser

### Step-by-Step Installation

#### 1. Clone and Navigate

```bash
cd frontend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create Environment File

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your API URL and settings
nano .env  # or use your favorite editor
```

#### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

#### 5. Build for Production

```bash
npm run build

# Preview production build
npm run preview
```

---

## Directory Structure

### Detailed Structure

```
frontend/
│
├── src/
│   ├── api/
│   │   └── apiClient.js        # Axios instance & API endpoints
│   │
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Loading.jsx
│   │   ├── Alert.jsx
│   │   ├── Badge.jsx
│   │   ├── Pagination.jsx
│   │   ├── DataTable.jsx
│   │   ├── Tabs.jsx
│   │   ├── Dropdown.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── DashboardNav.jsx
│   │   ├── Button.css
│   │   ├── Card.css
│   │   └── ... (component styles)
│   │
│   ├── config/
│   │   └── config.js            # Configuration constants
│   │
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── ToastContext.jsx     # Toast notifications
│   │
│   ├── hooks/
│   │   └── useCustomHooks.js    # Custom React hooks
│   │
│   ├── layouts/
│   │   └── (Layout components)
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── StudentDashboard.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── router/
│   │   └── AppRouter.jsx        # Route definitions
│   │
│   ├── styles/
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   └── ... (page styles)
│   │
│   ├── utils/
│   │   ├── helpers.js           # Helper functions
│   │   ├── dateUtils.js         # Date utilities
│   │   ├── apiErrors.js         # API error handling
│   │   └── index.js             # Utility exports
│   │
│   ├── App.jsx                  # Root component
│   ├── App.css                  # Global styles
│   ├── main.jsx                 # Application entry
│   └── index.css                # Base styles
│
├── public/
│   └── (Static assets)
│
├── .env.example                 # Environment template
├── .gitignore
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies
├── index.html                  # HTML template
└── README.md

```

---

## Core Concepts

### 1. Component Architecture

All components follow a consistent pattern:

```jsx
import './ComponentName.css';

/**
 * ComponentName
 * 
 * Brief description of what the component does
 * 
 * Props:
 * - prop1: type - description
 * - prop2: type - description
 */
const ComponentName = ({ prop1, prop2, ...rest }) => {
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### 2. Context-Based State Management

```jsx
// AuthContext.jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // ... auth logic
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// In components
const { user, login, logout } = useAuth();
```

### 3. Custom Hooks Pattern

```jsx
// useCustomHooks.js
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  // ... form logic
  return { values, errors, handleChange, handleSubmit };
};

// In components
const { values, errors, handleSubmit } = useForm(initialValues, onSubmit);
```

---

## Component System

### Button Component Example

```jsx
import { Button } from './components';

// Basic usage
<Button onClick={handleClick}>Click me</Button>

// With variants and loading
<Button 
  variant="primary" 
  size="lg" 
  loading={isLoading}
  disabled={isDisabled}
>
  Submit
</Button>

// Available props:
// - variant: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
// - size: 'sm' | 'md' | 'lg'
// - disabled: boolean
// - loading: boolean
// - fullWidth: boolean
// - onClick: function
// - type: 'button' | 'submit' | 'reset'
```

### DataTable Component Example

```jsx
import { DataTable } from './components';

<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { 
      key: 'email', 
      label: 'Email',
      render: (value) => <a href={`mailto:${value}`}>{value}</a>
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <Badge variant={value}>{value}</Badge>
    },
  ]}
  data={students}
  loading={isLoading}
  emptyMessage="No students found"
  onRowClick={(row) => navigate(`/students/${row.id}`)}
/>
```

### Form with Validation Example

```jsx
import { Input, Button } from './components';
import { useForm } from './hooks/useCustomHooks';
import { validateEmail } from './utils/helpers';

const LoginForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = 
    useForm(
      { email: '', password: '' },
      async (values) => {
        const { email, password } = values;
        if (!validateEmail(email)) {
          setErrors({ email: 'Invalid email' });
          return;
        }
        // Handle login
      }
    );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        name="email"
      />
      <Input
        label="Password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && errors.password}
        name="password"
      />
      <Button type="submit" fullWidth>
        Login
      </Button>
    </form>
  );
};
```

---

## State Management

### Authentication State

```jsx
import { useAuth } from './context/AuthContext';

const MyComponent = () => {
  const {
    user,              // Current user object
    token,             // Auth token
    isAuthenticated,   // Boolean
    loading,           // Loading state
    login,             // Login function
    logout,            // Logout function
    updateProfile,     // Update user function
  } = useAuth();

  return (
    <div>
      {isAuthenticated && <p>Welcome, {user.name}!</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### Toast Notifications

```jsx
import { useToast } from './context/ToastContext';

const MyComponent = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleAction = async () => {
    try {
      await someAction();
      showSuccess('Action completed successfully!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  return <button onClick={handleAction}>Do Something</button>;
};
```

---

## API Integration

### Making API Calls

```jsx
import { studentAPI, courseAPI } from './api/apiClient';
import { useAsync } from './hooks/useCustomHooks';

const StudentList = () => {
  const { data, loading, error, execute } = useAsync(
    () => studentAPI.getStudents(1, 10),
    true // auto-execute
  );

  if (loading) return <Loading />;
  if (error) return <Alert type="error" message={error.message} />;

  return (
    <DataTable
      columns={[/* ... */]}
      data={data}
    />
  );
};
```

### Request Interceptors

The API client automatically:
- Adds authentication token to all requests
- Handles 401 errors by redirecting to login
- Logs errors in development mode
- Formats request/response data

---

## Form Handling

### Form Submission with Validation

```jsx
import { Input, Button } from './components';
import { useForm } from './hooks/useCustomHooks';
import { authAPI } from './api/apiClient';
import { useToast } from './context/ToastContext';

const RegisterForm = () => {
  const { showSuccess, showError } = useToast();
  
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit,
    isSubmitting 
  } = useForm(
    { name: '', email: '', password: '' },
    async (formData) => {
      try {
        await authAPI.register(formData);
        showSuccess('Registration successful!');
      } catch (error) {
        showError(error.response?.data?.message || 'Registration failed');
      }
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <Button 
        type="submit" 
        fullWidth 
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Register
      </Button>
    </form>
  );
};
```

---

## Error Handling

### API Error Handling

```jsx
import { handleAPIError, isValidationError } from './utils/apiErrors';

try {
  await someAPICall();
} catch (error) {
  const errorInfo = handleAPIError(error);
  console.log(errorInfo.message);    // User-friendly message
  console.log(errorInfo.status);     // HTTP status
  console.log(errorInfo.type);       // Error type
  
  if (isValidationError(error)) {
    // Handle validation errors
    const errors = getValidationErrors(error);
  }
}
```

### Error Boundary

Wrap components that might error:

```jsx
import { ErrorBoundary } from './components';

<ErrorBoundary>
  <ComplexComponent />
</ErrorBoundary>
```

---

## Styling Guide

### Global Styles

- Located in `App.css`
- Includes CSS reset, typography, utilities
- Supports dark mode with `.dark-mode` class

### Component Styles

Each component has its own CSS file:
- Located alongside the component
- Scoped to component class names
- Includes responsive breakpoints
- Supports dark mode

### CSS Classes

```css
/* Utility classes available in App.css */
.container         /* Max-width container */
.text-center       /* Text alignment */
.mt-1, .mt-2, etc. /* Margin top */
.mb-1, .mb-2, etc. /* Margin bottom */
.p-1, .p-2, etc.   /* Padding */
.flex              /* Flexbox */
.flex-center       /* Centered flex */
.gap-1, .gap-2     /* Gap between items */
```

### Dark Mode

Automatic dark mode support:

```css
/* Light mode (default) */
.component {
  background: white;
  color: #333;
}

/* Dark mode */
body.dark-mode .component {
  background: #1e293b;
  color: #ecf0f1;
}
```

---

## Development Workflow

### Creating a New Feature

1. **Create component file**
   ```jsx
   // src/pages/MyNewPage.jsx
   import './MyNewPage.css';
   
   const MyNewPage = () => {
     return <div>My Page Content</div>;
   };
   
   export default MyNewPage;
   ```

2. **Add route**
   ```jsx
   // src/router/AppRouter.jsx
   {
     path: '/my-page',
     element: <MyNewPage />
   }
   ```

3. **Create styles**
   ```css
   /* src/pages/MyNewPage.css */
   .my-new-page {
     padding: 2rem;
   }
   ```

### Testing Components Locally

Use browser DevTools:
- React DevTools (browser extension)
- Network tab for API calls
- Console for errors/logs

---

## Deployment

### Production Build

```bash
# Build for production
npm run build

# This creates a `dist` folder with optimized files
```

### Environment Configuration

Update `.env` for different environments:

```env
# .env.production
VITE_API_BASE_URL=https://api.example.com/api/v1
VITE_DEBUG=false
```

### Deployment Steps

1. Build the application
2. Deploy `dist` folder to web server
3. Configure web server to serve `index.html` for all routes
4. Ensure CORS is properly configured on backend

---

## FAQ

### Q: How do I add a new component?

A: Create a new file in `src/components/` with the component code, CSS file, and export it in `src/components/index.js`.

### Q: How do I make API calls?

A: Use functions from `src/api/apiClient.js`. These are pre-configured with authentication and error handling.

### Q: How do I handle forms?

A: Use the `useForm` hook from `src/hooks/useCustomHooks.js` combined with `Input` components.

### Q: How do I show error messages?

A: Use the `useToast` hook to show toast notifications with success/error/warning/info messages.

### Q: How do I protect pages?

A: Wrap components with `ProtectedRoute` component in the router configuration.

### Q: How do I access user data?

A: Use the `useAuth` hook to get current user and authentication state.

### Q: How do I format dates?

A: Import functions from `src/utils/dateUtils.js` like `formatDate`, `formatRelativeTime`, etc.

### Q: How do I validate form input?

A: Use validation functions from `src/utils/helpers.js` like `validateEmail`, `validatePassword`, etc.

### Q: How do I handle API errors?

A: Use the `handleAPIError` function from `src/utils/apiErrors.js` to get user-friendly error messages.

### Q: How do I add dark mode?

A: The system is ready for dark mode. Add a toggle that adds/removes the `.dark-mode` class on the `body` element.

---

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

---

**Last Updated:** 2024  
**Version:** 1.0.0
