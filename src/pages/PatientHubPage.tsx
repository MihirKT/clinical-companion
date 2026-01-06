import React, { useState } from 'react';
import { Search, Grid, List, User, Calendar, AlertTriangle, Plus, Filter, FileText, ChevronRight, X, Copy, Download, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockPatients, mockPreviousSummaries } from '@/data/mockData';
import { Patient } from '@/types/clinical';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const typeLabels: Record<string, string> = {
  soap: 'SOAP Note',
  discharge: 'Discharge Summary',
  referral: 'Referral Letter',
  progress: 'Progress Note',
  custom: 'Custom',
};

export function PatientHubPage() {
  const { setCurrentStep, setSelectedPatient, markStepComplete } = useWorkflow();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCondition, setFilterCondition] = useState<string>('all');
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(null);

  const conditions = ['all', ...new Set(mockPatients.map(p => p.primaryCondition).filter(Boolean))];

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medicalId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCondition === 'all' || patient.primaryCondition === filterCondition;
    return matchesSearch && matchesFilter;
  });

  const getPatientSummaries = (patientId: string) => {
    return mockPreviousSummaries.filter(s => s.patientId === patientId);
  };

  const selectedSummary = mockPreviousSummaries.find(s => s.id === selectedSummaryId);

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    markStepComplete('patient-hub');
    setCurrentStep('demographics');
  };

  const handleCopySummary = () => {
    if (selectedSummary) {
      navigator.clipboard.writeText(selectedSummary.content);
      toast({
        title: 'Copied to Clipboard',
        description: 'Summary copied successfully.',
      });
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Patient Hub</h2>
          <p className="text-muted-foreground mt-1">
            {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Button variant="clinical" className="gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          Add Patient
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterCondition} onValueChange={setFilterCondition}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by condition" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map(condition => (
              <SelectItem key={condition || 'all'} value={condition || 'all'}>
                {condition === 'all' ? 'All Conditions' : condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 border rounded-lg p-1 self-start">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon-sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon-sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Patient Grid/List */}
      <div className={cn(
        viewMode === 'grid'
          ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'space-y-3'
      )}>
        {filteredPatients.map(patient => {
          const patientSummaries = getPatientSummaries(patient.id);
          
          return (
            <Card
              key={patient.id}
              className="clinical-card hover:shadow-lg hover:border-primary/20 transition-all group"
            >
              <CardContent className={cn(
                'p-4',
                viewMode === 'list' && 'flex items-center gap-4'
              )}>
                <div 
                  className={cn(
                    'flex items-center gap-3 cursor-pointer',
                    viewMode === 'grid' && 'mb-3'
                  )}
                  onClick={() => handlePatientClick(patient)}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-sm font-semibold text-primary">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">{patient.medicalId}</p>
                  </div>
                  {patient.alerts && patient.alerts.length > 0 && (
                    <Badge variant="severity-high" className="gap-1 flex-shrink-0">
                      <AlertTriangle className="w-3 h-3" />
                      {patient.alerts.length}
                    </Badge>
                  )}
                </div>

                <div className={cn(
                  viewMode === 'grid' ? 'space-y-2' : 'flex items-center gap-6 flex-1'
                )}>
                  <div 
                    className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                    onClick={() => handlePatientClick(patient)}
                  >
                    <span>{patient.age}y</span>
                    <span>•</span>
                    <span className="capitalize">{patient.gender}</span>
                  </div>

                  {patient.primaryCondition && (
                    <Badge variant="secondary" className="text-xs">
                      {patient.primaryCondition}
                    </Badge>
                  )}

                  <div 
                    className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer"
                    onClick={() => handlePatientClick(patient)}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Last: {formatDate(patient.lastVisit)}</span>
                  </div>
                </div>

                {/* Previous Summaries Section */}
                {patientSummaries.length > 0 && (
                  <div className={cn(
                    'pt-3 mt-3 border-t border-border',
                    viewMode === 'list' && 'border-t-0 border-l pl-4 pt-0 mt-0'
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      <History className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {patientSummaries.length} Previous {patientSummaries.length === 1 ? 'Summary' : 'Summaries'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {patientSummaries.slice(0, 2).map(summary => (
                        <Button
                          key={summary.id}
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSummaryId(summary.id);
                          }}
                        >
                          <FileText className="w-3 h-3" />
                          {typeLabels[summary.type]}
                        </Button>
                      ))}
                      {patientSummaries.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePatientClick(patient);
                          }}
                        >
                          +{patientSummaries.length - 2} more
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground">No patients found</p>
          <p className="text-muted-foreground mt-1">
            {searchQuery ? `No results for "${searchQuery}"` : 'Add your first patient to get started'}
          </p>
          <Button variant="clinical" className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Add Patient
          </Button>
        </div>
      )}

      {/* Summary Dialog */}
      <Dialog open={!!selectedSummaryId} onOpenChange={(open) => !open && setSelectedSummaryId(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {selectedSummary?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedSummary?.patientName} • {selectedSummary ? format(selectedSummary.createdAt, 'MMMM d, yyyy') : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 pt-2">
            <Badge variant="outline">{selectedSummary ? typeLabels[selectedSummary.type] : ''}</Badge>
            <div className="flex-1" />
            <Button variant="outline" size="sm" onClick={handleCopySummary}>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
          <ScrollArea className="max-h-[50vh] mt-4">
            <div className="bg-muted/30 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed text-foreground">
              {selectedSummary?.content}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
