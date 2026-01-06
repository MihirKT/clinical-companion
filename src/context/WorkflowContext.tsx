import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WorkflowStep, DocumentStatus, Patient, Transcript } from '@/types/clinical';

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
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('capture');
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>('draft');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [currentTranscript, setCurrentTranscript] = useState<Transcript | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [completedSteps, setCompletedSteps] = useState<WorkflowStep[]>([]);

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
