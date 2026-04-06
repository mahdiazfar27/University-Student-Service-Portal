import React from 'react';
import './Input.css';

/**
 * Input Component
 * 
 * Controlled input field with validation and error states
 * 
 * Props:
 * - label: string - input label
 * - type: string - input type (default: 'text')
 * - placeholder: string - input placeholder
 * - value: string - input value
 * - onChange: function - change handler
 * - error: string - error message
 * - disabled: boolean - disabled state
 * - required: boolean - required field
 * - icon: React node - icon to display
 * - helperText: string - helper text below input
 * - className: string - additional classes
 */
const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  error = '',
  disabled = false,
  required = false,
  icon = null,
  helperText = '',
  className = '',
  ...rest
}) => {
  const inputId = rest.id || `input-${Math.random()}`;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-indicator">*</span>}
        </label>
      )}

      <div className={`input-wrapper ${icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}>
        {icon && <div className="input-icon">{icon}</div>}
        <input
          id={inputId}
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...rest}
        />
      </div>

      {error && <p className="input-error">{error}</p>}
      {helperText && !error && <p className="input-helper">{helperText}</p>}
    </div>
  );
};

export default Input;
