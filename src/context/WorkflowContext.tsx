import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WorkflowStep, DocumentStatus, Patient, Transcript, AmbientSession, ClinicianStyleProfile, VisitType, ConfidenceSettings, RedactionSettings } from '@/types/clinical';
import { mockStyleProfile } from '@/data/mockData';

interface WorkflowContextType {
  currentStep: WorkflowStep;
  setCurrentStep: (step: WorkflowStep) => void;
  documentStatus: DocumentStatus;
  setDocumentStatus: (status: DocumentStatus) => void;
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  currentTranscript: Transcript | null;
  setCurrentTranscript: (transcript: Transcript | null) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
  completedSteps: WorkflowStep[];
  markStepComplete: (step: WorkflowStep) => void;
  
  // Ambient Mode
  isAmbientMode: boolean;
  setIsAmbientMode: (ambient: boolean) => void;
  ambientSession: AmbientSession | null;
  setAmbientSession: (session: AmbientSession | null) => void;
  
  // Minimal Interaction Mode
  isMinimalMode: boolean;
  setIsMinimalMode: (minimal: boolean) => void;
  
  // Clinician Style Profile
  styleProfile: ClinicianStyleProfile;
  setStyleProfile: (profile: ClinicianStyleProfile) => void;
  
  // Visit Type
  selectedVisitType: VisitType | null;
  setSelectedVisitType: (type: VisitType | null) => void;
  
  // Confidence Settings
  confidenceSettings: ConfidenceSettings;
  setConfidenceSettings: (settings: ConfidenceSettings) => void;
  
  // Redaction Settings
  redactionSettings: RedactionSettings;
  setRedactionSettings: (settings: RedactionSettings) => void;
  
  // Patient Linking
  linkedPatientId: string | null;
  setLinkedPatientId: (id: string | null) => void;
}

const defaultConfidenceSettings: ConfidenceSettings = {
  threshold: 0.5,
  showSuppressedWarnings: true,
  suppressedCategories: [],
};

const defaultRedactionSettings: RedactionSettings = {
  autoRedactSmallTalk: true,
  autoRedactIdentifiers: true,
  redactedPatterns: [],
  clinicianOverrides: [],
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('capture');
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>('draft');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState<Transcript | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [completedSteps, setCompletedSteps] = useState<WorkflowStep[]>([]);
  
  // Ambient Mode State
  const [isAmbientMode, setIsAmbientMode] = useState(false);
  const [ambientSession, setAmbientSession] = useState<AmbientSession | null>(null);
  
  // Minimal Interaction Mode
  const [isMinimalMode, setIsMinimalMode] = useState(false);
  
  // Clinician Style Profile
  const [styleProfile, setStyleProfile] = useState<ClinicianStyleProfile>(mockStyleProfile);
  
  // Visit Type
  const [selectedVisitType, setSelectedVisitType] = useState<VisitType | null>(null);
  
  // Confidence Settings
  const [confidenceSettings, setConfidenceSettings] = useState<ConfidenceSettings>(defaultConfidenceSettings);
  
  // Redaction Settings
  const [redactionSettings, setRedactionSettings] = useState<RedactionSettings>(defaultRedactionSettings);
  
  // Patient Linking
  const [linkedPatientId, setLinkedPatientId] = useState<string | null>(null);

  const markStepComplete = (step: WorkflowStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  return (
    <WorkflowContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        documentStatus,
        setDocumentStatus,
        selectedPatient,
        setSelectedPatient,
        currentTranscript,
        setCurrentTranscript,
        isRecording,
        setIsRecording,
        audioFile,
        setAudioFile,
        completedSteps,
        markStepComplete,
        isAmbientMode,
        setIsAmbientMode,
        ambientSession,
        setAmbientSession,
        isMinimalMode,
        setIsMinimalMode,
        styleProfile,
        setStyleProfile,
        selectedVisitType,
        setSelectedVisitType,
        confidenceSettings,
        setConfidenceSettings,
        redactionSettings,
        setRedactionSettings,
        linkedPatientId,
        setLinkedPatientId,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
