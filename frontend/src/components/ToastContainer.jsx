import React from 'react';
import { useToast } from '../context/ToastContext';
import './ToastContainer.css';

/**
 * ToastContainer Component
 * 
 * Displays toast notifications
 * Should be placed at the root level of the app
 */
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

/**
 * Individual Toast Component
 */
const Toast = ({ toast, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '●';
    }
  };

  const getAriaLabel = (type) => {
    switch (type) {
      case 'success':
        return 'Success notification';
      case 'error':
        return 'Error notification';
      case 'warning':
        return 'Warning notification';
      case 'info':
        return 'Information notification';
      default:
        return 'Notification';
    }
  };

  return (
    <div
      className={`toast toast-${toast.type}`}
      role="alert"
      aria-label={getAriaLabel(toast.type)}
    >
      <div className="toast-icon">{getIcon(toast.type)}</div>
      <div className="toast-message">{toast.message}</div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastContainer;
