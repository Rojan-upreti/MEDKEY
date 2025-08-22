// HL7 (Health Level 7) Message Utilities
// Compliant with HL7 v2.x and FHIR messaging standards

// HL7 Message Types
export const HL7_MESSAGE_TYPES = {
  ADT: 'ADT', // Admission, Discharge, Transfer
  ORM: 'ORM', // Order Message
  ORU: 'ORU', // Observation Result
  SIU: 'SIU', // Scheduling Information
  MDM: 'MDM', // Medical Document Management
  QRY: 'QRY', // Query
  ACK: 'ACK'  // Acknowledgment
};

// HL7 Event Types
export const HL7_EVENT_TYPES = {
  A01: 'A01', // Admit patient
  A02: 'A02', // Transfer patient
  A03: 'A03', // Discharge patient
  A04: 'A04', // Register patient
  A05: 'A05', // Pre-admit patient
  A08: 'A08', // Update patient information
  A12: 'A12', // Cancel patient visit
  O01: 'O01', // Order message
  R01: 'R01', // Query response
  R02: 'R02', // Query response
  R03: 'R03'  // Display response
};

// Create HL7 ADT message
export const createHL7ADTMessage = (patientData, eventType = 'A04') => {
  const messageId = generateHL7MessageId();
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  
  return [
    `MSH|^~\\&|MEDKEY|HOSPITAL|EHR|HOSPITAL|${timestamp}||${HL7_MESSAGE_TYPES.ADT}^${eventType}|${messageId}|P|2.5`,
    `EVN|${eventType}|${timestamp}|||ADMIN`,
    `PID|||${patientData.medicalRecordNumber}||${patientData.lastName}^${patientData.firstName}||${patientData.birthDate}|${patientData.gender}|||${patientData.address.street}^${patientData.address.city}^${patientData.address.state}^${patientData.address.postalCode}||${patientData.phone}|||${patientData.ssn}`,
    `PV1||I|${patientData.unit}||||${patientData.attendingPhysician}||||||||${patientData.admissionType}||${patientData.admissionSource}`
  ].join('\r');
};

// Create HL7 ORU message for lab results
export const createHL7ORUMessage = (observationData) => {
  const messageId = generateHL7MessageId();
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
  
  return [
    `MSH|^~\\&|LAB|HOSPITAL|MEDKEY|HOSPITAL|${timestamp}||${HL7_MESSAGE_TYPES.ORU}^R01|${messageId}|P|2.5`,
    `PID|||${observationData.patientId}||${observationData.patientName}`,
    `OBR|1|${observationData.orderId}||${observationData.testCode}||${timestamp}|${timestamp}|||||||||||||||||||F`,
    `OBX|1|NM|${observationData.testCode}|${observationData.testName}|${observationData.value}|${observationData.unit}|${observationData.referenceRange}|||F|||${timestamp}`
  ].join('\r');
};

// Parse HL7 message
export const parseHL7Message = (message) => {
  const segments = message.split('\r').filter(segment => segment.trim());
  const parsed = {};
  
  segments.forEach(segment => {
    const fields = segment.split('|');
    const segmentType = fields[0];
    
    switch (segmentType) {
      case 'MSH':
        parsed.messageHeader = {
          sendingApplication: fields[3],
          sendingFacility: fields[4],
          receivingApplication: fields[5],
          receivingFacility: fields[6],
          messageDateTime: fields[7],
          messageType: fields[9],
          messageId: fields[10],
          processingId: fields[11],
          versionId: fields[12]
        };
        break;
        
      case 'PID':
        parsed.patient = {
          setId: fields[1],
          patientId: fields[3],
          name: fields[5],
          birthDate: fields[7],
          gender: fields[8],
          address: fields[11],
          phone: fields[13],
          ssn: fields[19]
        };
        break;
        
      case 'OBX':
        parsed.observation = {
          setId: fields[1],
          valueType: fields[2],
          observationId: fields[3],
          observationName: fields[4],
          observationValue: fields[5],
          units: fields[6],
          referenceRange: fields[7],
          abnormalFlags: fields[8],
          observationDateTime: fields[14]
        };
        break;
    }
  });
  
  return parsed;
};

// Generate HL7 message ID
export const generateHL7MessageId = () => {
  return `MSG${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

// Validate HL7 message
export const validateHL7Message = (message) => {
  const errors = [];
  
  if (!message || typeof message !== 'string') {
    errors.push('Message must be a string');
    return { isValid: false, errors };
  }
  
  const segments = message.split('\r');
  
  if (segments.length < 2) {
    errors.push('Message must contain at least MSH and one other segment');
  }
  
  const mshSegment = segments.find(segment => segment.startsWith('MSH'));
  if (!mshSegment) {
    errors.push('Message must contain MSH segment');
  } else {
    const mshFields = mshSegment.split('|');
    if (mshFields.length < 12) {
      errors.push('MSH segment must contain required fields');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
