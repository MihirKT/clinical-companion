import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Patient } from '@/types/clinical';
import { Button } from '@/components/ui/button';

interface PatientInfoBadgeProps {
  patient: Patient;
  onRemove?: () => void;
  variant?: 'default' | 'compact';
}

export function PatientInfoBadge({
  patient,
  onRemove,
  variant = 'default',
}: PatientInfoBadgeProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm">
        <span className="font-medium text-blue-900">{patient.name}</span>
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-1 hover:bg-blue-100 rounded-full p-0.5 transition-colors"
          >
            <X className="w-3 h-3 text-blue-600" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm text-blue-900">{patient.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {patient.medicalId}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
          <div>
            <span className="text-blue-600 font-medium">Age:</span> {patient.age}
          </div>
          <div>
            <span className="text-blue-600 font-medium">Gender:</span>{' '}
            {patient.gender}
          </div>
          {patient.primaryCondition && (
            <div className="col-span-2">
              <span className="text-blue-600 font-medium">Condition:</span>{' '}
              {patient.primaryCondition}
            </div>
          )}
        </div>

        {patient.alerts && patient.alerts.length > 0 && (
          <div className="mt-2 flex items-start gap-2 p-2 bg-red-50 border border-red-200 rounded">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-red-700">
              <p className="font-medium mb-1">
                {patient.alerts.length} Alert
                {patient.alerts.length !== 1 ? 's' : ''}
              </p>
              <ul className="space-y-1">
                {patient.alerts.map((alert) => (
                  <li key={alert.id}>
                    <strong>{alert.type}:</strong> {alert.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="flex-shrink-0 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
