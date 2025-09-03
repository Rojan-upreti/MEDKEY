import React from 'react';
import { TestTube, ChevronRight } from 'lucide-react';
import { getItemName } from '../utils/itemCodeMapping';

/**
 * Fixed Lab Results Component
 * This component properly displays item names from item codes instead of showing "Other"
 */
const LabResultsFixed = () => {
  // Example lab results data with item codes
  const labResults = [
    {
      itemCode: '48119',
      status: 'Normal',
      date: 'Jan 15, 2024'
    },
    {
      itemCode: '48120',
      status: 'High',
      date: 'Jan 10, 2024'
    },
    {
      itemCode: '48121',
      status: 'Normal',
      date: 'Dec 28, 2023'
    },
    {
      itemCode: '48125',
      status: 'Clear',
      date: 'Dec 15, 2023'
    },
    {
      itemCode: '48126',
      status: 'Normal',
      date: 'Nov 20, 2023'
    }
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'clear':
        return 'status-normal';
      case 'high':
      case 'abnormal':
        return 'status-high';
      case 'low':
        return 'status-low';
      default:
        return 'status-normal';
    }
  };

  return (
    <div className="card" style={{border: 'none', padding: '16px', marginBottom: '16px'}}>
      <div className="card-header" style={{marginBottom: '12px'}}>
        <TestTube className="card-icon" />
        <h4 className="card-title" style={{fontSize: '1rem'}}>Recent Lab Results (Fixed)</h4>
      </div>
      <ul className="data-list">
        {labResults.map((result, index) => (
          <li key={index} className="data-item">
            <div>
              {/* Use getItemName to get the proper item name instead of hardcoded text */}
              <div className="data-item-label">
                {getItemName(result.itemCode)}
              </div>
              <div className={`data-item-value ${getStatusClass(result.status)}`}>
                {result.status} - {result.date}
              </div>
            </div>
            <ChevronRight size={16} />
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Example showing the before and after comparison
 */
const LabResultsComparison = () => {
  const itemCode = '48119';
  
  return (
    <div style={{padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', margin: '20px 0'}}>
      <h3 style={{marginBottom: '16px', color: '#374151'}}>Before vs After Fix</h3>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        {/* Before Fix */}
        <div style={{backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
          <h4 style={{color: '#dc2626', marginBottom: '12px'}}>❌ Before (Showing "Other")</h4>
          <div className="data-item">
            <div>
              <div className="data-item-label">Other</div>
              <div className="data-item-value status-normal">Normal - Jan 15, 2024</div>
            </div>
          </div>
          <p style={{fontSize: '12px', color: '#6b7280', marginTop: '8px'}}>
            Item code: {itemCode} was not mapped to a name
          </p>
        </div>
        
        {/* After Fix */}
        <div style={{backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
          <h4 style={{color: '#059669', marginBottom: '12px'}}>✅ After (Showing Proper Name)</h4>
          <div className="data-item">
            <div>
              <div className="data-item-label">{getItemName(itemCode)}</div>
              <div className="data-item-value status-normal">Normal - Jan 15, 2024</div>
            </div>
          </div>
          <p style={{fontSize: '12px', color: '#6b7280', marginTop: '8px'}}>
            Item code: {itemCode} is now properly mapped to "{getItemName(itemCode)}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabResultsFixed;
export { LabResultsComparison };

