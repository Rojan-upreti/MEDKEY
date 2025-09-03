import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  User, 
  Calendar,
  FileText,
  Stethoscope,
  FlaskConical, 
  Pill, 
  Heart, 
  Building2,
  Activity,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquare,
  CreditCard,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Phone,
  Mail,
  Download,
  Eye
} from 'lucide-react';
import Overview from './Overview';
import Appointments from './Appointments';
import PastRecords from './PastRecords';
import FindDoctor from './FindDoctor';
import Labs from './Labs';
import Medications from './Medications';
import Conditions from './Conditions';
import Providers from './Providers';
import AuditLogViewer from './AuditLogViewer';

const PHRDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patientInfo] = useState({
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    bloodType: 'O+',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-20',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567'
  });

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/appointments')) setActiveTab('appointments');
    else if (path.includes('/health-records')) setActiveTab('health-records');
    else if (path.includes('/messages')) setActiveTab('messages');
    else if (path.includes('/billing')) setActiveTab('billing');
    else if (path.includes('/settings')) setActiveTab('settings');
    else setActiveTab('dashboard');
  }, [location]);

  const selectTab = (tabName) => {
    setActiveTab(tabName);
    if (tabName === 'dashboard') {
      navigate('/dashboard');
      } else {
      navigate(`/dashboard/${tabName}`);
    }
    setSidebarOpen(false);
  };

  const handleNavigate = (tabName) => {
    selectTab(tabName);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Overview patientInfo={patientInfo} onNavigate={handleNavigate} />;
      case 'health-records':
        return <PastRecords />;
      case 'appointments':
        return <Appointments />;
      case 'messages':
        return <div>Messages Component</div>;
      case 'billing':
        return <div>Billing Component</div>;
      case 'settings':
        return <div>Settings Component</div>;
      default:
        return <Overview patientInfo={patientInfo} onNavigate={handleNavigate} />;
    }
  };

  const topNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'health-records', label: 'Health Records', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const leftSidebarItems = [
    { id: 'profile', label: 'My Profile', icon: User, color: '#6366f1' },
    { id: 'medications', label: 'Medications', icon: Pill, color: '#0891b2' },
    { id: 'allergies', label: 'Allergies', icon: AlertCircle, color: '#dc2626' },
    { id: 'immunizations', label: 'Immunizations', icon: Shield, color: '#059669' },
    { id: 'test-results', label: 'Test Results', icon: FlaskConical, color: '#ea580c' },
    { id: 'documents', label: 'Documents', icon: Download, color: '#7c3aed' }
  ];

  const careTeamContacts = [
    { name: 'Dr. Sarah Johnson', role: 'Primary Care', phone: '+1 (555) 111-2222', email: 'dr.johnson@clinic.com' },
    { name: 'Dr. Michael Chen', role: 'Cardiologist', phone: '+1 (555) 333-4444', email: 'dr.chen@cardio.com' },
    { name: 'Nurse Lisa Wilson', role: 'Care Coordinator', phone: '+1 (555) 555-6666', email: 'nurse.wilson@clinic.com' }
  ];

  const wellnessData = [
    { metric: 'Steps Today', value: '8,432', target: '10,000', status: 'good' },
    { metric: 'Blood Pressure', value: '120/80', target: 'Normal', status: 'normal' },
    { metric: 'Sleep Last Night', value: '7.5 hrs', target: '8 hrs', status: 'warning' }
  ];

  const notifications = [
    { type: 'appointment', message: 'Appointment reminder: Tomorrow at 10:00 AM', time: '2 hours ago', urgent: false },
    { type: 'lab', message: 'New lab results available', time: '1 day ago', urgent: true },
    { type: 'medication', message: 'Prescription refill due in 3 days', time: '2 days ago', urgent: false }
  ];

    return (
    <div className="dashboard-container" style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Bar */}
      <div className="top-bar" style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }}>
        {/* Left Side - Logo and Navigation */}
        <div style={{display: 'flex', alignItems: 'center', gap: '32px'}}>
          {/* App Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '24px',
            fontWeight: '700',
            color: '#6366f1'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#6366f1',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              🏥
          </div>
            MedKey
              </div>

          {/* Top Navigation */}
          <nav style={{display: 'flex', gap: '8px'}}>
            {topNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                  <button
                  key={item.id}
                  onClick={() => selectTab(item.id)}
                    style={{
                    padding: '8px 16px',
                      border: 'none',
                    borderRadius: '8px',
                    backgroundColor: isActive ? '#6366f1' : 'transparent',
                    color: isActive ? 'white' : '#64748b',
                    cursor: 'pointer',
                      fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease-in-out',
                      display: 'flex',
                      alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.color = '#1e293b';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = isActive ? '#6366f1' : 'transparent';
                      e.currentTarget.style.color = isActive ? 'white' : '#64748b';
                    }
                  }}
                >
                  <IconComponent size={16} />
                  {item.label}
                  </button>
              );
            })}
          </nav>
                </div>

        {/* Right Side - Profile */}
                  <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <button style={{
            backgroundColor: '#f1f5f9',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#64748b'
          }}>
            <Bell size={16} />
            <span style={{display: 'none', '@media (min-width: 768px)': {display: 'inline'}}}>
              Notifications
            </span>
              </button>
          
                <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}>
            <div style={{
              width: '32px',
              height: '32px',
                  borderRadius: '50%',
              backgroundColor: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {patientInfo.name.charAt(0)}
            </div>
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1e293b',
              display: 'none',
              '@media (min-width: 768px)': {display: 'inline'}
            }}>
              {patientInfo.name}
                </span>
            <span style={{color: '#64748b'}}>▼</span>
              </div>
            </div>
          </div>

      {/* Main Content Area */}
      <div style={{display: 'flex', flex: 1}}>
        {/* Left Sidebar - Quick Access */}
        <div className="left-sidebar" style={{
          width: '240px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          padding: '20px 0',
          overflowY: 'hidden',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
          position: 'fixed',
          height: '100vh',
          top: '0',
          left: '0',
          zIndex: 999
        }}>
          <div style={{
            padding: '0 20px 20px 20px',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0 0 16px 0'
            }}>
              Quick Access
            </h3>
            <div style={{
              fontSize: '11px',
              color: '#94a3b8',
              lineHeight: '1.4'
            }}>
              Access your health information quickly
            </div>
          </div>
          
          <nav style={{padding: '0 8px'}}>
            {leftSidebarItems.map((item) => {
              const IconComponent = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: '500',
                    position: 'relative',
                    borderRadius: '8px',
                    marginBottom: '4px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.color = '#1e293b';
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComponent size={16} style={{color: item.color}} />
                  </div>
                  <span style={{flex: 1}}>{item.label}</span>
                  <div style={{
                    width: '3px',
                    height: '16px',
                    backgroundColor: item.color,
                    borderRadius: '2px',
                    opacity: 0,
                    transition: 'opacity 0.2s ease-in-out'
                  }} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Workspace */}
        <div className="main-workspace" style={{
          flex: 1,
          padding: '24px 32px',
          overflowY: 'auto',
          marginLeft: '240px'
        }}>
          {renderTabContent()}
        </div>

        {/* Right Sidebar - Widgets */}
        <div className="right-sidebar" style={{
          width: '320px',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #e5e7eb',
          padding: '24px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 120px)',
          position: 'sticky',
          top: '120px'
        }}>
          {/* Care Team Contacts */}
          <div style={{marginBottom: '32px'}}>
                                <h3 style={{
                                  fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Phone size={16} style={{color: '#6366f1'}} />
              Care Team Contacts
                                </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {careTeamContacts.map((contact, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                                <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1e293b',
                                  marginBottom: '4px'
                                }}>
                    {contact.name}
                                </div>
                                <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    {contact.role}
                                </div>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button style={{
                      backgroundColor: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 10px',
                                    fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Phone size={12} />
                      Call
                    </button>
                    <button style={{
                      backgroundColor: '#f1f5f9',
                      color: '#64748b',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      padding: '6px 10px',
                                    fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Mail size={12} />
                      Email
                    </button>
                                  </div>
                              </div>
              ))}
                            </div>
                          </div>

          {/* Secure Messages */}
          <div style={{marginBottom: '32px'}}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 16px 0',
                                display: 'flex',
                                alignItems: 'center',
              gap: '8px'
            }}>
              <MessageSquare size={16} style={{color: '#6366f1'}} />
              Secure Messages
            </h3>
            <button style={{
              width: '100%',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
                                    fontSize: '14px',
                                      fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
                                      alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <MessageSquare size={16} />
              New Message
            </button>
                                </div>

          {/* Wellness Tracker */}
          <div style={{marginBottom: '32px'}}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 16px 0',
                                display: 'flex',
              alignItems: 'center',
                                gap: '8px'
                              }}>
              <TrendingUp size={16} style={{color: '#6366f1'}} />
              Wellness Tracker
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {wellnessData.map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8fafc',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                                <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    {item.metric}
                                </div>
                              <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '2px'
                  }}>
                    {item.value}
                                  </div>
                                  <div style={{
                                    fontSize: '11px',
                    color: item.status === 'normal' ? '#059669' : item.status === 'warning' ? '#f59e0b' : '#059669'
                                  }}>
                    Target: {item.target}
                                  </div>
                              </div>
              ))}
                          </div>
                        </div>

          {/* Notifications */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
              gap: '8px'
            }}>
              <Bell size={16} style={{color: '#6366f1'}} />
              Notifications
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {notifications.map((notification, index) => (
                <div key={index} style={{
                  backgroundColor: notification.urgent ? '#fef2f2' : '#f8fafc',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${notification.urgent ? '#fecaca' : '#e5e7eb'}`,
                  borderLeft: `3px solid ${notification.urgent ? '#dc2626' : '#6366f1'}`
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    {notification.time}
              </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#1e293b',
                    lineHeight: '1.4'
                  }}>
                    {notification.message}
              </div>
              </div>
              ))}
              </div>
            </div>
          </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar" style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        color: '#64748b'
      }}>
        <div style={{display: 'flex', gap: '24px'}}>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'color 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#6366f1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748b';
          }}>
            Support
      </button>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'color 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#6366f1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748b';
          }}>
            Privacy Policy
          </button>
        </div>
        
        <button style={{
          background: 'none',
          border: 'none',
          color: '#dc2626',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'color 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#b91c1c';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#dc2626';
        }}>
          <LogOut size={14} />
          Logout
        </button>
        </div>
        
      {/* Mobile Menu Button */}
                  <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '12px',
          cursor: 'pointer',
          display: 'none',
          boxShadow: '0 4px 6px rgba(99, 102, 241, 0.25)'
        }}
        className="mobile-menu-btn"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>

      <style jsx>{`
        @media (max-width: 1200px) {
          .right-sidebar {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          
          .left-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            z-index: 999;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
          }
          
          .left-sidebar.open {
            transform: translateX(0);
          }
          
          .main-workspace {
            margin-left: 0;
          }
          
          .top-bar nav {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PHRDashboard;