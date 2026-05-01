# Heidi Scribe - UI/UX Wireframe & Design Guide

## Overview
**Heidi Scribe** is a distraction-free, AI-powered writing and transcription platform designed specifically for healthcare professionals. The interface prioritizes clarity, minimal cognitive load, and seamless integration of voice-to-text and AI assistance.

---

## Part 1: Wireframe Design (Low-Fidelity)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  Logo    Document Title (Editable)    User Profile | Settings   │  ← Top Navigation
├──────────┬─────────────────────────────────┬────────────────────┤
│          │                                 │                    │
│ Document │      MAIN EDITOR AREA          │   AI ASSISTANT     │
│ List     │                                 │   PANEL            │
│          │    ┌─────────────────────┐      │                    │
│ Search   │    │ Writing Canvas      │      │ • Suggestions     │
│ Filter   │    │                     │      │ • Actions         │
│          │    │ [+] Recording       │      │ • Inline Hints    │
│ ────     │    │ [⏹] Timer: 0:15     │      │                    │
│          │    │                     │      │ ┌──────────────┐  │
│ Recent   │    │ Cursor blinking...  │      │ │  Summarize   │  │
│ • Doc1   │    │                     │      │ └──────────────┘  │
│ • Doc2   │    │                     │      │ ┌──────────────┐  │
│ • Doc3   │    │                     │      │ │  Rewrite     │  │
│          │    │                     │      │ └──────────────┘  │
│          │    │                     │      │ ┌──────────────┐  │
│          │    │                     │      │ │Key Points    │  │
│          │    │                     │      │ └──────────────┘  │
│          │    └─────────────────────┘      │                    │
│          │         │                       │                    │
│          │    [🎤] [⏸] [⏹] [↗️]           │                    │
│          │     Mic  Pause Stop Upload     │                    │
└──────────┴─────────────────────────────────┴────────────────────┘
```

### Component Breakdown

#### 1. Top Navigation Bar
- **Left**: Logo (HS icon)
- **Center**: Document title (editable field, click to rename)
- **Right**: User profile icon, settings gear, quick options

#### 2. Left Sidebar (Document Management)
- Search bar for filtering documents
- Filter options (by date, type, status)
- Divider line
- Recent documents list
- Document metadata (date modified, word count)

#### 3. Main Editor Area
- **Canvas**: Large writing area with minimal borders
- **Recording Indicator**: Visual feedback (pulsing dot, timer)
- **Real-time Transcription**: Text appears as user speaks
- **Control Bar**: Fixed or floating bar with Record, Pause, Stop, Upload buttons
- **Microphone Status**: Clear indicator (listening, recording, ready)

#### 4. Right Sidebar (AI Assistant Panel)
- **Suggestions Section**: Grammar, clarity, tone recommendations
- **Action Buttons**: Summarize, Rewrite, Highlight Key Points
- **Inline Suggestions**: Highlights in editor with accept/reject options
- **Processing Indicator**: Shows when AI is thinking

---

## Part 2: Visual States

### State 1: Empty State (Initial Load)
```
┌────────────────────────────────────┐
│                                    │
│         ╭─────────────────╮        │
│         │  🎤 Start Here  │        │
│         │  Click to speak │        │
│         │    or type...   │        │
│         ╰─────────────────╯        │
│                                    │
│    "Begin by speaking or typing.  │
│     AI will assist as you write." │
│                                    │
└────────────────────────────────────┘
```

### State 2: Active Recording
```
┌────────────────────────────────────┐
│  🔴 LIVE • ⏱️ 0:42                  │  ← Pulsing indicator
│                                    │
│  Your clinical assessment goes     │
│  here as you speak. Real-time      │
│  transcription captures your       │
│  words accurately.                 │
│                                    │
│  [🎤 RECORDING] [⏸] [⏹] [↗️]       │
│                                    │
│  Right Panel:                      │
│  ✓ Suggestion 1: Add specificity  │
│  ✓ Suggestion 2: Clarify timeline │
│                                    │
└────────────────────────────────────┘
```

### State 3: Paused
```
┌────────────────────────────────────┐
│  ⏸️ PAUSED • ⏱️ 1:05                 │
│                                    │
│  [Your transcribed text here]      │
│                                    │
│  [🎤 RESUME] [⏹] [↗️]              │
│                                    │
└────────────────────────────────────┘
```

### State 4: AI Processing
```
┌────────────────────────────────────┐
│  💭 AI Assistant Processing...     │
│                                    │
│  ⟳ Generating suggestions...      │
│  ⟳ Analyzing tone...              │
│  ⟳ Creating summary...            │
│                                    │
│  [Wait] [Cancel]                  │
│                                    │
└────────────────────────────────────┘
```

### State 5: Error State
```
┌────────────────────────────────────┐
│  ⚠️ Microphone Connection Lost     │
│                                    │
│  Your text has been saved.         │
│  Please check your microphone      │
│  connection and try again.         │
│                                    │
│  [💾 Saved] [🔄 Retry] [📋 Copy]   │
│                                    │
└────────────────────────────────────┘
```

---

## Part 3: Color Palette & Typography

### Primary Colors
| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| Primary Accent | Medical Blue | #0066CC | Action buttons, active indicators |
| Recording Red | Alert Red | #DC2626 | Recording indicator, live badge |
| Success Green | Healing Green | #10B981 | Saved status, accepted suggestions |
| Background | Off-White | #F9FAFB | Main canvas background |
| Text Primary | Dark Gray | #1F2937 | Body text |
| Text Secondary | Medium Gray | #6B7280 | Labels, hints |
| Border | Light Gray | #E5E7EB | Dividers, subtle borders |

### Typography
- **Headers**: "Geist Sans" (Bold 24-32px)
- **Body Text**: "Geist Sans" (Regular 14-16px)
- **Document Title**: "Geist Sans" (SemiBold 18px)
- **Metadata**: "Geist Mono" (Regular 12px)

---

## Part 4: Component Specifications

### 1. Document Title Input
```
┌──────────────────────────────────┐
│ Patient Encounter Note 04/15     │  ← Hover: "Click to edit"
│ Last edited: 2 minutes ago       │
└──────────────────────────────────┘
```
- Editable on click
- Auto-save on blur
- Character limit: 100
- Format: "[Type] [Patient] [Date]"

### 2. Recording Control Bar
```
┌─────────────────────────────────────┐
│  [🎤] [⏸] [⏹] [↗️] [📋]             │
│                                     │
│ Mic St: 🟢 Ready                    │
│ Timestamp: 0:00 / Duration: --:--  │
└─────────────────────────────────────┘
```
- **Mic Button**: Toggle recording on/off
- **Pause Button**: Pause ongoing recording
- **Stop Button**: End recording
- **Upload Button**: Save/export the recording
- **Copy Button**: Copy transcribed text to clipboard

### 3. Microphone Status Indicator
```
🟢 Ready        — Microphone initialized, waiting for input
🔴 Recording    — Currently capturing audio
🟡 Paused       — Recording paused, can resume
⚫ Offline       — No microphone connection
🔇 Muted        — Microphone muted by system
```

### 4. AI Suggestions Panel Item
```
┌─────────────────────────────────┐
│ ✨ Grammar Suggestion            │
│                                 │
│ Current: "The patient were..."  │
│ Better:  "The patient was..."   │
│                                 │
│ [✓ Accept] [✗ Reject]          │
└─────────────────────────────────┘
```

### 5. Inline Suggestion (Editor)
```
┌────────────────────────────────────┐
│ The patient reported experiencing  │
│ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ← Wavy underline (suggestion)
│ severe [?] headaches.              │
│                   ↓
│         [Clarify timeline]        │ ← Tooltip on hover
│         [Add severity details]    │
│         [Dismiss]                 │
└────────────────────────────────────┘
```

### 6. Empty State CTA
```
┌───────────────────────────────────────┐
│                                       │
│          🎙️ Start Recording           │
│                                       │
│     Tap the microphone above or       │
│     begin typing below. Heidi will    │
│     assist with clarity and format.  │
│                                       │
│         [Start Recording]             │
│         [Start Typing]                │
│                                       │
└───────────────────────────────────────┘
```

---

## Part 5: Responsive Design Breakpoints

### Desktop (1920px+)
- Full sidebar + editor + AI panel (3-column layout)
- All features visible simultaneously
- Floating control bar below editor

### Tablet (768px - 1919px)
- Collapsible left sidebar
- EditorCenter focus
- Right AI panel collapses to side drawer
- Bottom control bar fixed

### Mobile (< 768px)
- Stacked layout (vertical)
- Document list as drawer (swipe from left)
- Full-width editor
- AI panel as bottom sheet
- Control bar as persistent footer

---

## Part 6: High-Fidelity UI Design

### Color System for Heidi Scribe
```
Light Theme:
├── Background: #FFFFFF
├── Surface: #F3F4F6
├── Primary: #0066CC (Medical Blue)
├── Recording: #DC2626 (Alert Red)
├── Success: #10B981 (Green)
├── Warning: #F59E0B (Amber)
├── Error: #EF4444 (Red)
└── Text:
    ├── Primary: #111827 (Black)
    ├── Secondary: #6B7280 (Gray)
    └── Tertiary: #9CA3AF (Light Gray)

