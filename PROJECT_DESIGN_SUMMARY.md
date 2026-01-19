# ITranscript360 - Project Design Summary

## Overview
**ITranscript360** is a comprehensive clinical transcription and documentation management system designed for healthcare professionals. It streamlines the workflow from audio capture to clinical documentation, patient record management, and AI-powered medical insights. The application leverages modern React with TypeScript and Tailwind CSS to provide an intuitive, accessible interface for clinical workflows.

---

## Architecture & Tech Stack

### Frontend Framework
- **React 18.3** - UI component library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router 6** - Client-side navigation
- **TanStack React Query** - Server state management and caching

### UI Components & Styling
- **Shadcn/ui** - Pre-built accessible components (based on Radix UI)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization and charts
- **Sonner** - Toast notifications
- **React Hook Form** - Form state management

### State Management
- **React Context API** - Global workflow state management
- **Zustand** (optional) - Local state management
- **React Query** - Server state synchronization

---

## Core Functionality & Features

### 1. **Workflow Context (State Management)**
**Location:** [src/context/WorkflowContext.tsx](src/context/WorkflowContext.tsx)

The WorkflowContext manages the entire application state and workflow progression:

**State Properties:**
- `currentStep` - Tracks which workflow step user is on
- `documentStatus` - Document status (draft → reviewed → final)
- `selectedPatient` - Currently selected patient record
- `currentTranscript` - Active transcript data
- `isRecording` - Audio recording state
- `audioFile` - Uploaded/captured audio file
- `completedSteps` - Array of completed workflow steps
- `markStepComplete()` - Function to mark steps as complete

**Provides:** Global access via `useWorkflow()` hook to all components

---

### 2. **Workflow Steps (6-Step Process)**

#### Step 1: **Capture** 
**Pages:** [CapturePage.tsx](src/pages/CapturePage.tsx)
**Components:** [UploadCard.tsx](src/components/capture/UploadCard.tsx), [LiveTranscriptionCard.tsx](src/components/capture/LiveTranscriptionCard.tsx)

**Functionality:**
- **Audio Upload**: Drag-and-drop interface for audio file upload
  - Supported formats: MP3, WAV, M4A, OGG
  - File validation and preview
  - Progress tracking during upload
  
- **Live Transcription**: Real-time recording capability
  - Start/stop recording controls
  - Audio level visualization
  - Direct transcription processing

- **Dashboard Elements:**
  - Quick Stats: Show transcription metrics and statistics
  - Quick Actions: One-click access to common tasks
  - Recent Transcriptions: History of recent sessions

**Output:** Audio file and initial transcript data stored in workflow context

---

#### Step 2: **Review**
**Pages:** [ReviewPage.tsx](src/pages/ReviewPage.tsx)
**Components:** [TranscriptPanel.tsx](src/components/review/TranscriptPanel.tsx), [ClinicalInsightsPanel.tsx](src/components/review/ClinicalInsightsPanel.tsx)

**Functionality:**
- **Transcript Review:**
  - Display raw vs. AI-improved transcript
  - Side-by-side comparison view
  - Toggle to highlight AI changes
  - Interactive audio playback with timeline scrubbing
  - Time-synchronized segment highlighting

- **Clinical Insights Panel:**
  - **Key Clinical Findings**: AI-extracted medical findings with confidence levels
  - **Differential Diagnosis**: List of possible diagnoses with likelihood scores (possible/probable/likely)
  - **Safety Alerts**: Drug interactions, allergies, contraindications
  - **Clinical Tasks**: Action items extracted from transcript

- **Review Checkpoints:**
  - Checkbox confirmation for transcript review
  - Checkbox confirmation for insights review
  - Prevents progression without full review

**Validation:** User must confirm review before proceeding to next step

---

#### Step 3: **Summarize**
**Pages:** [SummarizePage.tsx](src/pages/SummarizePage.tsx)

**Functionality:**
- **Summary Generation:**
  - Multiple template types:
    - SOAP Note (Subjective, Objective, Assessment, Plan)
    - Discharge Summary
    - Referral Letter
    - Progress Note
    - Custom format

- **Configuration Options:**
  - Language selection (English, Spanish, French, German, Chinese)
  - Custom prompt/instructions
  - Template customization

- **Generated Summary Display:**
  - Formatted clinical documentation
  - Copy to clipboard functionality
  - Download as document
  - Regenerate with different parameters

