import React, { useState } from 'react';
import { ArrowLeft, User, AlertTriangle, Calendar, Phone, FileText, Activity, Pill, Heart, Sparkles, Edit2, Save, X, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockVisits, mockVitals, mockMedications, mockPreviousSummaries } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { VitalsChart } from '@/components/demographics/VitalsChart';
import { MedicationsTab } from '@/components/demographics/MedicationsTab';
import { useToast } from '@/hooks/use-toast';

export function PatientDemographicsPage() {
  const { selectedPatient, setSelectedPatient, setCurrentStep } = useWorkflow();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [expandedVisitId, setExpandedVisitId] = useState<string | null>(null);
  const [expandedSummaryId, setExpandedSummaryId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
  });

  if (!selectedPatient) {
    return (
      <div className="animate-fade-in text-center py-12">
        <p className="text-muted-foreground">No patient selected</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setCurrentStep('patient-hub')}
        >
          Go to Patient Hub
        </Button>
      </div>
    );
  }

  const patientVisits = mockVisits.filter(v => v.patientId === selectedPatient.id);
  const patientSummaries = mockPreviousSummaries.filter(s => s.patientId === selectedPatient.id);

  const handleStartEdit = () => {
    setEditForm({
      name: selectedPatient.name,
      age: selectedPatient.age.toString(),
      gender: selectedPatient.gender,
      contact: selectedPatient.contact || '',
    });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Update the patient (in production this would call an API)
    const updatedPatient = {
      ...selectedPatient,
      name: editForm.name,
      age: parseInt(editForm.age) || selectedPatient.age,
      gender: editForm.gender as 'male' | 'female' | 'other',
      contact: editForm.contact || undefined,
    };
    
    setSelectedPatient(updatedPatient);
    setIsEditing(false);
    
    toast({
      title: "Patient Updated",
      description: "Demographics have been saved successfully.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => setCurrentStep('patient-hub')}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patient Hub
      </Button>

      {/* Patient Snapshot */}
      <Card className="clinical-card overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xl font-semibold">
              {selectedPatient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-foreground">{selectedPatient.name}</h2>
                {selectedPatient.alerts && selectedPatient.alerts.length > 0 && (
                  <Badge variant="severity-high" className="gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {selectedPatient.alerts.length} Alert{selectedPatient.alerts.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>{selectedPatient.age} years old</span>
                <span>•</span>
                <span className="capitalize">{selectedPatient.gender}</span>
                <span>•</span>
                <span className="font-mono">{selectedPatient.medicalId}</span>
              </div>
            </div>
            {/* Edit Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartEdit}
              className="gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          </div>

          {/* AI Summary */}
          {selectedPatient.aiSummary && (
            <div className="mt-4 p-4 bg-card/50 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>AI Patient Summary</span>
              </div>
              <p className="text-sm text-foreground">{selectedPatient.aiSummary}</p>
            </div>
          )}

          {/* Alerts */}
          {selectedPatient.alerts && selectedPatient.alerts.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedPatient.alerts.map(alert => (
                <Badge
                  key={alert.id}
                  variant={
                    alert.severity === 'high' ? 'severity-high' :
                    alert.severity === 'medium' ? 'severity-medium' : 'severity-low'
                  }
                  className="gap-1"
                >
                  <AlertTriangle className="w-3 h-3" />
                  {alert.message}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Edit Modal/Form */}
      {isEditing && (
        <Card className="clinical-card border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Edit Patient Demographics</CardTitle>
              <Button variant="ghost" size="icon-sm" onClick={handleCancelEdit}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-age">Age</Label>
                <Input
                  id="edit-age"
                  type="number"
                  value={editForm.age}
                  onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-gender">Gender</Label>
                <select
                  id="edit-gender"
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm mt-1"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-contact">Contact</Label>
                <Input
                  id="edit-contact"
                  value={editForm.contact}
                  onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button variant="clinical" onClick={handleSaveEdit} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="gap-2">
            <User className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="graphs" className="gap-2">
            <Activity className="w-4 h-4" />
            Graphs
          </TabsTrigger>
          <TabsTrigger value="medications" className="gap-2">
            <Pill className="w-4 h-4" />
            Medications
          </TabsTrigger>
          <TabsTrigger value="vitals" className="gap-2">
            <Heart className="w-4 h-4" />
            Vitals
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Demographics */}
            <Card className="clinical-card">
              <CardHeader>
                <CardTitle className="text-base">Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Full Name</span>
                  <span className="text-sm font-medium">{selectedPatient.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Age</span>
                  <span className="text-sm font-medium">{selectedPatient.age} years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Gender</span>
                  <span className="text-sm font-medium capitalize">{selectedPatient.gender}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Medical ID</span>
                  <span className="text-sm font-mono">{selectedPatient.medicalId}</span>
                </div>
                {selectedPatient.contact && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Contact</span>
                    <span className="text-sm font-medium">{selectedPatient.contact}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Visit Records */}
            <Card className="clinical-card">
              <CardHeader>
                <CardTitle className="text-base">Visit Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientVisits.length > 0 ? (
                    patientVisits.map(visit => (
                      <div key={visit.id}>
                        <div
                          onClick={() => setExpandedVisitId(expandedVisitId === visit.id ? null : visit.id)}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        >
                          <div className="timeline-dot flex-shrink-0">
                            <Calendar className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium capitalize">{visit.type}</span>
                              <span className="text-xs text-muted-foreground">{formatDate(visit.date)}</span>
                            </div>
                            {visit.diagnosis && (
                              <p className="text-xs text-muted-foreground mt-1 truncate">{visit.diagnosis}</p>
                            )}
                          </div>
                          {expandedVisitId === visit.id ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                        
                        {/* Expanded Visit Details */}
                        {expandedVisitId === visit.id && (
                          <div className="ml-7 mt-2 p-3 bg-muted/30 rounded-lg border border-border animate-fade-in">
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Type: </span>
                                <span className="capitalize font-medium">{visit.type}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Date: </span>
                                <span className="font-medium">{formatDate(visit.date)}</span>
                              </div>
                              {visit.diagnosis && (
                                <div>
                                  <span className="text-muted-foreground">Diagnosis: </span>
                                  <span className="font-medium">{visit.diagnosis}</span>
                                </div>
                              )}
                              {visit.notes && (
                                <div>
                                  <span className="text-muted-foreground">Notes: </span>
                                  <span>{visit.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No visit records found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Previous Summaries */}
          {patientSummaries.length > 0 && (
            <Card className="clinical-card">
              <CardHeader>
                <CardTitle className="text-base">Previous Summaries</CardTitle>
                <CardDescription>{patientSummaries.length} summary records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {patientSummaries.map(summary => (
                    <div key={summary.id}>
                      <div
                        onClick={() => setExpandedSummaryId(expandedSummaryId === summary.id ? null : summary.id)}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{summary.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(summary.createdAt)}</p>
                        </div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {summary.type}
                        </Badge>
                        {expandedSummaryId === summary.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      
                      {/* Expanded Summary Content */}
                      {expandedSummaryId === summary.id && (
                        <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border animate-fade-in">
                          <div className="flex justify-end mb-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(summary.content, summary.id);
                              }}
                            >
                              {copiedId === summary.id ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              Copy
                            </Button>
                          </div>
                          <ScrollArea className="h-[200px]">
                            <div className="text-sm whitespace-pre-wrap font-mono text-foreground">
                              {summary.content}
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Graphs Tab */}
        <TabsContent value="graphs" className="mt-6">
          <VitalsChart />
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications" className="mt-6">
          <MedicationsTab medications={mockMedications} />
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="mt-6">
          <Card className="clinical-card">
            <CardHeader>
              <CardTitle className="text-base">Latest Vitals</CardTitle>
              <CardDescription>Most recent vital signs recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockVitals.length > 0 && (
                  <>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Blood Pressure</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {mockVitals[0].bloodPressureSystolic}/{mockVitals[0].bloodPressureDiastolic}
                        <span className="text-sm font-normal text-muted-foreground ml-1">mmHg</span>
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Heart Rate</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {mockVitals[0].heartRate}
                        <span className="text-sm font-normal text-muted-foreground ml-1">bpm</span>
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Temperature</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {mockVitals[0].temperature}
                        <span className="text-sm font-normal text-muted-foreground ml-1">°C</span>
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Oxygen Saturation</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {mockVitals[0].oxygenSaturation}
                        <span className="text-sm font-normal text-muted-foreground ml-1">%</span>
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Weight</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {mockVitals[0].weight}
                        <span className="text-sm font-normal text-muted-foreground ml-1">kg</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
