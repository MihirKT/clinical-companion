import React, { useState, useMemo } from 'react';
import { Search, Plus, AlertCircle, Clock, ChevronLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Patient } from '@/types/clinical';
import { mockPatients } from '@/data/mockData';
import { format } from 'date-fns';

interface PatientSelectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPatient: (patient: Patient) => void;
}

export function PatientSelectModal({
  open,
  onOpenChange,
  onSelectPatient,
}: PatientSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState<'male' | 'female' | 'other'>('other');
  const [activeTab, setActiveTab] = useState('search');
  const [selectedPatientForReview, setSelectedPatientForReview] = useState<Patient | null>(null);

  // Filter patients based on search query
  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return mockPatients;
    
    const query = searchQuery.toLowerCase();
    return mockPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.medicalId.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Sort by recent visit
  const sortedPatients = useMemo(() => {
    return [...filteredPatients].sort((a, b) => {
      if (!a.lastVisit || !b.lastVisit) return 0;
      return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
    });
  }, [filteredPatients]);

  const handleSelectPatientForReview = (patient: Patient) => {
    setSelectedPatientForReview(patient);
  };

  const handleConfirmSelection = (patient: Patient) => {
    onSelectPatient(patient);
    onOpenChange(false);
    setSearchQuery('');
    setSelectedPatientForReview(null);
  };

  const handleCreatePatient = () => {
    if (!newPatientName.trim()) return;

    const newPatient: Patient = {
      id: `p-temp-${Date.now()}`,
      name: newPatientName,
      age: newPatientAge ? parseInt(newPatientAge) : 0,
      gender: newPatientGender,
      medicalId: `MRN-TEMP-${Date.now().toString().slice(-6)}`,
    };

    onSelectPatient(newPatient);
    onOpenChange(false);
    
    // Reset form
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientGender('other');
    setActiveTab('search');
  };

  // If a patient is selected for review, show their details
  if (selectedPatientForReview) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <button
                onClick={() => setSelectedPatientForReview(null)}
                className="hover:bg-accent p-1 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              Patient Summary
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1">
            <div className="space-y-4 pr-4">
              {/* Patient Card */}
              <Card className="clinical-card">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{selectedPatientForReview.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedPatientForReview.medicalId}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Age</p>
                        <p className="font-medium">{selectedPatientForReview.age}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Gender</p>
                        <p className="font-medium capitalize">{selectedPatientForReview.gender}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Condition</p>
                        <p className="font-medium">{selectedPatientForReview.primaryCondition || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Last Visit</p>
                        <p className="font-medium">
                          {selectedPatientForReview.lastVisit
                            ? format(new Date(selectedPatientForReview.lastVisit), 'MMM d')
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Patient Summary */}
              {selectedPatientForReview.aiSummary && (
                <Card className="clinical-card">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-sm flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded">
                          AI
                        </span>
                        Patient Summary
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {selectedPatientForReview.aiSummary}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Alerts */}
              {selectedPatientForReview.alerts && selectedPatientForReview.alerts.length > 0 && (
                <Card className="clinical-card">
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm mb-3">Alerts</p>
                    <div className="space-y-2">
                      {selectedPatientForReview.alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start gap-2 p-2 bg-destructive/5 rounded text-sm">
                          <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium capitalize">{alert.type}</p>
                            <p className="text-xs text-muted-foreground">{alert.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setSelectedPatientForReview(null)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={() => handleConfirmSelection(selectedPatientForReview)}
              className="flex-1"
            >
              Link Patient
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Link Patient</DialogTitle>
          <DialogDescription>
            Search for an existing patient or create a new one
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or MRN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>

            <ScrollArea className="h-[300px] border rounded-lg p-0">
              <div className="p-4 space-y-2">
                {sortedPatients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No patients found</p>
                  </div>
                ) : (
                  sortedPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => handleSelectPatientForReview(patient)}
                      className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {patient.medicalId} • Age {patient.age}
                          </p>
                          {patient.primaryCondition && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {patient.primaryCondition}
                            </p>
                          )}
                        </div>
                        {patient.lastVisit && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            {format(new Date(patient.lastVisit), 'MMM d')}
                          </div>
                        )}
                      </div>
                      {patient.alerts && patient.alerts.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {patient.alerts.slice(0, 2).map((alert) => (
                            <Badge
                              key={alert.id}
                              variant="secondary"
                              className="text-xs"
                            >
                              ⚠️ {alert.type}
                            </Badge>
                          ))}
                          {patient.alerts.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{patient.alerts.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Create New Tab */}
          <TabsContent value="create" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="patient-name" className="text-sm font-medium">
                  Patient Name *
                </Label>
                <Input
                  id="patient-name"
                  placeholder="Enter patient name"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="patient-age" className="text-sm font-medium">
                    Age
                  </Label>
                  <Input
                    id="patient-age"
                    type="number"
                    placeholder="Age"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="patient-gender" className="text-sm font-medium">
                    Gender
                  </Label>
                  <select
                    id="patient-gender"
                    value={newPatientGender}
                    onChange={(e) =>
                      setNewPatientGender(
                        e.target.value as 'male' | 'female' | 'other'
                      )
                    }
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  <strong>Note:</strong> This creates a temporary patient record. You can add more details later in the Patient Hub.
                </p>
              </div>

              <Button
                onClick={handleCreatePatient}
                disabled={!newPatientName.trim()}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Patient
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
