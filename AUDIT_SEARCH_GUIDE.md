# 🔍 MedKey Audit Log Search Guide

## **Quick Start - Search Your Audit Logs**

### **Method 1: Browser Console (Easiest)**

1. **Open your MedKey app**
2. **Press F12** to open developer tools
3. **Go to Console tab**
4. **Use these commands**:

```javascript
// Get all audit logs
auditSearch.getAllLogs()

// Search by user
auditSearch.searchByUser("user123")

// Search by event type
auditSearch.searchByEvent("login")

// Search PHI-related logs
auditSearch.searchPHI()

// Get audit summary
auditSearch.getSummary()
```

### **Method 2: Audit Log Viewer (UI)**

1. **Open your MedKey dashboard**
2. **Click "Audit Logs"** in the sidebar (under Security section)
3. **Use the filters** to search:
   - User ID
   - Event Type
   - Resource Type
   - Date Range
   - PHI Involvement

### **Method 3: Direct localStorage Access**

```javascript
// In browser console:
const logs = JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]');
console.table(logs);
```

## **🔍 Available Search Functions**

### **Basic Search Functions**

```javascript
// Get all logs
auditSearch.getAllLogs()

// Search with custom filters
auditSearch.search({
  userId: "user123",
  eventType: "login",
  resourceType: "Patient",
  startDate: "2023-12-01",
  endDate: "2023-12-31",
  phiInvolved: true
})
```

### **Quick Search Functions**

```javascript
// Search by user ID
auditSearch.searchByUser("user123")

// Search by event type
auditSearch.searchByEvent("login")        // login events
auditSearch.searchByEvent("logout")       // logout events
auditSearch.searchByEvent("create")       // create events
auditSearch.searchByEvent("read")         // read events
auditSearch.searchByEvent("update")       // update events
auditSearch.searchByEvent("delete")       // delete events
auditSearch.searchByEvent("access_denied") // access denied events
auditSearch.searchByEvent("breach_attempt") // breach attempts

// Search by resource type
auditSearch.searchByResource("Patient")
auditSearch.searchByResource("Practitioner")
auditSearch.searchByResource("Observation")
auditSearch.searchByResource("MedicationRequest")
auditSearch.searchByResource("Session")
auditSearch.searchByResource("HL7Message")

// Search by date range
auditSearch.searchByDateRange("2023-12-01", "2023-12-31")

// Search PHI-related logs
auditSearch.searchPHI()

// Search security events
auditSearch.searchSecurityEvents()
```

### **Advanced Search Examples**

```javascript
// Find all login attempts in the last hour
const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
auditSearch.search({
  eventType: "login",
  startDate: oneHourAgo
});

// Find all PHI access by a specific user
auditSearch.search({
  userId: "doctor123",
  phiInvolved: true
});

// Find all security violations
auditSearch.search({
  eventType: ["access_denied", "breach_attempt"]
});

// Find all patient data access
auditSearch.search({
  resourceType: "Patient",
  phiInvolved: true
});
```

## **📊 Audit Summary Functions**

### **Get Overall Summary**

```javascript
// Get complete audit summary
auditSearch.getSummary()
```

This shows:
- Total number of logs
- Breakdown by event type
- Breakdown by resource type
- Breakdown by HIPAA category
- Number of PHI-involved logs
- Number of security events
- Recent activity (last hour)

### **Example Summary Output**

```javascript
📊 Audit Summary: {
  totalLogs: 150,
  byEventType: {
    login: 25,
    logout: 25,
    read: 80,
    create: 15,
    update: 5
  },
  byResourceType: {
    Patient: 60,
    Practitioner: 30,
    Session: 40,
    Observation: 20
  },
  byHIPAA: {
    technical: 100,
    access: 30,
    use: 20
  },
  phiInvolved: 80,
  securityEvents: 0,
  recentActivity: 5
}
```

## **🎯 Common Search Scenarios**

### **1. Monitor User Activity**

```javascript
// Track all activities for a specific user
auditSearch.searchByUser("doctor123");

// Check recent activity
auditSearch.search({
  userId: "doctor123",
  startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
});
```

### **2. Security Monitoring**

```javascript
// Check for security violations
auditSearch.searchSecurityEvents();

// Monitor access denied attempts
auditSearch.searchByEvent("access_denied");

// Check for breach attempts
auditSearch.searchByEvent("breach_attempt");
```

