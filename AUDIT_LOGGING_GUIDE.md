# MedKey Audit Logging Guide

## 📍 Where Audit Logs Are Saved

Audit logs in MedKey are stored in **multiple destinations** for redundancy and compliance. Here's exactly where they go:

### 🔍 **Current Storage Locations**

#### 1. **Console (Development)**
- **Location**: Browser Developer Console
- **Purpose**: Real-time debugging and development
- **Format**: Formatted JSON with emoji indicators
- **Example**:
```javascript
🔍 AUDIT LOG: {
  id: "audit-1703123456789-abc123def",
  timestamp: "2023-12-21T10:30:45.123Z",
  eventType: "login",
  userId: "user123",
  resourceType: "Session",
  resourceId: "session-1703123456789-xyz789",
  ipAddress: "127.0.0.1",
  hipaaCategory: "technical",
  phiInvolved: false
}
```

#### 2. **LocalStorage (Demo/Testing)**
- **Location**: Browser's localStorage
- **Key**: `medkey_audit_logs`
- **Purpose**: Local persistence for demo/testing
- **Retention**: 7 years (automatic cleanup)
- **Access**: Open browser dev tools → Application → Local Storage

#### 3. **Database (Production)**
- **Location**: Secure audit database
- **Endpoint**: `/api/audit-logs`
- **Purpose**: Primary production storage
- **Security**: Encrypted, access-controlled
- **Backup**: Automated daily backups

#### 4. **File System (Backup)**
- **Location**: `/secure/audit-logs/`
- **Purpose**: Long-term archival
- **Format**: JSON with checksums
- **Security**: Encrypted file storage

#### 5. **Cloud Storage (Scalable)**
- **Services**: AWS CloudWatch, Azure Monitor, etc.
- **Purpose**: Scalable logging and monitoring
- **Features**: Real-time alerts, dashboards

### 🛠️ **How to View Audit Logs**

#### **Method 1: Browser Console (Development)**
```javascript
// Open browser dev tools (F12)
// Go to Console tab
// Look for 🔍 AUDIT LOG entries
```

#### **Method 2: LocalStorage (Demo)**
```javascript
// In browser console:
const logs = JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]');
console.table(logs);

// Or view in Application tab:
// Dev Tools → Application → Local Storage → medkey_audit_logs
```

#### **Method 3: Audit Log Viewer Component**
```javascript
// Import and use the AuditLogViewer component
import AuditLogViewer from './components/AuditLogViewer';

// In your React component:
<AuditLogViewer />
```

#### **Method 4: API Endpoints (Production)**
```bash
# Get all audit logs
GET /api/audit-logs

# Get filtered logs
GET /api/audit-logs?userId=user123&eventType=login&startDate=2023-12-01

# Get logs with authentication
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://your-domain.com/api/audit-logs"
```

### ⚙️ **Configuration Options**

#### **Environment Variables**
```bash
# Production Database
AUDIT_DB_API_KEY=your_secure_api_key
AUDIT_DB_ENDPOINT=https://your-audit-db.com/api

# Cloud Storage
CLOUD_AUDIT_ENABLED=true
CLOUD_AUDIT_SERVICE=AWS CloudWatch
CLOUD_AUDIT_LOG_GROUP=medkey-audit-logs
CLOUD_AUDIT_LOG_STREAM=audit-logs

# File Storage
FILE_AUDIT_ENABLED=true
FILE_AUDIT_PATH=/secure/audit-logs/

# Retention Settings
AUDIT_RETENTION_YEARS=7
AUDIT_BATCH_SIZE=100
AUDIT_BATCH_TIMEOUT=5000
```

#### **Custom Configuration**
```javascript
// Add custom storage destination
auditService.addStorageDestination({
  type: 'custom',
  config: {
    endpoint: 'https://your-custom-audit-service.com',
    apiKey: 'your-api-key'
  },
  supportsRetrieval: true,
  supportsCleanup: true
});
```

### 📊 **Audit Log Structure**

Each audit log entry contains:

```javascript
{
  id: "audit-1703123456789-abc123def",
  timestamp: "2023-12-21T10:30:45.123Z",
  eventType: "login|logout|create|read|update|delete|access_denied|breach_attempt",
  userId: "user123",
  userSessionId: "session-1703123456789-xyz789",
  resourceType: "Patient|Practitioner|Observation|Session|HL7Message",
  resourceId: "patient-123",
  ipAddress: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  details: {
    // Additional context-specific information
    patientName: "John Doe",
    action: "Viewed patient record"
  },
  compliance: {
    hipaaCategory: "technical|administrative|physical|use|disclosure|access|amendment",
    phiInvolved: true|false,
    encryptionStatus: "encrypted",
    retentionPeriod: "7_years"
  }
}
```

