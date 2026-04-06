import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

/**
 * Dropdown Component
 * 
 * Display dropdown menu
 * 
 * Props:
 * - trigger: React node - button or element that triggers dropdown
 * - children: React node - dropdown menu content
 * - placement: 'top' | 'bottom' | 'left' | 'right' (default: 'bottom')
 * - closeOnClick: boolean - close on item click (default: true)
 */
const Dropdown = ({
  trigger,
  children,
  placement = 'bottom',
  closeOnClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleItemClick = () => {
    if (closeOnClick) {
      closeDropdown();
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        ref={triggerRef}
        className="dropdown-trigger"
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={`dropdown-menu dropdown-${placement}`}>
          <div onClick={handleItemClick} className="dropdown-content">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * DropdownItem Component
 * 
 * Individual dropdown item
 */
export const DropdownItem = ({ onClick, children, disabled = false, divider = false }) => {
  if (divider) {
    return <div className="dropdown-divider"></div>;
  }

  return (
    <button
      className="dropdown-item"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/**
 * DropdownMenu Component
 * 
 * Dropdown menu wrapper
 */
export const DropdownMenu = ({ children }) => {
  return <div className="dropdown-menu-wrapper">{children}</div>;
};

export default Dropdown;
