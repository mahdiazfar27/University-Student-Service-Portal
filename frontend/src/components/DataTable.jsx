import React from 'react';
import './DataTable.css';

/**
 * DataTable Component
 * 
 * Display data in a responsive table format
 * 
 * Props:
 * - columns: Array - table column definitions [{key, label, render}]
 * - data: Array - table data
 * - loading: boolean - loading state
 * - emptyMessage: string - message when no data
 * - onRowClick: function - row click handler
 * - rowClassName: function - custom row class
 * - striped: boolean - striped rows (default: true)
 * - hoverable: boolean - hover effect (default: true)
 */
const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No data available',
  onRowClick = null,
  rowClassName = null,
  striped = true,
  hoverable = true,
}) => {
  if (loading) {
    return (
      <div className="data-table-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="data-table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="data-table-wrapper">
      <table className={`data-table ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowClassName ? rowClassName(row) : ''}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.key}`}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
