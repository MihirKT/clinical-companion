import React from 'react';
import { Clock, FileText, Users, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { label: 'Transcriptions Today', value: '12', icon: FileText, trend: '+3' },
  { label: 'Patients Seen', value: '8', icon: Users, trend: '+2' },
  { label: 'Avg. Duration', value: '4:32', icon: Clock, trend: '-12s' },
  { label: 'AI Accuracy', value: '98.5%', icon: Sparkles, trend: '+0.5%' },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="clinical-card hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
