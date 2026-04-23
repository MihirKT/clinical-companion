import React, { useState } from 'react';
import { Clock, User, ArrowLeft, Search, FileText, Sparkles, ChevronDown, ChevronUp, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockTranscript, mockSOAPNote } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const allTranscriptions = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    duration: '5:42',
    time: '10 min ago',
    status: 'completed' as const,
    date: '2024-01-15',
    visitType: 'Follow-up',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    duration: '8:15',
    time: '45 min ago',
    status: 'completed' as const,
    date: '2024-01-15',
    visitType: 'Cardiology',
  },
  {
    id: '3',
    patientName: 'Emily Rodriguez',
    duration: '3:28',
    time: '2 hours ago',
    status: 'reviewed' as const,
    date: '2024-01-15',
    visitType: 'Mental Health',
  },
  {
    id: '4',
    patientName: 'James Wilson',
    duration: '6:12',
    time: '4 hours ago',
    status: 'completed' as const,
    date: '2024-01-14',
    visitType: 'Post-op',
  },
  {
    id: '5',
    patientName: 'Patricia Moore',
    duration: '4:55',
    time: '1 day ago',
    status: 'reviewed' as const,
    date: '2024-01-14',
    visitType: 'Routine',
  },
  {
    id: '6',
    patientName: 'David Taylor',
    duration: '7:30',
    time: '2 days ago',
    status: 'completed' as const,
    date: '2024-01-13',
    visitType: 'New Patient',
  },
  {
    id: '7',
    patientName: 'Jennifer Anderson',
    duration: '5:18',
    time: '3 days ago',
    status: 'completed' as const,
    date: '2024-01-13',
    visitType: 'Follow-up',
  },
  {
    id: '8',
    patientName: 'Robert Thomas',
    duration: '6:45',
    time: '4 days ago',
    status: 'reviewed' as const,
    date: '2024-01-12',
    visitType: 'Urgent',
  },
];

interface TranscriptionItem {
  id: string;
  patientName: string;
  duration: string;
  time: string;
  status: 'completed' | 'reviewed';
  date: string;
  visitType: string;
}

export function TranscriptionsPage() {
  const { setCurrentStep } = useWorkflow();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'transcript' | 'summary'>('transcript');
  const [transcriptTab, setTranscriptTab] = useState<'raw' | 'enhanced'>('raw');

  const filteredTranscriptions = allTranscriptions.filter((t) =>
    t.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setActiveView('transcript');
      setTranscriptTab('raw');
    }
  };

  const handleBack = () => {
    setCurrentStep('capture');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: 'Content copied successfully.',
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    }
    return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Reviewed</Badge>;
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">All Transcriptions</h2>
          <p className="text-muted-foreground mt-1">
            {filteredTranscriptions.length} transcription{filteredTranscriptions.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Transcriptions List */}
      <div className="space-y-3">
        {filteredTranscriptions.length > 0 ? (
          filteredTranscriptions.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "transition-all duration-200",
                expandedId === item.id && "ring-2 ring-primary/30"
              )}
            >
              <CardContent className="p-0">
                {/* Header Row - Clickable */}
                <div 
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleToggleExpand(item.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {item.patientName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span>{item.duration}</span>
                          <span>•</span>
                          <span>{item.time}</span>
                          <span>•</span>
                          <span>{item.visitType}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {getStatusBadge(item.status)}
                      {expandedId === item.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === item.id && (
                  <div className="border-t border-border p-4 space-y-4 animate-fade-in">
                    {/* Toggle Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant={activeView === 'transcript' ? 'default' : 'outline'}
                        size="sm"
                        className="gap-2"
                        onClick={() => setActiveView('transcript')}
                      >
                        <FileText className="w-4 h-4" />
                        Transcription
                      </Button>
                      <Button
                        variant={activeView === 'summary' ? 'default' : 'outline'}
                        size="sm"
                        className="gap-2"
                        onClick={() => setActiveView('summary')}
                      >
                        <Sparkles className="w-4 h-4" />
                        Summary
                      </Button>
                    </div>

                    {/* Transcription View */}
                    {activeView === 'transcript' && (
                      <div className="space-y-3">
                        <Tabs value={transcriptTab} onValueChange={(v) => setTranscriptTab(v as 'raw' | 'enhanced')}>
                          <div className="flex items-center justify-between">
                            <TabsList className="grid w-64 grid-cols-2">
                              <TabsTrigger value="raw">Raw</TabsTrigger>
                              <TabsTrigger value="enhanced">AI Enhanced</TabsTrigger>
                            </TabsList>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleCopy(transcriptTab === 'raw' ? mockTranscript.rawText : mockTranscript.improvedText)}
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </Button>
                          </div>
                          
                          <TabsContent value="raw" className="mt-3">
                            <ScrollArea className="h-[300px] border rounded-lg p-4 bg-muted/30">
                              <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground">
                                {mockTranscript.rawText}
                              </div>
                            </ScrollArea>
                          </TabsContent>
                          
                          <TabsContent value="enhanced" className="mt-3">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                              <Sparkles className="w-3 h-3" />
                              <span>AI-improved for clarity and medical terminology</span>
                            </div>
                            <ScrollArea className="h-[300px] border rounded-lg p-4 bg-primary/5">
                              <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground">
                                {mockTranscript.improvedText}
                              </div>
                            </ScrollArea>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    {/* Summary View */}
                    {activeView === 'summary' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">SOAP Note</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-1"
                              onClick={() => handleCopy(mockSOAPNote)}
                            >
                              <Copy className="w-3 h-3" />
                              Copy
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Download className="w-3 h-3" />
                              Export
                            </Button>
                          </div>
                        </div>
                        <ScrollArea className="h-[300px] border rounded-lg p-4 bg-muted/30">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground">
                            {mockSOAPNote}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transcriptions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
