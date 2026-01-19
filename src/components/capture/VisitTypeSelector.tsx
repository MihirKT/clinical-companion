import React from 'react';
import { UserPlus, RefreshCw, Stethoscope, Brain, AlertCircle, Calendar, Video, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { VisitType } from '@/types/clinical';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const visitTypes: { id: VisitType; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'new-patient', label: 'New Patient', icon: UserPlus, description: 'Complete intake' },
  { id: 'follow-up', label: 'Follow-up', icon: RefreshCw, description: 'Ongoing care' },
  { id: 'post-op', label: 'Post-Op', icon: Stethoscope, description: 'Post-procedure' },
  { id: 'mental-health', label: 'Mental Health', icon: Brain, description: 'Behavioral health' },
  { id: 'urgent', label: 'Urgent', icon: AlertCircle, description: 'Same-day visit' },
  { id: 'routine', label: 'Routine', icon: Calendar, description: 'Preventive care' },
  { id: 'telehealth', label: 'Telehealth', icon: Video, description: 'Remote visit' },
];

interface VisitTypeSelectorProps {
  autoDetected?: VisitType;
}

export function VisitTypeSelector({ autoDetected }: VisitTypeSelectorProps) {
  const { selectedVisitType, setSelectedVisitType } = useWorkflow();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Visit Type</label>
        {autoDetected && (
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="ai" className="gap-1 text-xs">
                <Sparkles className="w-3 h-3" />
                Auto-detected
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>AI suggested based on conversation content</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {visitTypes.map(type => {
          const Icon = type.icon;
          const isSelected = selectedVisitType === type.id;
          const isAutoDetected = autoDetected === type.id && !selectedVisitType;
          
          return (
            <Tooltip key={type.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSelectedVisitType(type.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-center',
                    isSelected 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : isAutoDetected
                        ? 'border-accent/50 bg-accent/5 text-accent'
                        : 'border-border hover:border-primary/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium truncate w-full">{type.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{type.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
