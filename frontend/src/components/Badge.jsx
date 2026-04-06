import React from 'react';
import './Badge.css';

/**
 * Badge Component
 * 
 * Display small labels, tags, and status indicators
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - children: React node - badge content
 * - className: string - additional classes
 */
const Badge = ({ variant = 'primary', size = 'md', children, className = '' }) => {
  const badgeClass = `badge badge-${variant} badge-${size} ${className}`.trim();

  return <span className={badgeClass}>{children}</span>;
};

export default Badge;
