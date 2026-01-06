import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TranscriptPanel } from '@/components/review/TranscriptPanel';
import { ClinicalInsightsPanel } from '@/components/review/ClinicalInsightsPanel';
import { useWorkflow } from '@/context/WorkflowContext';

export function ReviewPage() {
  const { setCurrentStep, markStepComplete, setDocumentStatus } = useWorkflow();
  const [transcriptReviewed, setTranscriptReviewed] = useState(false);
  const [insightsReviewed, setInsightsReviewed] = useState(false);

  const handleNext = () => {
    setDocumentStatus('reviewed');
    markStepComplete('review');
    setCurrentStep('summarize');
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Review Transcript</h2>
          <p className="text-muted-foreground mt-1">Review the transcript and AI-generated clinical insights</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TranscriptPanel />
        <ClinicalInsightsPanel />
      </div>

      {/* Review Footer */}
      <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={transcriptReviewed}
              onCheckedChange={(checked) => setTranscriptReviewed(checked as boolean)}
            />
            <Label className="cursor-pointer text-sm text-muted-foreground">
              Transcript reviewed
            </Label>
            {transcriptReviewed && <CheckCircle className="w-4 h-4 text-success" />}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={insightsReviewed}
              onCheckedChange={(checked) => setInsightsReviewed(checked as boolean)}
            />
            <Label className="cursor-pointer text-sm text-muted-foreground">
              Insights reviewed
            </Label>
            {insightsReviewed && <CheckCircle className="w-4 h-4 text-success" />}
          </label>
        </div>

        <Button
          onClick={handleNext}
          variant="clinical"
          size="lg"
          className="gap-2"
        >
          Next: Summarize
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
