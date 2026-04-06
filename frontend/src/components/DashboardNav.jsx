import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardNav.css';

const DashboardNav = ({ user, onLogout, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-header">
        <div className="logo">
          <h1>IUMS</h1>
        </div>
        <div className="nav-title">
          <h2>Student Portal</h2>
        </div>
      </div>

      <div className="user-section">
        <div className="user-info">
          <p className="user-name">{user?.name || 'Student'}</p>
          <p className="user-email">{user?.email}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNav;
