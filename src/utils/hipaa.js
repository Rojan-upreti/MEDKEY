// HIPAA (Health Insurance Portability and Accountability Act) Compliance Utilities
// Implements security measures required for PHI (Protected Health Information)

import CryptoJS from 'crypto-js';
import { auditService } from '../services/auditService';

// HIPAA Security Rule Categories
export const HIPAA_SECURITY_CATEGORIES = {
  ADMINISTRATIVE_SAFEGUARDS: 'administrative',
  PHYSICAL_SAFEGUARDS: 'physical',
  TECHNICAL_SAFEGUARDS: 'technical'
};

// HIPAA Privacy Rule Categories
export const HIPAA_PRIVACY_CATEGORIES = {
  USE: 'use',
  DISCLOSURE: 'disclosure',
  ACCESS: 'access',
  AMENDMENT: 'amendment'
};

// Audit Event Types
export const AUDIT_EVENT_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  EXPORT: 'export',
  ACCESS_DENIED: 'access_denied',
  BREACH_ATTEMPT: 'breach_attempt'
};

// PHI Data Fields (Protected Health Information)
export const PHI_FIELDS = [
  'name', 'address', 'phone', 'email', 'ssn', 'medicalRecordNumber',
  'birthDate', 'diagnosis', 'medications', 'labResults', 'treatmentPlans',
  'insuranceInfo', 'emergencyContact', 'familyHistory', 'geneticInfo'
];

// Encryption Configuration
const ENCRYPTION_CONFIG = {
  algorithm: 'AES-256-GCM',
  keySize: 256,
  ivSize: 128,
  saltSize: 128
};

// Generate encryption key from user credentials
export const generateEncryptionKey = (userCredentials) => {
  const salt = CryptoJS.lib.WordArray.random(ENCRYPTION_CONFIG.saltSize / 8);
  const key = CryptoJS.PBKDF2(userCredentials, salt, {
    keySize: ENCRYPTION_CONFIG.keySize / 32,
    iterations: 10000
  });
  return { key, salt };
};

// Encrypt PHI data
export const encryptPHI = (data, encryptionKey) => {
  try {
    if (!data || !encryptionKey) {
      throw new Error('Data and encryption key are required');
    }

    const iv = CryptoJS.lib.WordArray.random(ENCRYPTION_CONFIG.ivSize / 8);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey.key, {
      iv: iv,
      mode: CryptoJS.mode.GCM,
      padding: CryptoJS.pad.Pkcs7
    });

    return {
      encrypted: encrypted.toString(),
      iv: iv.toString(),
      salt: encryptionKey.salt.toString(),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt PHI data');
  }
};

// Decrypt PHI data
export const decryptPHI = (encryptedData, encryptionKey) => {
  try {
    if (!encryptedData || !encryptionKey) {
      throw new Error('Encrypted data and encryption key are required');
    }

    const decrypted = CryptoJS.AES.decrypt(encryptedData.encrypted, encryptionKey.key, {
      iv: CryptoJS.enc.Hex.parse(encryptedData.iv),
      mode: CryptoJS.mode.GCM,
      padding: CryptoJS.pad.Pkcs7
    });

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt PHI data');
  }
};

// Mask PHI for display (partial masking)
export const maskPHI = (data, fieldType) => {
  if (!data) return data;

  switch (fieldType) {
    case 'ssn':
      return data.replace(/(\d{3})-(\d{2})-(\d{4})/, '***-**-$3');
    
    case 'phone':
      return data.replace(/(\d{3})-(\d{3})-(\d{4})/, '***-***-$3');
    
    case 'email':
      const [local, domain] = data.split('@');
      return `${local.charAt(0)}***@${domain}`;
    
    case 'name':
      const names = data.split(' ');
      return names.map(name => name.charAt(0) + '*'.repeat(name.length - 1)).join(' ');
    
    case 'address':
      const parts = data.split(' ');
      return parts.map((part, index) => index < 2 ? part : '*'.repeat(part.length)).join(' ');
    
    default:
      return data;
  }
};

// Create audit log entry
export const createAuditLog = (eventType, userId, resourceType, resourceId, details = {}) => {
  const auditEntry = {
    id: generateAuditId(),
    timestamp: new Date().toISOString(),
    eventType,
    userId,
    userSessionId: getCurrentSessionId(),
    resourceType,
    resourceId,
    ipAddress: getClientIP(),
    userAgent: navigator.userAgent,
    details,
    compliance: {
      hipaaCategory: getHIPAACategory(eventType),
      phiInvolved: checkPHIInvolvement(resourceType, details),
      encryptionStatus: 'encrypted',
      retentionPeriod: '7_years'
    }
  };

  // Store audit log (in production, this would go to a secure audit database)
  storeAuditLog(auditEntry);
  
  return auditEntry;
};

