# Clinical Companion - UI/UX Design Guide
## For UI/UX Designers - Complete Design Reference

---

## 📋 **Document Overview**

This guide provides comprehensive UI/UX design specifications, patterns, and considerations for the Clinical Companion healthcare application. It covers user personas, interaction flows, screen layouts, component organization, and design system requirements.

---

## 👥 **User Personas & Use Cases**

### **Persona 1: Dr. Sarah Chen - Hospital Clinician**
- **Role:** Emergency Room Physician
- **Technical Skill:** Medium (comfortable with modern apps)
- **Daily Workflows:** 8-12 patient encounters per shift
- **Pain Points:** 
  - Limited time between patients (avg 5-10 min notes)
  - Needs quick, efficient documentation
  - Requires rapid access to patient history
- **Primary Needs:**
  - Fast audio capture during/after encounters
  - Quick review without leaving exam room
  - Rapid document generation
  - Minimal clicks between steps

### **Persona 2: Dr. James Martinez - Private Practice**
- **Role:** Family Medicine Physician
- **Technical Skill:** Low-Medium (less app experience)
- **Daily Workflows:** 5-8 longer patient encounters
- **Pain Points:**
  - Overwhelmed by complex software interfaces
  - Wants straightforward, intuitive workflows
  - Concerned about data privacy and security
- **Primary Needs:**
  - Simple, clear navigation
  - Obvious action buttons and flows
  - Clear confirmation before important actions
  - Ability to undo or correct mistakes

### **Persona 3: Dr. Priya Patel - Administrative Clinician**
- **Role:** Medical Records & Documentation Manager
- **Technical Skill:** High (power user)
- **Daily Workflows:** Manages 20+ provider's documents
- **Pain Points:**
  - Needs to see comprehensive activity
  - Requires filtering and sorting capabilities
  - Must ensure quality standards
- **Primary Needs:**
  - Advanced search and filter options
  - Batch operations
  - Analytics and reporting views
  - Quality control dashboards

---

## 🗺️ **User Journey Maps**

### **Journey 1: Quick Clinical Encounter (Dr. Chen's Workflow)**

```
START
  ↓
Open App (< 1 sec)
  ↓
See Dashboard with Quick Actions
  ↓
Click "New Capture" (0.5 sec to locate)
  ↓
Optional: Select/Link Patient (2-3 sec or skip)
  ↓
Click Record or Upload (1 sec)
  ↓
Encounter in Progress...
  ↓
Stop Recording / Upload Complete (1 sec)
  ↓
Navigate to Review (auto or 1 click)
  ↓
Skim Transcript (10-15 sec, AI already improved)
  ↓
Check Clinical Insights (10-15 sec, pre-extracted)
  ↓
Approve Both with 2 Checkboxes (2 sec)
  ↓
Click "Generate Document" (1 sec)
  ↓
See SOAP Note Generated (auto, 3-5 sec)
  ↓
Click "Download" or "Copy to Clipboard" (1 sec)
  ↓
DONE - Ready to add to patient records
  ↓
TOTAL TIME: ~2-5 minutes for complete workflow
```

**Design Implication:** Everything visible above the fold. Minimal scrolling. Large, obvious buttons. Clear progress indicators.

---

### **Journey 2: Comprehensive Patient Review (Dr. Martinez's Workflow)**

```
START
  ↓
Open Patient Hub Page
  ↓
Search/Browse for Patient (5-10 sec)
  ↓
Click Patient Card → View Demographics
  ↓
See Multiple Tabs Available (Overview, Vitals, Meds, Visits, Docs)
  ↓
Browse Patient History (30-60 sec)
  ↓
Click "New Encounter" for this Patient
  ↓
Go to Capture (patient pre-linked)
  ↓
Record/Upload Audio
  ↓
Review & Approve (30-45 sec, patient context fresh)
  ↓
Generate Document with Patient Context
  ↓
Compare with Previous Visits (optional but easy)
  ↓
Document Auto-Linked to Patient File
  ↓
DONE - Fully integrated with patient record
  ↓
TOTAL TIME: ~5-8 minutes including patient review
```

**Design Implication:** Patient context always visible. Cross-references between documents. Historical comparisons. Tabbed interface for organization.

---

### **Journey 3: Quality Management Review**

```
START
  ↓
Go to Transcriptions Archive Page
  ↓
See Dashboard of All Recent Work
  ↓
Use Filters: Date Range, Provider, Patient, Status
  ↓
See Quality Metrics Summary
  ↓
Find Document Needing Review
  ↓
Click to Expand/View Details
  ↓
See all AI-Extracted Information
  ↓
Review Confidence Levels
  ↓
Flag Issues or Corrections Needed
  ↓
Add Notes for Provider
  ↓
Save & Mark Complete
  ↓
Generate Quality Report
  ↓
DONE - Quality assured
  ↓
TOTAL TIME: ~1-2 minutes per document
```

**Design Implication:** List/table view essential. Filtering critical. Status indicators visible. Inline comments/notes needed.

---

## 📐 **Information Architecture & Navigation**

### **Primary Navigation Structure**

