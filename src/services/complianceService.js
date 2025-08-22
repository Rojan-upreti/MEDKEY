// Comprehensive Healthcare Compliance Service
// Integrates FHIR, HL7, and HIPAA standards

import { 
  createFHIRPatient, 
  createFHIRPractitioner, 
  createFHIRObservation,
  createFHIRMedicationRequest,
  validateFHIRResource,
  convertFHIRToDisplay,
  FHIR_RESOURCE_TYPES
} from '../utils/fhir';

import {
  encryptPHI,
  decryptPHI,
  createAuditLog,
  validateHIPAACompliance,
  createSecureSession,
  validateSession,
  AUDIT_EVENT_TYPES,
  HIPAA_SECURITY_CATEGORIES
} from '../utils/hipaa';

import {
  createHL7ADTMessage,
  createHL7ORUMessage,
  parseHL7Message,
  validateHL7Message,
  HL7_MESSAGE_TYPES
} from '../utils/hl7';

class ComplianceService {
  constructor() {
    this.session = null;
    this.encryptionKey = null;
  }

  // Initialize secure session
  async initializeSession(userData) {
    try {
      const sessionId = createSecureSession(userData);
      this.session = { id: sessionId, userData };
      this.encryptionKey = userData.encryptionKey;
      
      // Audit login
      createAuditLog(AUDIT_EVENT_TYPES.LOGIN, userData.id, 'Session', sessionId);
      
      return { success: true, sessionId };
    } catch (error) {
      console.error('Session initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Create FHIR-compliant patient record with HIPAA encryption
  async createPatientRecord(patientData) {
    try {
      // Validate session
      if (!this.session || !validateSession(this.session.id)) {
        throw new Error('Invalid session');
      }

      // Create FHIR patient resource
      const fhirPatient = createFHIRPatient(patientData);
      
      // Validate FHIR resource
      const fhirValidation = validateFHIRResource(fhirPatient);
      if (!fhirValidation.isValid) {
        throw new Error(`FHIR validation failed: ${fhirValidation.errors.join(', ')}`);
      }

      // Encrypt PHI data
      const encryptedPatient = encryptPHI(fhirPatient, this.encryptionKey);
      
      // Validate HIPAA compliance
      const hipaaValidation = validateHIPAACompliance(encryptedPatient, {
        type: 'create',
        scope: 'own_data'
      });
      
      if (!hipaaValidation.isCompliant) {
        throw new Error(`HIPAA compliance violation: ${hipaaValidation.violations.join(', ')}`);
      }

      // Create audit log
      createAuditLog(
        AUDIT_EVENT_TYPES.CREATE,
        this.session.userData.id,
        FHIR_RESOURCE_TYPES.PATIENT,
        fhirPatient.id,
        { patientName: patientData.firstName + ' ' + patientData.lastName }
      );

      return {
        success: true,
        patientId: fhirPatient.id,
        fhirResource: fhirPatient,
        encryptedData: encryptedPatient
      };
    } catch (error) {
      console.error('Patient record creation failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Create FHIR-compliant practitioner record
  async createPractitionerRecord(practitionerData) {
    try {
      if (!this.session || !validateSession(this.session.id)) {
        throw new Error('Invalid session');
      }

      const fhirPractitioner = createFHIRPractitioner(practitionerData);
      const fhirValidation = validateFHIRResource(fhirPractitioner);
      
      if (!fhirValidation.isValid) {
        throw new Error(`FHIR validation failed: ${fhirValidation.errors.join(', ')}`);
      }

      // Encrypt sensitive data
      const encryptedPractitioner = encryptPHI(fhirPractitioner, this.encryptionKey);
      
      // Audit log
      createAuditLog(
        AUDIT_EVENT_TYPES.CREATE,
        this.session.userData.id,
        FHIR_RESOURCE_TYPES.PRACTITIONER,
        fhirPractitioner.id,
        { practitionerName: practitionerData.firstName + ' ' + practitionerData.lastName }
      );

      return {
        success: true,
        practitionerId: fhirPractitioner.id,
        fhirResource: fhirPractitioner,
        encryptedData: encryptedPractitioner
      };
    } catch (error) {
      console.error('Practitioner record creation failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Create FHIR-compliant observation with HL7 message
  async createObservationRecord(observationData) {
    try {
      if (!this.session || !validateSession(this.session.id)) {
        throw new Error('Invalid session');
      }

      // Create FHIR observation
      const fhirObservation = createFHIRObservation(observationData);
      const fhirValidation = validateFHIRResource(fhirObservation);
      
      if (!fhirValidation.isValid) {
        throw new Error(`FHIR validation failed: ${fhirValidation.errors.join(', ')}`);
      }

      // Create HL7 ORU message
      const hl7Message = createHL7ORUMessage(observationData);
      const hl7Validation = validateHL7Message(hl7Message);
      
      if (!hl7Validation.isValid) {
        throw new Error(`HL7 validation failed: ${hl7Validation.errors.join(', ')}`);
      }

      // Encrypt PHI data
      const encryptedObservation = encryptPHI(fhirObservation, this.encryptionKey);
      
      // Audit log
      createAuditLog(
        AUDIT_EVENT_TYPES.CREATE,
        this.session.userData.id,
        FHIR_RESOURCE_TYPES.OBSERVATION,
        fhirObservation.id,
        { observationType: observationData.display }
      );

      return {
        success: true,
        observationId: fhirObservation.id,
        fhirResource: fhirObservation,
        hl7Message: hl7Message,
        encryptedData: encryptedObservation
      };
    } catch (error) {
      console.error('Observation record creation failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Create medication request with FHIR and HL7 compliance
  async createMedicationRequest(medicationData) {
    try {
      if (!this.session || !validateSession(this.session.id)) {
        throw new Error('Invalid session');
      }

      // Create FHIR medication request
      const fhirMedication = createFHIRMedicationRequest(medicationData);
      const fhirValidation = validateFHIRResource(fhirMedication);
      
      if (!fhirValidation.isValid) {
        throw new Error(`FHIR validation failed: ${fhirValidation.errors.join(', ')}`);
      }

      // Encrypt PHI data
      const encryptedMedication = encryptPHI(fhirMedication, this.encryptionKey);
      
      // Audit log
      createAuditLog(
        AUDIT_EVENT_TYPES.CREATE,
        this.session.userData.id,
        FHIR_RESOURCE_TYPES.MEDICATION_REQUEST,
        fhirMedication.id,
        { medicationName: medicationData.medicationName }
      );

      return {
        success: true,
        medicationId: fhirMedication.id,
        fhirResource: fhirMedication,
        encryptedData: encryptedMedication
      };
    } catch (error) {
      console.error('Medication request creation failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Retrieve and decrypt patient data
  async getPatientData(patientId) {
    try {
      if (!this.session || !validateSession(this.session.id)) {
        throw new Error('Invalid session');
      }

      // Validate access permissions
      const accessValidation = validateHIPAACompliance(null, {
        type: 'read',
        scope: 'own_data'
      });

      if (!accessValidation.isCompliant) {
        throw new Error(`Access denied: ${accessValidation.violations.join(', ')}`);
      }

      // In a real implementation, this would fetch from secure database
      // For demo purposes, we'll simulate encrypted data retrieval
      const encryptedData = this.getEncryptedPatientData(patientId);
      
      if (!encryptedData) {
        throw new Error('Patient data not found');
      }

      // Decrypt data
      const decryptedData = decryptPHI(encryptedData, this.encryptionKey);
      
      // Convert to display format
      const displayData = convertFHIRToDisplay(decryptedData);
      
      // Audit log
      createAuditLog(
        AUDIT_EVENT_TYPES.READ,
        this.session.userData.id,
        FHIR_RESOURCE_TYPES.PATIENT,
        patientId
      );

      return {
        success: true,
        patientData: displayData,
        fhirResource: decryptedData
      };
    } catch (error) {
      console.error('Patient data retrieval failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Process HL7 message
  async processHL7Message(hl7Message) {
    try {
      if (!this.session || !validateSession(this.session.id)) {
        throw new Error('Invalid session');
      }

      // Parse HL7 message
      const parsedMessage = parseHL7Message(hl7Message);
      
      // Validate HL7 message
      const hl7Validation = validateHL7Message(hl7Message);
      if (!hl7Validation.isValid) {
        throw new Error(`HL7 validation failed: ${hl7Validation.errors.join(', ')}`);
      }

      // Convert to FHIR resource based on message type
      let fhirResource = null;
      
      if (parsedMessage.messageHeader?.messageType?.includes('ADT')) {
        // Convert ADT message to FHIR Patient
        fhirResource = this.convertADTToFHIR(parsedMessage);
      } else if (parsedMessage.messageHeader?.messageType?.includes('ORU')) {
        // Convert ORU message to FHIR Observation
        fhirResource = this.convertORUToFHIR(parsedMessage);
      }

      // Encrypt if contains PHI
      let encryptedResource = null;
      if (fhirResource) {
        encryptedResource = encryptPHI(fhirResource, this.encryptionKey);
      }

      // Audit log
      createAuditLog(
        AUDIT_EVENT_TYPES.CREATE,
        this.session.userData.id,
        'HL7Message',
        parsedMessage.messageHeader?.messageId,
        { messageType: parsedMessage.messageHeader?.messageType }
      );

      return {
        success: true,
        parsedMessage,
        fhirResource,
        encryptedResource
      };
    } catch (error) {
      console.error('HL7 message processing failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Convert ADT message to FHIR Patient
  convertADTToFHIR(parsedMessage) {
    if (!parsedMessage.patient) return null;

    const patientData = {
      id: parsedMessage.patient.patientId,
      firstName: parsedMessage.patient.name?.split('^')[1] || '',
      lastName: parsedMessage.patient.name?.split('^')[0] || '',
      birthDate: parsedMessage.patient.birthDate,
      gender: parsedMessage.patient.gender,
      phone: parsedMessage.patient.phone,
      ssn: parsedMessage.patient.ssn,
      address: {
        street: parsedMessage.patient.address?.split('^')[0] || '',
        city: parsedMessage.patient.address?.split('^')[1] || '',
        state: parsedMessage.patient.address?.split('^')[2] || '',
        postalCode: parsedMessage.patient.address?.split('^')[3] || ''
      }
    };

    return createFHIRPatient(patientData);
  }

  // Convert ORU message to FHIR Observation
  convertORUToFHIR(parsedMessage) {
    if (!parsedMessage.observation) return null;

    const observationData = {
      id: parsedMessage.observation.observationId,
      patientId: parsedMessage.patient?.patientId,
      code: parsedMessage.observation.observationId,
      display: parsedMessage.observation.observationName,
      value: parsedMessage.observation.observationValue,
      unit: parsedMessage.observation.units,
      effectiveDate: parsedMessage.observation.observationDateTime
    };

    return createFHIRObservation(observationData);
  }

  // Mock function to get encrypted patient data
  getEncryptedPatientData(patientId) {
    // In real implementation, this would query a secure database
    return null;
  }

  // Logout and cleanup
  logout() {
    if (this.session) {
      createAuditLog(
        AUDIT_EVENT_TYPES.LOGOUT,
        this.session.userData.id,
        'Session',
        this.session.id
      );
    }
    
    this.session = null;
    this.encryptionKey = null;
  }
}

// Export singleton instance
export const complianceService = new ComplianceService();
