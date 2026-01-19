import React, { useState } from 'react';
import { Clock, User, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWorkflow } from '@/context/WorkflowContext';
import { TranscriptionDetailModal } from '@/components/dashboard/TranscriptionDetailModal';
import { mockTranscript } from '@/data/mockData';

const allTranscriptions = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    duration: '5:42',
    time: '10 min ago',
    status: 'completed' as const,
    date: '2024-01-15',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    duration: '8:15',
    time: '45 min ago',
    status: 'completed' as const,
    date: '2024-01-15',
  },
  {
    id: '3',
    patientName: 'Emily Rodriguez',
    duration: '3:28',
    time: '2 hours ago',
    status: 'reviewed' as const,
    date: '2024-01-15',
  },
  {
    id: '4',
    patientName: 'James Wilson',
    duration: '6:12',
    time: '4 hours ago',
    status: 'completed' as const,
    date: '2024-01-14',
  },
  {
    id: '5',
    patientName: 'Patricia Moore',
    duration: '4:55',
    time: '1 day ago',
    status: 'reviewed' as const,
    date: '2024-01-14',
  },
  {
    id: '6',
    patientName: 'David Taylor',
    duration: '7:30',
    time: '2 days ago',
    status: 'completed' as const,
    date: '2024-01-13',
  },
  {
    id: '7',
    patientName: 'Jennifer Anderson',
    duration: '5:18',
    time: '3 days ago',
    status: 'completed' as const,
    date: '2024-01-13',
  },
  {
    id: '8',
    patientName: 'Robert Thomas',
    duration: '6:45',
    time: '4 days ago',
    status: 'reviewed' as const,
    date: '2024-01-12',
  },
];

interface TranscriptionItem {
  id: string;
  patientName: string;
  duration: string;
  time: string;
  status: 'completed' | 'reviewed';
  date: string;
}

export function TranscriptionsPage() {
  const { setCurrentStep } = useWorkflow();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTranscription, setSelectedTranscription] = useState<TranscriptionItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredTranscriptions = allTranscriptions.filter((t) =>
    t.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewTranscription = (item: TranscriptionItem) => {
    setSelectedTranscription(item);
    setModalOpen(true);
  };

  const handleOpenInEditor = () => {
    setCurrentStep('review');
  };

  const handleBack = () => {
    setCurrentStep('patient-hub');
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
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewTranscription(item)}
            >
              <CardContent className="p-4">
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
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No transcriptions found</p>
          </div>
        )}
      </div>

      {/* Modal for transcription details */}
      {selectedTranscription && (
        <TranscriptionDetailModal
          transcript={{
            id: selectedTranscription.id,
            rawText: mockTranscript.rawText,
            improvedText: mockTranscript.improvedText,
            segments: mockTranscript.segments,
            duration: parseInt(selectedTranscription.duration),
            createdAt: new Date(selectedTranscription.date),
          }}
          patientName={selectedTranscription.patientName}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onOpenInEditor={handleOpenInEditor}
        />
      )}
    </div>
  );
}