```
Clinical Companion
├── Dashboard / Home
│   ├── Quick Stats Cards
│   ├── Quick Actions Panel
│   └── Recent Activity Feed
│
├── Capture Page (Step 1)
│   ├── Audio Upload Card
│   ├── Live Recording Card
│   ├── Patient Link Section
│   └── Recent Sessions
│
├── Review Page (Step 2)
│   ├── Left Panel - Transcript View
│   │   ├── Raw Transcript
│   │   ├── AI-Improved Transcript
│   │   ├── Side-by-side Toggle
│   │   └── Audio Playback Controls
│   │
│   └── Right Panel - Clinical Insights
│       ├── Key Findings
│       ├── Differential Diagnoses
│       ├── Safety Alerts
│       ├── Clinical Tasks
│       └── Approval Checkboxes
│
├── Summarize Page (Step 3)
│   ├── Document Format Selector
│   ├── Language Selection
│   ├── Custom Prompt Input
│   ├── Generated Document Preview
│   ├── Edit Textarea
│   └── Action Buttons (Download, Copy, etc.)
│
├── Patient Hub (Step 4)
│   ├── Search Bar
│   ├── Filter Section
│   ├── View Toggle (Grid/List)
│   ├── Patient Cards/Table
│   ├── Create New Patient Button
│   └── Patient Details Modal (Optional)
│
├── Patient Demographics (Step 5)
│   ├── Patient Header with Info
│   ├── Tabs Navigation
│   │   ├── Overview
│   │   ├── Vitals (with chart)
│   │   ├── Medications
│   │   ├── Visit History
│   │   └── Documents
│   └── Edit Mode Toggle
│
├── Corrections Page (Step 6)
│   ├── Transcript Corrections Section
│   ├── Clinical Info Corrections Section
│   ├── Correction Entry Forms
│   ├── Correction History List
│   └── Apply/Save Buttons
│
└── Transcriptions Archive
    ├── Search & Filter Panel
    ├── List/Table View
    ├── Status Indicators
    ├── Quality Metrics
    └── Bulk Actions
```

### **Accessibility of Navigation**

**Primary Navigation Pattern:**
- Horizontal tab or sidebar navigation
- Color-coded step indicators (1-6)
- Current step highlighted
- Previous steps show checkmark ✓
- Next steps show number
- "Back" and "Next" buttons available
- Breadcrumb trail visible (optional but helpful)

**Example Navigation Visual:**
```
1. Capture ✓ | 2. Review ✓ | 3. Summarize (CURRENT) | 4. Patient Hub | 5. Demographics | 6. Corrections

[← Back] [Next →]
```

---

## 📱 **Screen Layout Specifications**

### **Screen 1: Capture Page Layout**

**Header Section (Fixed)**
```
┌─────────────────────────────────────────────────┐
│ Good Morning, Doctor 👋                  [Link Patient ▼] │
│ Start a new transcription...                    │
└─────────────────────────────────────────────────┘
```

**Selected Patient Badge (If Linked)**
```
┌─────────────────────────────────────────────────┐
│ 🟢 John Davis | ID: MD-12345 [Change ×]       │
└─────────────────────────────────────────────────┘
```

**Quick Stats Dashboard**
```
┌──────────┬──────────┬──────────┬──────────┐
│ Total    │ This     │ Avg      │ Quality  │
│ Records  │ Month    │ Duration │ Score    │
│ 342      │ 28       │ 12:34    │ 94%      │
└──────────┴──────────┴──────────┴──────────┘
```

**Main Content Area - Two Column Grid**
```
┌─────────────────────────┬─────────────────────────┐
│                         │                         │
│   UPLOAD CARD           │  LIVE RECORDING CARD    │
│                         │                         │
│ Drag & Drop or Click    │ [●] Record              │
│ [Browse Files...]       │ [⏹] Stop               │
│                         │ Real-time level meter   │
│                         │                         │
└─────────────────────────┴─────────────────────────┘
```

**Recent Activity Section**
```
┌─────────────────────────────────────────────────┐
│ Recent Transcriptions                    [View All] │
├─────────────────────────────────────────────────┤
│ John Davis    | Mon, Jan 20 | SOAP     | 14:32  │
│ Jane Smith    | Mon, Jan 20 | Progress | 08:15  │
│ Mike Johnson  | Sun, Jan 19 | Discharge| 22:01  │
└─────────────────────────────────────────────────┘
```

**Responsive Considerations:**
- Mobile: Stack Upload/Recording vertically
- Tablet: 1.5 column layout
- Desktop: Full 2-column layout with sidebar (optional)
- All buttons remain easily tap-able (min 48px height on mobile)

---

### **Screen 2: Review Page Layout (Two-Panel Design)**

**Header/Navigation**
```
┌────────────────────────────────────────────────────┐
│ Review Transcript & Clinical Insights      [← Back] │
└────────────────────────────────────────────────────┘
```

**Main Content - Left & Right Panels**
```
┌──────────────────────────┬──────────────────────────┐
│   TRANSCRIPT PANEL       │   INSIGHTS PANEL         │
│ ┌────────────────────┐  │ ┌────────────────────┐   │
│ │ Transcript Controls│  │ │ Clinical Findings   │   │
│ │ [Raw] [AI] [Split]│  │ │ ├─ Finding 1        │   │
│ └────────────────────┘  │ │ │  Confidence: High  │   │
│                         │ │ ├─ Finding 2        │   │
│ ┌────────────────────┐  │ │ │  Confidence: Med   │   │
│ │ Audio Player       │  │ │ └                   │   │
│ │ ──────●───────── 5:34│ │ ┌────────────────────┐   │
│ │ [||] [►] [◄] [×]  │  │ │ Differential Diag.  │   │
│ └────────────────────┘  │ │ • Condition A       │   │
│                         │ │   (Possible)        │   │
│ Transcript Content:     │ │ • Condition B       │   │
│ (Scrollable area)       │ │   (Probable)        │   │
│                         │ │ • Condition C       │   │
│ "Patient reports       │ │   (Likely)          │   │
│  headaches for 3 days.  │ │ └                   │   │
│  No fever. Visual blur."│ │ ┌────────────────────┐   │
│                         │ │ │ Safety Alerts      │   │
│ (Additional transcript  │ │ │ ⚠ Drug Interaction │   │
│  content...)            │ │ │ ⚠ Allergy Risk     │   │
│                         │ │ └                   │   │
│ ┌─ Approval ──────────┐ │ ┌────────────────────┐   │
│ │ ☐ I approve this    │ │ │ Clinical Tasks     │   │
│ │   transcript        │ │ │ □ Order Blood Test │   │
│ └─────────────────────┘ │ │ □ Follow-up 6mo    │   │
│                         │ │ □ Refill Med A     │   │
│                         │ │ └                   │   │
│                         │ │ ┌─ Approval ──────┐ │   │
│                         │ │ │ ☐ I approve     │ │   │
│                         │ │ │   these insights│ │   │
│                         │ │ └─────────────────┘ │   │
└──────────────────────────┴──────────────────────────┘
```