- **Previous Summaries:**
  - Access to historical summaries for patient
  - Quick recall and reuse
  - Sort and filter options

**AI Integration:** Simulated (mock data provided; ready for real AI backend)

---

#### Step 4: **Patient Hub**
**Pages:** [PatientHubPage.tsx](src/pages/PatientHubPage.tsx)

**Functionality:**
- **Patient Management:**
  - View list of all patients
  - Switch between grid/list view
  - Search by name or medical ID
  - Filter by primary condition

- **Patient Information Display:**
  - Patient demographics
  - Medical record number (MRN)
  - Age and gender
  - Primary condition
  - Last visit date
  - Alert badges (allergies, medication concerns)

- **Patient Selection:**
  - Click to select patient
  - Navigate to demographics/records
  - Attach current transcript to patient

- **Transcription History:**
  - View previous summaries for each patient
  - Access historical notes
  - Compare across visits

---

#### Step 5: **Patient Demographics**
**Pages:** [PatientDemographicsPage.tsx](src/pages/PatientDemographicsPage.tsx)
**Components:** [VitalsChart.tsx](src/components/demographics/VitalsChart.tsx), [MedicationsTab.tsx](src/components/demographics/MedicationsTab.tsx)

**Functionality:**
- **Patient Overview:**
  - Full patient profile display
  - AI-generated patient summary
  - Alert badges (allergies, risk factors, medication interactions)
  - Demographics: age, gender, MRN, contact

- **Multi-Tab Interface:**
  - **Overview Tab**: General information and alerts
  - **Vitals Tab**: 
    - Historical vital signs (BP, heart rate, temperature, O2 saturation, weight)
    - Line charts showing trends over time
    - Recharts visualization
  - **Medications Tab**:
    - Active medications list
    - Dosage and frequency
    - Indication/reason
    - Start date

- **Visit History:**
  - Chronological list of previous visits
  - Visit type (consultation, follow-up, emergency, routine)
  - Associated diagnoses and notes
  - Linked transcripts

---

#### Step 6: **Corrections Dictionary**
**Pages:** [CorrectionsPage.tsx](src/pages/CorrectionsPage.tsx)

**Functionality:**
- **Terminology Dictionary Management:**
  - Add new medical term corrections
  - Original term → Corrected term mapping
  - Example: "metforman" → "Metformin"

- **Dictionary Operations:**
  - Create new correction entry
  - Search existing corrections
  - Delete outdated entries
  - Export/import dictionary
  - Track creation date

- **Quality Improvement:**
  - Improve AI transcription accuracy
  - Build medical terminology database
  - Customize for specialty-specific terms
  - Persistent storage of corrections

---

### 3. **UI Component Library**
**Location:** [src/components/ui/](src/components/ui/)

Pre-built accessible components from Shadcn/ui:
- **Form Components**: Input, Textarea, Select, Checkbox, Radio, Toggle, Switch
- **Display**: Card, Badge, Avatar, Alert, Accordion, Tabs
- **Navigation**: Breadcrumb, Navigation Menu, Sidebar
- **Dialogs**: Dialog, Alert Dialog, Popover, Sheet, Drawer
- **Advanced**: Calendar, Command Palette, Carousel, Resizable Panels
- **Charts**: Recharts integration for data visualization
- **Notifications**: Toast, Sonner alerts
- **Utilities**: Tooltip, Context Menu, Hover Card

---

### 4. **Main Layout Components**

#### WorkflowStepper
**Location:** [src/components/layout/WorkflowStepper.tsx](src/components/layout/WorkflowStepper.tsx)

**Features:**
- **Header Navigation:**
  - Logo and application name display
  - Step-by-step workflow progression indicator
  - Visual icons for each step
  - Status indicators (active/complete/pending)

- **Step States:**
  - **Active**: Highlighted in primary color
  - **Complete**: Checkmark icon with success color
  - **Pending**: Muted appearance

- **Interactivity:**
  - Click to jump between completed steps
  - All steps are always accessible
  - Chevron separators between steps
  - Responsive design (icons only on mobile, labels on desktop)

- **Status Badge:**
  - Top-right document status display
  - Shows: Draft / Reviewed / Final
  - Color-coded variants

#### MainLayout
**Location:** [src/components/layout/MainLayout.tsx](src/components/layout/MainLayout.tsx)

**Structure:**
- Wraps entire application
- Includes WorkflowStepper as fixed header
- Main content area with container max-width
- Responsive padding and spacing

---

