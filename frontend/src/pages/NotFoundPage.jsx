import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './NotFoundPage.css';

/**
 * Not Found Page (404)
 * 
 * Displayed when a requested route is not found
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>

        <div className="not-found-actions">
          <Button onClick={() => navigate('/')}>
            Go to Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
