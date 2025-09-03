# MedKey Dashboard Structure

## Overview
The MedKey dashboard has been restructured to provide a modular, maintainable architecture with proper routing for each section.

## Dashboard Sections

### Main Navigation
- **Dashboard** (`/dashboard/overview`) - Overview of health information
- **Appointments** (`/dashboard/appointments`) - Manage healthcare appointments
- **Past Records** (`/dashboard/past-records`) - Historical medical records
- **Find Doctor** (`/dashboard/find-doctor`) - Search for healthcare providers

### Health Data
- **Lab Results** (`/dashboard/labs`) - Laboratory test results and orders
- **Medications** (`/dashboard/medications`) - Current prescriptions and adherence
- **Conditions** (`/dashboard/conditions`) - Health conditions and management

### Providers & Security
- **Healthcare Team** (`/dashboard/providers`) - Your healthcare team and facilities
- **Audit Logs** (`/dashboard/audit-logs`) - Monitor system activities for HIPAA compliance

## Component Structure

```
src/
├── components/
│   ├── PHRDashboard.jsx          # Main dashboard container
│   ├── Overview.jsx              # Dashboard overview section
│   ├── Appointments.jsx          # Appointments management
│   ├── PastRecords.jsx           # Historical records
│   ├── FindDoctor.jsx            # Provider search
│   ├── Labs.jsx                  # Lab results
│   ├── Medications.jsx           # Medication management
│   ├── Conditions.jsx            # Health conditions
│   ├── Providers.jsx             # Healthcare team
│   └── AuditLogViewer.jsx        # Audit logging
├── pages/
│   └── Dashboard.jsx             # Dashboard page wrapper
└── App.js                        # Main routing configuration
```

## Routing

The dashboard uses React Router with the following URL structure:
- `/dashboard` - Redirects to overview
- `/dashboard/overview` - Dashboard overview
- `/dashboard/appointments` - Appointments section
- `/dashboard/past-records` - Past records section
- `/dashboard/find-doctor` - Find doctor section
- `/dashboard/labs` - Lab results section
- `/dashboard/medications` - Medications section
- `/dashboard/conditions` - Health conditions section
- `/dashboard/providers` - Healthcare team section
- `/dashboard/audit-logs` - Audit logs section

## Features

### Overview Section
- Welcome message with patient information
- Quick action buttons
- Health metrics dashboard
- Recent activity feed
- Current vital signs
- Health alerts

### Appointments Section
- Book new appointments
- View upcoming appointments
- Track recent appointments

### Past Records Section
- Healthcare provider visits
- Medical reports and lab results
- Imaging and test results

### Find Doctor Section
- Search by name, organization, location
- Geolocation support
- Provider filtering and sorting
- Contact information and directions

### Lab Results Section
- Recent lab results
- Pending lab orders
- Result status indicators

### Medications Section
- Current medication list
- Dosage information
- Medication adherence tracking

### Conditions Section
- Active health conditions
- Condition management goals
- Progress tracking

### Providers Section
- Healthcare team members
- Facility information
- Contact details

### Audit Logs Section
- HIPAA compliance monitoring
- System activity tracking
- Security audit trails

## Navigation

The dashboard includes:
- Responsive sidebar navigation
- Mobile-friendly design
- Breadcrumb navigation
- Quick action buttons
- Profile dropdown menu

## Responsive Design

- Mobile-first approach
- Collapsible sidebar for mobile
- Touch-friendly interface
- Adaptive grid layouts
- Responsive typography

## State Management

Each component manages its own local state while sharing common patient information through props. The main dashboard component handles:
- Active tab selection
- Sidebar state
- Profile dropdown state
- Navigation between sections

## Future Enhancements

- Real-time data updates
- Push notifications
- Offline support
- Advanced filtering
- Data export functionality
- Integration with external health systems
