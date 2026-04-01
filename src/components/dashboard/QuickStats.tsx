import React, { useState } from 'react';
import { Clock, FileText, Users, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPatients } from '@/data/mockData';
import { UpcomingAppointmentsModal } from '@/components/modals/UpcomingAppointmentsModal';
import { format, differenceInDays } from 'date-fns';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, onClick, className }) => (
  <Card className={`clinical-card hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''} ${className}`} onClick={onClick}>
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      </div>
    </CardContent>
  </Card>
);

export function QuickStats() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [appointmentsModalOpen, setAppointmentsModalOpen] = useState(false);

  const selectedPatient = selectedPatientId ? mockPatients.find(p => p.id === selectedPatientId) : null;

  // Calculate statistics
  const transcriptionsToday = 12;
  const avgDuration = '4:32';
  const patientsSeen = 8;

  // Get next upcoming appointment
  const allAppointments = mockPatients
    .flatMap(p => (p.upcomingAppointments || []).map(apt => ({ ...apt, patient: p })))
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const nextAppointment = allAppointments[0];

  const getUpcomingDisplay = () => {
    if (!nextAppointment) return 'No appointments';
    
    const now = new Date();
    const diffDays = differenceInDays(new Date(nextAppointment.dateTime), now);
    
    if (diffDays <= 1) {
      return format(new Date(nextAppointment.dateTime), 'HH:mm');
    } else {
      return `${diffDays}d • ${format(new Date(nextAppointment.dateTime), 'MMM d')}`;
    }
  };

  const stats: StatCardProps[] = [
    { 
      label: 'Total Patient', 
      value: String(transcriptionsToday), 
      icon: FileText, 
      trend: '+3' 
    },
    { 
      label: 'Patients Seen', 
      value: String(patientsSeen), 
      icon: Users, 
      trend: '+2' 
    },
    { 
      label: 'Avg. Duration', 
      value: avgDuration, 
      icon: Clock, 
      trend: '-12s' 
    },
  ];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
        
        {/* Upcoming Appointment Card */}
        <Card 
          className="clinical-card hover:shadow-md transition-all cursor-pointer lg:col-span-1"
          onClick={() => setAppointmentsModalOpen(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              {nextAppointment && (
                <Badge variant="secondary" className="text-xs">
                  Next
                </Badge>
              )}
            </div>
            <div className="mt-3">
              <p className="text-2xl font-semibold text-foreground">{getUpcomingDisplay()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Upcoming Appointment</p>
              {nextAppointment && (
                <p className="text-xs text-muted-foreground mt-2 truncate">
                  {nextAppointment.patient.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Report Generated Card */}
        <Card className="clinical-card hover:shadow-md transition-all lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                Today
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-semibold text-foreground">3</p>
              <p className="text-xs text-muted-foreground mt-0.5">Reports Generated</p>
              <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(), 'HH:mm')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments Modal */}
      {selectedPatient && (
        <UpcomingAppointmentsModal
          open={appointmentsModalOpen}
          onOpenChange={(open) => {
            setAppointmentsModalOpen(open);
            if (!open) setSelectedPatientId(null);
          }}
          patient={selectedPatient}
        />
      )}
      
      {/* Show modal with all patients' appointments when clicking the card */}
      {appointmentsModalOpen && !selectedPatient && nextAppointment && (
        <UpcomingAppointmentsModal
          open={appointmentsModalOpen}
          onOpenChange={setAppointmentsModalOpen}
          patient={nextAppointment.patient}
        />
      )}
    </>
  );
}
