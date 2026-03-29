import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Views
import Landing from './views/Landing';
import Login from './views/Login';
import AdminDashboard from './views/AdminDashboard';
import StudentDashboard from './views/StudentDashboard';
import UserManagement from './views/UserManagement';
import LibraryCatalog from './views/LibraryCatalog';
import AcademicTranscript from './views/AcademicTranscript';
import CourseRegistration from './views/CourseRegistration';
import FinanceDashboard from './views/FinanceDashboard';
import MyCourses from './views/MyCourses';

const PrivateRoute = ({ children, role }: { children: React.ReactNode, role?: number }) => {
  const { token, user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;
  if (role && user?.role_id !== role) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardRedirect />
            </PrivateRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<PrivateRoute role={1}><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute role={1}><UserManagement /></PrivateRoute>} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<PrivateRoute role={2}><StudentDashboard /></PrivateRoute>} />
          <Route path="/student/courses" element={<PrivateRoute role={2}><MyCourses /></PrivateRoute>} />
          <Route path="/student/library" element={<PrivateRoute role={2}><LibraryCatalog /></PrivateRoute>} />
          <Route path="/student/results" element={<PrivateRoute role={2}><AcademicTranscript /></PrivateRoute>} />
          <Route path="/student/register" element={<PrivateRoute role={2}><CourseRegistration /></PrivateRoute>} />

          {/* Finance Routes */}
          <Route path="/finance/dashboard" element={<PrivateRoute role={4}><FinanceDashboard /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const DashboardRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-navy-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (user?.role?.name === 'Admin') return <Navigate to="/admin/dashboard" />;
  if (user?.role?.name === 'Student') return <Navigate to="/student/dashboard" />;
  if (user?.role?.name === 'Accountant') return <Navigate to="/finance/dashboard" />;
  return <Navigate to="/" />;
};

export default App;
