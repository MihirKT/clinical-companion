import React, { useState } from 'react';
import { User, Search, Plus, Link2, Unlink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockPatients } from '@/data/mockData';
import { Patient } from '@/types/clinical';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PatientLinkSelector() {
  const { linkedPatientId, setLinkedPatientId } = useWorkflow();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  
  // New patient form state
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientGender, setNewPatientGender] = useState<'male' | 'female' | 'other'>('other');

  const linkedPatient = mockPatients.find(p => p.id === linkedPatientId);
  
  const filteredPatients = mockPatients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.medicalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPatient = (patientId: string) => {
    setLinkedPatientId(patientId);
    setIsOpen(false);
    setSearchQuery('');
    setActiveTab('search');
  };

  const handleUnlink = () => {
    setLinkedPatientId(null);
  };

  const handleCreatePatient = () => {
    if (!newPatientName.trim()) return;
    
    // Create a new temporary patient (in production this would save to backend)
    const newPatient: Patient = {
      id: `p-new-${Date.now()}`,
      name: newPatientName.trim(),
      age: newPatientAge ? parseInt(newPatientAge) : 0,
      gender: newPatientGender,
      medicalId: `MRN-${Date.now().toString().slice(-6)}`,
      lastVisit: new Date(),
    };
    
    // Add to mock patients (for this session)
    mockPatients.push(newPatient);
    
    // Link to this patient
    setLinkedPatientId(newPatient.id);
    setIsOpen(false);
    
    // Reset form
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientGender('other');
    setActiveTab('search');
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Link to Patient</label>
      
      {linkedPatient ? (
        <div className="flex items-center gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">
              {linkedPatient.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{linkedPatient.name}</p>
            <p className="text-xs text-muted-foreground font-mono">{linkedPatient.medicalId}</p>
          </div>
          <Badge variant="outline" className="gap-1 text-success border-success/30">
            <Link2 className="w-3 h-3" />
            Linked
          </Badge>
          <Button variant="ghost" size="icon-sm" onClick={handleUnlink}>
            <Unlink className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2 h-12">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Select patient to link...</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="p-3 border-b border-border">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="create">Add New</TabsTrigger>
                </TabsList>
              </div>
              
              {/* Search Tab */}
              <TabsContent value="search" className="m-0">
                <div className="p-3 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                      autoFocus
                    />
                  </div>
                </div>
                <ScrollArea className="h-64">
                  <div className="p-2">
                    {filteredPatients.map(patient => (
                      <button
                        key={patient.id}
                        onClick={() => handleSelectPatient(patient.id)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-primary">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{patient.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">{patient.medicalId}</p>
                        </div>
                        {patient.primaryCondition && (
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {patient.primaryCondition}
                          </Badge>
                        )}
                      </button>
                    ))}
                    {filteredPatients.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground text-sm">
                        No patients found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              {/* Create New Patient Tab */}
              <TabsContent value="create" className="m-0 p-3 space-y-3">
                <div>
                  <Label htmlFor="new-patient-name" className="text-sm font-medium">
                    Patient Name *
                  </Label>
                  <Input
                    id="new-patient-name"
                    placeholder="Enter patient name"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="new-patient-age" className="text-sm font-medium">
                      Age
                    </Label>
                    <Input
                      id="new-patient-age"
                      type="number"
                      placeholder="Age"
                      value={newPatientAge}
                      onChange={(e) => setNewPatientAge(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="new-patient-gender" className="text-sm font-medium">
                      Gender
                    </Label>
                    <select
                      id="new-patient-gender"
                      value={newPatientGender}
                      onChange={(e) => setNewPatientGender(e.target.value as 'male' | 'female' | 'other')}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm mt-1"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-muted/50 border border-border rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> This creates a new patient record. Additional details can be added in the Patient Hub.
                  </p>
                </div>
                
                <Button
                  onClick={handleCreatePatient}
                  disabled={!newPatientName.trim()}
                  className="w-full gap-2"
                  variant="clinical"
                >
                  <Plus className="w-4 h-4" />
                  Create & Link Patient
                </Button>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