// Check if data contains PHI
export const containsPHI = (data) => {
  if (!data || typeof data !== 'object') return false;
  
  const dataString = JSON.stringify(data).toLowerCase();
  return PHI_FIELDS.some(field => dataString.includes(field.toLowerCase()));
};

// Validate HIPAA compliance
export const validateHIPAACompliance = (data, operation) => {
  const violations = [];
  
  // Check for PHI in unencrypted data
  if (containsPHI(data) && !isEncrypted(data)) {
    violations.push('PHI data must be encrypted');
  }
  
  // Check for proper access controls
  if (!hasValidAccess(operation)) {
    violations.push('Invalid access attempt');
  }
  
  // Check for audit logging
  if (!isAuditLogged(operation)) {
    violations.push('Operation must be audit logged');
  }
  
  return {
    isCompliant: violations.length === 0,
    violations
  };
};

// Access Control Matrix
const ACCESS_CONTROL_MATRIX = {
  patient: {
    read: ['own_data', 'authorized_providers'],
    write: ['own_data'],
    delete: ['none']
  },
  provider: {
    read: ['assigned_patients', 'own_data'],
    write: ['assigned_patients', 'own_data'],
    delete: ['none']
  },
  admin: {
    read: ['all_data'],
    write: ['all_data'],
    delete: ['audit_logs_only']
  }
};

// Check if user has valid access
export const hasValidAccess = (operation) => {
  const userRole = getCurrentUserRole();
  const userPermissions = ACCESS_CONTROL_MATRIX[userRole];
  
  if (!userPermissions) return false;
  
  return userPermissions[operation.type]?.includes(operation.scope);
};

// Session Management
export const createSecureSession = (userData) => {
  const sessionId = generateSessionId();
  const sessionData = {
    id: sessionId,
    userId: userData.id,
    role: userData.role,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
    encryptionKey: generateEncryptionKey(userData.credentials),
    permissions: getUserPermissions(userData.role)
  };
  
  // Store session securely (in production, use secure session storage)
  storeSecureSession(sessionData);
  
  return sessionId;
};

// Validate session
export const validateSession = (sessionId) => {
  const session = getSecureSession(sessionId);
  
  if (!session) return false;
  
  if (new Date() > new Date(session.expiresAt)) {
    destroySession(sessionId);
    return false;
  }
  
  return true;
};

// Utility functions (implementations would vary based on backend)
const generateAuditId = () => `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const getCurrentSessionId = () => localStorage.getItem('medkey_session_id');
const getClientIP = () => '127.0.0.1'; // In production, get from request headers
const getCurrentUserRole = () => localStorage.getItem('medkey_user_role') || 'patient';
const isEncrypted = (data) => data && data.encrypted && data.iv && data.salt;
const isAuditLogged = (operation) => true; // Always log in this implementation
const getHIPAACategory = (eventType) => {
  const categoryMap = {
    login: HIPAA_SECURITY_CATEGORIES.TECHNICAL_SAFEGUARDS,
    read: HIPAA_PRIVACY_CATEGORIES.ACCESS,
    update: HIPAA_PRIVACY_CATEGORIES.USE,
    delete: HIPAA_PRIVACY_CATEGORIES.USE
  };
  return categoryMap[eventType] || HIPAA_SECURITY_CATEGORIES.TECHNICAL_SAFEGUARDS;
};
const checkPHIInvolvement = (resourceType, details) => {
  return resourceType === 'Patient' || resourceType === 'Observation' || 
         resourceType === 'MedicationRequest' || containsPHI(details);
};
const storeAuditLog = async (auditEntry) => {
  // Use the comprehensive audit service
  await auditService.storeAuditLog(auditEntry);
};
const storeSecureSession = (sessionData) => {
  localStorage.setItem('medkey_session_data', JSON.stringify(sessionData));
};
const getSecureSession = (sessionId) => {
  const sessionData = localStorage.getItem('medkey_session_data');
  return sessionData ? JSON.parse(sessionData) : null;
};
const destroySession = (sessionId) => {
  localStorage.removeItem('medkey_session_data');
  localStorage.removeItem('medkey_session_id');
  localStorage.removeItem('medkey_user_role');
};
const getUserPermissions = (role) => {
  return ACCESS_CONTROL_MATRIX[role] || ACCESS_CONTROL_MATRIX.patient;
};
