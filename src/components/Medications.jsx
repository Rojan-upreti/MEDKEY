import React from 'react';
import { 
  Pill, 
  CheckCircle 
} from 'lucide-react';

const Medications = () => {
  return (
    <div className="cards-grid">
      <div className="card">
        <div className="card-header">
          <Pill className="card-icon" />
          <h3 className="card-title">Current Medications</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <span className="data-item-label">Metformin 500mg</span>
              <span className="data-item-value">Twice daily</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Lisinopril 10mg</span>
              <span className="data-item-value">Once daily</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Atorvastatin 20mg</span>
              <span className="data-item-value">Once daily (evening)</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Vitamin D3 1000 IU</span>
              <span className="data-item-value">Once daily</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <CheckCircle className="card-icon" />
          <h3 className="card-title">Medication Adherence</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <span className="data-item-label">This Week</span>
              <span className="data-item-value status-normal">95%</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">This Month</span>
              <span className="data-item-value status-normal">92%</span>
            </li>
            <li className="data-item">
              <span className="data-item-label">Last Missed Dose</span>
              <span className="data-item-value">3 days ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Medications;
