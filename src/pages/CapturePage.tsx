import React from 'react';
import { UploadCard } from '@/components/capture/UploadCard';
import { LiveTranscriptionCard } from '@/components/capture/LiveTranscriptionCard';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { RecentTranscriptions } from '@/components/dashboard/RecentTranscriptions';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Lightbulb } from 'lucide-react';

export function CapturePage() {
  return (
    <div className="animate-fade-in space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Good Morning, Doctor 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            Start a new transcription or review recent sessions
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Capture Options */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-medium text-foreground">Start New Session</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Choose one</span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <UploadCard />
          <LiveTranscriptionCard />
        </div>
      </div>

      {/* Recent Transcriptions */}
      <RecentTranscriptions />

      {/* Pro Tip */}
      <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Use the <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">Patient Hub</kbd> to attach transcriptions to patient records, 
            or <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">Corrections</kbd> to improve AI accuracy with medical terminology.
          </p>
        </div>
      </div>
    </div>
  );
}
