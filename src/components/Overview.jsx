import React from 'react';
import { 
  Calendar, 
  FileText, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  Heart, 
  Building2, 
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  Download,
  Phone,
  Shield
} from 'lucide-react';

const Overview = ({ patientInfo, onNavigate }) => {
  const quickSummaryCards = [
    { 
      title: 'Upcoming Appointment', 
      value: 'Tomorrow, 10:00 AM', 
      icon: Calendar, 
      color: '#059669',
      action: 'View Details',
      onClick: () => onNavigate('appointments')
    },
    { 
      title: 'Recent Lab Result', 
      value: 'Blood Work - Normal', 
      icon: FlaskConical, 
      color: '#ea580c',
      action: 'View Results',
      onClick: () => onNavigate('test-results')
    },
    { 
      title: 'Active Prescription', 
      value: '3 medications', 
      icon: Pill, 
      color: '#0891b2',
      action: 'Manage Meds',
      onClick: () => onNavigate('medications')
    },
    { 
      title: 'Billing Due', 
      value: '$45.00', 
      icon: Activity, 
      color: '#dc2626',
      action: 'Pay Now',
      onClick: () => onNavigate('billing')
    }
  ];

  const healthTimeline = [
    {
      date: '2024-02-15',
      type: 'appointment',
      title: 'Annual Physical Exam',
      description: 'Completed annual checkup with Dr. Johnson. All vitals normal.',
      status: 'completed',
      details: {
        bloodPressure: '120/80',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '165 lbs',
        notes: 'Patient is in good health. Recommended to continue current exercise routine.'
      }
    },
    {
      date: '2024-02-10',
      type: 'lab',
      title: 'Blood Work Results',
      description: 'Comprehensive metabolic panel and lipid profile completed.',
      status: 'completed',
      details: {
        glucose: '95 mg/dL',
        cholesterol: '180 mg/dL',
        triglycerides: '120 mg/dL',
        notes: 'All values within normal range. No action required.'
      }
    },
    {
      date: '2024-02-05',
      type: 'medication',
      title: 'Prescription Refill',
      description: 'Refilled blood pressure medication for next 30 days.',
      status: 'completed',
      details: {
        medication: 'Lisinopril 10mg',
        quantity: '30 tablets',
        notes: 'Continue taking 1 tablet daily as prescribed.'
      }
    },
    {
      date: '2024-01-28',
      type: 'visit',
      title: 'Follow-up Consultation',
      description: 'Follow-up visit for blood pressure management.',
      status: 'completed',
      details: {
        bloodPressure: '118/78',
        notes: 'Blood pressure well controlled. Continue current medication and lifestyle modifications.'
      }
    },
    {
      date: '2024-01-15',
      type: 'immunization',
      title: 'Flu Shot',
      description: 'Annual influenza vaccination administered.',
      status: 'completed',
      details: {
        vaccine: 'Influenza (Quadrivalent)',
        lot: 'FLU2024-001',
        notes: 'No adverse reactions reported. Protection expected within 2 weeks.'
      }
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={16} style={{color: '#059669'}} />;
      case 'lab':
        return <FlaskConical size={16} style={{color: '#ea580c'}} />;
      case 'medication':
        return <Pill size={16} style={{color: '#0891b2'}} />;
      case 'visit':
        return <Stethoscope size={16} style={{color: '#6366f1'}} />;
      case 'immunization':
        return <Shield size={16} style={{color: '#16a34a'}} />;
      default:
        return <Activity size={16} style={{color: '#6366f1'}} />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} style={{color: '#059669'}} />;
      case 'pending':
        return <Clock size={16} style={{color: '#f59e0b'}} />;
      case 'urgent':
        return <AlertCircle size={16} style={{color: '#dc2626'}} />;
      default:
        return <CheckCircle size={16} style={{color: '#059669'}} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="overview-container" style={{maxWidth: '100%'}}>
      {/* Header: Welcome, <Patient Name> */}
      <div style={{
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          Welcome, {patientInfo.name}! 👋
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          margin: '0 0 20px 0',
          lineHeight: '1.6'
        }}>
          Here's your health overview for today. Stay on top of your wellness journey and manage your healthcare needs.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Next Appointment</div>
            <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b'}}>{patientInfo.nextAppointment}</div>
          </div>
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Last Visit</div>
            <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b'}}>{patientInfo.lastVisit}</div>
          </div>
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '16px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{fontSize: '12px', color: '#64748b', marginBottom: '4px'}}>Blood Type</div>
            <div style={{fontSize: '16px', fontWeight: '600', color: '#1e293b'}}>{patientInfo.bloodType}</div>
          </div>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div style={{marginBottom: '32px'}}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1e293b',
          margin: '0 0 20px 0'
        }}>
          Quick Summary
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {quickSummaryCards.map((card, index) => (
            <div key={index} style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: card.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <card.icon size={24} />
                </div>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '4px'
                  }}>
                    {card.title}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1e293b'
                  }}>
                    {card.value}
                  </div>
                </div>
              </div>
              
              <button
                onClick={card.onClick}
                style={{
                  width: '100%',
                  backgroundColor: card.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {card.action}
                <Eye size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Central Panel: Health Timeline / Activity Feed */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1e293b',
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Activity size={20} style={{color: '#6366f1'}} />
            Health Timeline
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            margin: '8px 0 0 0'
          }}>
            Date-based view of your health activities, visits, and results
          </p>
        </div>
        
        <div style={{padding: '24px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {healthTimeline.map((event, index) => (
              <div key={index} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}>
                {/* Event Header */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '16px 20px',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {getEventIcon(event.type)}
                  <div style={{flex: 1}}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '4px'
                    }}>
                      {event.title}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#64748b'
                    }}>
                      {formatDate(event.date)}
                    </div>
                  </div>
                  {getStatusIcon(event.status)}
                </div>
                
                {/* Event Description */}
                <div style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    margin: '0',
                    lineHeight: '1.5'
                  }}>
                    {event.description}
                  </p>
                </div>
                
                {/* Event Details - Expandable */}
                <div style={{
                  padding: '16px 20px',
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '12px'
                  }}>
                    {Object.entries(event.details).map(([key, value]) => (
                      <div key={key} style={{
                        backgroundColor: '#ffffff',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          fontSize: '11px',
                          color: '#64748b',
                          textTransform: 'uppercase',
                          fontWeight: '500',
                          marginBottom: '4px'
                        }}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1e293b'
                        }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