Dark Theme:
├── Background: #0F172A
├── Surface: #1E293B
├── Primary: #3B82F6 (Lighter Blue)
├── Recording: #F87171 (Lighter Red)
├── Success: #34D399 (Lighter Green)
└── Text:
    ├── Primary: #F1F5F9
    ├── Secondary: #CBD5E1
    └── Tertiary: #94A3B8
```

### Typography Scale
```
Heading 1 (H1): 32px, Bold, Line height 1.2
Heading 2 (H2): 24px, SemiBold, Line height 1.3
Heading 3 (H3): 18px, SemiBold, Line height 1.4
Body Large: 16px, Regular, Line height 1.5
Body Default: 14px, Regular, Line height 1.6
Body Small: 12px, Regular, Line height 1.5
Caption: 11px, Regular, Line height 1.4
```

### Spacing System (8px base)
```
xs: 4px (0.5rem)
sm: 8px (1rem)
md: 16px (2rem)
lg: 24px (3rem)
xl: 32px (4rem)
2xl: 48px (6rem)
```

### Border Radius
```
sm: 4px (small buttons, inputs)
md: 8px (cards, modals)
lg: 12px (larger panels)
full: 9999px (pill buttons, avatars)
```

### Shadows
```
Subtle: 0 1px 2px rgba(0,0,0,0.05)
Small: 0 1px 3px rgba(0,0,0,0.1)
Medium: 0 4px 6px rgba(0,0,0,0.1)
Large: 0 10px 15px rgba(0,0,0,0.1)
xlarge: 0 20px 25px rgba(0,0,0,0.1)
```

---

## Part 7: Interaction Design

### Recording Flow
```
1. User clicks "Start Recording" button
   ↓