**Bottom Action Bar**
```
┌────────────────────────────────────────────────────┐
│ [← Back]  [Make Corrections]  [Continue →]        │
└────────────────────────────────────────────────────┘
```

**Responsive Considerations:**
- Desktop: True 2-column layout (50/50 or 60/40 split)
- Tablet: Stacked panels with expandable sections
- Mobile: Tab view switching between Transcript and Insights
- Audio player always accessible (stick to top or bottom on mobile)

---

### **Screen 3: Summarize Page Layout**

**Header**
```
┌─────────────────────────────────────────────────┐
│ Generate Clinical Summary            [← Back]   │
└─────────────────────────────────────────────────┘
```

**Configuration Panel (Top)**
```
┌──────────────────────────────────────────────────┐
│ Document Type:  [▼ SOAP Note]                   │
│ Language:       [▼ English]                      │
│ Custom Prompt:  [________________]  [Use Default]│
│                 [Generate ▶]                     │
└──────────────────────────────────────────────────┘
```

**Main Content Area - Left & Right**
```
┌──────────────────────────┬──────────────────────────┐
│   GENERATED DOCUMENT     │   GENERATED DOCUMENT     │
│   (Read-only Preview)    │   (Editable Textarea)    │
│ ┌────────────────────┐  │ ┌────────────────────┐   │
│ │ SOAP NOTE          │  │ │ SOAP NOTE          │   │
│ │ Patient: John D.   │  │ │                    │   │
│ │ Date: Jan 20, 2026 │  │ │ S: Patient reports │   │
│ │                    │  │ │ headaches x 3 days│   │
│ │ S: Patient reports │  │ │ No fever.          │   │
│ │ headaches...       │  │ │                    │   │
│ │                    │  │ │ O: BP 120/80       │   │
│ │ O: BP normal       │  │ │ HR 72              │   │
│ │ HR: 72             │  │ │ Appears well       │   │
│ │                    │  │ │                    │   │
│ │ A: Tension         │  │ │ A: Likely tension  │   │
│ │ headache likely    │  │ │ headache           │   │
│ │                    │  │ │                    │   │
│ │ P: Ibuprofen 400mg │  │ │ P: Ibuprofen...    │   │
│ │ q6h. Follow-up if  │  │ │ Continue current   │   │
│ │ persists.          │  │ │ meds, follow-up    │   │
│ │                    │  │ │                    │   │
│ └────────────────────┘  │ └────────────────────┘   │
│                         │                         │
│ [≡ Menu] [↻ Regen]     │ [Preview Mode Toggle]   │
└──────────────────────────┴──────────────────────────┘
```

**Document History Section**
```
┌──────────────────────────────────────────────────┐
│ Previous Summaries                      [Show All] │
├──────────────────────────────────────────────────┤
│ SOAP Note    | Jan 20 | [View] [Compare] [Copy]  │
│ Progress Note| Jan 15 | [View] [Compare] [Copy]  │
│ SOAP Note    | Jan 08 | [View] [Compare] [Copy]  │
└──────────────────────────────────────────────────┘
```

**Action Buttons (Bottom/Right Sticky)**
```
[← Back] [Copy to Clipboard] [Download as PDF] [Done ▶]
```

---

### **Screen 4: Patient Hub Layout**

