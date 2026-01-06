import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileAudio, Play, Pause, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockTranscript } from '@/data/mockData';

export function UploadCard() {
  const { setCurrentStep, setCurrentTranscript, markStepComplete, setAudioFile } = useWorkflow();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidAudioFile(droppedFile)) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isValidAudioFile(selectedFile)) {
      setFile(selectedFile);
    }
  }, []);

  const isValidAudioFile = (file: File) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg', 'audio/m4a'];
    return validTypes.some(type => file.type.includes(type.split('/')[1]));
  };

  const handleUploadAndTranscribe = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);

    // Simulate upload and transcription progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    setAudioFile(file);
    setCurrentTranscript(mockTranscript);
    markStepComplete('capture');
    setCurrentStep('review');
  };

  const clearFile = () => {
    setFile(null);
    setProgress(0);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="clinical-card h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Upload Audio</CardTitle>
            <CardDescription>Upload a recorded consultation</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!file ? (
          <>
            <div
              className={cn('upload-zone text-center', isDragging && 'drag-active')}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp3,.wav,.m4a,.ogg"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Drag & drop audio file here</p>
                  <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <FileAudio className="w-4 h-4" />
              <span>Supported formats: mp3, wav, m4a, ogg</span>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileAudio className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={isProcessing}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={clearFile}
                  disabled={isProcessing}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing...</span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <div className="progress-clinical">
                  <div
                    className="progress-clinical-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleUploadAndTranscribe}
              disabled={isProcessing}
              className="w-full"
              variant="clinical"
              size="lg"
            >
              {isProcessing ? 'Processing...' : 'Upload & Transcribe'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
