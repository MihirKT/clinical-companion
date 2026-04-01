import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, X, Link2, ChevronRight, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Patient, Appointment } from '@/types/clinical';
import { format } from 'date-fns';

interface UpcomingAppointmentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient;
  onLinkPatient?: (patient: Patient) => void;
}

export function UpcomingAppointmentsModal({
  open,
  onOpenChange,
  patient,
  onLinkPatient,
}: UpcomingAppointmentsModalProps) {
  const [showingDetails, setShowingDetails] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showOtherAppointments, setShowOtherAppointments] = useState(false);

  const upcomingAppointments = patient.upcomingAppointments || [];
  const now = new Date();

  // Initialize with the first (soonest) appointment
  useEffect(() => {
    if (open && upcomingAppointments.length > 0 && !selectedAppointment) {
      const sortedAppointments = [...upcomingAppointments].sort(
        (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      setSelectedAppointment(sortedAppointments[0]);
      setShowingDetails(true);
    }
  }, [open, upcomingAppointments, selectedAppointment]);

  const getTimeDisplay = (appointmentDate: Date) => {
    const diffMs = appointmentDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      return format(appointmentDate, 'HH:mm');
    } else if (diffDays === 1) {
      return `Tomorrow • ${format(appointmentDate, 'HH:mm')}`;
    } else if (diffDays <= 7) {
      return `${diffDays} days • ${format(appointmentDate, 'MMM d')}`;
    } else {
      return format(appointmentDate, 'MMM d, yyyy • HH:mm');
    }
  };

  const handleLinkPatient = () => {
    onLinkPatient?.(patient);
    onOpenChange(false);
  };

  const otherAppointments = upcomingAppointments.filter(apt => apt.id !== selectedAppointment?.id);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when modal closes
      setShowOtherAppointments(false);
      setSelectedAppointment(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {showOtherAppointments && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOtherAppointments(false)}
                className="gap-2 -ml-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            {showOtherAppointments ? 'Other Appointments' : 'Upcoming Appointment'}
          </DialogTitle>
        </DialogHeader>

        {showOtherAppointments ? (
          // Other Appointments List View
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-2">
              {otherAppointments.length > 0 ? (
                otherAppointments.map((appointment) => (
                  <Card
                    key={appointment.id}
                    className="cursor-pointer hover:shadow-md transition-all clinical-card"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowOtherAppointments(false);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{appointment.type}</Badge>
                            <span className="text-xs font-medium text-muted-foreground">
                              {getTimeDisplay(appointment.dateTime)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.reason || 'No reason specified'}</p>
                          {appointment.location && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {appointment.location}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="clinical-card">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No other upcoming appointments</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        ) : selectedAppointment ? (
          // Appointment Detail View
          <div className="space-y-4 flex-1 overflow-y-auto">
            <Card className="clinical-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{patient.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{patient.medicalId}</div>
                  </div>
                  <Badge variant="outline">{selectedAppointment.type}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Appointment Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">{format(selectedAppointment.dateTime, 'MMMM d, yyyy • HH:mm')}</p>
                    </div>
                  </div>
                  {selectedAppointment.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{selectedAppointment.location}</p>
                      </div>
                    </div>
                  )}
                  {selectedAppointment.reason && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Reason for Visit</p>
                      <p className="font-medium">{selectedAppointment.reason}</p>
                    </div>
                  )}
                </div>

                {/* Patient Information */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Patient Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Age</p>
                      <p className="font-medium">{patient.age} years old</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Condition</p>
                      <p className="font-medium">{patient.primaryCondition || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Contact</p>
                      <p className="font-medium">{patient.contact || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Visit</p>
                      <p className="font-medium">
                        {patient.lastVisit ? format(patient.lastVisit, 'MMM d, yyyy') : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Patient Summary */}
                {patient.aiSummary && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded">AI</span>
                      Patient Summary
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed">{patient.aiSummary}</p>
                  </div>
                )}

                {/* View other appointments button and action buttons */}
                <div className="border-t pt-4 space-y-2">
                  {otherAppointments.length > 0 && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowOtherAppointments(true)}
                    >
                      View other appointments ({otherAppointments.length})
                    </Button>
                  )}
                  <div className="flex gap-2">
                    <Button variant="clinical" className="gap-2 flex-1" onClick={handleLinkPatient}>
                      <Link2 className="w-4 h-4" />
                      Link Patient
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleOpenChange(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // No appointment selected
          <div className="flex-1 flex items-center justify-center">
            <Card className="clinical-card">
              <CardContent className="p-8 text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming appointments scheduled</p>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