2. Microphone permission requested (if needed)
   ↓
3. Visual feedback: Red pulsing dot appears, timer starts
   ↓
4. Real-time transcription streams in
   ↓
5. User speaks naturally; AI listens and suggests
   ↓
6. User clicks "Stop" or "Save"
   ↓
7. Document auto-saves; suggestions finalized
```

### Suggestion Interaction
```
1. User pauses typing/speaking
   ↓
2. AI analyzes the text (1-2 seconds)
   ↓
3. Suggestions appear in right panel with wavy underlines
   ↓
4. User hovers over suggestion → tooltip shows alternatives
   ↓
5. User clicks "Accept" or "Reject"
   ↓
6. Document updates automatically
```

### Document Sharing
```
User clicks "Share" button
   ↓
Modal opens with options:
   ├── Export as PDF
   ├── Copy link (shareable)
   ├── Share with patient
   └── Print
```

---

## Part 8: Branding & Visual Design Elements

### Logo Placement
- Top-left of navbar: 40x40px icon
- Favicon: 32x32px version

### Icon Style
- **Set**: Line icons (Lucide/Feather style)
- **Size**: 20px for buttons, 16px for labels
- **Weight**: 2px stroke

### Animation & Transitions
```
Button hover: 200ms ease-in-out (scale 1.05)
Recording indicator: 600ms pulse (opacity 0.5 → 1.0)
Slide-in panels: 300ms ease-out
Fade overlays: 200ms ease-in-out
Text input: 150ms focus ring appearance
```

### Accessibility
- Minimum contrast ratio: 4.5:1 for text on background
- Focus states: 2px solid outline, 4px offset
- Keyboard navigation: Tab order logical and visible
- Screen reader: ARIA labels on all interactive elements
- Color not as sole indicator: Always use icons/text too

---

## Part 9: Component Library

### Button Variants
```
Primary (Action):
  Resting: #3B82F6 background, white text
  Hover: #2563EB (darker)
  Active: #1D4ED8 (even darker)
  Disabled: #D1D5DB (gray)

