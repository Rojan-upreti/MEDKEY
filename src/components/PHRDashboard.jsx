import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuditLogViewer from './AuditLogViewer';
import Overview from './Overview';
import Appointments from './Appointments';
import PastRecords from './PastRecords';
import FindDoctor from './FindDoctor';
import Labs from './Labs';
import Medications from './Medications';
import Conditions from './Conditions';
import Providers from './Providers';
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
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard/')) {
      const tab = path.split('/dashboard/')[1];
      if (tab && tab !== '') {
        setActiveTab(tab);
      } else {
        setActiveTab('overview');
      }
    } else {
      setActiveTab('overview');
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
    navigate(`/dashboard/${tabId}`);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleNavigate = (tabId) => {
    selectTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': 
        return <Overview patientInfo={patientInfo} onNavigate={handleNavigate} />;
      case 'past-records': 
        return <PastRecords />;
      case 'appointments': 
        return <Appointments />;
      case 'find-doctor': 
        return <FindDoctor />;
      case 'labs': 
        return <Labs />;
      case 'medications': 
        return <Medications />;
      case 'conditions': 
        return <Conditions />;
      case 'providers': 
        return <Providers />;
      case 'audit-logs': 
        return <AuditLogViewer />;
      default: 
        return <Overview patientInfo={patientInfo} onNavigate={handleNavigate} />;
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