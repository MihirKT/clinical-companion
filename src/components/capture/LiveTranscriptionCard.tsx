import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Pause,
  Square,
  Info,
  Waves,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWorkflow } from "@/context/WorkflowContext";
import { useToast } from "@/hooks/use-toast";
import {
  mockTranscript,
  mockClinicalMoments,
  mockAmbientSegments,
} from "@/data/mockData";
import { ClinicalMomentsPanel } from "./ClinicalMomentsPanel";
import { ClinicalMoment } from "@/types/clinical";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mockLiveSegments = [
  {
    time: "0:00",
    text: "Good morning Mrs Johnson. How are you feeling today?",
    speaker: "Doctor",
    isClinical: true,
  },
  {
    time: "0:05",
    text: "Morning doctor. I've been doing okay mostly...",
    speaker: "Patient",
    isClinical: true,
  },
  {
    time: "0:12",
    text: "...but I've noticed some tingling in my feet lately, especially at night.",
    speaker: "Patient",
    isClinical: true,
  },
  {
    time: "0:20",
    text: "I see. Tell me more about this tingling sensation. When did it start?",
    speaker: "Doctor",
    isClinical: true,
  },
  {
    time: "0:28",
    text: "Maybe about two weeks ago. It's like pins and needles...",
    speaker: "Patient",
    isClinical: true,
  },
];

export function LiveTranscriptionCard() {
  const {
    setCurrentStep,
    setCurrentTranscript,
    markStepComplete,
    isRecording,
    setIsRecording,
    isAmbientMode,
    isMinimalMode,
    linkedPatientId,
    selectedPatient,
  } = useWorkflow();
  const { toast } = useToast();
  const [isPaused, setIsPaused] = useState(false);
  const [currentSegments, setCurrentSegments] = useState<
    typeof mockLiveSegments
  >([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [clinicalMoments, setClinicalMoments] = useState<ClinicalMoment[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      const segmentIndex = Math.min(
        Math.floor(elapsedTime / 3),
        mockLiveSegments.length - 1,
      );
      setCurrentSegments(mockLiveSegments.slice(0, segmentIndex + 1));

      // Simulate clinical moments in ambient mode
      if (isAmbientMode && elapsedTime > 0 && elapsedTime % 8 === 0) {
        const momentIndex = Math.min(
          Math.floor(elapsedTime / 8) - 1,
          mockClinicalMoments.length - 1,
        );
        if (momentIndex >= 0) {
          setClinicalMoments(mockClinicalMoments.slice(0, momentIndex + 1));
        }
      }
    }
  }, [elapsedTime, isRecording, isPaused, isAmbientMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentSegments]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = () => {
    if (!selectedPatient) {
      toast({
        title: "Patient Selection Required",
        description:
          "Please select a patient before starting live transcription.",
        variant: "destructive",
      });
      return;
    }
    setIsRecording(true);
    setIsPaused(false);
    setElapsedTime(0);
    setCurrentSegments([]);
    setClinicalMoments([]);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setCurrentTranscript(mockTranscript);
    markStepComplete("capture");
    setCurrentStep("review");
  };

  return (
    <Card
      className={cn(
        "clinical-card h-full group transition-all duration-300",
        isRecording ? "ring-2 ring-primary/30 shadow-lg" : "hover:shadow-lg",
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
              isRecording
                ? isAmbientMode
                  ? "bg-accent/10 ambient-pulse"
                  : "bg-destructive/10 listening-pulse"
                : "bg-gradient-to-br from-accent/20 to-accent/10 group-hover:scale-105",
            )}
          >
            {isAmbientMode && isRecording ? (
              <Waves className="w-6 h-6 text-accent" />
            ) : isRecording ? (
              <Mic className="w-6 h-6 text-destructive" />
            ) : (
              <Mic className="w-6 h-6 text-accent" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Live Transcription</CardTitle>
              {isRecording && (
                <Badge
                  variant={isAmbientMode ? "ai" : "destructive"}
                  className="text-xs animate-pulse-gentle gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                  {isPaused
                    ? "Paused"
                    : isAmbientMode
                      ? "Ambient"
                      : "Recording"}
                </Badge>
              )}
              {linkedPatientId && isRecording && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Sparkles className="w-3 h-3" />
                  Linked
                </Badge>
              )}
            </div>
            <CardDescription>
              {isRecording
                ? `${isAmbientMode ? "Ambient" : "Recording"}: ${formatTime(elapsedTime)}`
                : "Record and transcribe in real-time"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isRecording ? (
          <div className="flex flex-col items-center py-6 space-y-4">
            {!selectedPatient && (
              <div className="w-full flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-destructive">
                    Patient Selection Required
                  </p>
                  <p className="text-xs text-destructive/80 mt-1">
                    Please link a patient using the button in the header before
                    starting transcription.
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={handleStartRecording}
              disabled={!selectedPatient}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 group",
                selectedPatient
                  ? "bg-gradient-to-br from-primary to-accent cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
              )}
            >
              <Mic className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </button>
            <div>
              <p className="text-muted-foreground text-sm">
                {selectedPatient
                  ? "Click to start recording"
                  : "Select patient to start"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Hands-free • Auto-saves
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Live transcript or Clinical Moments based on mode */}
            {isAmbientMode ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Clinical Moments
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {clinicalMoments.length} detected
                  </Badge>
                </div>
                <ClinicalMomentsPanel moments={clinicalMoments} isLive />
              </div>
            ) : (
              <div
                ref={scrollRef}
                className="h-48 overflow-y-auto transcript-scroll bg-muted/30 rounded-xl p-4 space-y-3"
              >
                {currentSegments.map((segment, index) => (
                  <div
                    key={index}
                    className="animate-fade-in flex gap-3 text-sm"
                  >
                    <span className="text-muted-foreground font-mono text-xs w-10 flex-shrink-0 pt-0.5">
                      {segment.time}
                    </span>
                    <div className="flex-1">
                      <span
                        className={cn(
                          "text-xs font-medium block mb-0.5",
                          segment.speaker === "Doctor"
                            ? "text-primary"
                            : "text-accent",
                        )}
                      >
                        {segment.speaker}
                      </span>
                      <p className="text-foreground">{segment.text}</p>
                    </div>
                  </div>
                ))}
                {currentSegments.length === 0 && (
                  <div className="flex items-center gap-3 text-muted-foreground text-sm py-8 justify-center">
                    <div className="flex gap-1">
                      <span
                        className="w-1 h-4 bg-primary/50 rounded-full animate-wave"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1 h-4 bg-primary/50 rounded-full animate-wave"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1 h-4 bg-primary/50 rounded-full animate-wave"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span>Listening for speech...</span>
                  </div>
                )}
              </div>
            )}

            {/* Recording controls */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePauseResume}
                className="gap-2 min-w-[120px]"
              >
                {isPaused ? (
                  <Mic className="w-5 h-5" />
                ) : (
                  <Pause className="w-5 h-5" />
                )}
                {isPaused ? "Resume" : "Pause"}
              </Button>
              <Button
                variant="recording"
                size="lg"
                onClick={handleStopRecording}
                className="gap-2 min-w-[160px]"
              >
                <Square className="w-5 h-5" />
                Stop & Review →
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