Secondary (Alternative):
  Resting: #E5E7EB border, #1F2937 text
  Hover: #F3F4F6 background
  Active: #E5E7EB background

Danger (Destructive):
  Resting: #EF4444 background
  Hover: #DC2626
  Active: #B91C1C

Ghost (Minimal):
  Resting: Transparent
  Hover: #F3F4F6 background
  Active: #E5E7EB background
```

### Input Fields
```
Default state:
  Border: 1px solid #E5E7EB
  Background: #FFFFFF
  Cursor: text
  
Focus state:
  Border: 2px solid #3B82F6
  Box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
  
Error state:
  Border: 2px solid #EF4444
  Background: #FEF2F2
  
Disabled state:
  Border: 1px solid #E5E7EB
  Background: #F9FAFB
  Opacity: 0.5
```

### Cards/Panels
```
Elevation: 0 1px 3px rgba(0,0,0,0.1)
Border: 1px solid #E5E7EB
Border-radius: 8px
Padding: 16px
Background: #FFFFFF
Hover: Subtle shadow increase, cursor pointer
```

---

## Part 10: Feature Specifications

### Real-Time Transcription Engine
- **Latency**: < 500ms between speech and text display
- **Accuracy**: 95%+ for medical terminology
- **Languages**: English (primary), Spanish, French (future)
- **Audio Format**: PCM 16-bit, 16kHz sample rate

### AI Assistance Engine
- **Response Time**: 1-2 seconds for suggestions
- **Suggestion Types**:
  - Grammar & syntax
  - Tone detection (professional, empathetic, etc.)
  - Medical terminology validation
  - Completeness check (missing key fields)
- **Learning**: Adapts to user preferences over time

### Document Management
- **Auto-save**: Every 10 seconds during active editing
- **Version History**: Last 30 versions retained
- **Backup**: Cloud backup every 1 hour
- **Search**: Full-text search with filters
- **Export**: PDF, DOCX, TXT formats

### Performance Metrics
- **Page Load**: < 2 seconds
- **Transcription Latency**: < 500ms
- **AI Suggestion Response**: 1-2 seconds
- **Save Operation**: < 1 second
- **Network Resilience**: Works offline, syncs on reconnect

---

## Part 11: User Flows

### Flow 1: New Document Creation
```
Start → Click "New Document" → Name prompt → Select template (optional)
→ Editor opens → Ready to record/type → User begins input
→ AI provides real-time assistance → User completes document
→ Auto-saves → User can export/share
```

### Flow 2: Import Existing Audio
```
Start → Click "Upload Audio" → Select .mp3/.wav file → Choose language
→ Transcription processing (notification) → Review & edit transcript
→ AI suggestions applied → User accepts/rejects → Document ready
```

### Flow 3: Patient Linking (Optional)
```
While editing → Click "Link Patient" (optional) → Search patient database
→ Select patient from results → Confirm link → Metadata auto-fills
→ Document tagged with patient ID → Shareable with EHR
```

---

## Part 12: Accessibility Features

### Keyboard Shortcuts
```
Ctrl/Cmd + N    → New document
Ctrl/Cmd + S    → Save document
Ctrl/Cmd + Z    → Undo
Ctrl/Cmd + Y    → Redo
Ctrl/Cmd + /    → Command palette
Space           → Start/Pause recording (when focused)
Tab             → Navigate between elements
Enter           → Confirm action
Escape          → Close modal/dismiss suggestion
```

### Screen Reader Support
```
- Document title announced on page load
- Recording status announced with live region
- Suggestions announced with priority level
- Button functions clearly labeled
- Form fields have associated labels
- Errors announced with alert role
```

### High Contrast Mode
```
- Enhanced borders: 2px instead of 1px
- Increased color contrast: 7:1 ratio
- Focus indicators: More prominent
- Icons duplicated with text labels
```

---

## Part 13: Success Criteria & Analytics

### Key Performance Indicators (KPIs)
```
1. User Engagement
   - Daily active users (DAU)
   - Document creation rate
   - Average session duration

