// FHIR (Fast Healthcare Interoperability Resources) Utilities
// Compliant with FHIR R4 specification

export const FHIR_RESOURCE_TYPES = {
  PATIENT: 'Patient',
  PRACTITIONER: 'Practitioner',
  ORGANIZATION: 'Organization',
  ENCOUNTER: 'Encounter',
  OBSERVATION: 'Observation',
  MEDICATION: 'Medication',
  MEDICATION_REQUEST: 'MedicationRequest',
  CONDITION: 'Condition',
  PROCEDURE: 'Procedure',
  ALLERGY_INTOLERANCE: 'AllergyIntolerance',
  IMMUNIZATION: 'Immunization',
  DOCUMENT_REFERENCE: 'DocumentReference',
  CARE_PLAN: 'CarePlan',
  GOAL: 'Goal',
  APPOINTMENT: 'Appointment',
  SCHEDULE: 'Schedule',
  LOCATION: 'Location'
};

export const FHIR_STATUS_CODES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  ENTERED_IN_ERROR: 'entered-in-error'
};

export const FHIR_GENDER_CODES = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
  UNKNOWN: 'unknown'
};

// Create FHIR-compliant Patient resource
export const createFHIRPatient = (patientData) => {
  return {
    resourceType: FHIR_RESOURCE_TYPES.PATIENT,
    id: patientData.id || generateFHIRId(),
    meta: {
      versionId: '1',
      lastUpdated: new Date().toISOString(),
      profile: ['http://hl7.org/fhir/StructureDefinition/Patient']
    },
    identifier: [
      {
        use: 'official',
        type: {
          coding: [{
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'MR',
            display: 'Medical Record Number'
          }]
        },
        value: patientData.medicalRecordNumber
      }
    ],
    active: true,
    name: [{
      use: 'official',
      family: patientData.lastName,
      given: [patientData.firstName, patientData.middleName].filter(Boolean)
    }],
    telecom: [
      {
        system: 'phone',
        value: patientData.phone,
        use: 'home'
      },
      {
        system: 'email',
        value: patientData.email,
        use: 'home'
      }
    ],
    gender: patientData.gender,
    birthDate: patientData.birthDate,
    address: [{
      use: 'home',
      type: 'physical',
      line: [patientData.address.street],
      city: patientData.address.city,
      state: patientData.address.state,
      postalCode: patientData.address.postalCode,
      country: patientData.address.country || 'US'
    }],
    contact: patientData.emergencyContact ? [{
      relationship: [{
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
          code: 'C',
          display: 'Emergency Contact'
        }]
      }],
      name: {
        family: patientData.emergencyContact.lastName,
        given: [patientData.emergencyContact.firstName]
      },
      telecom: [{
        system: 'phone',
        value: patientData.emergencyContact.phone
      }]
    }] : [],
    managingOrganization: {
      reference: `Organization/${patientData.managingOrganizationId}`
    }
  };
};

// Create FHIR-compliant Practitioner resource
export const createFHIRPractitioner = (practitionerData) => {
  return {
    resourceType: FHIR_RESOURCE_TYPES.PRACTITIONER,
    id: practitionerData.id || generateFHIRId(),
    meta: {
      versionId: '1',
      lastUpdated: new Date().toISOString(),
      profile: ['http://hl7.org/fhir/StructureDefinition/Practitioner']
    },
    identifier: [
      {
        use: 'official',
        type: {
          coding: [{
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: 'NPI',
            display: 'National Provider Identifier'
          }]
        },
        value: practitionerData.npi
      }
    ],
    active: practitionerData.status === 'A',
    name: [{
      use: 'official',
      family: practitionerData.lastName,
      given: [practitionerData.firstName, practitionerData.middleName].filter(Boolean),
      suffix: practitionerData.credentials ? [practitionerData.credentials] : []
    }],
    telecom: practitionerData.phone ? [{
      system: 'phone',
      value: practitionerData.phone,
      use: 'work'
    }] : [],
    address: practitionerData.address ? [{
      use: 'work',
      type: 'physical',
      line: [practitionerData.address.street],
      city: practitionerData.address.city,
      state: practitionerData.address.state,
      postalCode: practitionerData.address.postalCode,
      country: 'US'
    }] : [],
    qualification: practitionerData.specialties ? practitionerData.specialties.map(specialty => ({
      code: {
        coding: [{
          system: 'http://nucc.org/provider-taxonomy',
          code: specialty.code,
          display: specialty.name
        }]
      },
      period: {
        start: specialty.startDate
      }
    })) : []
  };
};

