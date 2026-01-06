// Clinical Types for ITranscript360

export type DocumentStatus = 'draft' | 'reviewed' | 'final';

export type WorkflowStep = 'capture' | 'review' | 'summarize' | 'patient-hub' | 'demographics' | 'corrections';

export type SummaryType = 'soap' | 'discharge' | 'referral' | 'progress' | 'custom';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export type SeverityLevel = 'low' | 'medium' | 'high';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  medicalId: string;
  contact?: string;
  primaryCondition?: string;
  lastVisit?: Date;
  aiSummary?: string;
  alerts?: PatientAlert[];
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
  audioUrl?: string;
  rawText: string;
  improvedText: string;
  segments: TranscriptSegment[];
  duration?: number;
  createdAt: Date;
}

export interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  isAiImproved?: boolean;
  originalText?: string;
}

export interface ClinicalInsight {
  id: string;
  type: 'finding' | 'diagnosis' | 'alert' | 'task';
  title: string;
  content: string | string[];
  confidence: ConfidenceLevel;
  severity?: SeverityLevel;
  reasoning?: string;
}

export interface DifferentialDiagnosis {
  id: string;
  condition: string;
  likelihood: 'possible' | 'probable' | 'likely';
  reasoning?: string;
}

export interface SafetyAlert {
  id: string;
  type: 'drug-interaction' | 'allergy' | 'risk' | 'contraindication';
  title: string;
  description: string;
  severity: SeverityLevel;
}

export interface ClinicalTask {
  id: string;
  task: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completed: boolean;
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