2. Transcription Quality
   - Accuracy rate (target: >95%)
   - User correction rate
   - AI suggestion acceptance rate

3. Performance
   - Page load time (target: <2s)
   - Transcription latency (target: <500ms)
   - Error rate (target: <1%)

4. User Satisfaction
   - NPS (Net Promoter Score)
   - Feature adoption rate
   - Support ticket volume
```

### Analytics Events to Track
```
- Document created
- Recording started/stopped
- Suggestion accepted/rejected
- Export initiated
- Patient linked
- Error encountered
- Feature used (Summarize, Rewrite, etc.)
```

---

## Part 14: Development Roadmap

### Phase 1 (MVP) - Weeks 1-3
- [ ] Core editor with basic text input
- [ ] Microphone access & permission handling
- [ ] Real-time transcription integration
- [ ] Basic AI suggestions (grammar)
- [ ] Auto-save functionality
- [ ] Document list view

### Phase 2 (Enhancement) - Weeks 4-6
- [ ] Advanced AI features (tone, completeness)
- [ ] Patient linking (optional)
- [ ] Export functionality (PDF, DOCX)
- [ ] Dark mode support
- [ ] Offline recording capability
- [ ] Version history

### Phase 3 (Polish) - Weeks 7-8
- [ ] Mobile-responsive design
- [ ] Accessibility audit & fixes
- [ ] Performance optimization
- [ ] User onboarding flow
- [ ] Analytics integration
- [ ] Beta testing & feedback loops

### Phase 4 (Future) - Post-Launch
- [ ] Multi-language support
- [ ] Custom templates per specialty
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] EHR integrations
- [ ] Mobile native apps

---

## Part 15: File Structure & Components

### React Component Structure
```
src/
├── components/
│   ├── heidi-scribe/
│   │   ├── HeiditScribeMain.tsx          (Main container)
│   │   ├── EditorWorkspace.tsx           (Central editor)
│   │   ├── TopNavigation.tsx             (Header with title)
│   │   ├── LeftSidebar.tsx               (Document list)
│   │   ├── RightAIPanel.tsx              (Suggestions)
│   │   ├── RecordingControlBar.tsx       (Recording controls)
│   │   ├── MicrophoneStatus.tsx          (Mic indicator)
│   │   ├── SuggestionCard.tsx            (Single suggestion)
│   │   ├── InlineHint.tsx                (Editor hints)
│   │   └── EmptyState.tsx                (Initial state)
│   └── ...
├── hooks/
│   ├── useTranscription.ts               (Transcription logic)
│   ├── useAISuggestions.ts               (AI suggestions)
│   ├── useRecording.ts                   (Recording state)
│   └── useDocumentMgmt.ts                (Document management)
├── types/
│   └── scribe.ts                         (TypeScript types)
├── pages/
│   └── HeidiScribePage.tsx               (Page wrapper)
└── ...
```

---

## Part 16: Implementation Notes

### Technology Stack
- **Frontend**: React 18+, TypeScript
- **State Management**: Context API + zustand
- **Styling**: Tailwind CSS + shadcn/ui
- **Recording**: Web Audio API
- **Transcription**: OpenAI Whisper API or similar
- **AI Suggestions**: GPT-4 API or Claude
- **Database**: Firebase/Supabase
- **Deployment**: Vercel/Netlify

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 14+, Chrome Android

### Performance Optimization
- Code splitting for editor components
- Lazy load AI panel on first interaction
- Debounce transcription display (100ms)
- Virtualize document list (if >100 items)
- Service Worker for offline support
- Gzip compression for APIs

---

## Conclusion

Heidi Scribe combines the power of AI with a distraction-free interface designed for modern healthcare professionals. The emphasis on simplicity, performance, and optional features (like patient linking) makes it accessible and flexible for various use cases and preferences.

---

**Contact**: For questions about the design, contact the UI/UX team.
**Last Updated**: May 2026
**Version**: 1.0
