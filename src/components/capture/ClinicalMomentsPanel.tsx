import React from 'react';
import { Stethoscope, MessageCircle, Pill, ClipboardList, HelpCircle, History, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ClinicalMoment } from '@/types/clinical';

const momentTypeConfig: Record<ClinicalMoment['type'], { icon: React.ElementType; color: string; label: string }> = {
  symptom: { icon: Stethoscope, color: 'text-destructive', label: 'Symptom' },
  diagnosis: { icon: ClipboardList, color: 'text-primary', label: 'Diagnosis' },
  medication: { icon: Pill, color: 'text-accent', label: 'Medication' },
  instruction: { icon: MessageCircle, color: 'text-success', label: 'Instruction' },
  question: { icon: HelpCircle, color: 'text-warning', label: 'Question' },
  history: { icon: History, color: 'text-muted-foreground', label: 'History' },
};

interface ClinicalMomentsPanelProps {
  moments: ClinicalMoment[];
  isLive?: boolean;
}

export function ClinicalMomentsPanel({ moments, isLive = false }: ClinicalMomentsPanelProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (moments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
          <Sparkles className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          {isLive ? 'Listening for clinical moments...' : 'No clinical moments detected'}
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-48">
      <div className="space-y-2 pr-2">
        {moments.map((moment, index) => {
          const config = momentTypeConfig[moment.type];
          const Icon = config.icon;
          const isNew = isLive && index === moments.length - 1;
          
          return (
            <div
              key={moment.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50 transition-all',
                isNew && 'animate-fade-in border-accent/30 bg-accent/5'
              )}
            >
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center bg-muted/50', config.color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {config.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {formatTime(moment.timestamp)}
                  </span>
                  {moment.confidence >= 0.9 && (
                    <Badge variant="secondary" className="text-xs gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      High
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground">{moment.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
