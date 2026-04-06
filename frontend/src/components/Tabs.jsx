import React, { useState } from 'react';
import './Tabs.css';

/**
 * Tabs Component
 * 
 * Display tabbed navigation interface
 * 
 * Props:
 * - tabs: Array - tab definitions [{id, label, content}]
 * - activeTab: string - active tab id (default: first tab)
 * - onChange: function - called when active tab changes
 * - variant: 'default' | 'pills' (default: 'default')
 */
const Tabs = ({ tabs = [], activeTab = null, onChange = null, variant = 'default' }) => {
  const [active, setActive] = useState(activeTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActive(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={`tabs tabs-${variant}`}>
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tabs-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
            role="tab"
            aria-selected={active === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tabs-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tabs-pane ${active === tab.id ? 'active' : ''}`}
            role="tabpanel"
            hidden={active !== tab.id}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
