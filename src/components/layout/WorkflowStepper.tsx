import React from 'react';
import { Check, Upload, FileText, FileEdit, Users, User, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { WorkflowStep } from '@/types/clinical';
import { Badge } from '@/components/ui/badge';

const steps: { id: WorkflowStep; label: string; icon: React.ElementType; alwaysAccessible?: boolean }[] = [
  { id: 'capture', label: 'Capture', icon: Upload },
  { id: 'review', label: 'Review', icon: FileText },
  { id: 'summarize', label: 'Summarize', icon: FileEdit },
  { id: 'patient-hub', label: 'Patient Hub', icon: Users, alwaysAccessible: true },
  { id: 'corrections', label: 'Corrections', icon: PenTool, alwaysAccessible: true },
];

export function WorkflowStepper() {
  const { currentStep, setCurrentStep, documentStatus, completedSteps } = useWorkflow();

  const getStepStatus = (stepId: WorkflowStep) => {
    if (currentStep === stepId) return 'active';
    if (completedSteps.includes(stepId)) return 'complete';
    return 'pending';
  };

  const isStepClickable = (step: typeof steps[0]) => {
    // Always accessible tabs can be clicked anytime
    if (step.alwaysAccessible) return true;
    // Current step is always clickable
    if (step.id === currentStep) return true;
    // Completed steps are clickable
    if (completedSteps.includes(step.id)) return true;
    return false;
  };

  const handleStepClick = (step: typeof steps[0]) => {
    if (isStepClickable(step)) {
      setCurrentStep(step.id);
    }
  };

  const statusVariant = {
    draft: 'draft',
    reviewed: 'reviewed',
    final: 'final',
  } as const;

  return (
    <header className="glass border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">ITranscript360</h1>
              <p className="text-xs text-muted-foreground">Clinical Transcription</p>
            </div>
          </div>

          {/* Stepper */}
          <nav className="flex items-center gap-2">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              const clickable = isStepClickable(step);

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => handleStepClick(step)}
                    disabled={!clickable}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
                      status === 'active' && 'bg-primary/10 text-primary',
                      status === 'complete' && 'bg-success/10 text-success hover:bg-success/20',
                      status === 'pending' && !step.alwaysAccessible && 'text-muted-foreground cursor-not-allowed',
                      status === 'pending' && step.alwaysAccessible && 'text-muted-foreground hover:bg-muted/50 cursor-pointer',
                      clickable && status !== 'pending' && 'cursor-pointer'
                    )}
                  >
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center transition-all',
                        status === 'active' && 'bg-primary text-primary-foreground step-pulse',
                        status === 'complete' && 'bg-success text-success-foreground',
                        status === 'pending' && !step.alwaysAccessible && 'bg-muted text-muted-foreground',
                        status === 'pending' && step.alwaysAccessible && 'bg-secondary text-secondary-foreground'
                      )}
                    >
                      {status === 'complete' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-sm font-medium hidden lg:block">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-8 h-0.5 rounded-full transition-colors',
                        completedSteps.includes(step.id) ? 'bg-success' : 'bg-border'
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Status Badge */}
          <Badge variant={statusVariant[documentStatus]} className="capitalize">
            {documentStatus}
          </Badge>
        </div>
      </div>
    </header>
  );
}
