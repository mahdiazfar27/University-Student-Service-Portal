import React from 'react';
import './Button.css';

/**
 * Button Component
 * 
 * Versatile button component with multiple variants and sizes
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - disabled: boolean
 * - loading: boolean - shows spinner when true
 * - fullWidth: boolean - button takes full width
 * - onClick: function - button click handler
 * - type: 'button' | 'submit' | 'reset' (default: 'button')
 * - className: string - additional classes
 * - children: React node - button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  children,
  ...rest
}) => {
  const buttonClasses = `
    btn
    btn-${variant}
    btn-${size}
    ${fullWidth ? 'btn-full-width' : ''}
    ${disabled || loading ? 'btn-disabled' : ''}
    ${className}
  `
    .split(/\s+/)
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && (
        <span className="btn-spinner">
          <svg
            className="spinner"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.25"
            />
            <path
              d="M12 2a10 10 0 0110 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
