import React from 'react';
import './Loading.css';

/**
 * Loading Component
 * 
 * Display loading spinner
 * 
 * Props:
 * - fullpage: boolean - fill entire page (default: false)
 * - message: string - loading message
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 */
const Loading = ({ fullpage = false, message = 'Loading...', size = 'md' }) => {
  const containerClass = fullpage ? 'loading-fullpage' : 'loading-container';

  return (
    <div className={containerClass}>
      <div className={`spinner spinner-${size}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