**Header & Controls**
```
┌────────────────────────────────────────────────────────┐
│ Patient Directory                          [+ New]    │
│ ┌──────────────────────────────────────────────────┐  │
│ │ 🔍 Search patients... | Condition: [▼ All]       │  │
│ │ [Grid View] [List View]                          │  │
│ └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

**Grid View (Desktop Default)**
```
┌─────────────┬─────────────┬─────────────┐
│             │             │             │
│ John Davis  │ Jane Smith  │ Mike Johnson│
│ ID: MD-001  │ ID: MD-002  │ ID: MD-003  │
│             │             │             │
│ Age: 45     │ Age: 62     │ Age: 38     │
│ Cardiology  │ Diabetes    │ Orthopedic  │
│             │             │             │
│ ⚠ 2 Alerts  │ ✓ Stable    │ ✓ Stable    │
│ Last: Jan20 │ Last: Jan19 │ Last: Jan18 │
│             │             │             │
│ [View] [New]│ [View] [New]│ [View] [New]│
│             │             │             │
└─────────────┴─────────────┴─────────────┘
```

**List View (Tablet/Mobile)**
```
┌──────────────────────────────────────────────────┐
│ John Davis    | 45 | MD-001 | ⚠ | Jan 20 [►]   │
├──────────────────────────────────────────────────┤
│ Jane Smith    | 62 | MD-002 | ✓ | Jan 19 [►]   │
├──────────────────────────────────────────────────┤
│ Mike Johnson  | 38 | MD-003 | ✓ | Jan 18 [►]   │
└──────────────────────────────────────────────────┘
```

**Patient Detail Modal (When Clicked)**
```
┌──────────────────────────────────────────────────┐
│ John Davis Medical Record              [× Close] │
├──────────────────────────────────────────────────┤
│ Age: 45 | Male | ID: MD-001 | Contact: 555-1234│
│ Primary Condition: Hypertension                 │
│ Last Visit: January 20, 2026                    │
│ Health Alerts: ⚠ Allergy - Penicillin          │
│                ⚠ Drug Interaction Risk         │
│                                                 │
│ [Recent Encounter] [View Full Profile]         │
│ [Copy Medical ID] [Edit Info]                   │
└──────────────────────────────────────────────────┘
```

---

### **Screen 5: Patient Demographics Layout**

**Header with Back Navigation**
```
┌─────────────────────────────────────────────────┐
│ [← Back to Patient Hub] John Davis | MD-001    │
└─────────────────────────────────────────────────┘
```

**Patient Info Section**
```
┌─────────────────────────────────────────────────┐
│ 👤 John Davis                        [Edit Mode] │
│ Age: 45 | Male | Contact: 555-1234  [← Show]   │
│ Primary Condition: Hypertension                 │
│ ⚠ Allergy: Penicillin                          │
│ ⚠ Drug Interaction Risk                        │
└─────────────────────────────────────────────────┘
```

**Tabs Navigation**
```
[Overview] [Vitals] [Medications] [Visits] [Documents]
```

**Tab Content Example: Vitals Tab**
```
┌─────────────────────────────────────────────────┐
│ Vital Signs History                             │
│                                                 │
│ ┌────────────────────────────────────────────┐  │
│ │                                            │  │
│ │     Chart: BP, HR, Temp over time          │  │
│ │     (Line graph visualization)             │  │
│ │                                            │  │
│ │  BP  ┌─────●────                           │  │
│ │      │    / \                              │  │
│ │      │   /   \____●                        │  │
│ │  HR  │  ●──────────●──●                    │  │
│ │      │                 \                   │  │
│ │  Tmp │─────────────────●─●               │  │
│ │      │                                    │  │
│ └────────────────────────────────────────────┘  │
│                                                 │
│ Latest: BP 128/82 | HR 76 | Temp 98.6°F        │
│ Trend: ↑ BP improving | ↓ HR stable            │
└─────────────────────────────────────────────────┘
```

**Tab Content Example: Medications Tab**
```
┌─────────────────────────────────────────────────┐
│ Current Medications                   [+ Add]   │
├─────────────────────────────────────────────────┤
│ Lisinopril 10mg                                 │
│ Once daily, morning. (Blood Pressure) [Remove]  │
│                                                 │
│ Metformin 500mg                                 │
│ Twice daily with meals. (Diabetes) [Remove]    │
│                                                 │
│ Atorvastatin 20mg                               │
│ Once daily at night. (Cholesterol) [Remove]    │
└─────────────────────────────────────────────────┘
```

**Tab Content Example: Visit History**
```
┌─────────────────────────────────────────────────┐
│ Visit History                                   │
├─────────────────────────────────────────────────┤
│ ▼ Jan 20 - Annual Checkup                      │
│   SOAP Note | Duration: 14:32 | [View] [Copy]  │
│   BP: Normal | HR: 72 | No new symptoms        │
│                                                 │
│ ▼ Jan 15 - Follow-up                           │
│   Progress Note | Duration: 08:15 | [View]     │
│   Medication adherence good. Continue current. │
│                                                 │
│ ▼ Jan 08 - Emergency                           │
│   Discharge Summary | [View]                   │
│   Acute episode managed successfully.          │
└─────────────────────────────────────────────────┘
```

---

### **Screen 6: Corrections Page Layout**

**Header**
```
┌─────────────────────────────────────────────────┐
│ Corrections & Adjustments            [← Back]   │
└─────────────────────────────────────────────────┘
```

**Two-Section Layout**
```
┌──────────────────────────────┬──────────────────────────┐
│   TRANSCRIPT CORRECTIONS     │   CLINICAL CORRECTIONS   │
│                              │                          │
│ [+ Add Transcript Correction]│ [+ Add Clinical Change]  │
│                              │                          │
│ ┌──────────────────────────┐ │ ┌────────────────────┐   │
│ │ What was said (wrong):   │ │ │ Which insight?     │   │
│ │ [Text input]             │ │ │ [Dropdown ▼]       │   │
│ │                          │ │ │                    │   │
│ │ What should be:          │ │ │ Your correction:   │   │
│ │ [Text input]             │ │ │ [Text input]       │   │
│ │                          │ │ │                    │   │
│ │ [Save Correction]        │ │ │ [Save Change]      │   │
│ └──────────────────────────┘ │ └────────────────────┘   │
│                              │                          │
│ Correction History:          │ Change History:          │
│                              │                          │
│ ✓ "palpations" →             │ ✓ Added: "Monitor BP"    │
│   "palpitations"             │   daily                  │
│                              │                          │
│ ✓ "lisinoprial" →            │ ✓ Removed: "High fever   │
│   "lisinopril"               │   likely" (not accurate) │
│                              │                          │
└──────────────────────────────┴──────────────────────────┘
```

**Bottom Action**
```
[← Back] [Save All Corrections] [Done ▶]
```

---

## 🎨 **Design System & Component Specifications**

### **Color Palette & Semantics**

**Status Colors:**
- **Green (#10B981):** Approved, Complete, Good Status
  - Usage: Checkmarks, success badges, confirmed items
  
- **Blue (#3B82F6):** Active, Current, Information
  - Usage: Current step indicator, active buttons, links
  
- **Yellow/Amber (#F59E0B):** Caution, Warning, Medium Priority
  - Usage: Non-critical alerts, medium severity issues
  
- **Red (#EF4444):** Critical, Error, High Severity
  - Usage: Critical alerts, drug interactions, urgent items
  
- **Gray (#6B7280):** Neutral, Inactive, Disabled
  - Usage: Disabled buttons, minor text, dividers

**Semantic Elements:**
- **Background:** Light gray or white
- **Text Primary:** Dark gray (#1F2937)
- **Text Secondary:** Medium gray (#6B7280)
- **Borders:** Light gray (#E5E7EB)
- **Accent:** Blue (primary action)

---

### **Badge & Indicator System**

**Status Badges:**
```
DRAFT          - Gray background, gray text
REVIEWED       - Blue background, white text
FINAL/COMPLETE - Green background, white text
PENDING        - Yellow background, yellow text
ERROR/ALERT    - Red background, white text
```

**Confidence Badges:**
```
HIGH     - Green checkmark
MEDIUM   - Yellow dash
LOW      - Red exclamation
```

**Severity Indicators:**
```
🔴 HIGH     - Red circle + text
🟡 MEDIUM   - Yellow circle + text
🟢 LOW      - Green circle + text
```

**Task Status:**
```
☐ Incomplete  - Empty checkbox
☑ Complete    - Filled checkbox
⚠ Flagged     - Warning icon
```

---

### **Button Component Patterns**

**Primary Action Buttons**
- Color: Blue background, white text
- Size: 40-48px height (touch-friendly)
- Text: Clear action verb (Next, Save, Generate, Continue)
- Hover: Slightly darker blue
- Disabled: Grayed out, not clickable

```
┌──────────────┐
│ Generate     │  Primary button - main action
└──────────────┘
```

**Secondary Action Buttons**
- Color: White background, blue text, blue border
- Size: 40-48px height
- Used for: Back, Cancel, Edit
- Hover: Light blue background

```
┌──────────────┐
│ Back         │  Secondary button - less important
└──────────────┘
```

**Tertiary/Icon Buttons**
- Color: Transparent, icon color
- Used for: More options, expand/collapse
- Hover: Light background highlight

```
[⋯] [▼] [×] [+]  Compact icon buttons
```

**Danger Buttons**
- Color: Red background, white text
- Used for: Delete, Remove, Critical actions
- Requires confirmation dialog

```
┌──────────────┐
│ Remove       │  Danger button - requires care
└──────────────┘
```

---

### **Card Component Specifications**

**Standard Card Layout:**
```
┌─────────────────────────────────────────┐
│ Card Title                       [Icon] │
├─────────────────────────────────────────┤
│                                         │
│ Card content area                       │
│ Multiple lines of content               │
│                                         │
│ [Optional Subtext or Secondary Info]   │
│                                         │
│ [Button]  [Button]                      │
└─────────────────────────────────────────┘
```

**Card Styling:**
- White background
- Light gray border (optional)
- Subtle shadow on desktop
- Rounded corners (8px)
- Padding: 20px internal

**Card Variants:**
- **Default:** Standard white card
- **Highlighted:** Blue/colored top border indicating importance
- **Alert:** Red/yellow border for warnings
- **Clickable:** Pointer cursor, hover effect (subtle scale)
- **Compact:** Reduced padding for dense lists

---

### **Input Components**

**Text Input Fields**
```
┌────────────────────────────────────┐
│ Label Text                          │
│ ┌────────────────────────────────┐  │
│ │ Placeholder or entered text    │  │
│ └────────────────────────────────┘  │
│ Helper text or error message        │
└────────────────────────────────────┘
```

**Textarea Fields (Multi-line)**
```
┌────────────────────────────────────┐
│ Transcript Content                  │
│ ┌────────────────────────────────┐  │
│ │ Multi-line text content        │  │
│ │ Shows full paragraphs          │  │
│ │ Scrollable if needed           │  │
│ │ Can be edited inline           │  │
│ └────────────────────────────────┘  │
└────────────────────────────────────┘
```

**Dropdown/Select Components**
```
┌────────────────────────────────────┐
│ Document Type                       │
│ ┌──────────────────────────────┐   │
│ │ SOAP Note            [▼]     │   │
│ └──────────────────────────────┘   │
│                                     │
│ When opened:                        │
│ ◉ SOAP Note                        │
│ ○ Discharge Summary                │
│ ○ Referral Letter                  │
│ ○ Progress Note                    │
│ ○ Custom                           │
└────────────────────────────────────┘
```

**Search/Filter Inputs**
```
┌────────────────────────────────────┐
│ 🔍 Search patients...              │
│ ┌────────────────────────────────┐ │
│ │ Type to filter...              │ │
│ └────────────────────────────────┘ │
│ Suggestions below search field     │
└────────────────────────────────────┘
```

---

### **Modal & Dialog Patterns**

**Confirmation Dialog**
```
┌────────────────────────────────────┐
│ Confirm Action                 [×] │
├────────────────────────────────────┤
│                                     │
│ Are you sure you want to delete     │
│ this correction? This action        │
│ cannot be undone.                   │
│                                     │
│                  [Cancel]  [Delete] │
└────────────────────────────────────┘
```

**Form Modal (Patient Creation)**
```
┌────────────────────────────────────────┐
│ Create New Patient             [×]     │
├────────────────────────────────────────┤
│                                         │
│ Patient Name:                           │
│ ┌────────────────────────────────────┐ │
│ │                                    │ │
│ └────────────────────────────────────┘ │
│                                         │
│ Age:           Gender:                 │
│ ┌────────────┐ ┌────────────────────┐  │
│ │            │ │ [Male ▼]           │  │
│ └────────────┘ └────────────────────┘  │
│                                         │
│ Medical ID:                             │
│ ┌────────────────────────────────────┐ │
│ │                                    │ │
│ └────────────────────────────────────┘ │
│                                         │
│         [Cancel]  [Create Patient]     │
└────────────────────────────────────────┘
```

**Information Modal**
```
┌────────────────────────────────────┐
│ Transcript Details             [×] │
├────────────────────────────────────┤
│                                     │
│ Duration: 14:32                     │
│ Audio Quality: Excellent (92%)      │
│ Confidence Level: High              │
│ Transcribed Segments: 34            │
│ AI Improvements: 12                 │
│                                     │
│                         [Close]     │
└────────────────────────────────────┘
```

---

### **Toast & Notification Patterns**

**Success Toast**
```
✓ Document copied to clipboard
Appears for 3 seconds, auto-dismisses
```

**Error Toast**
```
✗ Failed to save corrections
Appears until dismissed or 5 seconds
```

**Info Toast**
```
ⓘ New document generated
Appears for 3 seconds
```

**Action Toast**
```
↻ Generating summary...
[Generating] [Cancel]
Appears until action completes
```

**Positioning:**
- Desktop: Bottom-right corner
- Mobile: Bottom of screen, full width
- Z-index: Above all other content
- Max width: 400px on desktop

---

## 🖱️ **Interaction Patterns & Micro-interactions**

### **Audio Playback Interactions**

**Timeline Scrubbing:**
- Click anywhere on timeline to jump to that time
- Draggable handle for precise positioning
- Tooltip shows time when hovering
- Sync: Text highlights corresponding segment

**Playback Speed:**
- 1x (normal)
- 1.25x (slightly faster)
- 1.5x (faster)
- 2x (double speed)
- Toggle button shows current speed

**Visual Feedback:**
- Playing: ► icon changes to ⏸
- Current time updates in real-time
- Waveform shows current position as vertical line
- Text scrolls to current speaking segment

---

### **Transcript Review Interactions**

**Hover Effects:**
- Hover over text segment → Background highlight
- Hover over timestamp → Tooltip shows full time
- Hover over AI-changed text → Shows original text tooltip

**Click Interactions:**
- Click on text segment → Jump to that time in audio
- Click on confidence badge → Show explanation tooltip
- Click on "Edit" → Inline edit mode for that segment

**Comparison Mode Toggle:**
- Toggle switch between "Raw vs AI-Improved"
- Side-by-side or overlay view options
- Differences highlighted (red for removed, green for added)

---

### **Approval Workflow Interactions**

**Checkbox Interactions:**
```
Initial:  ☐ I have reviewed this transcript
          (Unchecked, clickable, gray)

