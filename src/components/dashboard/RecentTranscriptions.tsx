import React from 'react';
import { Play, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const recentTranscriptions = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    duration: '5:42',
    time: '10 min ago',
    status: 'completed',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    duration: '8:15',
    time: '45 min ago',
    status: 'completed',
  },
  {
    id: '3',
    patientName: 'Emily Rodriguez',
    duration: '3:28',
    time: '2 hours ago',
    status: 'reviewed',
  },
];

export function RecentTranscriptions() {
  return (
    <Card className="clinical-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Recent Transcriptions</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTranscriptions.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">{item.patientName}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{item.duration}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>
            <Badge variant={item.status === 'reviewed' ? 'reviewed' : 'final'} className="text-xs">
              {item.status}
            </Badge>
            <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
