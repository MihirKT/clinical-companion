import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UploadCard } from '@/components/capture/UploadCard';
import { LiveTranscriptionCard } from '@/components/capture/LiveTranscriptionCard';
import { PatientLinkSelector } from '@/components/capture/PatientLinkSelector';
import { VisitTypeSelector } from '@/components/capture/VisitTypeSelector';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { RecentTranscriptions } from '@/components/dashboard/RecentTranscriptions';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockPatients } from '@/data/mockData';

export function CapturePage() {
  const { 
    setCurrentStep, 
    markStepComplete, 
    currentTranscript, 
    audioFile,
    selectedPatient,
    setSelectedPatient,
    linkedPatientId,
    setLinkedPatientId,
  } = useWorkflow();

  const hasContent = currentTranscript !== null || audioFile !== null;

  const handleNext = () => {
    markStepComplete('capture');
    setCurrentStep('review');
  };

  const handleRemovePatient = () => {
    setLinkedPatientId(null);
    setSelectedPatient(null);
  };

  // Get linked patient info
  const linkedPatient = linkedPatientId 
    ? mockPatients.find(p => p.id === linkedPatientId) 
    : selectedPatient;

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Capture Audio</h2>
          <p className="text-muted-foreground mt-1">
            Upload an audio file or start a live recording
          </p>
        </div>
        <Button
          onClick={handleNext}
          disabled={!hasContent}
          variant="clinical"
          size="lg"
          className="gap-2 self-start sm:self-auto"
        >
          Next: Review
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Stats Dashboard */}
      <QuickStats />

      {/* Linked Patient Badge - Persistent */}
      {linkedPatient && (
        <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {linkedPatient.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground">{linkedPatient.name}</p>
            <p className="text-xs text-muted-foreground">{linkedPatient.medicalId}</p>
          </div>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            Linked
          </Badge>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRemovePatient}
            className="text-muted-foreground hover:text-destructive"
          >
            Change
          </Button>
        </div>
      )}

      {/* Patient & Visit Type Selection */}
      <div className="grid sm:grid-cols-2 gap-4">
        <PatientLinkSelector />
        <VisitTypeSelector />
      </div>

      {/* Main Capture Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <UploadCard />
        <LiveTranscriptionCard />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Transcriptions */}
      <RecentTranscriptions />
    </div>
  );
}
