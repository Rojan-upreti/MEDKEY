import React from 'react';
import { 
  Plus, 
  History, 
  Phone, 
  Activity, 
  HeartPulse, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-react';

const Overview = ({ patientInfo, onNavigate }) => {
  return (
    <div>
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome back, {patientInfo.name}!</h1>
          <p className="welcome-subtitle">Your health is our priority. Here's your health overview.</p>
          <div className="quick-actions">
            <button className="action-button action-button-primary" onClick={() => onNavigate('appointments')}>
              <Plus size={16} />
              Book Appointment
            </button>
            <button className="action-button" onClick={() => onNavigate('past-records')}>
              <History size={16} />
              View Past Records
            </button>
            <button className="action-button">
              <Phone size={16} />
              Emergency Contact
            </button>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-value">8</div>
          <div className="metric-label">Active Medications</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">3</div>
          <div className="metric-label">Health Conditions</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">12</div>
          <div className="metric-label">Recent Lab Results</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">2</div>
          <div className="metric-label">Upcoming Appointments</div>
        </div>
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">
            <Activity className="card-icon" />
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div className="card-content">
            <ul className="data-list">
              <li className="data-item">
                <span className="data-item-label">Blood Pressure Check</span>
                <span className="data-item-value">2 hours ago</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Medication Reminder</span>
                <span className="data-item-value">6 hours ago</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Lab Results Ready</span>
                <span className="data-item-value">1 day ago</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Appointment Scheduled</span>
                <span className="data-item-value">3 days ago</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <HeartPulse className="card-icon" />
            <h3 className="card-title">Current Vital Signs</h3>
          </div>
          <div className="card-content">
            <ul className="data-list">
              <li className="data-item">
                <span className="data-item-label">Blood Pressure</span>
                <span className="data-item-value status-normal">120/80 mmHg</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Heart Rate</span>
                <span className="data-item-value status-normal">72 bpm</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Temperature</span>
                <span className="data-item-value status-normal">98.6°F</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Weight</span>
                <span className="data-item-value status-normal">175 lbs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <AlertCircle className="card-icon" />
            <h3 className="card-title">Health Alerts</h3>
          </div>
          <div className="card-content">
            <ul className="data-list">
              <li className="data-item">
                <span className="data-item-label">Annual Physical Due</span>
                <span className="data-item-value status-high">Overdue</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Flu Vaccination</span>
                <span className="data-item-value status-low">Due Soon</span>
              </li>
              <li className="data-item">
                <span className="data-item-label">Prescription Renewal</span>
                <span className="data-item-value status-low">In 5 days</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