Hovering: ☐ I have reviewed this transcript
          (Still unchecked, hand cursor)

Clicked:  ☑ I have reviewed this transcript
          (Checked, green checkmark)

Next button only enables when BOTH checkboxes are checked
```

---

### **Document Generation Loading State**

**Generation Progress:**
```
[⟳] Generating summary...        
Progress bar: ████░░░░░░  (40%)
Estimated time: 5 seconds remaining

Or animated skeleton/placeholder showing:
- Document title area (gray shimmer)
- Content lines (multiple gray shimmers)
- Button area (gray shimmer)
```

---

### **Patient Selection & Linking**

**Unlinked State:**
```
No Patient Selected
[Link Patient ▼]  (Button shown prominently)
```

**Linked State:**
```
✓ John Davis | MD-001 | [Change]
(Shows patient badge with green checkmark)
```

**Selection Dropdown:**
```
[Link Patient ▼]
↓
┌─────────────────────┐
│ Search patients...  │
├─────────────────────┤
│ John Davis (ID-001) │
│ Jane Smith (ID-002) │
│ Mike Johnson(ID-003)│
│ ─────────────────── │
│ [+ Create New]      │
└─────────────────────┘
```

---

### **Inline Editing Interactions**

**Edit Mode Toggle:**
```
Normal State:
Name: John Davis [Edit ✏]

