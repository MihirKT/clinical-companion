import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, User, Mail, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Patient {
  id: string;
  name: string;
  mrn: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
}

interface PatientLinkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: Patient) => void;
  linkedPatientId?: string;
}

// Mock patient database
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    mrn: 'MRN001',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    dateOfBirth: '1990-05-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    mrn: 'MRN002',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    dateOfBirth: '1985-03-22',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    mrn: 'MRN003',
    email: 'robert.j@example.com',
    phone: '(555) 345-6789',
    dateOfBirth: '1978-11-30',
  },
];

export default function PatientLinkingModal({
  isOpen,
  onClose,
  onSelectPatient,
  linkedPatientId,
}: PatientLinkingModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(MOCK_PATIENTS);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredPatients(MOCK_PATIENTS);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = MOCK_PATIENTS.filter(
      patient =>
        patient.name.toLowerCase().includes(lowerQuery) ||
        patient.mrn.toLowerCase().includes(lowerQuery) ||
        patient.email?.toLowerCase().includes(lowerQuery)
    );
    setFilteredPatients(filtered);
  };

  const handleSelectPatient = (patient: Patient) => {
    onSelectPatient(patient);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Link Patient</DialogTitle>
          <DialogDescription>
            Search for and select a patient to link with this document. This is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="patient-search" className="text-sm">
              Search by name, MRN, or email
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="patient-search"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Patient List */}
          <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
            {filteredPatients.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                {searchQuery ? 'No patients found matching your search.' : 'No patients available.'}
              </div>
            ) : (
              filteredPatients.map(patient => (
                <div
                  key={patient.id}
                  className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => handleSelectPatient(patient)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm truncate">{patient.name}</p>
                          {linkedPatientId === patient.id && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                              Linked
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">MRN: {patient.mrn}</p>
                        {patient.dateOfBirth && (
                          <p className="text-xs text-muted-foreground">
                            DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {patient.email && (
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{patient.email}</span>
                      </div>
                    )}
                    {patient.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{patient.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant={linkedPatientId === patient.id ? 'outline' : 'clinical'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPatient(patient);
                      }}
                    >
                      {linkedPatientId === patient.id ? 'Already Linked' : 'Link Patient'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setFilteredPatients(MOCK_PATIENTS);
              onClose();
            }}
          >
            Skip for Now
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
