// Audit Log Search Utility
// Use this in browser console to search audit logs

// Get all audit logs from localStorage
const getAllAuditLogs = () => {
  try {
    const logs = JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]');
    console.log(`📊 Found ${logs.length} audit logs`);
    return logs;
  } catch (error) {
    console.error('❌ Error reading audit logs:', error);
    return [];
  }
};

// Search audit logs by criteria
const searchAuditLogs = (filters = {}) => {
  const logs = getAllAuditLogs();
  
  const filteredLogs = logs.filter(log => {
    // Filter by user ID
    if (filters.userId && !log.userId?.includes(filters.userId)) {
      return false;
    }
    
    // Filter by event type
    if (filters.eventType && log.eventType !== filters.eventType) {
      return false;
    }
    
    // Filter by resource type
    if (filters.resourceType && log.resourceType !== filters.resourceType) {
      return false;
    }
    
    // Filter by date range
    if (filters.startDate) {
      const logDate = new Date(log.timestamp);
      const startDate = new Date(filters.startDate);
      if (logDate < startDate) return false;
    }
    
    if (filters.endDate) {
      const logDate = new Date(log.timestamp);
      const endDate = new Date(filters.endDate);
      if (logDate > endDate) return false;
    }
    
    // Filter by PHI involvement
    if (filters.phiInvolved !== undefined && log.compliance?.phiInvolved !== filters.phiInvolved) {
      return false;
    }
    
    // Filter by HIPAA category
    if (filters.hipaaCategory && log.compliance?.hipaaCategory !== filters.hipaaCategory) {
      return false;
    }
    
    return true;
  });
  
  console.log(`🔍 Found ${filteredLogs.length} matching logs`);
  return filteredLogs;
};

// Display logs in a formatted table
const displayAuditLogs = (logs) => {
  if (logs.length === 0) {
    console.log('📭 No audit logs found');
    return;
  }
  
  const formattedLogs = logs.map(log => ({
    Timestamp: new Date(log.timestamp).toLocaleString(),
    Event: log.eventType,
    User: log.userId,
    Resource: `${log.resourceType} (${log.resourceId})`,
    IP: log.ipAddress,
    HIPAA: log.compliance?.hipaaCategory,
    PHI: log.compliance?.phiInvolved ? 'Yes' : 'No'
  }));
  
  console.table(formattedLogs);
};

// Quick search functions
const searchByUser = (userId) => {
  const logs = searchAuditLogs({ userId });
  displayAuditLogs(logs);
  return logs;
};

const searchByEvent = (eventType) => {
  const logs = searchAuditLogs({ eventType });
  displayAuditLogs(logs);
  return logs;
};

const searchByResource = (resourceType) => {
  const logs = searchAuditLogs({ resourceType });
  displayAuditLogs(logs);
  return logs;
};

const searchByDateRange = (startDate, endDate) => {
  const logs = searchAuditLogs({ startDate, endDate });
  displayAuditLogs(logs);
  return logs;
};

const searchPHI = () => {
  const logs = searchAuditLogs({ phiInvolved: true });
  displayAuditLogs(logs);
  return logs;
};

const searchSecurityEvents = () => {
  const logs = searchAuditLogs({ 
    eventType: ['access_denied', 'breach_attempt'] 
  });
  displayAuditLogs(logs);
  return logs;
};

// Get audit summary
const getAuditSummary = () => {
  const logs = getAllAuditLogs();
  
  const summary = {
    totalLogs: logs.length,
    byEventType: {},
    byResourceType: {},
    byHIPAA: {},
    phiInvolved: 0,
    securityEvents: 0,
    recentActivity: 0
  };
  
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  logs.forEach(log => {
    // Count by event type
    summary.byEventType[log.eventType] = (summary.byEventType[log.eventType] || 0) + 1;
    
    // Count by resource type
    summary.byResourceType[log.resourceType] = (summary.byResourceType[log.resourceType] || 0) + 1;
    
    // Count by HIPAA category
    const hipaaCategory = log.compliance?.hipaaCategory || 'unknown';
    summary.byHIPAA[hipaaCategory] = (summary.byHIPAA[hipaaCategory] || 0) + 1;
    
    // Count PHI involvement
    if (log.compliance?.phiInvolved) {
      summary.phiInvolved++;
    }
    
    // Count security events
    if (['access_denied', 'breach_attempt'].includes(log.eventType)) {
      summary.securityEvents++;
    }
    
    // Count recent activity (last hour)
    if (new Date(log.timestamp) > oneHourAgo) {
      summary.recentActivity++;
    }
  });
  
  console.log('📊 Audit Summary:', summary);
  return summary;
};

// Export functions to global scope for console use
window.auditSearch = {
  getAllLogs: getAllAuditLogs,
  search: searchAuditLogs,
  display: displayAuditLogs,
  searchByUser,
  searchByEvent,
  searchByResource,
  searchByDateRange,
  searchPHI,
  searchSecurityEvents,
  getSummary: getAuditSummary
};

// Auto-run summary on load
console.log('🔍 Audit Search Utility loaded!');
console.log('Available functions:');
console.log('- auditSearch.getAllLogs() - Get all logs');
console.log('- auditSearch.search({userId: "user123"}) - Search with filters');
console.log('- auditSearch.searchByUser("user123") - Search by user');
console.log('- auditSearch.searchByEvent("login") - Search by event type');
console.log('- auditSearch.searchByResource("Patient") - Search by resource type');
console.log('- auditSearch.searchPHI() - Search PHI-related logs');
console.log('- auditSearch.searchSecurityEvents() - Search security events');
console.log('- auditSearch.getSummary() - Get audit summary');

// Show current summary
window.auditSearch.getSummary();
