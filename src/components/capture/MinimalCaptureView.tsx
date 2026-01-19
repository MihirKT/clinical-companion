import React, { useState, useEffect } from 'react';
import { Mic, Square, Waves, User, Clock, Sparkles, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockTranscript, mockClinicalMoments } from '@/data/mockData';

interface MinimalCaptureViewProps {
  onExpand: () => void;
  onStop: () => void;
  elapsedTime: number;
}

export function MinimalCaptureView({ onExpand, onStop, elapsedTime }: MinimalCaptureViewProps) {
  const { isAmbientMode, linkedPatientId } = useWorkflow();
  const [clinicalMomentCount, setClinicalMomentCount] = useState(0);
  const [lastMoment, setLastMoment] = useState<string>('');

  // Simulate clinical moments appearing
  useEffect(() => {
    if (elapsedTime > 5 && elapsedTime % 8 === 0) {
      const momentIndex = Math.min(Math.floor(elapsedTime / 8) - 1, mockClinicalMoments.length - 1);
      if (momentIndex >= 0 && momentIndex < mockClinicalMoments.length) {
        setClinicalMomentCount(momentIndex + 1);
        setLastMoment(mockClinicalMoments[momentIndex].content);
      }
    }
  }, [elapsedTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent">
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-4">
          <div className="flex items-center gap-4">
            {/* Recording Indicator */}
            <div className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center',
              isAmbientMode ? 'bg-accent/10 ambient-pulse' : 'bg-destructive/10 listening-pulse'
            )}>
              {isAmbientMode ? (
                <Waves className="w-7 h-7 text-accent" />
              ) : (
                <Mic className="w-7 h-7 text-destructive" />
              )}
            </div>

            {/* Status Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={isAmbientMode ? 'ai' : 'destructive'} className="gap-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {isAmbientMode ? 'Ambient' : 'Recording'}
                </Badge>
                <span className="text-lg font-mono font-semibold text-foreground">
                  {formatTime(elapsedTime)}
                </span>
                {linkedPatientId && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <User className="w-3 h-3" />
                    Linked
                  </Badge>
                )}
              </div>
              
              {/* Latest Clinical Moment */}
              {lastMoment && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span className="truncate">{lastMoment}</span>
                </div>
              )}
              
              {!lastMoment && (
                <p className="text-sm text-muted-foreground">
                  {isAmbientMode ? 'Listening for clinical content...' : 'Transcribing conversation...'}
                </p>
              )}
            </div>

            {/* Clinical Moments Counter */}
            {clinicalMomentCount > 0 && (
              <div className="flex flex-col items-center px-3 border-l border-border">
                <span className="text-2xl font-bold text-accent">{clinicalMomentCount}</span>
                <span className="text-xs text-muted-foreground">Moments</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onExpand}
                className="h-10 w-10"
              >
                <Maximize2 className="w-5 h-5" />
              </Button>
              <Button
                variant="recording"
                size="lg"
                onClick={onStop}
                className="gap-2"
              >
                <Square className="w-5 h-5" />
                Stop & Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
