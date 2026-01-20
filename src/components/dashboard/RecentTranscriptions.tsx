import React, { useState } from 'react';
import { Clock, User, ChevronDown, ChevronUp, FileText, Copy, Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockTranscript, mockSOAPNote } from '@/data/mockData';
import { useWorkflow } from '@/context/WorkflowContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const recentTranscriptions = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    duration: '5:42',
    time: '10 min ago',
    status: 'completed',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    duration: '8:15',
    time: '45 min ago',
    status: 'completed',
  },
  {
    id: '3',
    patientName: 'Emily Rodriguez',
    duration: '3:28',
    time: '2 hours ago',
    status: 'reviewed',
  },
];

export function RecentTranscriptions() {
  const { setCurrentStep } = useWorkflow();
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'transcription' | 'summary'>('transcription');
  const [transcriptMode, setTranscriptMode] = useState<'raw' | 'enhanced'>('enhanced');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setActiveView('transcription');
    }
  };

  const handleViewAll = () => {
    setCurrentStep('transcriptions');
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast({
      title: "Copied",
      description: "Content copied to clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="clinical-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Recent Transcriptions</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleViewAll}>
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTranscriptions.map((item) => (
          <div key={item.id} className="space-y-0">
            {/* Main Row */}
            <div
              onClick={() => handleToggleExpand(item.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group",
                expandedId === item.id && "rounded-b-none bg-muted/50"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">{item.patientName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
              <Badge variant={item.status === 'reviewed' ? 'reviewed' : 'final'} className="text-xs">
                {item.status}
              </Badge>
              {expandedId === item.id ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>

            {/* Expanded Content - Inline */}
            {expandedId === item.id && (
              <div className="border border-t-0 border-border rounded-b-lg bg-card animate-fade-in">
                {/* Tab Buttons */}
                <div className="flex border-b border-border">
                  <button
                    onClick={() => setActiveView('transcription')}
                    className={cn(
                      "flex-1 py-2 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                      activeView === 'transcription' 
                        ? "bg-primary/5 text-primary border-b-2 border-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <FileText className="w-4 h-4" />
                    Transcription
                  </button>
                  <button
                    onClick={() => setActiveView('summary')}
                    className={cn(
                      "flex-1 py-2 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                      activeView === 'summary' 
                        ? "bg-primary/5 text-primary border-b-2 border-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Sparkles className="w-4 h-4" />
                    Summary
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  {activeView === 'transcription' && (
                    <div className="space-y-3">
                      {/* Toggle between Raw and Enhanced */}
                      <div className="flex items-center justify-between">
                        <Tabs value={transcriptMode} onValueChange={(v) => setTranscriptMode(v as 'raw' | 'enhanced')}>
                          <TabsList className="h-8">
                            <TabsTrigger value="raw" className="text-xs px-3 h-6">Raw</TabsTrigger>
                            <TabsTrigger value="enhanced" className="text-xs px-3 h-6">AI Enhanced</TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs gap-1"
                          onClick={() => handleCopy(
                            transcriptMode === 'raw' ? mockTranscript.rawText : mockTranscript.improvedText,
                            `transcript-${item.id}`
                          )}
                        >
                          {copiedId === `transcript-${item.id}` ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          Copy
                        </Button>
                      </div>
                      <ScrollArea className="h-[200px] border rounded-lg p-3 bg-muted/20">
                        <div className="text-sm whitespace-pre-wrap text-foreground">
                          {transcriptMode === 'raw' ? mockTranscript.rawText : mockTranscript.improvedText}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  {activeView === 'summary' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">SOAP Note</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs gap-1"
                          onClick={() => handleCopy(mockSOAPNote, `summary-${item.id}`)}
                        >
                          {copiedId === `summary-${item.id}` ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          Copy
                        </Button>
                      </div>
                      <ScrollArea className="h-[200px] border rounded-lg p-3 bg-muted/20">
                        <div className="text-sm whitespace-pre-wrap text-foreground font-mono">
                          {mockSOAPNote}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
