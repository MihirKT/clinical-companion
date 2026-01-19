import React from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useWorkflow } from '@/context/WorkflowContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function MinimalModeToggle() {
  const { isMinimalMode, setIsMinimalMode, isRecording } = useWorkflow();

  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
          isMinimalMode ? 'bg-primary/10' : 'bg-muted'
        }`}>
          {isMinimalMode ? (
            <Minimize2 className="w-4 h-4 text-primary" />
          ) : (
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor="minimal-mode" className="text-sm font-medium text-foreground cursor-pointer">
                Low-Interaction Mode
              </Label>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">Collapses UI to minimal indicators during capture. No clicks required. Full UI restored post-visit.</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-xs text-muted-foreground">
            {isMinimalMode ? 'Minimal UI active' : 'Show compact interface'}
          </p>
        </div>
      </div>
      <Switch
        id="minimal-mode"
        checked={isMinimalMode}
        onCheckedChange={setIsMinimalMode}
        disabled={isRecording}
      />
    </div>
  );
}
