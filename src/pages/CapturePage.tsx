import React from "react";
import { UploadCard } from "@/components/capture/UploadCard";
import { LiveTranscriptionCard } from "@/components/capture/LiveTranscriptionCard";
import { MinimalCaptureView } from "@/components/capture/MinimalCaptureView";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentTranscriptions } from "@/components/dashboard/RecentTranscriptions";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Lightbulb } from "lucide-react";
import { PatientLinkButton } from "@/components/capture/PatientLinkButton";
import { PatientInfoBadge } from "@/components/capture/PatientInfoBadge";
import { useWorkflow } from "@/context/WorkflowContext";

export function CapturePage() {
  const {
    isRecording,
    isMinimalMode,
    setIsMinimalMode,
    setCurrentStep,
    setCurrentTranscript,
    markStepComplete,
    setIsRecording,
    selectedPatient,
    setSelectedPatient,
  } = useWorkflow();
  const [elapsedTime, setElapsedTime] = React.useState(0);

  // Timer for minimal mode
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && isMinimalMode) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isMinimalMode]);

  const handleExpandFromMinimal = () => {
    setIsMinimalMode(false);
  };

  const handleStopFromMinimal = () => {
    setIsRecording(false);
    setIsMinimalMode(false);
    markStepComplete("capture");
    setCurrentStep("review");
  };

  // Show minimal view when recording in minimal mode
  if (isRecording && isMinimalMode) {
    return (
      <div className="animate-fade-in h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto ambient-pulse">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground">Recording in minimal mode...</p>
        </div>
        <MinimalCaptureView
          onExpand={handleExpandFromMinimal}
          onStop={handleStopFromMinimal}
          elapsedTime={elapsedTime}
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Good Morning, Doctor 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            Start a new transcription or review recent sessions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PatientLinkButton onSelectPatient={setSelectedPatient} showLabel />
          <QuickActions />
        </div>
      </div>

      {/* Selected Patient Info */}
      {selectedPatient && (
        <div>
          <PatientInfoBadge
            patient={selectedPatient}
            onRemove={() => setSelectedPatient(null)}
            variant="default"
          />
        </div>
      )}

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Capture Options */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-medium text-foreground">
            Start New Session
          </h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Choose one
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <UploadCard />
          <LiveTranscriptionCard />
        </div>
      </div>

      {/* Recent Transcriptions */}
      <RecentTranscriptions />

      {/* Pro Tip */}
      <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Enable <strong>Ambient Mode</strong> for hands-free capture that
            automatically filters small talk and extracts clinical moments. Use{" "}
            <strong>Low-Interaction Mode</strong> to minimize distractions
            during consultations.
          </p>
        </div>
      </div>
    </div>
  );
}