### **3. PHI Compliance**

```javascript
// Find all PHI access
auditSearch.searchPHI();

// Check PHI access by resource type
auditSearch.search({
  resourceType: "Patient",
  phiInvolved: true
});
```

### **4. System Health**

```javascript
// Check recent system activity
auditSearch.search({
  startDate: new Date(Date.now() - 60 * 60 * 1000).toISOString()
});

// Monitor login/logout patterns
auditSearch.search({
  eventType: ["login", "logout"],
  startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
});
```

## **🔧 Custom Search Examples**

### **Find Suspicious Activity**

```javascript
// Find multiple failed login attempts
const logs = auditSearch.getAllLogs();
const failedLogins = logs.filter(log => 
  log.eventType === "access_denied" && 
  log.details?.reason === "invalid_credentials"
);

// Find unusual access patterns
const unusualAccess = logs.filter(log =>
  log.eventType === "read" &&
  log.compliance?.phiInvolved &&
  new Date(log.timestamp) > new Date(Date.now() - 60 * 60 * 1000)
);
```

### **Generate Compliance Reports**

```javascript
// Generate HIPAA compliance report
const hipaaReport = auditSearch.search({
  startDate: "2023-01-01",
  endDate: "2023-12-31"
}).filter(log => log.compliance?.phiInvolved);

console.log(`HIPAA Compliance Report: ${hipaaReport.length} PHI-related activities`);
```

### **Monitor Real-time Activity**

```javascript
// Set up real-time monitoring
setInterval(() => {
  const recentLogs = auditSearch.search({
    startDate: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  });
  
  if (recentLogs.length > 0) {
    console.log(`Recent activity: ${recentLogs.length} events`);
    auditSearch.display(recentLogs);
  }
}, 300000); // Check every 5 minutes
```

## **📱 Using the Audit Log Viewer UI**

### **Access the Viewer**

1. **Navigate to your MedKey dashboard**
2. **Click "Audit Logs"** in the sidebar (Shield icon)
3. **Use the filter panel** to search

### **Available Filters**

- **User ID**: Search by specific user
- **Event Type**: Filter by event type (login, read, etc.)
- **Resource Type**: Filter by resource (Patient, Practitioner, etc.)
- **Start Date**: Filter from specific date
- **End Date**: Filter to specific date
- **PHI Involved**: Filter PHI-related activities

### **Viewing Results**

- **Table View**: All logs in a sortable table
- **Summary**: Statistics at the bottom
- **Details**: Click "View Details" for full log information

## **🚨 Troubleshooting**

### **No Logs Found**

```javascript
// Check if audit service is working
console.log('Audit destinations:', auditService.storageDestinations);

// Manually create a test log
auditService.storeAuditLog({
  id: 'test-log',
  eventType: 'test',
  userId: 'test-user',
  timestamp: new Date().toISOString()
});
```

### **LocalStorage Full**

```javascript
// Clear old logs
localStorage.removeItem('medkey_audit_logs');

// Or check storage usage
const logs = JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]');
console.log(`Storage usage: ${JSON.stringify(logs).length} characters`);
```

### **Search Not Working**

```javascript
// Verify search utility is loaded
if (typeof auditSearch === 'undefined') {
  console.error('Audit search utility not loaded');
} else {
  console.log('Audit search utility is available');
}
```

## **📋 Quick Reference**

### **Essential Commands**

```javascript
// Get all logs
auditSearch.getAllLogs()

// Search by user
auditSearch.searchByUser("user123")

// Search by event
auditSearch.searchByEvent("login")

// Search PHI
auditSearch.searchPHI()

// Get summary
auditSearch.getSummary()

// Custom search
auditSearch.search({
  userId: "user123",
  eventType: "login",
  startDate: "2023-12-01"
})
```

### **Event Types**

- `login` - User login
- `logout` - User logout
- `create` - Create resource
- `read` - Read resource
- `update` - Update resource
- `delete` - Delete resource
- `access_denied` - Access denied
- `breach_attempt` - Security breach attempt

### **Resource Types**

- `Patient` - Patient records
- `Practitioner` - Healthcare providers
- `Observation` - Lab results, vitals
- `MedicationRequest` - Prescriptions
- `Session` - User sessions
- `HL7Message` - HL7 messages

This comprehensive search system gives you complete visibility into all system activities for HIPAA compliance! 🔐📊
