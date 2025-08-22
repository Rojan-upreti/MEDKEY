import React, { useState } from 'react';
import AuditLogViewer from './AuditLogViewer';
import LoadingAnimation from './LoadingAnimation';
import { 
  TestTube, 
  Pill, 
  HeartPulse, 
  Hospital,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Menu,
  X,
  Home,
  History,
  Plus,
  ChevronDown,
  Stethoscope,
  Building2,
  Search,
  Shield
} from 'lucide-react';

const MedKeyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Find Doctor state
  const [searchData, setSearchData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [searchResults, setSearchResults] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const [error, setError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);
  
  // Filter state
  const [selectedTaxonomy, setSelectedTaxonomy] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: Home, section: 'Main' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, section: 'Main' },
    { id: 'past-records', label: 'Past Records', icon: History, section: 'Main' },
    { id: 'find-doctor', label: 'Find Doctor', icon: Stethoscope, section: 'Main' },
    { id: 'labs', label: 'Lab Results', icon: TestTube, section: 'Health Data' },
    { id: 'medications', label: 'Medications', icon: Pill, section: 'Health Data' },
    { id: 'conditions', label: 'Conditions', icon: HeartPulse, section: 'Health Data' },
    { id: 'providers', label: 'Healthcare Team', icon: Hospital, section: 'Providers' },
    { id: 'audit-logs', label: 'Audit Logs', icon: Shield, section: 'Security' }
  ];

  const patientInfo = {
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@email.com',
    address: '123 Main St, City, ST 12345',
    emergencyContact: 'Jane Smith - (555) 987-6543'
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const renderOverview = () => (
    <div>
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome back, {patientInfo.name}!</h1>
          <p className="welcome-subtitle">Your health is our priority. Here's your health overview.</p>
          <div className="quick-actions">
            <button className="action-button action-button-primary" onClick={() => selectTab('appointments')}>
              <Plus size={16} />
              Book Appointment
            </button>
            <button className="action-button" onClick={() => selectTab('past-records')}>
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

  const renderPastRecords = () => (
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
              <FileText size={20} style={{display: 'inline', marginRight: '8px'}} />
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

  const renderAppointments = () => (
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

  const renderLabs = () => (
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

  const renderMedications = () => (
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

  const renderConditions = () => (
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

  const renderProviders = () => (
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

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Get user's precise location and convert to ZIP code
  const getCurrentLocation = async () => {
    setLocationLoading(true);
    setError(null);
    
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
      }

      // Get current position with high accuracy
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 30000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Use a geocoding service to convert coordinates to ZIP code
      // For demo purposes, we'll use a free reverse geocoding service
      const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      
      if (!response.ok) {
        throw new Error('Could not convert location to ZIP code');
      }
      
      const locationData = await response.json();
      const zipCode = locationData.postcode;
      
      if (!zipCode) {
        throw new Error('ZIP code not found for your location');
      }

      // Update the search data with the detected ZIP code
      setSearchData(prev => ({
        ...prev,
        postalCode: zipCode
      }));

      // Auto-search for nearby providers
      setTimeout(() => {
        searchProviders();
      }, 500);
      
    } catch (error) {
      console.error('Location access error:', error);
      if (error.code === 1) {
        setError('Location access denied. Please enable location access in your browser settings.');
      } else if (error.code === 2) {
        setError('Location unavailable. Please check your device location settings.');
      } else if (error.code === 3) {
        setError('Location request timed out. Please try again.');
      } else {
        setError('Could not get your location. Please enter your ZIP code manually.');
      }
    } finally {
      setLocationLoading(false);
    }
  };

  // Generate nearby ZIP codes
  const generateNearbyZipCodes = (zipCode) => {
    // Clean the ZIP code - only take first 5 digits and ensure it's exactly 5 digits
    const cleanZipCode = zipCode.toString().replace(/\D/g, '').slice(0, 5).padStart(5, '0');
    
    if (!cleanZipCode || cleanZipCode.length !== 5 || cleanZipCode === '00000') {
      return [zipCode]; // Return original if invalid
    }
    
    const zipNum = parseInt(cleanZipCode);
    if (isNaN(zipNum) || zipNum <= 0) {
      return [zipCode]; // Return original if not a valid number
    }
    
    const nearbyZips = [];
    
    // Add the original ZIP code
    nearbyZips.push(cleanZipCode);
    
    // Generate nearby ZIP codes in ascending and descending order
    for (let i = 1; i <= 4; i++) {
      // Ascending ZIP codes
      const ascendingZip = (zipNum + i).toString().padStart(5, '0');
      if (ascendingZip.length === 5 && parseInt(ascendingZip) <= 99999) {
        nearbyZips.push(ascendingZip);
      }
      
      // Descending ZIP codes
      const descendingZip = (zipNum - i).toString().padStart(5, '0');
      if (descendingZip.length === 5 && parseInt(descendingZip) > 0) {
        nearbyZips.push(descendingZip);
      }
    }
    
    return nearbyZips;
  };

  const searchProviders = async () => {
    // Abort any ongoing search
    if (abortController) {
      abortController.abort();
    }
    
    // Create new abort controller for this search
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    
    setLoading(true);
    setError(null);
    setHasResults(false);
    
    // Local variable to track if we've found any results
    let foundResults = false;
    
    try {
      // Validation: Check if only state is provided
      const hasFirstName = searchData.firstName && searchData.firstName.trim();
      const hasLastName = searchData.lastName && searchData.lastName.trim();
      const hasOrganization = searchData.organizationName && searchData.organizationName.trim();
      const hasCity = searchData.city && searchData.city.trim();
      const hasState = searchData.state && searchData.state.trim();
      const hasPostalCode = searchData.postalCode && searchData.postalCode.trim();
      
      const filledFields = [hasFirstName, hasLastName, hasOrganization, hasCity, hasState, hasPostalCode].filter(Boolean);
      
      // If only state is provided, require at least one more field
      if (hasState && filledFields.length === 1) {
        setError('Please enter at least one additional search field along with the state (e.g., city, name, or organization).');
        setLoading(false);
        return;
      }
      
      // If no fields are provided at all
      if (filledFields.length === 0) {
        setError('Please enter at least one search criterion.');
        setLoading(false);
        return;
      }

      let allResults = { results: [], result_count: 0 };
      const searchedZipCodes = [];

      // If postal code is provided, search for nearby ZIP codes
      if (hasPostalCode) {
        const cleanZipCode = searchData.postalCode.trim().replace(/\D/g, '').slice(0, 5);
        
        // Validate ZIP code
        if (cleanZipCode.length !== 5 || isNaN(parseInt(cleanZipCode)) || parseInt(cleanZipCode) <= 0) {
          setError('Please enter a valid 5-digit ZIP code.');
          setLoading(false);
          return;
        }
        
        const nearbyZipCodes = generateNearbyZipCodes(cleanZipCode);
        searchedZipCodes.push(...nearbyZipCodes);
        
        // Initialize results display immediately
        setSearchResults({ results: [], result_count: 0, searchedZipCodes });
        setFilteredResults({ results: [], result_count: 0 });
        
        // Search for each ZIP code
        for (const zipCode of nearbyZipCodes) {
          const params = new URLSearchParams({
            version: '2.1',
            country_code: 'US',
            limit: '200',
            postal_code: zipCode
          });

          // Add other search criteria if provided
          if (hasFirstName) params.append('first_name', searchData.firstName.trim());
          if (hasLastName) params.append('last_name', searchData.lastName.trim());
          if (hasOrganization) params.append('organization_name', searchData.organizationName.trim());
          if (hasCity) params.append('city', searchData.city.trim());
          if (hasState) {
            const stateCode = searchData.state.trim().toUpperCase();
            if (stateCode.length === 2) {
              params.append('state', stateCode);
            }
          }

          const apiUrl = `https://npiregistry.cms.hhs.gov/api/?${params.toString()}`;
          console.log(`Searching ZIP code ${zipCode}:`, apiUrl);

          // Try different CORS proxy services
          const corsProxies = [
            'https://api.allorigins.win/raw?url=',
            'https://corsproxy.io/?',
            'https://cors-proxy.htmldriven.com/?url='
          ];
          
          let response;
          let lastError;

          // Try each CORS proxy
          for (const proxy of corsProxies) {
            try {
              // Check if search was aborted
              if (newAbortController.signal.aborted) {
                return;
              }
              
              response = await fetch(`${proxy}${encodeURIComponent(apiUrl)}`, {
                signal: newAbortController.signal
              });
              if (response.ok) {
                break;
              }
            } catch (err) {
              // Check if it was aborted
              if (err.name === 'AbortError') {
                return;
              }
              lastError = err;
              continue;
            }
          }

          if (response && response.ok) {
            try {
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                // Clean and process results
                const cleanedResults = data.results.map(result => {
                  // Clean ZIP codes in addresses
                  const cleanedAddresses = result.addresses.map(address => ({
                    ...address,
                    postal_code: address.postal_code ? address.postal_code.toString().replace(/\D/g, '').slice(0, 5) : address.postal_code
                  }));
                  
                  return {
                    ...result,
                    addresses: cleanedAddresses,
                    searchedZipCode: zipCode
                  };
                });
                
                console.log(`Found ${cleanedResults.length} providers for ZIP ${zipCode}`);
                allResults.results.push(...cleanedResults);
                
                // Set hasResults to true as soon as we get at least one result
                if (!foundResults && cleanedResults.length > 0) {
                  foundResults = true;
                  setHasResults(true);
                }
                
                // Update results immediately as they come in
                const currentResults = {
                  ...allResults,
                  searchedZipCodes
                };
                
                // Remove duplicates and sort
                const uniqueResults = currentResults.results.filter((result, index, self) => 
                  index === self.findIndex(r => r.number === result.number)
                );
                
                const updatedResults = {
                  ...currentResults,
                  results: uniqueResults,
                  result_count: uniqueResults.length
                };
                
                // Sort by distance if user entered a ZIP code
                if (hasPostalCode) {
                  const sortedResults = sortByDistance(updatedResults, searchData.postalCode.trim());
                  setSearchResults(sortedResults);
                  setFilteredResults(applyFilters(sortedResults));
                } else {
                  setSearchResults(updatedResults);
                  setFilteredResults(applyFilters(updatedResults));
                }
              }
            } catch (parseError) {
              console.error(`Error parsing response for ZIP ${zipCode}:`, parseError);
              // Continue with other ZIP codes even if one fails
            }
          } else {
            console.warn(`Failed to fetch results for ZIP ${zipCode}`);
            // Continue with other ZIP codes even if one fails
          }
        }
      } else {
        // Regular search without ZIP code expansion
        const params = new URLSearchParams({
          version: '2.1',
          country_code: 'US',
          limit: '200'
        });

        // Add search criteria if provided
        if (hasFirstName) params.append('first_name', searchData.firstName.trim());
        if (hasLastName) params.append('last_name', searchData.lastName.trim());
        if (hasOrganization) params.append('organization_name', searchData.organizationName.trim());
        if (hasCity) params.append('city', searchData.city.trim());
        if (hasState) {
          const stateCode = searchData.state.trim().toUpperCase();
          if (stateCode.length === 2) {
            params.append('state', stateCode);
          }
        }

        const apiUrl = `https://npiregistry.cms.hhs.gov/api/?${params.toString()}`;
        console.log('API URL:', apiUrl);

        // Try different CORS proxy services
        const corsProxies = [
          'https://api.allorigins.win/raw?url=',
          'https://corsproxy.io/?',
          'https://cors-proxy.htmldriven.com/?url='
        ];
        
        let response;
        let lastError;

        // Try each CORS proxy
        for (const proxy of corsProxies) {
          try {
            // Check if search was aborted
            if (newAbortController.signal.aborted) {
              return;
            }
            
            response = await fetch(`${proxy}${encodeURIComponent(apiUrl)}`, {
              signal: newAbortController.signal
            });
            if (response.ok) {
              break;
            }
          } catch (err) {
            // Check if it was aborted
            if (err.name === 'AbortError') {
              return;
            }
            lastError = err;
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error(`All CORS proxies failed. Last error: ${lastError?.message || 'Unknown error'}`);
        }
        
        try {
          const data = await response.json();
          
          // Clean ZIP codes in the results
          if (data.results && data.results.length > 0) {
            const cleanedResults = data.results.map(result => {
              const cleanedAddresses = result.addresses.map(address => ({
                ...address,
                postal_code: address.postal_code ? address.postal_code.toString().replace(/\D/g, '').slice(0, 5) : address.postal_code
              }));
              
              return {
                ...result,
                addresses: cleanedAddresses
              };
            });
            
            allResults = {
              ...data,
              results: cleanedResults
            };
            
            // Set hasResults to true as soon as we get at least one result
            foundResults = true;
            setHasResults(true);
          } else {
            allResults = data;
          }
        } catch (parseError) {
          console.error('Error parsing API response:', parseError);
          throw new Error('Invalid response from server. Please check your search criteria.');
        }
      }

      // Remove duplicates based on NPI number
      const uniqueResults = allResults.results.filter((result, index, self) => 
        index === self.findIndex(r => r.number === result.number)
      );

      let finalResults = {
        ...allResults,
        results: uniqueResults,
        result_count: uniqueResults.length
      };

      // Add searched ZIP codes info for display
      if (searchedZipCodes.length > 0) {
        finalResults.searchedZipCodes = searchedZipCodes;
      }

      // Sort by distance if user entered a ZIP code
      if (hasPostalCode) {
        finalResults = sortByDistance(finalResults, searchData.postalCode.trim());
      }

      // Check if no results were found
      if (finalResults.result_count === 0) {
        console.log('No results found. Searched ZIP codes:', searchedZipCodes);
        setError('No providers found. Please enter city, ZIP code, or state correctly. Make sure all information is valid.');
        foundResults = false;
        setHasResults(false);
      } else {
        console.log(`Found ${finalResults.result_count} total providers`);
        setError(null); // Clear any previous errors
        foundResults = true;
        setHasResults(true);
      }

      setSearchResults(finalResults);
      setFilteredResults(applyFilters(finalResults));
      setSelectedTaxonomy(''); // Reset taxonomy filter
    } catch (err) {
      // Don't show error if search was aborted
      if (err.name === 'AbortError') {
        console.log('Search was aborted');
        return;
      }
      
      console.error('Search error:', err);
      
      // Provide user-friendly error messages
      if (err.message.includes('CORS') || err.message.includes('fetch') || err.message.includes('network')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if (err.message.includes('API') || err.message.includes('response')) {
        setError('Please enter city, ZIP code, or state correctly. Make sure all information is valid.');
      } else {
        setError('Please enter city, ZIP code, or state correctly. Make sure all information is valid.');
      }
    } finally {
      setLoading(false);
      setAbortController(null);
      // Ensure hasResults reflects the actual findings
      if (!foundResults) {
        setHasResults(false);
      }
    }
  };

  // Handle filter changes
  const handleTaxonomyFilter = (taxonomy) => {
    setSelectedTaxonomy(taxonomy);
  };



  const formatPhone = (phone) => {
    if (!phone) return 'Not available';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return phone;
  };

  const getProviderName = (provider) => {
    if (provider.enumeration_type === 'NPI-2') {
      return provider.basic.organization_name || 'Organization';
    } else {
      const parts = [
        provider.basic.first_name,
        provider.basic.middle_name,
        provider.basic.last_name
      ].filter(Boolean);
      const name = parts.join(' ');
      const credential = provider.basic.credential;
      return credential ? `${name}, ${credential}` : name;
    }
  };

  const getPrimaryTaxonomy = (taxonomies) => {
    const primary = taxonomies.find(tax => tax.primary);
    return primary || taxonomies[0];
  };

  // Calculate distance between two ZIP codes (approximate)
  const calculateDistance = (zip1, zip2) => {
    if (!zip1 || !zip2) return 0;
    
    // Clean ZIP codes to ensure they're 5 digits
    const cleanZip1 = zip1.toString().replace(/\D/g, '').slice(0, 5);
    const cleanZip2 = zip2.toString().replace(/\D/g, '').slice(0, 5);
    
    // Convert ZIP codes to numbers for comparison
    const zip1Num = parseInt(cleanZip1);
    const zip2Num = parseInt(cleanZip2);
    
    if (isNaN(zip1Num) || isNaN(zip2Num)) return 0;
    
    // Calculate the absolute difference between ZIP codes
    // This gives a reasonable approximation of distance
    const diff = Math.abs(zip1Num - zip2Num);
    
    // Convert to approximate miles (rough estimation)
    // ZIP codes are roughly sequential by geographic area
    return Math.min(diff / 10, 999); // Cap at 999 miles
  };

  // Sort results by distance from user's ZIP code
  const sortByDistance = (results, userZipCode) => {
    if (!userZipCode || !results || !results.results) return results;
    
    const sortedResults = [...results.results].sort((a, b) => {
      const primaryAddressA = a.addresses.find(addr => addr.address_purpose === 'LOCATION') || a.addresses[0];
      const primaryAddressB = b.addresses.find(addr => addr.address_purpose === 'LOCATION') || b.addresses[0];
      
      if (!primaryAddressA || !primaryAddressB) return 0;
      
      const distanceA = calculateDistance(userZipCode, primaryAddressA.postal_code);
      const distanceB = calculateDistance(userZipCode, primaryAddressB.postal_code);
      
      return distanceA - distanceB; // Sort from nearest to farthest
    });
    
    return {
      ...results,
      results: sortedResults
    };
  };

  // Get unique taxonomies from search results
  const getUniqueTaxonomies = (results) => {
    if (!results || !results.results) return [];
    
    const taxonomies = new Set();
    results.results.forEach(provider => {
      provider.taxonomies.forEach(tax => {
        taxonomies.add(tax.desc);
      });
    });
    
    return Array.from(taxonomies).sort();
  };

  // Filter and sort results
  const applyFilters = (results) => {
    if (!results || !results.results) return results;
    
    let filtered = [...results.results];
    
    // Filter by taxonomy
    if (selectedTaxonomy) {
      filtered = filtered.filter(provider => 
        provider.taxonomies.some(tax => tax.desc === selectedTaxonomy)
      );
    }
    
    // Apply sorting
    if (sortBy === 'distance' && searchData.postalCode) {
      // Sort by distance from user's ZIP code
      filtered.sort((a, b) => {
        const primaryAddressA = a.addresses.find(addr => addr.address_purpose === 'LOCATION') || a.addresses[0];
        const primaryAddressB = b.addresses.find(addr => addr.address_purpose === 'LOCATION') || b.addresses[0];
        
        if (!primaryAddressA || !primaryAddressB) return 0;
        
        const distanceA = calculateDistance(searchData.postalCode, primaryAddressA.postal_code);
        const distanceB = calculateDistance(searchData.postalCode, primaryAddressB.postal_code);
        
        return distanceA - distanceB; // Sort from nearest to farthest
      });
    } else if (sortBy === 'name') {
      // Sort by provider name
      filtered.sort((a, b) => {
        const nameA = getProviderName(a).toLowerCase();
        const nameB = getProviderName(b).toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }
    
    return {
      ...results,
      results: filtered,
      result_count: filtered.length
    };
  };

  // Auto-refresh filters when taxonomy or sort changes
  React.useEffect(() => {
    if (searchResults) {
      setFilteredResults(applyFilters(searchResults));
    }
  }, [selectedTaxonomy, sortBy, searchResults, applyFilters]);

  const renderFindDoctor = () => {

    return (
      <div>
        {/* Search Section */}
        <div className="card" style={{marginBottom: '24px'}}>
          <div className="card-header">
            <Search className="card-icon" />
            <h3 className="card-title">Search Healthcare Providers</h3>
          </div>
          <div className="card-content">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                  First Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter first name"
                  value={searchData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                  Last Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter last name"
                  value={searchData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                Organization Name
              </label>
              <input 
                type="text" 
                placeholder="Enter organization name"
                value={searchData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                  City
                </label>
                <input 
                  type="text" 
                  placeholder="Enter city"
                  value={searchData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                  State
                </label>
                <select
                  value={searchData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="">Any State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                  ZIP Code
                </label>
                <div style={{display: 'flex', gap: '8px'}}>
                  <input 
                    type="text" 
                    placeholder="12345"
                    maxLength="5"
                    value={searchData.postalCode}
                    onChange={(e) => {
                      // Only allow digits and limit to 5 characters
                      const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                      handleInputChange('postalCode', value);
                    }}
                    style={{
                      flex: '1',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: locationLoading ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      opacity: locationLoading ? 0.6 : 1,
                      whiteSpace: 'nowrap',
                      minWidth: 'fit-content'
                    }}
                    title="Use my current location"
                  >
                    <MapPin size={14} />
                    {locationLoading ? 'Locating...' : 'Locate Me'}
                  </button>
                </div>
                <div style={{fontSize: '12px', color: '#6b7280', marginTop: '4px'}}>
                  Will search nearby ZIP codes automatically
                </div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '12px'}}>
              <button 
                className="button button-primary"
                style={{
                  flex: '1',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={searchProviders}
                disabled={loading}
              >
                {loading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    animation: 'shimmer 1.5s infinite',
                    transform: 'translateX(-100%)'
                  }} />
                )}
                <Search size={16} style={{marginRight: '8px'}} />
                {loading ? 'Searching...' : 'Search Providers'}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="card" style={{marginBottom: '24px', backgroundColor: '#fef2f2', borderColor: '#fecaca'}}>
            <div className="card-content">
              <div style={{color: '#dc2626', fontSize: '14px'}}>
                <strong>Error:</strong> {error}
              </div>
            </div>
          </div>
        )}

        {/* Loading Animation */}
        {loading && !hasResults && (
          <div className="card" style={{marginBottom: '24px'}}>
            <LoadingAnimation 
              message="Searching for healthcare providers in your area..."
              type="doctor"
            />
          </div>
        )}

        {/* Subtle Loading Indicator when we have results but still loading */}
        {loading && hasResults && (
          <div className="card" style={{marginBottom: '16px', backgroundColor: '#f0f9ff', borderColor: '#0ea5e9'}}>
            <div className="card-content" style={{textAlign: 'center', padding: '12px'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #0ea5e9',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span style={{fontSize: '14px', color: '#0ea5e9', fontWeight: '500'}}>
                  Loading more results...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Location Loading Animation */}
        {locationLoading && (
          <div className="card" style={{marginBottom: '24px'}}>
            <LoadingAnimation 
              message="Getting your current location..."
              type="location"
            />
          </div>
        )}

        {/* Results Section - Structured Table */}
        {searchResults && searchResults.results && searchResults.results.length > 0 && (
          <div>
            <div className="card" style={{marginBottom: '16px'}}>
              <div className="card-content">
                <div style={{fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '8px'}}>
                  Search Results
                </div>
                <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '16px'}}>
                  Found {searchResults.result_count} providers
                  {filteredResults && filteredResults.result_count !== searchResults.result_count && (
                    <span> • Showing {filteredResults.result_count} after filters</span>
                  )}
                </div>

                
                {/* Filters */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                      Filter by Specialty
                    </label>
                    <select
                      value={selectedTaxonomy}
                      onChange={(e) => handleTaxonomyFilter(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">All Specialties</option>
                      {getUniqueTaxonomies(searchResults).map((taxonomy, index) => (
                        <option key={index} value={taxonomy}>
                          {taxonomy}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                      Sort by
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="relevance">Relevance</option>
                      <option value="name">Name (A-Z)</option>
                      {searchData.postalCode && (
                        <option value="distance">Distance (Nearest First)</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content" style={{padding: '0'}}>
                <div style={{overflowX: 'auto'}}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '16px',
                    padding: '16px'
                  }}>
                    {(filteredResults || searchResults).results && (filteredResults || searchResults).results.map((provider, index) => {
                      const primaryAddress = provider.addresses.find(addr => addr.address_purpose === 'LOCATION') || provider.addresses[0];
                      const primaryTaxonomy = getPrimaryTaxonomy(provider.taxonomies);
                      const otherTaxonomies = provider.taxonomies.filter(tax => !tax.primary);
                      
                      return (
                        <div key={provider.number} style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '20px',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                          transition: 'all 0.2s ease-in-out',
                          cursor: 'pointer'
                        }} onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                        }} onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                        }}>
                          {/* Header */}
                          <div style={{marginBottom: '16px'}}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '8px'
                            }}>
                              <div style={{flex: 1}}>
                                <h3 style={{
                                  fontSize: '16px',
                                  fontWeight: '700',
                                  color: '#1f2937',
                                  margin: '0 0 4px 0',
                                  lineHeight: '1.4'
                                }}>
                                  {getProviderName(provider)}
                                </h3>
                                <div style={{
                                  fontSize: '12px',
                                  color: '#6b7280',
                                  marginBottom: '4px'
                                }}>
                                  {provider.enumeration_type === 'NPI-1' ? 'Individual Provider' : 'Organization'}
                                </div>
                                <div style={{
                                  fontSize: '11px',
                                  fontFamily: 'monospace',
                                  color: '#9ca3af',
                                  backgroundColor: '#f3f4f6',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  display: 'inline-block',
                                  marginRight: '8px'
                                }}>
                                  NPI: {provider.number}
                                </div>
                                {provider.searchedZipCode && searchResults.searchedZipCodes && searchResults.searchedZipCodes.length > 1 && (
                                  <div style={{
                                    fontSize: '11px',
                                    color: '#059669',
                                    backgroundColor: '#d1fae5',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    display: 'inline-block',
                                    fontWeight: '600'
                                  }}>
                                    ZIP: {provider.searchedZipCode}
                                  </div>
                                )}
                              </div>
                              <span style={{
                                fontSize: '11px',
                                fontWeight: '600',
                                color: provider.basic.status === 'A' ? '#059669' : '#dc2626',
                                backgroundColor: provider.basic.status === 'A' ? '#d1fae5' : '#fee2e2',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                textTransform: 'uppercase'
                              }}>
                                {provider.basic.status === 'A' ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            {provider.other_names && provider.other_names.length > 0 && (
                              <div style={{
                                fontSize: '12px',
                                color: '#9ca3af',
                                fontStyle: 'italic'
                              }}>
                                Also known as: {provider.other_names[0].organization_name || provider.other_names[0].first_name + ' ' + provider.other_names[0].last_name}
                              </div>
                            )}
                          </div>

                          {/* Contact Information */}
                          <div style={{marginBottom: '16px'}}>
                            {primaryAddress?.telephone_number && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '8px'
                              }}>
                                <Phone size={14} style={{color: '#6b7280', flexShrink: 0}} />
                                <div style={{flex: 1}}>
                                  <div style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#1f2937',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}>
                                    {formatPhone(primaryAddress.telephone_number)}
                                  </div>
                                  <a
                                    href={`tel:${primaryAddress.telephone_number}`}
                                    style={{
                                      fontSize: '12px',
                                      color: '#059669',
                                      textDecoration: 'none',
                                      fontWeight: '500',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px'
                                    }}
                                  >
                                    Call Now
                                  </a>
                                </div>
                              </div>
                            )}

                            {primaryAddress && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px'
                              }}>
                                <MapPin size={14} style={{color: '#6b7280', flexShrink: 0, marginTop: '2px'}} />
                                <div style={{flex: 1}}>
                                  <div style={{
                                    fontSize: '14px',
                                    color: '#1f2937',
                                    lineHeight: '1.4',
                                    marginBottom: '8px'
                                  }}>
                                    <div>{primaryAddress.address_1}</div>
                                    {primaryAddress.address_2 && <div>{primaryAddress.address_2}</div>}
                                    <div>{primaryAddress.city}, {primaryAddress.state} {primaryAddress.postal_code}</div>

                                  </div>
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${primaryAddress.address_1} ${primaryAddress.address_2 || ''} ${primaryAddress.city}, ${primaryAddress.state} ${primaryAddress.postal_code}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      fontSize: '12px',
                                      color: '#2563eb',
                                      textDecoration: 'none',
                                      fontWeight: '500',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px'
                                    }}
                                  >
                                    Get Directions
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Taxonomies */}
                          <div>
                            {primaryTaxonomy && (
                              <div style={{marginBottom: '8px'}}>
                                <div style={{
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  color: '#92400e',
                                  backgroundColor: '#fef3c7',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  display: 'inline-block',
                                  textTransform: 'uppercase'
                                }}>
                                  Primary: {primaryTaxonomy.desc}
                                </div>
                              </div>
                            )}
                            {otherTaxonomies.length > 0 && (
                              <div style={{
                                fontSize: '12px',
                                color: '#6b7280',
                                lineHeight: '1.4'
                              }}>
                                {otherTaxonomies.slice(0, 2).map((tax, i) => (
                                  <div key={i} style={{
                                    display: 'inline-block',
                                    backgroundColor: '#f3f4f6',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    marginRight: '6px',
                                    marginBottom: '4px',
                                    fontSize: '11px'
                                  }}>
                                    {tax.desc}
                                  </div>
                                ))}
                                {otherTaxonomies.length > 2 && (
                                  <div style={{
                                    display: 'inline-block',
                                    color: '#9ca3af',
                                    fontSize: '11px',
                                    backgroundColor: '#f9fafb',
                                    padding: '2px 6px',
                                    borderRadius: '4px'
                                  }}>
                                    +{otherTaxonomies.length - 2} more
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchResults && (!searchResults.results || searchResults.results.length === 0) && !loading && (
          <div className="card">
            <div className="card-content" style={{textAlign: 'center', padding: '40px'}}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Search size={32} color="#9ca3af" />
              </div>
              <div style={{fontSize: '18px', color: '#374151', marginBottom: '8px', fontWeight: '600'}}>
                No providers found
              </div>
              <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '16px'}}>
                Try adjusting your search criteria or check your spelling
              </div>
              <div style={{fontSize: '12px', color: '#9ca3af'}}>
                💡 Tip: Try searching by ZIP code or city for better results
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'past-records': return renderPastRecords();
      case 'appointments': return renderAppointments();
      case 'find-doctor': return renderFindDoctor();
      case 'labs': return renderLabs();
      case 'medications': return renderMedications();
      case 'conditions': return renderConditions();
      case 'providers': return renderProviders();
      case 'audit-logs': return <AuditLogViewer />;
      default: return renderOverview();
    }
  };

  const getCurrentTabInfo = () => {
    const currentTab = navItems.find(item => item.id === activeTab);
    return currentTab ? { title: currentTab.label, subtitle: getSubtitle(activeTab) } : { title: 'Dashboard', subtitle: 'Overview of your health information' };
  };

  const getSubtitle = (tabId) => {
    const subtitles = {
      'overview': 'Overview of your health information',
      'past-records': 'Historical medical records and reports',
      'appointments': 'Manage your healthcare appointments',
      'find-doctor': 'Search for healthcare providers',
      'labs': 'Laboratory test results and orders',
      'medications': 'Current prescriptions and adherence',
      'conditions': 'Health conditions and management',
      'providers': 'Your healthcare team and facilities',
      'audit-logs': 'Monitor system activities for HIPAA compliance'
    };
    return subtitles[tabId] || 'Health information dashboard';
  };

  const groupedNavItems = navItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="app-layout">
      {/* Mobile Sidebar Toggle */}
      <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
                          <h1 className="sidebar-logo">MedKey</h1>
                <p className="sidebar-subtitle">Unified Health System</p>
        </div>
        
        <nav className="sidebar-nav">
          {Object.entries(groupedNavItems).map(([section, items]) => (
            <div key={section} className="nav-section">
              <div className="nav-section-title">{section}</div>
              {items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => selectTab(item.id)}
                  >
                    <IconComponent className="nav-item-icon" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <h1 className="page-title">{getCurrentTabInfo().title}</h1>
            <p className="page-subtitle">{getCurrentTabInfo().subtitle}</p>
          </div>
          
          <div className="header-right">
            <div className="profile-section" onClick={toggleProfileDropdown}>
              <div className="profile-avatar">
                {patientInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="profile-info">
                <div className="profile-name">{patientInfo.name}</div>
                <div className="profile-role">Patient</div>
              </div>
              <ChevronDown size={16} style={{color: '#64748b', marginLeft: '4px'}} />
              
              <div className={`profile-dropdown ${profileDropdownOpen ? 'open' : 'closed'}`}>
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    {patientInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="dropdown-name">{patientInfo.name}</div>
                  <div className="dropdown-info">Age: {patientInfo.age} • {patientInfo.gender}</div>
                  <div className="dropdown-info">Blood Type: {patientInfo.bloodType}</div>
                </div>
                <div className="dropdown-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <div className="info-label">Phone</div>
                      <div className="info-value">{patientInfo.phone}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label">Email</div>
                      <div className="info-value" style={{fontSize: '12px'}}>{patientInfo.email}</div>
                    </div>
                  </div>
                  <div style={{marginBottom: '16px'}}>
                    <div className="info-label">Address</div>
                    <div className="info-value" style={{fontSize: '13px'}}>{patientInfo.address}</div>
                  </div>
                  <div>
                    <div className="info-label">Emergency Contact</div>
                    <div className="info-value" style={{fontSize: '13px'}}>{patientInfo.emergencyContact}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="app-container">
          <div className="content">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedKeyDashboard;