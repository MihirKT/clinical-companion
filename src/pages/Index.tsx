import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useWorkflow } from '@/context/WorkflowContext';
import { CapturePage } from './CapturePage';
import { ReviewPage } from './ReviewPage';
import { SummarizePage } from './SummarizePage';
import { PatientHubPage } from './PatientHubPage';
import { PatientDemographicsPage } from './PatientDemographicsPage';
import { CorrectionsPage } from './CorrectionsPage';

const Index = () => {
  const { currentStep } = useWorkflow();

  const renderStep = () => {
    switch (currentStep) {
      case 'capture':
        return <CapturePage />;
      case 'review':
        return <ReviewPage />;
      case 'summarize':
        return <SummarizePage />;
      case 'patient-hub':
        return <PatientHubPage />;
      case 'demographics':
        return <PatientDemographicsPage />;
      case 'corrections':
        return <CorrectionsPage />;
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
