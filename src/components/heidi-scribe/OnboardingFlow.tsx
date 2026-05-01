import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, Zap, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  content: string;
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Heidi Scribe',
    description: 'Your distraction-free writing companion',
    icon: Sparkles,
    content: 'Heidi Scribe is designed to help you write faster with AI assistance. Let\'s get started!',
  },
  {
    id: 'recording',
    title: 'Voice Input',
    description: 'Speak naturally to transcribe your thoughts',
    icon: Zap,
    content: 'Click the microphone button to start recording. Your voice will be transcribed in real-time as you speak.',
  },
  {
    id: 'ai',
    title: 'AI Assistance',
    description: 'Get suggestions for grammar, clarity, and tone',
    icon: Sparkles,
    content: 'The AI panel on the right provides real-time suggestions. Accept or reject them as you write.',
  },
  {
    id: 'patient',
    title: 'Optional Patient Linking',
    description: 'Link documents to patient records (optional)',
    icon: Users,
    content: 'You can optionally link your documents to patient records for better organization and EHR integration.',
  },
];

export default function OnboardingFlow({
  isOpen,
  onClose,
  onComplete,
}: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = ONBOARDING_STEPS[currentStep];
  const Icon = step.icon;

  const handleNext = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      setTimeout(() => {
        onComplete();
        onClose();
      }, 500);
    }
  }, [currentStep, onComplete, onClose]);

  const handleSkip = useCallback(() => {
    onComplete();
    onClose();
  }, [onComplete, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        {!completed ? (
          <>
            <DialogHeader>
              <DialogTitle>{step.title}</DialogTitle>
              <DialogDescription>{step.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon className="h-12 w-12 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <p className="text-muted-foreground">{step.content}</p>
              </div>

              {/* Progress Indicator */}
              <div className="flex gap-1 justify-center">
                {ONBOARDING_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index <= currentStep ? 'bg-primary w-6' : 'bg-secondary w-1.5'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="flex-1"
                >
                  Skip Tour
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 gap-2"
                  variant="clinical"
                >
                  {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4 py-8 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold">You're All Set!</h2>
            <p className="text-muted-foreground">Start writing or speaking to get started with Heidi Scribe.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
