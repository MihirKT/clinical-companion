import React, { useState } from 'react';
import { User, Search, Plus, Link2, Unlink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockPatients } from '@/data/mockData';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function PatientLinkSelector() {
  const { linkedPatientId, setLinkedPatientId } = useWorkflow();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const linkedPatient = mockPatients.find(p => p.id === linkedPatientId);
  
  const filteredPatients = mockPatients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.medicalId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPatient = (patientId: string) => {
    setLinkedPatientId(patientId);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleUnlink = () => {
    setLinkedPatientId(null);
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
            <div className="p-2 border-t border-border">
              <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
                <Plus className="w-4 h-4" />
                Add New Patient
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
