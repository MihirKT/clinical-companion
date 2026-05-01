import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useWorkflow } from '@/context/WorkflowContext';
import { useAuth } from '@/context/AuthContext';
import { CapturePage } from './CapturePage';
import { ReviewPage } from './ReviewPage';
import { SummarizePage } from './SummarizePage';
import { PatientHubPage } from './PatientHubPage';
import { PatientDemographicsPage } from './PatientDemographicsPage';
import { CorrectionsPage } from './CorrectionsPage';
import { TranscriptionsPage } from './TranscriptionsPage';

const Index = () => {
  const { currentStep, setCurrentStep } = useWorkflow();
  const { userRole } = useAuth();

  // For AI-only users, redirect from patient-hub to capture
  React.useEffect(() => {
    if (userRole === 'ai-only' && currentStep === 'patient-hub') {
      setCurrentStep('capture');
    }
  }, [userRole, currentStep, setCurrentStep]);

  // Redirect simple users from patient-hub to capture if needed
  React.useEffect(() => {
    if (userRole === 'simple' && currentStep === 'demographics') {
      setCurrentStep('capture');
    }
  }, [userRole, currentStep, setCurrentStep]);

  const renderStep = () => {
    // AI-only users cannot access patient-hub
    if (userRole === 'ai-only' && currentStep === 'patient-hub') {
      return <CapturePage />;
    }

    switch (currentStep) {
      case 'capture':
        return <CapturePage />;
      case 'review':
        return <ReviewPage />;
      case 'summarize':
        return <SummarizePage />;
      case 'patient-hub':
        // Full and Simple users can access patient hub
        return (userRole === 'full' || userRole === 'simple') ? <PatientHubPage /> : <CapturePage />;
      case 'demographics':
        return <PatientDemographicsPage />;
      case 'corrections':
        return <CorrectionsPage />;
      case 'transcriptions':
        return <TranscriptionsPage />;
      default:
        return <CapturePage />;
    }
  };

  return (
    <MainLayout>
      {renderStep()}
    </MainLayout>
  );
};

export default Index;
