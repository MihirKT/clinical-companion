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
  mockApiDifferentialDiagnosisResponse,
  mockSafetyAlerts,
  mockClinicalTasks,
} from '@/data/mockData';
import { ConfidenceLevel, SeverityLevel, APIDifferentialDiagnosis, APIDifferentialDiagnosisResponse } from '@/types/clinical';

const confidenceVariant: Record<ConfidenceLevel, 'confidence-high' | 'confidence-medium' | 'confidence-low'> = {
  high: 'confidence-high',
  medium: 'confidence-medium',
  low: 'confidence-low',
};

const severityVariant: Record<SeverityLevel, 'severity-high' | 'severity-medium' | 'severity-low'> = {
  critical: 'severity-high',
  high: 'severity-high',
  medium: 'severity-medium',
  low: 'severity-low',
};

const getTaskType = (taskText: string) => {
  const normalized = taskText.toLowerCase();
  if (normalized.includes('order') || normalized.includes('test') || normalized.includes('lab') || normalized.includes('study')) {
    return { label: 'Order', className: 'bg-sky-100 text-sky-800' };
  }
  if (normalized.includes('follow-up') || normalized.includes('follow up') || normalized.includes('schedule') || normalized.includes('review')) {
    return { label: 'Follow-up', className: 'bg-emerald-100 text-emerald-800' };
  }
  if (normalized.includes('refer') || normalized.includes('referral') || normalized.includes('clinic')) {
    return { label: 'Referral', className: 'bg-violet-100 text-violet-800' };
  }
  if (normalized.includes('check') || normalized.includes('exam')) {
    return { label: 'Assessment', className: 'bg-orange-100 text-orange-800' };
  }
  return { label: 'Task', className: 'bg-muted/70 text-muted-foreground' };
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
    <div className="space-y-3">
      {/* AI Badge */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="w-3 h-3 text-accent" />
        <span>AI-Generated Clinical Insights</span>
      </div>

      {/* Key Clinical Findings */}
      <Card className="clinical-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Brain className="w-3 h-3 text-primary" />
              </div>
              <CardTitle className="text-sm">Key Clinical Findings</CardTitle>
            </div>
            <Badge variant={confidenceVariant['high']} className="text-xs">High Confidence</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <ul className="space-y-1">
            {(mockInsights[0].content as string[]).map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs">
                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
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
        <CardContent className="space-y-3">
          {mockApiDifferentialDiagnosisResponse.differential_diagnoses.map((diagnosis, index) => (
            <Collapsible
              key={`diagnosis-${index}`}
              open={expandedDiagnosis === `diagnosis-${index}`}
              onOpenChange={() => setExpandedDiagnosis(
                expandedDiagnosis === `diagnosis-${index}` ? null : `diagnosis-${index}`
              )}
            >
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="font-medium text-sm text-foreground">{diagnosis.diagnosis}</span>
                    <Badge
                      variant={
                        diagnosis.likelihood === 'high' ? 'confidence-high' :
                        diagnosis.likelihood === 'medium' ? 'confidence-medium' : 'confidence-low'
                      }
                      className="capitalize text-xs"
                    >
                      {diagnosis.likelihood} likelihood
                    </Badge>
                  </div>
                  {expandedDiagnosis === `diagnosis-${index}` ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-4 bg-muted/30 rounded-lg border border-border space-y-4">
                  {/* Why this diagnosis */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Clinical Reasoning
                    </h4>
                    <p className="text-sm text-muted-foreground">{diagnosis.why}</p>
                  </div>

                  {/* Supporting Evidence */}
                  {diagnosis.supporting_evidence.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Supporting Evidence
                      </h4>
                      <ul className="space-y-1">
                        {diagnosis.supporting_evidence.map((evidence, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                            {evidence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Contradicting Evidence */}
                  {diagnosis.contradicting_evidence.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        Contradicting Evidence
                      </h4>
                      <ul className="space-y-1">
                        {diagnosis.contradicting_evidence.map((evidence, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                            {evidence}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended Next Steps */}
                  {diagnosis.recommended_next_steps.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-blue-600" />
                        Recommended Next Steps
                      </h4>
                      <ul className="space-y-1">
                        {diagnosis.recommended_next_steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                'p-3 rounded-lg border group cursor-pointer transition-all duration-200 hover:shadow-md',
                severityVariant[alert.severity]
              )}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={cn(
                      'w-4 h-4 flex-shrink-0',
                      alert.severity === 'critical' ? 'text-destructive' : alert.severity === 'high' ? 'text-destructive' : 'text-warning'
                    )} />
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <Badge
                        variant="outline"
                        className="capitalize text-xs px-2 py-1 text-muted-foreground border-muted-foreground/30"
                      >
                        {alert.type}
                      </Badge>
                      <Badge
                        variant={
                          alert.severity === 'critical' ? 'severity-high' :
                          alert.severity === 'high' ? 'severity-high' :
                          alert.severity === 'medium' ? 'severity-medium' : 'severity-low'
                        }
                        className="capitalize text-xs px-2 py-1"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-sm text-foreground">{alert.description}</p>
                  {alert.recommendation && (
                    <p className="text-sm italic text-muted-foreground mt-2">{alert.recommendation}</p>
                  )}
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
                  'text-sm flex-1 min-w-0 truncate',
                  task.completed && 'line-through text-muted-foreground'
                )}>
                {task.task}
              </span>
              <div className="flex items-center gap-2 flex-shrink-0">
                {(() => {
                  const typeInfo = getTaskType(task.task);
                  return (
                    <Badge className={cn('uppercase text-[10px] px-2 py-1 border-none', typeInfo.className)}>
                      {typeInfo.label}
                    </Badge>
                  );
                })()}
                <Badge
                  variant={
                    task.priority === 'high' || task.priority === 'urgent' ? 'severity-high' :
                    task.priority === 'medium' ? 'severity-medium' : 'severity-low'
                  }
                  className="capitalize text-xs px-2 py-1"
                >
                  {task.priority}
                </Badge>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
