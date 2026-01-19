import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Patient } from '@/types/clinical';
import { useToast } from '@/hooks/use-toast';

interface PatientCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPatientCreated: (patient: Patient) => void;
}

export function PatientCreationModal({
  open,
  onOpenChange,
  onPatientCreated,
}: PatientCreationModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'other' as 'male' | 'female' | 'other',
    medicalId: '',
    contact: '',
    primaryCondition: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateMRN = () => {
    const mrn = `MRN-${Date.now().toString().slice(-6)}`;
    setFormData(prev => ({
      ...prev,
      medicalId: mrn,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Patient name is required',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.medicalId.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Medical ID is required',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.age) {
      toast({
        title: 'Validation Error',
        description: 'Age is required',
        variant: 'destructive',
      });
      return;
    }

    // Create patient object
    const newPatient: Patient = {
      id: `p-${Date.now()}`,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      medicalId: formData.medicalId,
      contact: formData.contact || undefined,
      primaryCondition: formData.primaryCondition || undefined,
      lastVisit: new Date(),
    };

    onPatientCreated(newPatient);
    onOpenChange(false);

    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: 'other',
      medicalId: '',
      contact: '',
      primaryCondition: '',
    });

    toast({
      title: 'Patient Created',
      description: `${formData.name} has been added to the system.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Patient</DialogTitle>
          <DialogDescription>
            Fill in the patient information below. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Patient Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age *
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter age"
                    min="0"
                    max="150"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender
                  </Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium">
                    Contact Number
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    placeholder="e.g., +1 (555) 123-4567"
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information Card */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Medical ID */}
                <div className="space-y-2">
                  <Label htmlFor="medicalId" className="text-sm font-medium">
                    Medical ID (MRN) *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="medicalId"
                      name="medicalId"
                      placeholder="e.g., MRN-2024-001"
                      value={formData.medicalId}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateMRN}
                      className="flex-shrink-0"
                    >
                      Generate
                    </Button>
                  </div>
                </div>

                {/* Primary Condition */}
                <div className="space-y-2">
                  <Label htmlFor="primaryCondition" className="text-sm font-medium">
                    Primary Condition
                  </Label>
                  <Input
                    id="primaryCondition"
                    name="primaryCondition"
                    placeholder="e.g., Diabetes, Hypertension"
                    value={formData.primaryCondition}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Note:</p>
              <p className="mt-1">
                You can add more detailed information like medications, allergies, and vitals after creating the patient record.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="clinical">
              Create Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
