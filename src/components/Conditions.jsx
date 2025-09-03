import React from 'react';
import { 
  HeartPulse, 
  Activity 
} from 'lucide-react';

const Conditions = () => {
  return (
    <div className="cards-grid">
      <div className="card">
        <div className="card-header">
          <HeartPulse className="card-icon" />
          <h3 className="card-title">Active Conditions</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <span className="data-item-label">Type 2 Diabetes</span>
              <span className="data-item-value">Diagnosed 2018</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Hypertension</span>
              <span className="data-item-value">Diagnosed 2020</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">High Cholesterol</span>
              <span className="data-item-value">Diagnosed 2019</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <Activity className="card-icon" />
          <h3 className="card-title">Condition Management</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <span className="data-item-label">Last HbA1c</span>
              <span className="data-item-value status-normal">6.8% (Dec 2023)</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Blood Pressure Goal</span>
              <span className="data-item-value status-normal">&lt;130/80 mmHg</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Cholesterol Goal</span>
              <span className="data-item-value status-high">LDL &lt;100 mg/dL</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Conditions;
