import React, { useState } from 'react';
import { FileEdit, RefreshCw, Copy, Download, ArrowRight, Sparkles, Upload, Mic, History, X, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockSOAPNote, mockPreviousSummaries } from '@/data/mockData';
import { SummaryType } from '@/types/clinical';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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

const typeLabels: Record<string, string> = {
  soap: 'SOAP Note',
  discharge: 'Discharge Summary',
  referral: 'Referral Letter',
  progress: 'Progress Note',
  custom: 'Custom',
};

export function SummarizePage() {
  const { setCurrentStep, markStepComplete, setDocumentStatus, currentTranscript, audioFile } = useWorkflow();
  const { toast } = useToast();
  const [summaryType, setSummaryType] = useState<SummaryType>('soap');
  const [language, setLanguage] = useState('en');
  const [prompt, setPrompt] = useState('');
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPreviousSummary, setSelectedPreviousSummary] = useState<string | null>(null);

  const hasTranscript = currentTranscript !== null || audioFile !== null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSelectedPreviousSummary(null);
    
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

  const handleViewPreviousSummary = (summaryId: string) => {
    const summary = mockPreviousSummaries.find(s => s.id === summaryId);
    if (summary) {
      setSelectedPreviousSummary(summaryId);
      setGeneratedSummary(summary.content);
    }
  };

  // Empty state when no transcript
  if (!hasTranscript) {
    return (
      <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Generate Summary</h2>
          <p className="text-muted-foreground mt-1">Configure and generate clinical documentation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Empty State Card */}
          <Card className="clinical-card lg:col-span-2">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Active Transcript</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Please upload an audio file or perform a live transcription first to generate a clinical summary.
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

          {/* Previous Summaries Panel */}
          <Card className="clinical-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Previous Summaries</CardTitle>
              </div>
              <CardDescription>Access past clinical documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-2">
                <div className="space-y-3">
                  {mockPreviousSummaries.map((summary) => (
                    <button
                      key={summary.id}
                      onClick={() => handleViewPreviousSummary(summary.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all hover:bg-accent/50 ${
                        selectedPreviousSummary === summary.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-medium text-sm text-foreground line-clamp-1">
                          {summary.title}
                        </span>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {typeLabels[summary.type]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{summary.patientName}</span>
                        <span>•</span>
                        <Calendar className="w-3 h-3" />
                        <span>{format(summary.createdAt, 'MMM d, yyyy')}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Selected Previous Summary Display */}
        {selectedPreviousSummary && generatedSummary && (
          <Card className="clinical-card animate-slide-up">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <History className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {mockPreviousSummaries.find(s => s.id === selectedPreviousSummary)?.title}
                    </CardTitle>
                    <CardDescription>
                      {mockPreviousSummaries.find(s => s.id === selectedPreviousSummary)?.patientName} • 
                      {format(mockPreviousSummaries.find(s => s.id === selectedPreviousSummary)?.createdAt || new Date(), ' MMM d, yyyy')}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedPreviousSummary(null);
                      setGeneratedSummary('');
                    }}
                  >
                    <X className="w-4 h-4" />
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
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Generate Summary</h2>
        <p className="text-muted-foreground mt-1">Configure and generate clinical documentation</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration Card */}
        <Card className="clinical-card lg:col-span-2">
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

        {/* Previous Summaries Panel */}
        <Card className="clinical-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Previous Summaries</CardTitle>
            </div>
            <CardDescription>Access past clinical documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-2">
              <div className="space-y-3">
                {mockPreviousSummaries.map((summary) => (
                  <button
                    key={summary.id}
                    onClick={() => handleViewPreviousSummary(summary.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all hover:bg-accent/50 ${
                      selectedPreviousSummary === summary.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium text-sm text-foreground line-clamp-1">
                        {summary.title}
                      </span>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {typeLabels[summary.type]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{summary.patientName}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{format(summary.createdAt, 'MMM d, yyyy')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

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
                  <CardTitle className="text-lg">
                    {selectedPreviousSummary 
                      ? mockPreviousSummaries.find(s => s.id === selectedPreviousSummary)?.title
                      : 'Generated Summary'
                    }
                  </CardTitle>
                  <CardDescription>
                    {selectedPreviousSummary
                      ? `${mockPreviousSummaries.find(s => s.id === selectedPreviousSummary)?.patientName} • ${format(mockPreviousSummaries.find(s => s.id === selectedPreviousSummary)?.createdAt || new Date(), 'MMM d, yyyy')}`
                      : summaryTypes.find(t => t.value === summaryType)?.label
                    }
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!selectedPreviousSummary && (
                  <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Regenerate
                  </Button>
                )}
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
      {generatedSummary && !selectedPreviousSummary && (
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
