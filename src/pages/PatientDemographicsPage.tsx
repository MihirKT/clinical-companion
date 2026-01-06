import React, { useState } from 'react';
import { ArrowLeft, User, AlertTriangle, Calendar, Phone, FileText, Activity, Pill, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockVisits, mockVitals, mockMedications } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { VitalsChart } from '@/components/demographics/VitalsChart';
import { MedicationsTab } from '@/components/demographics/MedicationsTab';

export function PatientDemographicsPage() {
  const { selectedPatient, setCurrentStep } = useWorkflow();
  const [activeTab, setActiveTab] = useState('overview');

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
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Visit Records</CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="w-4 h-4" />
                    Full Summary
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientVisits.length > 0 ? (
                    patientVisits.map(visit => (
                      <div
                        key={visit.id}
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
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No visit records found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
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
