// Comprehensive Audit Logging Service
// Supports multiple storage destinations for HIPAA compliance

class AuditService {
  constructor() {
    this.storageDestinations = [];
    this.retentionPeriod = 7 * 365 * 24 * 60 * 60 * 1000; // 7 years in milliseconds
    this.batchSize = 100;
    this.batchTimeout = 5000; // 5 seconds
    this.pendingLogs = [];
    this.batchTimer = null;
  }

  // Add storage destination
  addStorageDestination(destination) {
    this.storageDestinations.push(destination);
  }

  // Store audit log entry
  async storeAuditLog(auditEntry) {
    try {
      // Add timestamp if not present
      if (!auditEntry.timestamp) {
        auditEntry.timestamp = new Date().toISOString();
      }

      // Add to pending batch
      this.pendingLogs.push(auditEntry);

      // Flush if batch is full
      if (this.pendingLogs.length >= this.batchSize) {
        await this.flushBatch();
      } else if (!this.batchTimer) {
        // Set timer for batch timeout
        this.batchTimer = setTimeout(() => this.flushBatch(), this.batchTimeout);
      }

      return { success: true, auditId: auditEntry.id };
    } catch (error) {
      console.error('Failed to store audit log:', error);
      return { success: false, error: error.message };
    }
  }

