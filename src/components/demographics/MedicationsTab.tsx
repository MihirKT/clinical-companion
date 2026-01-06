import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pill, Calendar, Check, X } from 'lucide-react';
import { Medication } from '@/types/clinical';
import { cn } from '@/lib/utils';

interface MedicationsTabProps {
  medications: Medication[];
}

export function MedicationsTab({ medications }: MedicationsTabProps) {
  const activeMeds = medications.filter(m => m.active);
  const inactiveMeds = medications.filter(m => !m.active);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const MedicationCard = ({ med, isActive }: { med: Medication; isActive: boolean }) => (
    <div
      className={cn(
        'p-4 rounded-lg border transition-all',
        isActive
          ? 'bg-card border-border hover:border-primary/30'
          : 'bg-muted/30 border-border/50 opacity-75'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            isActive ? 'bg-success/10' : 'bg-muted'
          )}>
            <Pill className={cn(
              'w-5 h-5',
              isActive ? 'text-success' : 'text-muted-foreground'
            )} />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{med.name}</h4>
            <p className="text-sm text-muted-foreground">{med.dosage} • {med.frequency}</p>
          </div>
        </div>
        <Badge variant={isActive ? 'confidence-high' : 'pending'} className="gap-1">
          {isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          {isActive ? 'Active' : 'Discontinued'}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Started: {formatDate(med.startDate)}
        </span>
        {med.endDate && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Ended: {formatDate(med.endDate)}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Active Medications */}
      <Card className="clinical-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Pill className="w-4 h-4 text-success" />
            </div>
            <div>
              <CardTitle className="text-base">Active Medications</CardTitle>
              <CardDescription>{activeMeds.length} medications currently prescribed</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {activeMeds.map(med => (
            <MedicationCard key={med.id} med={med} isActive={true} />
          ))}
        </CardContent>
      </Card>

      {/* Discontinued Medications */}
      {inactiveMeds.length > 0 && (
        <Card className="clinical-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Pill className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Discontinued Medications</CardTitle>
                <CardDescription>{inactiveMeds.length} medications no longer active</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {inactiveMeds.map(med => (
              <MedicationCard key={med.id} med={med} isActive={false} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
