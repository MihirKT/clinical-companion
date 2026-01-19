import React from 'react';
import { Check, Upload, FileText, FileEdit, Users, PenTool, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { WorkflowStep } from '@/types/clinical';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const steps: { id: WorkflowStep; label: string; icon: React.ElementType; description: string; alwaysAccessible?: boolean }[] = [
  { id: 'capture', label: 'Capture', icon: Upload, description: 'Record or upload audio', alwaysAccessible: true },
  { id: 'review', label: 'Review', icon: FileText, description: 'Review transcript & insights', alwaysAccessible: true },
  { id: 'summarize', label: 'Summarize', icon: FileEdit, description: 'Generate clinical notes', alwaysAccessible: true },
  { id: 'patient-hub', label: 'Patient Hub', icon: Users, description: 'Manage patient records', alwaysAccessible: true },
  { id: 'corrections', label: 'Corrections', icon: PenTool, description: 'Edit terminology dictionary', alwaysAccessible: true },
];

export function WorkflowStepper() {
  const { currentStep, setCurrentStep, documentStatus, completedSteps } = useWorkflow();

  const getStepStatus = (stepId: WorkflowStep) => {
    if (currentStep === stepId) return 'active';
    if (completedSteps.includes(stepId)) return 'complete';
    return 'pending';
  };

  const isStepClickable = (step: typeof steps[0]) => {
    if (step.alwaysAccessible) return true;
    if (step.id === currentStep) return true;
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

  const statusLabel = {
    draft: 'Draft',
    reviewed: 'Reviewed',
    final: 'Final',
  };

  return (
    <header className="glass border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
              <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base lg:text-lg font-semibold text-foreground leading-tight">ITranscript360</h1>
              <p className="text-xs text-muted-foreground">Clinical Transcription</p>
            </div>
          </div>

          {/* Stepper */}
          <nav className="flex items-center gap-1 lg:gap-2 overflow-x-auto py-1">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              const clickable = isStepClickable(step);

              return (
                <React.Fragment key={step.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleStepClick(step)}
                        disabled={!clickable}
                        className={cn(
                          'flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-all duration-200 whitespace-nowrap',
                          status === 'active' && 'bg-primary/10 text-primary shadow-sm',
                          status === 'complete' && 'bg-success/10 text-success hover:bg-success/20',
                          status === 'pending' && !step.alwaysAccessible && 'text-muted-foreground/50 cursor-not-allowed',
                          status === 'pending' && step.alwaysAccessible && 'text-muted-foreground hover:bg-muted/50 cursor-pointer hover:text-foreground',
                          clickable && status !== 'pending' && 'cursor-pointer'
                        )}
                      >
                        <div
                          className={cn(
                            'w-6 h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center transition-all text-xs lg:text-sm',
                            status === 'active' && 'bg-primary text-primary-foreground',
                            status === 'complete' && 'bg-success text-success-foreground',
                            status === 'pending' && !step.alwaysAccessible && 'bg-muted text-muted-foreground',
                            status === 'pending' && step.alwaysAccessible && 'bg-secondary text-secondary-foreground'
                          )}
                        >
                          {status === 'complete' ? (
                            <Check className="w-3 h-3 lg:w-4 lg:h-4" />
                          ) : (
                            <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                          )}
                        </div>
                        <span className="text-xs lg:text-sm font-medium hidden md:block">{step.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      <p className="font-medium">{step.label}</p>
                      <p className="text-muted-foreground">{step.description}</p>
                      {!clickable && <p className="text-warning mt-1">Complete previous steps first</p>}
                    </TooltipContent>
                  </Tooltip>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-border flex-shrink-0 hidden lg:block" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Status Badge */}
          <div className="flex-shrink-0">
            <Badge variant={statusVariant[documentStatus]} className="capitalize text-xs lg:text-sm px-2 lg:px-3">
              {statusLabel[documentStatus]}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
