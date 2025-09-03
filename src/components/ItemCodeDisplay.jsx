import React from 'react';
import { getItemName, hasItemCode } from '../utils/itemCodeMapping';

/**
 * Component to display item information with proper name mapping
 * This fixes the issue where "Other" was being displayed instead of the actual item name
 */
const ItemCodeDisplay = ({ itemCode, description, value, status, date, ...props }) => {
  // Get the proper item name from the mapping
  const itemName = getItemName(itemCode);
  const isValidItemCode = hasItemCode(itemCode);

  return (
    <div className="item-display" {...props}>
      <div className="item-header">
        <div className="item-label">
          {/* Use the mapped item name instead of hardcoded "Other" */}
          {itemName}
          {!isValidItemCode && itemCode && (
            <span className="item-code-badge">
              Code: {itemCode}
            </span>
          )}
        </div>
        {status && (
          <div className={`item-status status-${status.toLowerCase()}`}>
            {status}
          </div>
        )}
      </div>
      
      {description && (
        <div className="item-description">
          {description}
        </div>
      )}
      
      {value && (
        <div className="item-value">
          {value}
        </div>
      )}
      
      {date && (
        <div className="item-date">
          {date}
        </div>
      )}
    </div>
  );
};

/**
 * Example usage component showing how to fix the "Other" issue
 */
const ItemCodeExample = () => {
  // Example data - this would come from your actual data source
  const labResults = [
    {
      itemCode: '48119',
      description: 'Blood test for complete blood count',
      value: 'Normal',
      status: 'Normal',
      date: 'Jan 15, 2024'
    },
    {
      itemCode: '48120',
      description: 'Cholesterol and lipid panel',
      value: 'High',
      status: 'High',
      date: 'Jan 10, 2024'
    },
    {
      itemCode: '99999', // Unknown code - will show "Other"
      description: 'Unknown test',
      value: 'Pending',
      status: 'Pending',
      date: 'Jan 20, 2024'
    }
  ];

  return (
    <div className="lab-results-container">
      <h3>Lab Results (Fixed)</h3>
      <div className="lab-results-list">
        {labResults.map((result, index) => (
          <ItemCodeDisplay
            key={index}
            itemCode={result.itemCode}
            description={result.description}
            value={result.value}
            status={result.status}
            date={result.date}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              backgroundColor: '#ffffff'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemCodeDisplay;
export { ItemCodeExample };