### 5. **Data Types & Models**
**Location:** [src/types/clinical.ts](src/types/clinical.ts)

#### Core Enums
```typescript
- DocumentStatus: 'draft' | 'reviewed' | 'final'
- WorkflowStep: 'capture' | 'review' | 'summarize' | 'patient-hub' | 'demographics' | 'corrections'
- SummaryType: 'soap' | 'discharge' | 'referral' | 'progress' | 'custom'
- ConfidenceLevel: 'low' | 'medium' | 'high'
- SeverityLevel: 'low' | 'medium' | 'high'
```

#### Key Interfaces

**Patient Interface:**
- `id`: Unique identifier
- `name`, `age`, `gender`: Demographics
- `medicalId`: Medical record number
- `primaryCondition`: Main diagnosis
- `lastVisit`: Date of last visit
- `aiSummary`: AI-generated summary
- `alerts`: Array of PatientAlert objects

**Transcript Interface:**
- `id`: Unique identifier
- `rawText`: Original transcription
- `improvedText`: AI-improved version
- `segments`: Array of TranscriptSegment objects
- `duration`: Audio length in seconds
- `createdAt`: Timestamp

**TranscriptSegment Interface:**
- `startTime`, `endTime`: Time markers
- `text`: Segment content
- `speaker`: Who spoke (optional)
- `isAiImproved`: Boolean flag
- `originalText`: Original before improvement

**ClinicalInsight Interface:**
- `type`: 'finding' | 'diagnosis' | 'alert' | 'task'
- `title`: Short label
- `content`: String or array of strings
- `confidence`: Confidence level
- `severity`: Risk level (optional)

**DifferentialDiagnosis Interface:**
- `condition`: Condition name
- `likelihood`: 'possible' | 'probable' | 'likely'
- `reasoning`: Clinical rationale

**SafetyAlert Interface:**
- `type`: 'drug-interaction' | 'allergy' | 'risk' | 'contraindication'
- `severity`: Alert severity level
- `description`: Full alert text

**ClinicalTask Interface:**
- `task`: Task description
- `priority`: 'low' | 'medium' | 'high' | 'urgent'
- `completed`: Boolean status

**CorrectionEntry Interface:**
- `original`: Incorrect term
- `corrected`: Correct term
- `createdAt`: When added to dictionary

**Additional Types:**
- Visit, VitalSign, Medication, PatientAlert

---

### 6. **Mock Data**
**Location:** [src/data/mockData.ts](src/data/mockData.ts)

Provides realistic sample data:
- **Mock Patients**: 6 sample patients with various conditions
- **Mock Visits**: Historical visit records
- **Mock Transcripts**: Sample audio transcriptions
- **Mock Insights**: AI-generated clinical findings
- **Mock Diagnoses**: Differential diagnosis examples
- **Mock Safety Alerts**: Drug interaction and allergy warnings
- **Mock Clinical Tasks**: Action items
- **Mock Corrections**: Terminology dictionary examples
- **Mock SOAP Notes**: Generated clinical summary example
- **Mock Vitals**: Patient vital signs over time
- **Mock Medications**: Current medication list

---

### 7. **Routing Structure**
**Location:** [src/App.tsx](src/App.tsx), [src/pages/Index.tsx](src/pages/Index.tsx)

**Routes:**
- `/` - Main application (routes to appropriate step based on workflow state)
- `*` - 404 Not Found page

**Dynamic Routing:**
- Step-based rendering through `currentStep` context
- No traditional multi-page URLs
- Single-page application with context-driven navigation

---

### 8. **Helper Utilities**
**Location:** [src/lib/utils.ts](src/lib/utils.ts)

- `cn()` - Classname merge utility using clsx and tailwind-merge
- Used throughout for conditional Tailwind classes

**Custom Hooks:**
- `useWorkflow()` - Access workflow context
- `useToast()` - Trigger toast notifications
- `use-mobile()` - Detect mobile viewport

---

## Data Flow

```
1. CAPTURE PHASE
   User uploads audio or records live
   ↓
   Audio file stored in workflow context
   Transcript generated (mock or real API)
   ↓

2. REVIEW PHASE
   Display transcript (raw vs improved)
   Generate clinical insights via AI
   Show differential diagnoses
   Extract safety alerts and tasks
   ↓
   User confirms review
   Document marked as "reviewed"
   ↓

3. SUMMARIZE PHASE
   User selects summary type and language
   AI generates appropriate clinical note
   (SOAP, Discharge, etc.)
   ↓
   Document marked as "final"
   ↓

4. PATIENT HUB PHASE
   User selects or searches for patient
   Transcript attached to patient record
   ↓

5. DEMOGRAPHICS PHASE
   Display patient full profile
   Show vitals, medications, history
   Link current transcript to patient
   ↓

6. CORRECTIONS PHASE
   Build/maintain terminology dictionary
   Apply corrections to future transcripts
   Improve AI accuracy over time
```

