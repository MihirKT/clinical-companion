import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Upload, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { TranscriptPanel } from '@/components/review/TranscriptPanel';
import { ClinicalInsightsPanel } from '@/components/review/ClinicalInsightsPanel';
import { useWorkflow } from '@/context/WorkflowContext';

export function ReviewPage() {
  const { setCurrentStep, markStepComplete, setDocumentStatus, currentTranscript, audioFile } = useWorkflow();
  const [transcriptReviewed, setTranscriptReviewed] = useState(false);
  const [insightsReviewed, setInsightsReviewed] = useState(false);

  const hasTranscript = currentTranscript !== null || audioFile !== null;

  const handleNext = () => {
    setDocumentStatus('reviewed');
    markStepComplete('review');
    setCurrentStep('summarize');
  };

  // Empty state when no transcript
  if (!hasTranscript) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Review Transcript</h2>
            <p className="text-muted-foreground mt-1">Review the transcript and AI-generated clinical insights</p>
          </div>
        </div>

        <Card className="clinical-card">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Transcript Available</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Please upload an audio file or perform a live transcription first to review the transcript and clinical insights.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setCurrentStep('capture')}
              >
                <Upload className="w-4 h-4" />
                Upload Audio
              </Button>
              <Button 
                variant="clinical" 
                className="gap-2"
                onClick={() => setCurrentStep('capture')}
              >
                <Mic className="w-4 h-4" />
                Start Live Transcription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Review Transcript</h2>
          <p className="text-muted-foreground text-sm">Review and approve the transcript and clinical insights</p>
        </div>
        <Button
          onClick={handleNext}
          variant="clinical"
          size="lg"
          className="gap-2 h-10 flex-shrink-0"
        >
          Next: Summarize
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <TranscriptPanel />
        <ClinicalInsightsPanel />
      </div>

      {/* Review Footer */}
      <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
        <label className="flex items-center gap-2 cursor-pointer flex-1">
          <Checkbox
            checked={transcriptReviewed}
            onCheckedChange={(checked) => setTranscriptReviewed(checked as boolean)}
          />
          <Label className="cursor-pointer text-xs text-muted-foreground whitespace-nowrap">
            Transcript reviewed
          </Label>
          {transcriptReviewed && <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />}
        </label>
        <label className="flex items-center gap-2 cursor-pointer flex-1">
          <Checkbox
            checked={insightsReviewed}
            onCheckedChange={(checked) => setInsightsReviewed(checked as boolean)}
          />
          <Label className="cursor-pointer text-xs text-muted-foreground whitespace-nowrap">
            Insights reviewed
          </Label>
          {insightsReviewed && <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />}
        </label>
      </div>
    </div>
  );
}