Click Edit:
Name: [John Davis _______________] [Save] [Cancel]

After Save:
Name: John Davis [✓ Saved] → Returns to normal

After Cancel:
Name: John Davis [Edit ✏]  (Returns to normal)
```

---

## 📐 **Responsive Design Specifications**

### **Breakpoints**

- **Mobile:** 320px - 640px (phones)
- **Tablet:** 641px - 1024px (tablets)
- **Desktop:** 1025px+ (monitors)

### **Layout Adaptations**

**Mobile Adaptations:**
- Stack two-column layouts vertically
- Full-width buttons and inputs
- Tab-based navigation for multiple sections
- Hamburger menu for secondary navigation
- Bottom sheet/drawer for modals
- Swipe gestures for navigation

**Tablet Adaptations:**
- 1.5-column layouts possible
- Slightly larger touch targets
- Horizontal scroll for wide tables
- Split-view on landscape orientation

**Desktop Adaptations:**
- True multi-column layouts
- Sidebar navigation
- Inline editing without modals
- Hover effects and tooltips
- Keyboard shortcuts support

---

### **Touch Target Sizes**

- **Minimum:** 44x44px (Apple standard)
- **Preferred:** 48x48px (Google standard)
- **Spacing between targets:** 8px minimum
- **Text links:** Wrap in larger clickable area

---

## ♿ **Accessibility Considerations**

### **Keyboard Navigation**

- Tab order logical and obvious
- All buttons accessible via Enter/Space
- Dropdowns navigable with arrow keys
- Escape key closes modals
- Skip to main content link
- Focus indicators visible (outline or highlight)

### **Color Accessibility**

- Don't rely on color alone (use icons/text too)
- Sufficient contrast (WCAG AA minimum 4.5:1)
- Color-blind friendly palette (red-green distinction)
- Status indicators use shapes + colors

### **Screen Reader Support**

- Semantic HTML (buttons, forms, headings)
- ARIA labels for icon buttons
- Form labels properly associated
- Alt text for meaningful images
- Skip navigation links
- Live regions for dynamic updates

### **Visual Accessibility**

- Large, readable fonts (minimum 14px body text)
- High contrast text on background
- Resizable text without loss of function
- Adequate line height (1.5x minimum)
- Clear, simple language
- Animations optional/reducible

---

## 🎯 **Component State Matrix**

### **Button States**

| State | Appearance | Interaction |
|-------|------------|-------------|
| Default | Full color, normal size | Clickable cursor |
| Hover | Slightly darker shade | Scale up 105% |
| Active/Pressed | Inset effect or change | Instant feedback |
| Disabled | Grayed out (50% opacity) | Not clickable |
| Loading | Shows spinner | Disabled state |
| Success | Green, checkmark icon | Temporary, then default |
| Error | Red tint, error icon | Shows error message |

### **Input Field States**

| State | Appearance | Behavior |
|-------|------------|----------|
| Default/Empty | Gray border, placeholder text | Ready for input |
| Focused | Blue border, cursor visible | Input accepted |
| Filled | Show entered text | Validation checks |
| Valid | Green checkmark at right | Accepts submission |
| Invalid | Red border, error message | Blocks submission |
| Disabled | Grayed out | Not editable |
| Loading | Spinner in field | Not editable |

### **Card States**

| State | Appearance | Usage |
|-------|------------|-------|
| Default | White, standard shadow | Normal display |
| Hover | Slight shadow increase, scale | Clickable card feedback |
| Selected | Border highlight or background | Active selection |
| Loading | Skeleton/shimmer state | Content loading |
| Empty | Dashed border, icon | No content available |
| Error | Red border, error icon | Error occurred |

---

## 📊 **Data Visualization Specifications**

### **Vital Signs Chart**

**Chart Type:** Line chart with multiple series
**Axes:**
- X-axis: Time (dates)
- Y-axis: Measurement values

**Series (Color-coded):**
- Blood Pressure Systolic: Blue
- Blood Pressure Diastolic: Light Blue
- Heart Rate: Red
- Temperature: Orange
- Other vitals: Varying colors

**Features:**
- Legend showing all tracked metrics
- Tooltip on hover showing all values at that date
- Clickable legend items to toggle series visibility
- Zoom/pan capability for large date ranges
- Download as image option

---

### **Confidence Level Visualization**

**Option 1: Progress Bar Style**
```
High     ████████░░ 85%
Medium   ██████░░░░ 65%
Low      ████░░░░░░ 40%
```

**Option 2: Badge with Percentage**
```
HIGH (92%)       [Green badge]
MEDIUM (68%)     [Yellow badge]
LOW (35%)        [Red badge]
```

**Option 3: Radial Progress**
```
      92%
    ⭐⭐⭐⭐⭐
  (High Confidence)
