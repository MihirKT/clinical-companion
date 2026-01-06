import React from 'react';
import { Users, PenTool, FileText, ArrowRight, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkflow } from '@/context/WorkflowContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function QuickActions() {
  const { setCurrentStep } = useWorkflow();

  const actions = [
    {
      label: 'Patient Hub',
      description: 'View and manage patients',
      icon: Users,
      shortcut: '⌘P',
      onClick: () => setCurrentStep('patient-hub'),
    },
    {
      label: 'Corrections',
      description: 'Manage transcription dictionary',
      icon: PenTool,
      shortcut: '⌘K',
      onClick: () => setCurrentStep('corrections'),
    },
    {
      label: 'Templates',
      description: 'Summary templates',
      icon: FileText,
      shortcut: '⌘T',
      onClick: () => {},
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground mr-2">Quick Actions:</span>
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={action.onClick}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <action.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="flex items-center gap-2">
            <span>{action.description}</span>
            <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-muted rounded border border-border">
              {action.shortcut}
            </kbd>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