  // Flush pending logs to all destinations
  async flushBatch() {
    if (this.pendingLogs.length === 0) return;

    const logsToFlush = [...this.pendingLogs];
    this.pendingLogs = [];
    
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    // Store to all destinations
    const promises = this.storageDestinations.map(destination => 
      this.storeToDestination(destination, logsToFlush)
    );

    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.error('Failed to flush audit batch:', error);
    }
  }

  // Store logs to specific destination
  async storeToDestination(destination, logs) {
    try {
      switch (destination.type) {
        case 'console':
          return this.storeToConsole(logs);
        case 'localStorage':
          return this.storeToLocalStorage(logs);
        case 'database':
          return this.storeToDatabase(destination.config, logs);
        case 'file':
          return this.storeToFile(destination.config, logs);
        case 'api':
          return this.storeToAPI(destination.config, logs);
        case 'cloud':
          return this.storeToCloud(destination.config, logs);
        default:
          console.warn(`Unknown storage destination type: ${destination.type}`);
      }
    } catch (error) {
      console.error(`Failed to store to ${destination.type}:`, error);
    }
  }

  // Console storage (for development)
  async storeToConsole(logs) {
    logs.forEach(log => {
      console.log('🔍 AUDIT LOG:', {
        id: log.id,
        timestamp: log.timestamp,
        eventType: log.eventType,
        userId: log.userId,
        resourceType: log.resourceType,
        resourceId: log.resourceId,
        ipAddress: log.ipAddress,
        hipaaCategory: log.compliance?.hipaaCategory,
        phiInvolved: log.compliance?.phiInvolved
      });
    });
  }

  // LocalStorage storage (for demo/testing)
  async storeToLocalStorage(logs) {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]');
      const updatedLogs = [...existingLogs, ...logs];
      
      // Keep only logs within retention period
      const cutoffDate = new Date(Date.now() - this.retentionPeriod);
      const filteredLogs = updatedLogs.filter(log => 
        new Date(log.timestamp) > cutoffDate
      );
      
      localStorage.setItem('medkey_audit_logs', JSON.stringify(filteredLogs));
    } catch (error) {
      console.error('Failed to store to localStorage:', error);
    }
  }

  // Database storage (for production)
  async storeToDatabase(config, logs) {
    try {
      // This would connect to your secure audit database
      // Example: PostgreSQL, MongoDB, or specialized audit database
      const response = await fetch('/api/audit-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          logs: logs,
          batchId: `batch-${Date.now()}`,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Database storage failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Database storage error:', error);
      throw error;
    }
  }

  // File storage (for backup/archival)
  async storeToFile(config, logs) {
    try {
      const logEntry = {
        batchId: `batch-${Date.now()}`,
        timestamp: new Date().toISOString(),
        logs: logs,
        checksum: this.generateChecksum(logs)
      };

      // In a real implementation, this would write to a secure file system
      // For now, we'll simulate file storage
      console.log('📁 FILE STORAGE:', {
        path: config.filePath || '/secure/audit-logs/',
        entry: logEntry
      });

      return { success: true, filePath: config.filePath };
    } catch (error) {
      console.error('File storage error:', error);
      throw error;
    }
  }

  // API storage (for external audit systems)
  async storeToAPI(config, logs) {
    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
          'X-Audit-Source': 'MedKey',
          'X-Audit-Version': '1.0'
        },
        body: JSON.stringify({
          auditLogs: logs,
          source: 'MedKey',
          timestamp: new Date().toISOString(),
          signature: this.generateSignature(logs, config.secretKey)
        })
      });

      if (!response.ok) {
        throw new Error(`API storage failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API storage error:', error);
      throw error;
    }
  }

  // Cloud storage (for scalable audit logging)
  async storeToCloud(config, logs) {
    try {
      // This would integrate with cloud services like AWS CloudWatch, Azure Monitor, etc.
      const cloudPayload = {
        logGroup: config.logGroup || 'medkey-audit-logs',
        logStream: config.logStream || `audit-${new Date().toISOString().split('T')[0]}`,
        logEvents: logs.map(log => ({
          timestamp: new Date(log.timestamp).getTime(),
          message: JSON.stringify(log)
        }))
      };

      console.log('☁️ CLOUD STORAGE:', {
        service: config.service || 'AWS CloudWatch',
        payload: cloudPayload
      });

      return { success: true, cloudService: config.service };
    } catch (error) {
      console.error('Cloud storage error:', error);
      throw error;
    }
  }

  // Retrieve audit logs
  async getAuditLogs(filters = {}) {
    try {
      const logs = [];
      
      // Get from all destinations that support retrieval
      for (const destination of this.storageDestinations) {
        if (destination.supportsRetrieval) {
          const destinationLogs = await this.retrieveFromDestination(destination, filters);
          logs.push(...destinationLogs);
        }
      }

      // Sort by timestamp
      logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      return { success: true, logs };
    } catch (error) {
      console.error('Failed to retrieve audit logs:', error);
      return { success: false, error: error.message };
    }
  }

  // Retrieve from specific destination
  async retrieveFromDestination(destination, filters) {
    try {
      switch (destination.type) {
        case 'localStorage':
          return this.retrieveFromLocalStorage(filters);
        case 'database':
          return this.retrieveFromDatabase(destination.config, filters);
        default:
          return [];
      }
    } catch (error) {
      console.error(`Failed to retrieve from ${destination.type}:`, error);
      return [];
    }
  }

  // Retrieve from localStorage
  async retrieveFromLocalStorage(filters) {
    try {
      const logs = JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]');
      return this.filterLogs(logs, filters);
    } catch (error) {
      console.error('Failed to retrieve from localStorage:', error);
      return [];
    }
  }

  // Retrieve from database
  async retrieveFromDatabase(config, filters) {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/audit-logs?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Database retrieval failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.logs || [];
    } catch (error) {
      console.error('Database retrieval error:', error);
      return [];
    }
  }

  // Filter logs based on criteria
  filterLogs(logs, filters) {
    return logs.filter(log => {
      if (filters.userId && log.userId !== filters.userId) return false;
      if (filters.eventType && log.eventType !== filters.eventType) return false;
      if (filters.resourceType && log.resourceType !== filters.resourceType) return false;
      if (filters.startDate && new Date(log.timestamp) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(log.timestamp) > new Date(filters.endDate)) return false;
      if (filters.phiInvolved !== undefined && log.compliance?.phiInvolved !== filters.phiInvolved) return false;
      return true;
    });
  }

  // Generate checksum for log integrity
  generateChecksum(logs) {
    const data = JSON.stringify(logs);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  // Generate signature for API authentication
  generateSignature(logs, secretKey) {
    const data = JSON.stringify(logs) + secretKey;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  // Clean up old logs (retention policy)
  async cleanupOldLogs() {
    try {
      const cutoffDate = new Date(Date.now() - this.retentionPeriod);
      
      for (const destination of this.storageDestinations) {
        if (destination.supportsCleanup) {
          await this.cleanupDestination(destination, cutoffDate);
        }
      }
    } catch (error) {
      console.error('Failed to cleanup old logs:', error);
    }
  }

  // Cleanup specific destination
  async cleanupDestination(destination, cutoffDate) {
    try {
      switch (destination.type) {
        case 'localStorage':
          this.cleanupLocalStorage(cutoffDate);
          break;
        case 'database':
          await this.cleanupDatabase(destination.config, cutoffDate);
          break;
      }
    } catch (error) {
      console.error(`Failed to cleanup ${destination.type}:`, error);
    }
  }

  // Cleanup localStorage
  cleanupLocalStorage(cutoffDate) {
    try {
      const logs = JSON.parse(localStorage.getItem('medkey_audit_logs') || '[]');
      const filteredLogs = logs.filter(log => new Date(log.timestamp) > cutoffDate);
      localStorage.setItem('medkey_audit_logs', JSON.stringify(filteredLogs));
    } catch (error) {
      console.error('Failed to cleanup localStorage:', error);
    }
  }

  // Cleanup database
  async cleanupDatabase(config, cutoffDate) {
    try {
      const response = await fetch('/api/audit-logs/cleanup', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cutoffDate: cutoffDate.toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Database cleanup failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Database cleanup error:', error);
      throw error;
    }
  }
}

// Create and configure audit service instance
export const auditService = new AuditService();

// Configure storage destinations based on environment
const configureAuditStorage = () => {
  // Always include console for development
  auditService.addStorageDestination({
    type: 'console',
    supportsRetrieval: false,
    supportsCleanup: false
  });

  // Add localStorage for demo/testing
  auditService.addStorageDestination({
    type: 'localStorage',
    supportsRetrieval: true,
    supportsCleanup: true
  });

  // Add production destinations based on environment
  if (process.env.NODE_ENV === 'production') {
    // Database storage
    auditService.addStorageDestination({
      type: 'database',
      config: {
        apiKey: process.env.AUDIT_DB_API_KEY,
        endpoint: process.env.AUDIT_DB_ENDPOINT
      },
      supportsRetrieval: true,
      supportsCleanup: true
    });

    // Cloud storage (AWS CloudWatch, Azure Monitor, etc.)
    if (process.env.CLOUD_AUDIT_ENABLED === 'true') {
      auditService.addStorageDestination({
        type: 'cloud',
        config: {
          service: process.env.CLOUD_AUDIT_SERVICE || 'AWS CloudWatch',
          logGroup: process.env.CLOUD_AUDIT_LOG_GROUP || 'medkey-audit-logs',
          logStream: process.env.CLOUD_AUDIT_LOG_STREAM || 'audit-logs'
        },
        supportsRetrieval: true,
        supportsCleanup: false
      });
    }

    // File storage for backup
    if (process.env.FILE_AUDIT_ENABLED === 'true') {
      auditService.addStorageDestination({
        type: 'file',
        config: {
          filePath: process.env.FILE_AUDIT_PATH || '/secure/audit-logs/'
        },
        supportsRetrieval: true,
        supportsCleanup: true
      });
    }
  }
};

// Initialize audit storage configuration
configureAuditStorage();

// Set up periodic cleanup
setInterval(() => {
  auditService.cleanupOldLogs();
}, 24 * 60 * 60 * 1000); // Run cleanup daily
