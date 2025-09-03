import React from 'react';
import { 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock 
} from 'lucide-react';

const Appointments = () => {
  return (
    <div className="cards-grid">
      <div className="card">
        <div className="card-header">
          <Plus className="card-icon" />
          <h3 className="card-title">Book New Appointment</h3>
        </div>
        <div className="card-content">
          <p style={{marginBottom: '20px', color: '#64748b'}}>Schedule your next appointment with your healthcare provider.</p>
          <button className="button button-primary" style={{width: '100%', marginBottom: '12px'}}>
            Schedule with Primary Care
          </button>
          <button className="button" style={{width: '100%', marginBottom: '12px'}}>
            Schedule with Specialist
          </button>
          <button className="button" style={{width: '100%'}}>
            Request Urgent Care
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <Calendar className="card-icon" />
          <h3 className="card-title">Upcoming Appointments</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <div>
                <div className="data-item-label">Dr. Johnson - Annual Physical</div>
                <div className="data-item-value">Jan 25, 2024 at 10:00 AM</div>
              </div>
              <Clock size={16} />
            </li>
            <li className="data-item">
              <div>
                <div className="data-item-label">Dr. Chen - Diabetes Follow-up</div>
                <div className="data-item-value">Feb 2, 2024 at 2:30 PM</div>
              </div>
              <Clock size={16} />
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <CheckCircle className="card-icon" />
          <h3 className="card-title">Recent Appointments</h3>
        </div>
        <div className="card-content">
          <ul className="data-list">
            <li className="data-item">
              <div>
                <div className="data-item-label">Dr. Rodriguez - Cardiology</div>
                <div className="data-item-value">Jan 15, 2024</div>
              </div>
              <CheckCircle size={16} />
            </li>
            <li className="data-item">
              <div>
                <div className="data-item-label">Lab Work - Blood Tests</div>
                <div className="data-item-value">Jan 10, 2024</div>
              </div>
              <CheckCircle size={16} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
