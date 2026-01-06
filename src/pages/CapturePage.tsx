import React from 'react';
import { UploadCard } from '@/components/capture/UploadCard';
import { LiveTranscriptionCard } from '@/components/capture/LiveTranscriptionCard';

export function CapturePage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Capture Audio</h2>
        <p className="text-muted-foreground mt-1">Upload a recording or start live transcription</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UploadCard />
        <LiveTranscriptionCard />
      </div>
    </div>
  );
}