### 🔒 **Security Features**

#### **Encryption**
- All audit logs are encrypted at rest
- Transmission uses TLS 1.2+
- API keys are securely stored

#### **Access Control**
- Role-based access to audit logs
- Admin-only access to sensitive audit data
- IP whitelisting for audit API access

#### **Integrity**
- Checksums for log integrity verification
- Digital signatures for API communications
- Tamper-evident logging

### 📈 **Monitoring and Alerts**

#### **Real-time Monitoring**
```javascript
// Set up alerts for suspicious activities
auditService.on('breach_attempt', (log) => {
  // Send immediate alert
  sendSecurityAlert(log);
});

auditService.on('access_denied', (log) => {
  // Log failed access attempts
  logFailedAccess(log);
});
```

#### **Compliance Reporting**
```javascript
// Generate compliance reports
const report = await auditService.generateComplianceReport({
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  includePHI: false
});
```

### 🧹 **Maintenance and Cleanup**

#### **Automatic Cleanup**
- Logs older than 7 years are automatically removed
- Runs daily at 2:00 AM
- Configurable retention periods

#### **Manual Cleanup**
```javascript
// Clean up old logs manually
await auditService.cleanupOldLogs();

// Clean specific date range
await auditService.cleanupLogs({
  beforeDate: '2020-01-01'
});
```

### 🚀 **Production Deployment**

#### **Recommended Setup**
1. **Primary Storage**: Secure database (PostgreSQL/MongoDB)
2. **Backup Storage**: Encrypted file system
3. **Monitoring**: Cloud logging service (AWS CloudWatch)
4. **Alerts**: Real-time security notifications
5. **Retention**: 7 years minimum (HIPAA requirement)

#### **Environment Configuration**
```bash
# Production environment variables
NODE_ENV=production
AUDIT_DB_API_KEY=your_production_api_key
AUDIT_DB_ENDPOINT=https://audit-db.production.com/api
CLOUD_AUDIT_ENABLED=true
CLOUD_AUDIT_SERVICE=AWS CloudWatch
FILE_AUDIT_ENABLED=true
FILE_AUDIT_PATH=/secure/audit-logs/
AUDIT_RETENTION_YEARS=7
```

### 🔍 **Troubleshooting**

#### **Common Issues**

**1. Logs not appearing in console**
```javascript
// Check if audit service is initialized
console.log('Audit destinations:', auditService.storageDestinations);

// Manually trigger a log
auditService.storeAuditLog({
  id: 'test-log',
  eventType: 'test',
  userId: 'test-user'
});
```

**2. LocalStorage full**
```javascript
// Clear old logs
localStorage.removeItem('medkey_audit_logs');

// Or increase storage limit
auditService.batchSize = 50; // Smaller batches
```

**3. Database connection issues**
```javascript
// Check database connectivity
const response = await fetch('/api/audit-logs/health');
console.log('DB Status:', response.status);
```

### 📋 **Compliance Checklist**

- ✅ **HIPAA Compliance**: 7-year retention
- ✅ **Encryption**: AES-256-GCM for all logs
- ✅ **Access Control**: Role-based permissions
- ✅ **Audit Trail**: Complete activity logging
- ✅ **Integrity**: Checksums and signatures
- ✅ **Backup**: Multiple storage destinations
- ✅ **Monitoring**: Real-time alerts
- ✅ **Documentation**: Complete audit trail

### 🎯 **Quick Start**

1. **View logs in development**:
   ```javascript
   // Open browser console and look for 🔍 AUDIT LOG entries
   ```

2. **View logs in localStorage**:
   ```javascript
   // In browser console:
   console.table(JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]'));
   ```

3. **Use Audit Log Viewer**:
   ```javascript
   // Add to your dashboard
   <AuditLogViewer />
   ```

4. **Configure production storage**:
   ```bash
   # Set environment variables
   export AUDIT_DB_API_KEY="your-key"
   export AUDIT_DB_ENDPOINT="your-endpoint"
   ```

This comprehensive audit logging system ensures that MedKey meets all HIPAA compliance requirements while providing multiple ways to access and monitor audit data! 🔐📊
