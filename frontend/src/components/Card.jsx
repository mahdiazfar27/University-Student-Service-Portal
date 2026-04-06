import React from 'react';
import './Card.css';

/**
 * Card Component
 * 
 * A flexible card container for grouping related content
 * 
 * Props:
 * - title: string - card title
 * - subtitle: string - card subtitle
 * - className: string - additional classes
 * - children: React node - card content
 */
const Card = ({ title, subtitle, className = '', children }) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
