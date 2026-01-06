import React, { useState } from 'react';
import { Search, Grid, List, User, Calendar, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockPatients } from '@/data/mockData';
import { Patient } from '@/types/clinical';

export function PatientHubPage() {
  const { setCurrentStep, setSelectedPatient, markStepComplete } = useWorkflow();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.medicalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    markStepComplete('patient-hub');
    setCurrentStep('demographics');
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
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Patient Hub</h2>
        <p className="text-muted-foreground mt-1">Search and manage patient records</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2 border rounded-lg p-1">
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
        {filteredPatients.map(patient => (
          <Card
            key={patient.id}
            className="clinical-card cursor-pointer hover:shadow-md transition-all"
            onClick={() => handlePatientClick(patient)}
          >
            <CardContent className={cn(
              'p-4',
              viewMode === 'list' && 'flex items-center gap-4'
            )}>
              <div className={cn(
                'flex items-center gap-3',
                viewMode === 'grid' && 'mb-3'
              )}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground truncate">{patient.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{patient.medicalId}</p>
                </div>
                {patient.alerts && patient.alerts.length > 0 && (
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                )}
              </div>

              <div className={cn(
                viewMode === 'grid' ? 'space-y-2' : 'flex items-center gap-6 flex-1'
              )}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{patient.age}y</span>
                  <span>•</span>
                  <span className="capitalize">{patient.gender}</span>
                </div>

                {patient.primaryCondition && (
                  <Badge variant="secondary" className="text-xs">
                    {patient.primaryCondition}
                  </Badge>
                )}

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Last: {formatDate(patient.lastVisit)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No patients found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
