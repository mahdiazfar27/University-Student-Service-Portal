import React from 'react';
import './Alert.css';

/**
 * Alert Component
 * 
 * Display alert/notification messages
 * 
 * Props:
 * - type: 'info' | 'success' | 'warning' | 'error' (default: 'info')
 * - message: string - alert message
 * - title: string - alert title
 * - onClose: function - called when alert is closed
 * - dismissible: boolean - show close button (default: true)
 * - icon: React node - custom icon
 */
const Alert = ({
  type = 'info',
  message = '',
  title = '',
  onClose = null,
  dismissible = true,
  icon = null,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        {icon && <div className="alert-icon">{icon}</div>}
        <div className="alert-text">
          {title && <h4 className="alert-title">{title}</h4>}
          {message && <p className="alert-message">{message}</p>}
        </div>
      </div>
      {dismissible && (
        <button
          className="alert-close"
          onClick={handleClose}
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
