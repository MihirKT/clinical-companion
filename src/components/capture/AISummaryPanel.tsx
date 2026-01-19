import React from 'react';
import { Sparkles, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClinicalInsight, SafetyAlert } from '@/types/clinical';

interface AISummaryPanelProps {
  insights: ClinicalInsight[];
  safetyAlerts?: SafetyAlert[];
  isLoading?: boolean;
}

export function AISummaryPanel({
  insights,
  safetyAlerts = [],
  isLoading = false,
}: AISummaryPanelProps) {
  const findingsInsight = insights.find(i => i.type === 'finding');
  const alertsInsight = insights.find(i => i.type === 'alert');
  const tasksInsight = insights.find(i => i.type === 'task');

  if (isLoading) {
    return (
      <Card className="clinical-card animate-pulse">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">AI Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="clinical-card border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Analysis Summary</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Findings */}
        {findingsInsight && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <h4 className="font-medium text-sm text-foreground">Key Findings</h4>
              <Badge variant="secondary" className="text-xs">
                {findingsInsight.confidence}
              </Badge>
            </div>
            <ul className="ml-6 space-y-1 text-sm text-muted-foreground">
              {Array.isArray(findingsInsight.content) ? (
                findingsInsight.content.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{findingsInsight.content}</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Safety Alerts */}
        {safetyAlerts.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              <h4 className="font-medium text-sm text-foreground">Alerts</h4>
              <Badge variant="secondary" className="text-xs">
                {safetyAlerts.length}
              </Badge>
            </div>
            <div className="ml-6 space-y-2">
              {safetyAlerts.slice(0, 2).map((alert) => (
                <div
                  key={alert.id}
                  className={`text-xs p-2 rounded border ${
                    alert.severity === 'high'
                      ? 'bg-destructive/5 border-destructive/20 text-destructive-foreground'
                      : 'bg-warning/5 border-warning/20 text-warning-foreground'
                  }`}
                >
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-xs opacity-90 mt-1">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Actions */}
        {tasksInsight && (
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h4 className="font-medium text-sm text-foreground">Recommended Actions</h4>
            </div>
            <p className="ml-6 text-sm text-muted-foreground">
              {typeof tasksInsight.content === 'string'
                ? tasksInsight.content
                : tasksInsight.content[0]}
            </p>
          </div>
        )}

        <div className="pt-2 text-xs text-muted-foreground border-t border-border">
          <p>
            💡 <strong>Note:</strong> AI analysis is for clinical reference only. Always verify
            findings and use professional judgment for patient care decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
