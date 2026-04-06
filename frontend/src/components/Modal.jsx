import React from 'react';
import './Modal.css';

/**
 * Modal Component
 * 
 * Dialog modal for displaying content in a modal window
 * 
 * Props:
 * - isOpen: boolean - whether modal is open
 * - onClose: function - called when modal should close
 * - title: string - modal title
 * - children: React node - modal content
 * - maxWidth: string - max width of modal (default: '500px')
 * - closeButton: boolean - show close button (default: true)
 * - closeOnBackdrop: boolean - close on backdrop click (default: true)
 */
const Modal = ({
  isOpen = false,
  onClose,
  title = '',
  children,
  maxWidth = '500px',
  closeButton = true,
  closeOnBackdrop = true,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape' && closeOnBackdrop) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content" style={{ maxWidth }}>
        {(title || closeButton) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {closeButton && (
              <button
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
