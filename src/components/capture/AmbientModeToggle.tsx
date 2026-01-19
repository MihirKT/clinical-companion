import React from 'react';
import { Waves, Mic } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useWorkflow } from '@/context/WorkflowContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AmbientModeToggle() {
  const { isAmbientMode, setIsAmbientMode } = useWorkflow();

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl border border-accent/20">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
          isAmbientMode ? 'bg-accent/20 ambient-pulse' : 'bg-muted'
        }`}>
          <Waves className={`w-5 h-5 ${isAmbientMode ? 'text-accent' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="ambient-mode" className="font-medium text-foreground cursor-pointer">
              Ambient Mode
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="text-xs">Beta</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Passive listening mode that automatically filters small talk and extracts clinical moments.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isAmbientMode ? 'Passively listening for clinical content' : 'Enable hands-free clinical capture'}
          </p>
        </div>
      </div>
      <Switch
        id="ambient-mode"
        checked={isAmbientMode}
        onCheckedChange={setIsAmbientMode}
        className="data-[state=checked]:bg-accent"
      />
    </div>
  );
}
