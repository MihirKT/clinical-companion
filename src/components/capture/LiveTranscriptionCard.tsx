import React, { useState, useEffect } from 'react';
import { Mic, Square, Clock, ChevronDown, ChevronUp, User, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockTranscript, mockPatients } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function LiveTranscriptionCard() {
  const { isRecording, setIsRecording, setCurrentTranscript, linkedPatientId } = useWorkflow();
  const { toast } = useToast();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);
  const [showTranscript, setShowTranscript] = useState(true);

  // Get linked patient name
  const linkedPatient = linkedPatientId ? mockPatients.find(p => p.id === linkedPatientId) : null;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Simulate live transcription with progressive rendering
  useEffect(() => {
    if (isRecording) {
      const lines = mockTranscript.rawText.split('\n').filter(line => line.trim());
      let index = 0;
      
      const addLine = () => {
        if (index < lines.length && isRecording) {
          setTranscriptLines(prev => [...prev, lines[index]]);
          index++;
          setTimeout(addLine, 2000 + Math.random() * 1500);
        }
      };
      
      const timeout = setTimeout(addLine, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    // Check if patient is linked
    if (!linkedPatientId) {
      toast({
        variant: "destructive",
        title: "Patient Required",
        description: "Please link a patient before starting the recording.",
      });
      return;
    }
    
    setIsRecording(true);
    setElapsedTime(0);
    setTranscriptLines([]);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setCurrentTranscript(mockTranscript);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TooltipProvider>
      <Card className={cn(
        "clinical-card transition-all duration-300",
        isRecording && "ring-2 ring-primary/50 shadow-lg"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                isRecording 
                  ? "bg-destructive/10" 
                  : "bg-primary/10"
              )}>
                {isRecording ? (
                  <div className="relative">
                    <Mic className="w-5 h-5 text-destructive" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  </div>
                ) : (
                  <Mic className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">Live Transcription</CardTitle>
                <CardDescription>
                  {isRecording ? 'Recording in progress...' : 'Record audio in real-time'}
                </CardDescription>
              </div>
            </div>
            {isRecording && (
              <Badge variant="destructive" className="gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(elapsedTime)}
              </Badge>
            )}
          </div>

          {/* Patient Linked Indicator */}
          {linkedPatient && (
            <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-primary/5 rounded-md">
              <User className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted-foreground">Recording for: <span className="font-medium text-foreground">{linkedPatient.name}</span></span>
            </div>
          )}
          
          {/* No Patient Warning */}
          {!linkedPatientId && !isRecording && (
            <div className="flex items-center gap-2 mt-2 px-3 py-1.5 bg-destructive/5 rounded-md border border-destructive/20">
              <AlertCircle className="w-3 h-3 text-destructive" />
              <span className="text-xs text-destructive">Please link a patient before recording</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex gap-3">
            {!isRecording ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleStartRecording}
                    variant="clinical"
                    className="flex-1 gap-2 h-12"
                  >
                    <Mic className="w-5 h-5" />
                    Start Recording
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{linkedPatientId ? 'Begin live audio transcription' : 'Link a patient first to start recording'}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleStopRecording}
                    variant="destructive"
                    className="flex-1 gap-2 h-12"
                  >
                    <Square className="w-4 h-4" />
                    Stop Recording
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Stop recording and process transcript</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Live Transcript Preview */}
          {isRecording && transcriptLines.length > 0 && (
            <div className="space-y-2 animate-fade-in">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
              >
                {showTranscript ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                Live Preview
                <Badge variant="outline" className="ml-auto text-xs">
                  {transcriptLines.length} lines
                </Badge>
              </button>
              
              {showTranscript && (
                <ScrollArea className="h-[200px] border rounded-lg p-3 bg-muted/30">
                  <div className="space-y-2 text-sm">
                    {transcriptLines.map((line, index) => (
                      <p 
                        key={index} 
                        className={cn(
                          "text-foreground animate-fade-in",
                          index === transcriptLines.length - 1 && "text-primary font-medium"
                        )}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          )}

          {/* Idle State Tips */}
          {!isRecording && transcriptLines.length === 0 && (
            <div className="text-center py-4 text-sm text-muted-foreground">
              <p>Click "Start Recording" to begin live transcription</p>
              <p className="text-xs mt-1">AI will transcribe speech in real-time</p>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