---

## Styling & Design System

### Theme System
- **Dark/Light Mode**: Managed by next-themes
- **CSS Variables**: Defined in Tailwind config
- **Color Scheme**: Clinical-friendly palette
  - Primary: Brand blue
  - Accent: Complementary color
  - Semantic colors: Success (green), Warning (orange), Danger (red)

### Clinical Card Styling
- `clinical-card` class for consistent styling
- Subtle gradients and borders
- Hover effects for interactivity
- Shadow depths for depth perception

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Hamburger menus on mobile
- Collapsible sections
- Grid layouts that reflow

### Accessibility (A11y)
- Radix UI ensures ARIA labels
- Keyboard navigation support
- High contrast ratios
- Focus indicators
- Screen reader friendly

---

## Key Features Summary

| Feature | Purpose | Location |
|---------|---------|----------|
| **Audio Capture** | Upload or record clinical interviews | CapturePage, UploadCard |
| **AI Transcription** | Convert audio to text | Mock integration ready |
| **Transcript Review** | Human verification of transcript | ReviewPage, TranscriptPanel |
| **Clinical Insights** | AI-powered medical analysis | ClinicalInsightsPanel |
| **Documentation Generation** | Create clinical notes (SOAP, etc.) | SummarizePage |
| **Patient Management** | Search and manage patient records | PatientHubPage |
| **Patient Demographics** | View patient profile and history | PatientDemographicsPage |
| **Vitals Tracking** | Monitor vital signs over time | VitalsChart |
| **Medication Management** | Track patient medications | MedicationsTab |
| **Terminology Correction** | Build medical term dictionary | CorrectionsPage |
| **Safety Alerts** | Drug interactions and allergies | ClinicalInsightsPanel |
| **Workflow Tracking** | Multi-step process management | WorkflowStepper, Context |

---

## Integration Points (Ready for Backend)

1. **Audio Upload & Transcription**
   - Currently uses mock data
   - Ready for real audio API endpoint

2. **AI Clinical Insights**
   - Mock data provided
   - Ready for medical AI API

3. **Patient Database**
   - Mock patients included
   - Ready for REST/GraphQL API

4. **Documentation Generation**
   - Mock SOAP notes provided
   - Ready for LLM backend

5. **Authentication**
   - Not currently implemented
   - Ready for user login

6. **Database Persistence**
   - All data currently in-memory
   - Ready for database integration

---

## Development Setup

### Prerequisites
- Node.js (v18+)
- npm or bun

### Commands
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### File Structure
```
src/
├── components/        # React components
│   ├── ui/           # Shadcn/ui components
│   ├── layout/       # Layout components
│   ├── capture/      # Capture workflow components
│   ├── review/       # Review workflow components
│   └── demographics/ # Demographics display components
├── pages/            # Page components for each step
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── types/            # TypeScript interfaces
├── data/             # Mock data
└── App.tsx           # Root component
```

---

## Future Enhancements

1. **Authentication & Authorization**
   - User login/registration
   - Role-based access (doctor, admin, etc.)

2. **Real Backend Integration**
   - Connect to actual audio transcription service
   - Integrate medical AI models
   - Real patient database

3. **Export/Import**
   - PDF generation for documents
   - HL7/FHIR integration
   - EHR system compatibility

4. **Analytics Dashboard**
   - Usage statistics
   - Transcription accuracy metrics
   - Patient outcome tracking

5. **Collaboration Features**
   - Multi-user editing
   - Comments and annotations
   - Approval workflows

6. **Mobile App**
   - React Native version
   - Offline support
   - Push notifications

7. **Advanced Security**
   - End-to-end encryption
   - HIPAA compliance
   - Audit logging

---

## Conclusion

ITranscript360 is a well-architected, modular clinical application that streamlines medical documentation workflows. With a clear 6-step process, comprehensive state management, and a modern tech stack, it provides the foundation for a production-ready clinical transcription system. The codebase is organized, typed, and ready for backend integration and scaling.
