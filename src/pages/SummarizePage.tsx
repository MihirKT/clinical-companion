import React, { useState } from 'react';
import { FileEdit, RefreshCw, Copy, Download, ArrowRight, Sparkles, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockSOAPNote } from '@/data/mockData';
import { SummaryType } from '@/types/clinical';
import { useToast } from '@/hooks/use-toast';

const summaryTypes: { value: SummaryType; label: string }[] = [
  { value: 'soap', label: 'SOAP Note' },
  { value: 'discharge', label: 'Discharge Summary' },
  { value: 'referral', label: 'Referral Letter' },
  { value: 'progress', label: 'Progress Note' },
  { value: 'custom', label: 'Custom' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
];

export function SummarizePage() {
  const { setCurrentStep, markStepComplete, setDocumentStatus } = useWorkflow();
  const { toast } = useToast();
  const [summaryType, setSummaryType] = useState<SummaryType>('soap');
  const [language, setLanguage] = useState('en');
  const [prompt, setPrompt] = useState('');
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedSummary(mockSOAPNote);
    setIsGenerating(false);
    
    toast({
      title: 'Summary Generated',
      description: 'Your clinical summary has been generated successfully.',
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSummary);
    toast({
      title: 'Copied to Clipboard',
      description: 'Summary copied successfully.',
    });
  };

  const handleProceed = () => {
    setDocumentStatus('final');
    markStepComplete('summarize');
    setCurrentStep('patient-hub');
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Generate Summary</h2>
        <p className="text-muted-foreground mt-1">Configure and generate clinical documentation</p>
      </div>

      {/* Configuration Card */}
      <Card className="clinical-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileEdit className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Summary Configuration</CardTitle>
              <CardDescription>Choose the type and format of your summary</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="summary-type">Summary Type</Label>
              <Select value={summaryType} onValueChange={(v) => setSummaryType(v as SummaryType)}>
                <SelectTrigger id="summary-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {summaryTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Refine Summary (Optional)</Label>
            <Textarea
              id="prompt"
              placeholder="Focus on cardiology findings and keep it concise for referral..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Add specific instructions to customize the generated summary
            </p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            variant="ai"
            size="lg"
            className="w-full gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Summary */}
      {generatedSummary && (
        <Card className="clinical-card animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <FileEdit className="w-5 h-5 text-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">Generated Summary</CardTitle>
                  <CardDescription>
                    {summaryTypes.find(t => t.value === summaryType)?.label}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed text-foreground max-h-[500px] overflow-y-auto transcript-scroll">
              {generatedSummary}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      {generatedSummary && (
        <div className="flex justify-end">
          <Button
            onClick={handleProceed}
            variant="clinical"
            size="lg"
            className="gap-2"
          >
            Proceed to Patient Hub
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
