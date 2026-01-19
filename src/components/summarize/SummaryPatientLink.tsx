import React, { useState } from 'react';
import { Link2, Unlink2, Check, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types/clinical';

interface SummaryPatientLinkProps {
  linkedPatient: Patient | null;
  onLink: () => void;
  onUnlink: () => void;
  isLinked?: boolean;
}

export function SummaryPatientLink({
  linkedPatient,
  onLink,
  onUnlink,
  isLinked = false,
}: SummaryPatientLinkProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!linkedPatient) {
    return (
      <Card className="clinical-card border-dashed border-2">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">No Patient Linked</p>
                <p className="text-xs text-muted-foreground">
                  Link this summary to a patient record
                </p>
              </div>
            </div>
            <Button
              onClick={onLink}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Link2 className="w-4 h-4" />
              Link Patient
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`clinical-card transition-all ${isLinked ? 'border-success/50 bg-success/5' : 'border-primary/50'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Linked Patient</CardTitle>
            {isLinked && (
              <Badge variant="default" className="gap-1 bg-success">
                <Check className="w-3 h-3" />
                Linked
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{linkedPatient.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {linkedPatient.medicalId}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>
                <span className="text-xs font-medium text-foreground">Age:</span>{' '}
                {linkedPatient.age}
              </div>
              <div>
                <span className="text-xs font-medium text-foreground">Gender:</span>{' '}
                {linkedPatient.gender}
              </div>
              {linkedPatient.primaryCondition && (
                <div className="col-span-2">
                  <span className="text-xs font-medium text-foreground">
                    Primary Condition:
                  </span>{' '}
                  {linkedPatient.primaryCondition}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={onLink}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Link2 className="w-4 h-4" />
              Change
            </Button>

            {!isConfirming ? (
              <Button
                onClick={() => setIsConfirming(true)}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Unlink2 className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex items-center gap-1 bg-destructive/10 rounded-lg p-1">
                <Button
                  onClick={() => {
                    onUnlink();
                    setIsConfirming(false);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/20 h-8"
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => setIsConfirming(false)}
                  variant="ghost"
                  size="sm"
                  className="h-8"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {isLinked && (
          <div className="flex items-start gap-2 text-xs text-success bg-success/5 border border-success/20 rounded p-2">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              This summary will be attached to {linkedPatient.name}'s patient record
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
