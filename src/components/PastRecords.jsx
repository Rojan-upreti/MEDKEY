import React from 'react';
import { 
  Stethoscope, 
  Hospital, 
  Building2, 
  TestTube, 
  Activity, 
  ChevronRight, 
  Phone 
} from 'lucide-react';

const PastRecords = () => {
  return (
    <div>
      <div className="past-records-container">
        <div className="records-section">
          <div className="records-header">
            <div className="records-title">
              <Stethoscope size={20} style={{display: 'inline', marginRight: '8px'}} />
              Healthcare Providers
            </div>
            <div className="records-subtitle">Doctors, Hospitals & Clinics</div>
          </div>
          <div className="records-body">
            <div className="card" style={{border: 'none', padding: '16px', marginBottom: '16px'}}>
              <div className="card-header" style={{marginBottom: '12px'}}>
                <Hospital className="card-icon" />
                <h4 className="card-title" style={{fontSize: '1rem'}}>Recent Visits</h4>
              </div>
              <ul className="data-list">
                <li className="data-item">
                  <div>
                    <div className="data-item-label">Dr. Sarah Johnson</div>
                    <div className="data-item-value">Primary Care - Jan 15, 2024</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
                <li className="data-item">
                  <div>
                    <div className="data-item-label">Dr. Michael Chen</div>
                    <div className="data-item-value">Cardiology - Jan 8, 2024</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
                <li className="data-item">
                  <div>
                    <div className="data-item-label">City Medical Center</div>
                    <div className="data-item-value">Emergency Visit - Dec 20, 2023</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
              </ul>
            </div>

            <div className="card" style={{border: 'none', padding: '16px'}}>
              <div className="card-header" style={{marginBottom: '12px'}}>
                <Building2 className="card-icon" />
                <h4 className="card-title" style={{fontSize: '1rem'}}>Healthcare Facilities</h4>
              </div>
              <ul className="data-list">
                <li className="data-item">
                  <div>
                    <div className="data-item-label">City Medical Center</div>
                    <div className="data-item-value">Primary Hospital</div>
                  </div>
                  <Phone size={16} />
                </li>
                <li className="data-item">
                  <div>
                    <div className="data-item-label">Wellness Clinic</div>
                    <div className="data-item-value">Routine Care</div>
                  </div>
                  <Phone size={16} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="records-section">
          <div className="records-header">
            <div className="records-title">
              <TestTube size={20} style={{display: 'inline', marginRight: '8px'}} />
              Medical Reports
            </div>
            <div className="records-subtitle">Lab Results & Test Reports</div>
          </div>
          <div className="records-body">
            <div className="card" style={{border: 'none', padding: '16px', marginBottom: '16px'}}>
              <div className="card-header" style={{marginBottom: '12px'}}>
                <TestTube className="card-icon" />
                <h4 className="card-title" style={{fontSize: '1rem'}}>Recent Lab Results</h4>
              </div>
              <ul className="data-list">
                <li className="data-item">
                  <div>
                    <div className="data-item-label">Complete Blood Count</div>
                    <div className="data-item-value status-normal">Normal - Jan 15, 2024</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
                <li className="data-item">
                  <div>
                    <div className="data-item-label">Lipid Panel</div>
                    <div className="data-item-value status-high">High - Jan 10, 2024</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
                <li className="data-item">
                  <div>
                    <div className="data-item-label">HbA1c Test</div>
                    <div className="data-item-value status-normal">Normal - Dec 28, 2023</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
              </ul>
            </div>

            <div className="card" style={{border: 'none', padding: '16px'}}>
              <div className="card-header" style={{marginBottom: '12px'}}>
                <Activity className="card-icon" />
                <h4 className="card-title" style={{fontSize: '1rem'}}>Imaging & Tests</h4>
              </div>
              <ul className="data-list">
                <li className="data-item">
                  <div>
                    <div className="data-item-label">Chest X-Ray</div>
                    <div className="data-item-value">Clear - Dec 15, 2023</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
                <li className="data-item">
                  <div>
                    <div className="data-item-label">ECG</div>
                    <div className="data-item-value">Normal - Nov 20, 2023</div>
                  </div>
                  <ChevronRight size={16} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastRecords;
