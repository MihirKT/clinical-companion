import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Pause, Square, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockTranscript } from '@/data/mockData';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const mockLiveSegments = [
  { time: '0:00', text: 'Good morning Mrs Johnson. How are you feeling today?', speaker: 'Doctor' },
  { time: '0:05', text: "Morning doctor. I've been doing okay mostly...", speaker: 'Patient' },
  { time: '0:12', text: "...but I've noticed some tingling in my feet lately, especially at night.", speaker: 'Patient' },
  { time: '0:20', text: 'I see. Tell me more about this tingling sensation. When did it start?', speaker: 'Doctor' },
  { time: '0:28', text: "Maybe about two weeks ago. It's like pins and needles...", speaker: 'Patient' },
];

export function LiveTranscriptionCard() {
  const { setCurrentStep, setCurrentTranscript, markStepComplete, isRecording, setIsRecording } = useWorkflow();
  const [isPaused, setIsPaused] = useState(false);
  const [currentSegments, setCurrentSegments] = useState<typeof mockLiveSegments>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (isRecording && !isPaused) {
      const segmentIndex = Math.min(Math.floor(elapsedTime / 3), mockLiveSegments.length - 1);
      setCurrentSegments(mockLiveSegments.slice(0, segmentIndex + 1));
    }
  }, [elapsedTime, isRecording, isPaused]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentSegments]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsPaused(false);
    setElapsedTime(0);
    setCurrentSegments([]);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setCurrentTranscript(mockTranscript);
    markStepComplete('capture');
    setCurrentStep('review');
  };

  return (
    <Card className={cn(
      "clinical-card h-full group transition-all duration-300",
      isRecording ? "ring-2 ring-primary/30 shadow-lg" : "hover:shadow-lg"
    )}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
            isRecording 
              ? 'bg-destructive/10 listening-pulse' 
              : 'bg-gradient-to-br from-accent/20 to-accent/10 group-hover:scale-105'
          )}>
            {isRecording ? (
              <Mic className="w-6 h-6 text-destructive" />
            ) : (
              <Mic className="w-6 h-6 text-accent" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Live Transcription</CardTitle>
              {isRecording && (
                <Badge variant="ai" className="text-xs animate-pulse-gentle gap-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                  {isPaused ? 'Paused' : 'Recording'}
                </Badge>
              )}
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Record consultations in real-time. AI transcribes as you speak and extracts insights.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              {isRecording 
                ? `Recording: ${formatTime(elapsedTime)}` 
                : 'Record and transcribe in real-time'
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isRecording ? (
          <div className="flex flex-col items-center py-6">
            <button
              onClick={handleStartRecording}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 group"
            >
              <Mic className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </button>
            <p className="mt-4 text-muted-foreground text-sm">Click to start recording</p>
            <p className="text-xs text-muted-foreground mt-1">Hands-free • Auto-saves</p>
          </div>
        ) : (
          <>
            {/* Live transcript preview */}
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
                    <span className={cn(
                      "text-xs font-medium block mb-0.5",
                      segment.speaker === 'Doctor' ? 'text-primary' : 'text-accent'
                    )}>
                      {segment.speaker}
                    </span>
                    <p className="text-foreground">{segment.text}</p>
                  </div>
                </div>
              ))}
              {currentSegments.length === 0 && (
                <div className="flex items-center gap-3 text-muted-foreground text-sm py-8 justify-center">
                  <div className="flex gap-1">
                    <span className="w-1 h-4 bg-primary/50 rounded-full animate-wave" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-4 bg-primary/50 rounded-full animate-wave" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-4 bg-primary/50 rounded-full animate-wave" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>Listening for speech...</span>
                </div>
              )}
            </div>

            {/* Recording controls */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePauseResume}
                className="gap-2 min-w-[120px]"
              >
                {isPaused ? <Mic className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {isPaused ? 'Resume' : 'Pause'}
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

            <p className="text-xs text-center text-muted-foreground">
              Tip: You can pause anytime without losing progress
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