// Create FHIR-compliant Observation resource
export const createFHIRObservation = (observationData) => {
  return {
    resourceType: FHIR_RESOURCE_TYPES.OBSERVATION,
    id: observationData.id || generateFHIRId(),
    meta: {
      versionId: '1',
      lastUpdated: new Date().toISOString(),
      profile: ['http://hl7.org/fhir/StructureDefinition/Observation']
    },
    status: 'final',
    category: [{
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
        code: observationData.category,
        display: observationData.categoryDisplay
      }]
    }],
    code: {
      coding: [{
        system: observationData.codeSystem,
        code: observationData.code,
        display: observationData.display
      }]
    },
    subject: {
      reference: `Patient/${observationData.patientId}`
    },
    encounter: observationData.encounterId ? {
      reference: `Encounter/${observationData.encounterId}`
    } : undefined,
    effectiveDateTime: observationData.effectiveDate,
    issued: new Date().toISOString(),
    performer: observationData.performerId ? [{
      reference: `Practitioner/${observationData.performerId}`
    }] : [],
    valueQuantity: observationData.value ? {
      value: observationData.value,
      unit: observationData.unit,
      system: 'http://unitsofmeasure.org',
      code: observationData.unitCode
    } : undefined,
    valueString: observationData.valueString,
    valueCodeableConcept: observationData.valueCode ? {
      coding: [{
        system: observationData.valueCodeSystem,
        code: observationData.valueCode,
        display: observationData.valueDisplay
      }]
    } : undefined,
    interpretation: observationData.interpretation ? [{
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
        code: observationData.interpretation,
        display: observationData.interpretationDisplay
      }]
    }] : [],
    referenceRange: observationData.referenceRange ? [{
      low: observationData.referenceRange.low ? {
        value: observationData.referenceRange.low,
        unit: observationData.unit,
        system: 'http://unitsofmeasure.org',
        code: observationData.unitCode
      } : undefined,
      high: observationData.referenceRange.high ? {
        value: observationData.referenceRange.high,
        unit: observationData.unit,
        system: 'http://unitsofmeasure.org',
        code: observationData.unitCode
      } : undefined
    }] : []
  };
};

// Create FHIR-compliant MedicationRequest resource
export const createFHIRMedicationRequest = (medicationData) => {
  return {
    resourceType: FHIR_RESOURCE_TYPES.MEDICATION_REQUEST,
    id: medicationData.id || generateFHIRId(),
    meta: {
      versionId: '1',
      lastUpdated: new Date().toISOString(),
      profile: ['http://hl7.org/fhir/StructureDefinition/MedicationRequest']
    },
    status: medicationData.status || 'active',
    intent: 'order',
    category: [{
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/medicationrequest-category',
        code: 'outpatient',
        display: 'Outpatient'
      }]
    }],
    priority: medicationData.priority || 'routine',
    medicationCodeableConcept: {
      coding: [{
        system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
        code: medicationData.rxnormCode,
        display: medicationData.medicationName
      }]
    },
    subject: {
      reference: `Patient/${medicationData.patientId}`
    },
    encounter: medicationData.encounterId ? {
      reference: `Encounter/${medicationData.encounterId}`
    } : undefined,
    authoredOn: medicationData.prescribedDate,
    requester: {
      reference: `Practitioner/${medicationData.prescriberId}`
    },
    dosageInstruction: [{
      text: medicationData.dosageInstructions,
      timing: {
        repeat: {
          frequency: medicationData.frequency,
          period: medicationData.period,
          periodUnit: medicationData.periodUnit
        }
      },
      route: {
        coding: [{
          system: 'http://snomed.info/sct',
          code: medicationData.routeCode,
          display: medicationData.routeDisplay
        }]
      },
      doseAndRate: [{
        type: {
          coding: [{
            system: 'http://terminology.hl7.org/CodeSystem/dose-rate-type',
            code: 'ordered',
            display: 'Ordered'
          }]
        },
        doseQuantity: {
          value: medicationData.dose,
          unit: medicationData.doseUnit,
          system: 'http://unitsofmeasure.org',
          code: medicationData.doseUnitCode
        }
      }]
    }],
    dispenseRequest: {
      validityPeriod: {
        start: medicationData.startDate,
        end: medicationData.endDate
      },
      numberOfRepeatsAllowed: medicationData.refillsAllowed || 0,
      quantity: {
        value: medicationData.quantity,
        unit: medicationData.quantityUnit,
        system: 'http://unitsofmeasure.org',
        code: medicationData.quantityUnitCode
      }
    }
  };
};

// Generate FHIR-compliant ID
export const generateFHIRId = () => {
  return 'medkey-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Validate FHIR resource
export const validateFHIRResource = (resource) => {
  const errors = [];
  
  if (!resource.resourceType) {
    errors.push('Resource type is required');
  }
  
  if (!resource.id) {
    errors.push('Resource ID is required');
  }
  
  if (!resource.meta || !resource.meta.lastUpdated) {
    errors.push('Meta information with lastUpdated is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Convert FHIR resource to display format
export const convertFHIRToDisplay = (resource) => {
  switch (resource.resourceType) {
    case FHIR_RESOURCE_TYPES.PATIENT:
      return {
        id: resource.id,
        name: `${resource.name[0]?.given?.join(' ')} ${resource.name[0]?.family}`,
        gender: resource.gender,
        birthDate: resource.birthDate,
        phone: resource.telecom?.find(t => t.system === 'phone')?.value,
        email: resource.telecom?.find(t => t.system === 'email')?.value,
        address: resource.address?.[0] ? {
          street: resource.address[0].line?.[0],
          city: resource.address[0].city,
          state: resource.address[0].state,
          postalCode: resource.address[0].postalCode
        } : null
      };
      
    case FHIR_RESOURCE_TYPES.PRACTITIONER:
      return {
        id: resource.id,
        name: `${resource.name[0]?.given?.join(' ')} ${resource.name[0]?.family}`,
        npi: resource.identifier?.find(i => i.type?.coding?.[0]?.code === 'NPI')?.value,
        phone: resource.telecom?.find(t => t.system === 'phone')?.value,
        address: resource.address?.[0] ? {
          street: resource.address[0].line?.[0],
          city: resource.address[0].city,
          state: resource.address[0].state,
          postalCode: resource.address[0].postalCode
        } : null,
        specialties: resource.qualification?.map(q => ({
          name: q.code?.coding?.[0]?.display,
          code: q.code?.coding?.[0]?.code
        })) || []
      };
      
    default:
      return resource;
  }
};
