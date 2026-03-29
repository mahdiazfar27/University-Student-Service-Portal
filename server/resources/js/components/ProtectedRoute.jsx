import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user, loading, token } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc' }}>
                <div style={{ padding: '20px', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                    Loading...
                </div>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Optional: role check
    if (role && user && user.role_id !== getRoleId(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const getRoleId = (role) => {
    const roles = { admin: 1, student: 2, faculty: 3 };
    return roles[role];
};

export default ProtectedRoute;
