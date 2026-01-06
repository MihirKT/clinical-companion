import React, { useState } from 'react';
import { Brain, AlertTriangle, CheckCircle, ListTodo, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  mockInsights,
  mockDifferentialDiagnosis,
  mockSafetyAlerts,
  mockClinicalTasks,
} from '@/data/mockData';
import { ConfidenceLevel, SeverityLevel } from '@/types/clinical';

const confidenceVariant: Record<ConfidenceLevel, 'confidence-high' | 'confidence-medium' | 'confidence-low'> = {
  high: 'confidence-high',
  medium: 'confidence-medium',
  low: 'confidence-low',
};

const severityVariant: Record<SeverityLevel, 'severity-high' | 'severity-medium' | 'severity-low'> = {
  high: 'severity-high',
  medium: 'severity-medium',
  low: 'severity-low',
};

export function ClinicalInsightsPanel() {
  const [expandedDiagnosis, setExpandedDiagnosis] = useState<string | null>(null);
  const [tasks, setTasks] = useState(mockClinicalTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-4">
      {/* AI Badge */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="w-4 h-4 text-accent" />
        <span>AI-Generated Clinical Insights</span>
      </div>

      {/* Key Clinical Findings */}
      <Card className="clinical-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-base">Key Clinical Findings</CardTitle>
            </div>
            <Badge variant={confidenceVariant['high']}>High Confidence</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {(mockInsights[0].content as string[]).map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-foreground">{finding}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Differential Diagnosis */}
      <Card className="clinical-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Brain className="w-4 h-4 text-accent" />
              </div>
              <CardTitle className="text-base">Differential Diagnosis</CardTitle>
            </div>
            <Badge variant={confidenceVariant['medium']}>Medium Confidence</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockDifferentialDiagnosis.map((diagnosis) => (
            <Collapsible
              key={diagnosis.id}
              open={expandedDiagnosis === diagnosis.id}
              onOpenChange={() => setExpandedDiagnosis(
                expandedDiagnosis === diagnosis.id ? null : diagnosis.id
              )}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-foreground">{diagnosis.condition}</span>
                    <Badge
                      variant={
                        diagnosis.likelihood === 'likely' ? 'confidence-high' :
                        diagnosis.likelihood === 'probable' ? 'confidence-medium' : 'confidence-low'
                      }
                      className="capitalize text-xs"
                    >
                      {diagnosis.likelihood}
                    </Badge>
                  </div>
                  {expandedDiagnosis === diagnosis.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-3 text-sm text-muted-foreground bg-muted/30 rounded-b-lg -mt-1 border-t border-border">
                  {diagnosis.reasoning}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      {/* Safety Alerts */}
      <Card className="clinical-card border-destructive/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <CardTitle className="text-base">Safety Alerts</CardTitle>
            </div>
            <Badge variant={confidenceVariant['high']}>High Confidence</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockSafetyAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                'p-3 rounded-lg border',
                severityVariant[alert.severity]
              )}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className={cn(
                  'w-4 h-4 mt-0.5 flex-shrink-0',
                  alert.severity === 'high' ? 'text-destructive' : 'text-warning'
                )} />
                <div>
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Clinical Tasks */}
      <Card className="clinical-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <ListTodo className="w-4 h-4 text-success" />
              </div>
              <CardTitle className="text-base">Clinical Tasks</CardTitle>
            </div>
            <span className="text-xs text-muted-foreground">
              {tasks.filter(t => t.completed).length}/{tasks.length} complete
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasks.map((task) => (
            <label
              key={task.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all',
                task.completed ? 'bg-success/5' : 'bg-muted/50 hover:bg-muted'
              )}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={cn(
                'text-sm flex-1',
                task.completed && 'line-through text-muted-foreground'
              )}>
                {task.task}
              </span>
              <Badge
                variant={
                  task.priority === 'high' || task.priority === 'urgent' ? 'severity-high' :
                  task.priority === 'medium' ? 'severity-medium' : 'severity-low'
                }
                className="capitalize text-xs"
              >
                {task.priority}
              </Badge>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
