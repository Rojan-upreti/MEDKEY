import React from 'react';
import { 
  Hospital, 
  MapPin, 
  ChevronRight, 
  Phone 
} from 'lucide-react';

const Providers = () => {
  return (
    <div className="cards-grid">
      <div className="card">
        <div className="card-header">
          <Hospital className="card-icon" />
          <h3 className="card-title">Healthcare Team</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <div>
                <div className="data-item-label">Dr. Sarah Johnson</div>
                <div className="data-item-value">Primary Care Physician</div>
              </div>
              <Phone size={16} />
            </li>
            <li className="data-item">
              <div>
                <div className="data-item-label">Dr. Michael Chen</div>
                <div className="data-item-value">Endocrinologist</div>
              </div>
              <Phone size={16} />
            </li>
            <li className="data-item">
              <div>
                <div className="data-item-label">Dr. Emily Rodriguez</div>
                <div className="data-item-value">Cardiologist</div>
              </div>
              <Phone size={16} />
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <MapPin className="card-icon" />
          <h3 className="card-title">Healthcare Facilities</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <div>
                <div className="data-item-label">City Medical Center</div>
                <div className="data-item-value">123 Health St, City, ST 12345</div>
              </div>
              <ChevronRight size={16} />
            </li>
            <li className="data-item">
              <div>
                <div className="data-item-label">Wellness Clinic</div>
                <div className="data-item-value">456 Care Ave, City, ST 12345</div>
              </div>
              <ChevronRight size={16} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Providers;
