import React from 'react';
import { 
  TestTube, 
  FileText 
} from 'lucide-react';

const Labs = () => {
  return (
    <div className="cards-grid">
      <div className="card">
        <div className="card-header">
          <TestTube className="card-icon" />
          <h3 className="card-title">Recent Lab Results</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <span className="data-item-label">Complete Blood Count</span>
              <span className="data-item-value status-normal">Normal - Jan 15, 2024</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Cholesterol Panel</span>
              <span className="data-item-value status-high">High - Jan 10, 2024</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Blood Glucose</span>
              <span className="data-item-value status-normal">Normal - Jan 8, 2024</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Thyroid Function</span>
              <span className="data-item-value status-normal">Normal - Dec 20, 2023</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <FileText className="card-icon" />
          <h3 className="card-title">Pending Lab Orders</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <span className="data-item-label">Vitamin D Level</span>
              <span className="data-item-value">Ordered - Jan 20, 2024</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">HbA1c</span>
              <span className="data-item-value">Scheduled - Jan 25, 2024</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Labs;
