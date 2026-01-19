// Clinical Types for ITranscript360

export type DocumentStatus = 'draft' | 'reviewed' | 'final';

export type WorkflowStep = 'capture' | 'review' | 'summarize' | 'patient-hub' | 'demographics' | 'corrections' | 'transcriptions';

export type SummaryType = 'soap' | 'discharge' | 'referral' | 'progress' | 'custom';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export type SeverityLevel = 'low' | 'medium' | 'high';

export type SpeakerRole = 'clinician' | 'patient' | 'caregiver' | 'unknown';

export type VisitType = 'new-patient' | 'follow-up' | 'post-op' | 'mental-health' | 'urgent' | 'routine' | 'telehealth';

export type AudioQuality = 'excellent' | 'good' | 'fair' | 'poor';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  medicalId: string;
  contact?: string;
  contactNumber?: string;
  primaryCondition?: string;
  lastVisit?: Date;
  aiSummary?: string;
  alerts?: PatientAlert[];
  allergies?: string;
  currentMedications?: string;
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
  };
}

export interface PatientAlert {
  id: string;
  type: 'allergy' | 'medication' | 'condition' | 'risk';
  message: string;
  severity: SeverityLevel;
}

export interface Visit {
  id: string;
  patientId: string;
  date: Date;
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine';
  diagnosis?: string;
  notes?: string;
  transcriptId?: string;
}

export interface Transcript {
  id: string;
  visitId?: string;
  patientId?: string;
  patientName?: string;
  audioUrl?: string;
  rawText: string;
  improvedText: string;
  segments: TranscriptSegment[];
  duration?: number;
  createdAt: Date;
  visitType?: VisitType;
  title?: string;
  audioQuality?: AudioQuality;
  qualityWarnings?: QualityWarning[];
  linkedPatientId?: string;
}

export interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  speakerRole?: SpeakerRole;
  isAiImproved?: boolean;
  originalText?: string;
  isClinical?: boolean;
  confidenceScore?: number;
  isRedacted?: boolean;
  redactedReason?: string;
  hasQualityIssue?: boolean;
  qualityIssue?: string;
}

export interface ClinicalInsight {
  id: string;
  type: 'finding' | 'diagnosis' | 'alert' | 'task';
  title: string;
  content: string | string[];
  confidence: ConfidenceLevel;
  severity?: SeverityLevel;
  reasoning?: string;
  linkedSegmentIds?: string[];
  linkedTimestamps?: number[];
  explanation?: string;
  isSuppressed?: boolean;
  suppressionReason?: string;
}

export interface DifferentialDiagnosis {
  id: string;
  condition: string;
  likelihood: 'possible' | 'probable' | 'likely';
  reasoning?: string;
  linkedSegmentIds?: string[];
  explanation?: string;
}

export interface SafetyAlert {
  id: string;
  type: 'drug-interaction' | 'allergy' | 'risk' | 'contraindication';
  title: string;
  description: string;
  severity: SeverityLevel;
  linkedSegmentIds?: string[];
}

export interface ClinicalTask {
  id: string;
  task: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
  isImplicit?: boolean;
  source?: 'explicit' | 'inferred';
  linkedSegmentId?: string;
}

export interface CorrectionEntry {
  id: string;
  original: string;
  corrected: string;
  createdAt: Date;
}

export interface VitalSign {
  date: Date;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  heartRate?: number;
  temperature?: number;
  oxygenSaturation?: number;
  weight?: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  active: boolean;
}

// Ambient Mode Types
export interface AmbientSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  clinicalMoments: ClinicalMoment[];
  segments: TranscriptSegment[];
  visitType?: VisitType;
  patientId?: string;
  patientName?: string;
  autoDetectedVisitType?: VisitType;
}

export interface ClinicalMoment {
  id: string;
  timestamp: number;
  type: 'symptom' | 'diagnosis' | 'medication' | 'instruction' | 'question' | 'history';
  content: string;
  confidence: number;
  segmentId: string;
}

// Clinician Style Profile
export interface ClinicianStyleProfile {
  id: string;
  clinicianId: string;
  noteLength: 'concise' | 'moderate' | 'detailed';
  tone: 'formal' | 'conversational' | 'clinical';
  formatting: 'structured' | 'narrative' | 'bullet-points';
  preferredTerminology: string[];
  abbreviationPreference: 'expand' | 'abbreviate' | 'mixed';
  editHistory: StyleEdit[];
  learningProgress: number;
}

export interface StyleEdit {
  id: string;
  timestamp: Date;
  originalText: string;
  editedText: string;
  type: 'length' | 'tone' | 'terminology' | 'formatting';
}

// Refinement Types
export interface RefinementVersion {
  id: string;
  version: number;
  timestamp: Date;
  content: string;
  changes: RefinementChange[];
  author: 'ai' | 'clinician';
}

export interface RefinementChange {
  id: string;
  type: 'diagnosis-clarification' | 'plan-rewording' | 'finding-addition' | 'terminology-update';
  originalText: string;
  newText: string;
  reason?: string;
}

// Quality Warning Types
export interface QualityWarning {
  id: string;
  type: 'poor-audio' | 'overlapping-speech' | 'background-noise' | 'unclear-segment';
  message: string;
  severity: SeverityLevel;
  affectedSegmentIds: string[];
  timestamp?: number;
}

// Confidence Suppression Settings
export interface ConfidenceSettings {
  threshold: number;
  showSuppressedWarnings: boolean;
  suppressedCategories: string[];
}

// Redaction Settings
export interface RedactionSettings {
  autoRedactSmallTalk: boolean;
  autoRedactIdentifiers: boolean;
  redactedPatterns: string[];
  clinicianOverrides: string[];
}

// Patient-Transcript Link
export interface PatientTranscriptLink {
  id: string;
  patientId: string;
  transcriptId: string;
  visitType: VisitType;
  autoGeneratedTitle: string;
  timestamp: Date;
}

// Recent Transcription Entry (enhanced)
export interface RecentTranscription {
  id: string;
  title: string;
  patientId?: string;
  patientName?: string;
  visitType?: VisitType;
  timestamp: Date;
  duration: number;
  status: 'completed' | 'processing' | 'error';
  hasQualityIssues: boolean;
}