```

---

## 🔄 **Loading & Error States**

### **Loading Skeleton (Placeholder)**

Shows gray shimmer animations representing:
- Text lines of varying widths
- Rectangular areas for cards
- Avatar circles for images
- Duration: Until real content loads

### **Empty States**

```
┌────────────────────────────────────┐
│                                     │
│            [🎯 Icon]               │
│                                     │
│   No transcriptions yet             │
│   Capture or upload audio to get    │
│   started                           │
│                                     │
│          [Get Started]              │
│                                     │
└────────────────────────────────────┘
```

### **Error States**

```
┌────────────────────────────────────┐
│                                     │
│           [⚠ Error Icon]           │
│                                     │
│   Failed to generate document       │
│   The AI service is temporarily     │
│   unavailable. Please try again.    │
│                                     │
│    [Try Again]  [Go Back]          │
│                                     │
└────────────────────────────────────┘
```

---

## 📋 **Form Validation Patterns**

### **Real-time Validation**

**As User Types:**
1. Initial empty state: No feedback
2. Invalid entry: Red border + error message appears
3. Valid entry: Green checkmark appears
4. Corrected: Checkmark confirms fix

### **Submission Validation**

**Before Allowing Submit:**
- Highlight all invalid fields in red
- Show summary error message at top
- Focus to first invalid field
- Disable submit button
- Clear button to reset all

### **Async Validation (Email, Medical ID)**

Show loading indicator while checking:
```
Medical ID: MD-001 [Checking...]
```

Then show result:
```
Medical ID: MD-001 [✓ Available]
or
Medical ID: MD-001 [✗ Already in use]
```

---

## 🎬 **Animation & Transition Specifications**

### **Page Transitions**

- **Fade in:** 300ms ease-out when entering new page
- **Slide in:** 200ms slide from right for forward navigation
- **Slide out:** 200ms slide to left for back navigation

### **Element Animations**

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Fade in | 300ms | ease-out | New elements, content reveal |
| Fade out | 200ms | ease-in | Dismissing elements |
| Slide up | 250ms | ease-out | Bottom sheet entry |
| Slide down | 250ms | ease-in | Bottom sheet exit |
| Scale in | 200ms | ease-out | Modal appearance |
| Pulse | 2s infinite | ease-in-out | Loading state indicator |
| Rotate | Variable | linear | Loading spinner |
| Bounce | 500ms | ease-in-out | Success confirmation |

### **Micro-interactions**

- **Button click:** 50ms press animation, release bounce
- **Checkbox toggle:** 100ms fill animation
- **Dropdown open:** 150ms height expansion
- **Toast appear:** 300ms slide-in from bottom
- **Loading bar:** Continuous smooth progress animation

---

## 🌍 **Browser & Platform Support**

### **Minimum Requirements**

- **Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile OS:** iOS 12+, Android 8+
- **Screen Size:** Minimum 320px width
- **JavaScript:** ES6+ required
- **Network:** Works with 3G+ connections (with degradation)

### **Performance Targets**

- **Page Load:** < 2 seconds on 4G
- **Interaction Response:** < 100ms
- **Scrolling Framerate:** 60fps
- **First Contentful Paint:** < 1.5 seconds
- **Largest Contentful Paint:** < 2.5 seconds

---

## 📱 **Mobile-First Design Principles**

### **Implementation Strategy**

1. **Design for mobile first** (smallest screen)
2. **Add complexity progressively** for larger screens
3. **Test on real devices** (not just browser emulation)
4. **Prioritize single-column layout** on mobile
5. **Larger touch targets** for mobile (48px minimum)
6. **Minimize typing** on mobile (use selectors, dropdowns)
7. **Progressive disclosure** (tabs, modals, expandable sections)

### **Mobile-Specific Features**

- **Bottom sheet modals** instead of center modals
- **Swipe gestures** for navigation
- **Device microphone** access for recording
- **Offline support** when possible
- **Battery optimization** (reduce animations)
- **Network awareness** (cache when offline)

---

## 🎨 **Design Tokens & Specifications**

### **Spacing Scale**

```
0px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
```

### **Typography**

| Element | Font Size | Font Weight | Line Height | Usage |
|---------|-----------|-------------|-------------|-------|
| H1 | 32px | 700 | 1.25 | Page title |
| H2 | 24px | 700 | 1.35 | Section title |
| H3 | 20px | 600 | 1.4 | Subsection |
| Body | 16px | 400 | 1.5 | Main content |
| Small | 14px | 400 | 1.5 | Secondary text |
| Tiny | 12px | 400 | 1.4 | Helper/meta text |
| Mono | 14px | 400 | 1.6 | Code/timestamps |

### **Border Radius**

```
0px (no radius)
4px (subtle)
8px (standard)
12px (larger)
16px (rounded cards)
24px+ (very rounded)
```

### **Shadows**

```
Subtle:   0 1px 2px rgba(0,0,0,0.05)
Small:    0 1px 3px rgba(0,0,0,0.1)
Medium:   0 4px 6px rgba(0,0,0,0.1)
Large:    0 10px 15px rgba(0,0,0,0.1)
Extra:    0 20px 25px rgba(0,0,0,0.1)
```

---

## ✅ **Design Checklist for Developers**

Before marking any screen/component as complete:

- [ ] Responsive on mobile (320px), tablet (640px), desktop (1024px)
- [ ] All buttons are 44-48px minimum height
- [ ] All text is readable (min 14px, high contrast)
- [ ] Form inputs have labels and helper text
- [ ] Error states are clear (red, icon, message)
- [ ] Loading states have spinners or skeleton
- [ ] Empty states have helpful message and CTA
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Touch targets have adequate spacing
- [ ] Hover states visible and intuitive
- [ ] Animations are smooth (not janky)
- [ ] Colors meet WCAG AA contrast requirements
- [ ] No horizontal scroll on mobile
- [ ] Font sizes are consistent
- [ ] Spacing follows design scale
- [ ] Icons are consistent and clear
- [ ] Modals have close button
- [ ] Toasts auto-dismiss or allow manual close
- [ ] Forms can be submitted with keyboard
- [ ] Images/icons have alt text or ARIA labels
- [ ] Page titles are descriptive

---

## 🚀 **Design System Deliverables**

### **Component Library (Needed from Designers)**

- [ ] Button component (all states)
- [ ] Input field component (all states)
- [ ] Dropdown/Select component
- [ ] Card component (variants)
- [ ] Badge component (all variants)
- [ ] Modal/Dialog component
- [ ] Toast/Notification component
- [ ] Tabs component
- [ ] Accordion component
- [ ] Chart components (line, bar, pie)
- [ ] Breadcrumb component
- [ ] Pagination component
- [ ] Loading skeleton/shimmer
- [ ] Avatar component
- [ ] Alert component

### **Icon Set (Needed)**

- Recording controls (record, stop, play, pause)
- Navigation (back, forward, menu, close)
- Actions (edit, delete, copy, download)
- Status (success, error, warning, info)
- Indicators (checkmark, X, arrow, chevron)
- Utilities (search, filter, settings, help)

---

## 📸 **Visual Hierarchy & Layout Grid**

### **Visual Hierarchy Principles**

1. **Most Important:** Largest, brightest, center
   - Primary CTA button (Generate, Save, Continue)
   - Current patient/document being worked on
   
2. **Important:** Medium size, clear labels
   - Section headers
   - Form fields
   - Data displays
   
3. **Supporting:** Smaller, secondary color
   - Helper text
   - Secondary buttons
   - Timestamps
   
4. **Minimal:** Smallest, lightest
   - Dividers
   - Icons
   - Borders

### **8px Grid System**

All layouts use multiples of 8px:
- Card padding: 16px or 24px
- Section margins: 24px or 32px
- Button padding: 8px horizontal, 12px vertical (min)
- Input height: 40px or 48px

---

## 🎯 **Final Design Handoff Checklist**

Before handing off to development:

**Design Files:**
- [ ] All screens documented in Figma/XD
- [ ] Component library created
- [ ] Design tokens exported
- [ ] Responsive variants shown
- [ ] Interactive states documented
- [ ] Annotations for animations
- [ ] Color palette with hex codes
- [ ] Typography specs with exact values

**Documentation:**
- [ ] This UI/UX guide completed
- [ ] User flows documented
- [ ] Wireframes for all major pages
- [ ] Interaction patterns specified
- [ ] Accessibility requirements listed
- [ ] Performance requirements specified

**Assets:**
- [ ] Icon set provided (SVG)
- [ ] Logo and branding assets
- [ ] Color swatches
- [ ] Font files
- [ ] Sample images/placeholder graphics

---

## 🎨 **Design Inspiration & References**

### **Similar Healthcare Apps to Reference**

- **Epic** - Professional healthcare platform
- **Teladoc** - Telehealth interface patterns
- **CVS/Aetna** - Patient management examples
- **Apple Health** - Clean health data presentation
- **Fitbit** - Activity tracking visualizations

### **Interaction Patterns to Study**

- Audio player UX (YouTube, Spotify)
- Document review workflows (Google Docs)
- Medical data visualization (healthcare dashboards)
- Real-time collaboration (Figma)
- Form-based workflows (Typeform, Stripe)

---

## 💡 **Design Philosophy**

**Clinical Companion's Design Should Feel:**
- ✅ **Trustworthy** - Healthcare context requires confidence
- ✅ **Efficient** - Doctors have limited time
- ✅ **Clear** - Medical accuracy over aesthetics
- ✅ **Responsive** - Works on any device
- ✅ **Accessible** - Inclusive for all users
- ✅ **Professional** - Fits healthcare environment
- ✅ **Intuitive** - No training needed
- ❌ **Not trendy** - Lasting, not fashionable
- ❌ **Not cluttered** - Minimize cognitive load
- ❌ **Not slow** - Performance critical

---

## 📞 **Design Support & Questions**

This guide should answer:
- Where should [X] component go?
- What should [X] screen look like?
- How should users interact with [X]?
- What states does [X] need?
- How should [X] respond on mobile?

If questions remain, refer back to the user personas and workflow journeys to determine what serves the doctor's needs best.

