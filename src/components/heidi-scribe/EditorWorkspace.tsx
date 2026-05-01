import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Pause, Square, UploadCloud, Check } from 'lucide-react';
import MicrophoneStatus from './MicrophoneStatus';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useAISuggestions } from '@/hooks/useAISuggestions';

interface EditorWorkspaceProps {
  content: string;
  onContentChange: (content: string) => void;
  isRecording: boolean;
  transcript: string;
  isTranscribing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  metadata?: {
    wordCount: number;
    charCount: number;
  };
}

export default function EditorWorkspace({
  content,
  onContentChange,
  isRecording,
  transcript,
  isTranscribing,
  onStartRecording,
  onStopRecording,
  metadata,
}: EditorWorkspaceProps) {
  const [recordingTime, setRecordingTime] = useState(0);
  const [saveStatus, setSaveStatus] = useState<'unsaved' | 'saving' | 'saved'>('saved');
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { analyzeSuggestions } = useAISuggestions();

  // Auto-save every 10 seconds
  const { saveNow } = useAutoSave(
    { content, metadata },
    {
      interval: 10000,
      onSave: async (data) => {
        setSaveStatus('saving');
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          setSaveStatus('saved');
          setLastSaveTime(new Date());
        } catch (error) {
          setSaveStatus('unsaved');
        }
      },
    }
  );

  // Update save status when content changes
  useEffect(() => {
    setSaveStatus('unsaved');
  }, [content]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Analyze suggestions when content changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (content && content.length > 20) {
        analyzeSuggestions(content);
      }
    }, 2000);
    return () => clearTimeout(debounceTimer);
  }, [content, analyzeSuggestions]);

  if (content === '' && !isRecording && !isTranscribing && transcript === '') {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Mic className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Start Writing or Speaking</h2>
          <p className="text-muted-foreground mb-8">
            Begin by clicking the microphone to record your thoughts, or start typing below. Heidi will assist with clarity and formatting.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onStartRecording}
              variant="clinical"
              className="gap-2"
            >
              <Mic className="h-4 w-4" />
              Start Recording
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Focus textarea for typing
                textareaRef.current?.focus();
              }}
            >
              Start Typing
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-8">
      {/* Recording Status Bar */}
      {isRecording && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
          <span className="font-medium text-red-900 dark:text-red-100">
            Recording in progress • {formatTime(recordingTime)}
          </span>
          <MicrophoneStatus />
        </div>
      )}

      {/* Transcription Live Feed */}
      {isTranscribing && transcript && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-muted-foreground italic">
          Listening... {transcript}
        </div>
      )}

      {/* Main Editor */}
      <div className="flex-1 mb-6 flex flex-col">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Start typing or click 'Start Recording' to begin..."
          className="flex-1 resize-none text-base leading-relaxed border-0 focus:ring-0 p-0 bg-transparent"
          spellCheck="true"
        />
      </div>

      {/* Control Bar */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {!isRecording ? (
            <Button
              onClick={onStartRecording}
              className="gap-2"
              variant="clinical"
            >
              <Mic className="h-4 w-4" />
              Record
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {}}
                variant="outline"
                size="icon"
              >
                <Pause className="h-4 w-4" />
              </Button>
              <Button
                onClick={onStopRecording}
                className="gap-2"
                variant="destructive"
              >
                <Square className="h-4 w-4" />
                Stop
              </Button>
            </>
          )}

          <Button
            variant="outline"
            className="gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            Upload Audio
          </Button>
        </div>

        {/* Metadata and Save Status */}
        <div className="flex items-center gap-4">
          {/* Save Status */}
          <div className="flex items-center gap-2 text-xs">
            {saveStatus === 'saving' && (
              <>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-muted-foreground">Saving...</span>
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <Check className="w-3 h-3 text-green-600" />
                <span className="text-muted-foreground">
                  {lastSaveTime ? `Saved at ${lastSaveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'All saved'}
                </span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <span className="text-amber-600 font-medium">Unsaved changes</span>
            )}
          </div>

          {/* Metadata */}
          {metadata && (
            <div className="text-sm text-muted-foreground border-l border-border pl-4">
              <span>{metadata.wordCount} words</span>
              <span className="mx-2">•</span>
              <span>{metadata.charCount} characters</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
