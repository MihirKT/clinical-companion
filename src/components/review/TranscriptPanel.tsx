import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';
import { mockTranscript } from '@/data/mockData';

export function TranscriptPanel() {
  const { currentTranscript } = useWorkflow();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAiChanges, setShowAiChanges] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeTab, setActiveTab] = useState<'raw' | 'improved'>('improved');

  const transcript = currentTranscript || mockTranscript;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSegmentClick = (startTime: number) => {
    setCurrentTime(startTime);
    // In real implementation, this would seek the audio
  };

  return (
    <Card className="clinical-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Transcript</CardTitle>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'raw' | 'improved')}>
            <TabsList className="h-9">
              <TabsTrigger value="raw" className="text-xs px-3">Raw</TabsTrigger>
              <TabsTrigger value="improved" className="text-xs px-3">AI-Improved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Mini Audio Player */}
        <div className="flex items-center gap-3 mt-4 p-3 bg-muted/50 rounded-lg">
          <Button variant="ghost" size="icon-sm">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            variant={isPlaying ? 'secondary' : 'default'}
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon-sm">
            <SkipForward className="w-4 h-4" />
          </Button>

          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono w-10">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(currentTime / (transcript.duration || 70)) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-mono w-10">
              {formatTime(transcript.duration || 70)}
            </span>
          </div>

          <Button variant="ghost" size="icon-sm">
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Show AI Changes Toggle */}
        {activeTab === 'improved' && (
          <div className="flex items-center gap-2 mt-3">
            <Switch
              id="show-ai-changes"
              checked={showAiChanges}
              onCheckedChange={setShowAiChanges}
            />
            <Label htmlFor="show-ai-changes" className="text-sm text-muted-foreground cursor-pointer">
              {showAiChanges ? <Eye className="w-4 h-4 inline mr-1" /> : <EyeOff className="w-4 h-4 inline mr-1" />}
              Show AI Changes
            </Label>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="max-h-[550px] overflow-y-auto transcript-scroll pr-2 space-y-1.5">
          {transcript.segments.map((segment, index) => (
            <div
              key={segment.id}
              onClick={() => handleSegmentClick(segment.startTime)}
              className={cn(
                'group flex gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-muted/50',
                currentTime >= segment.startTime && currentTime < segment.endTime && 'bg-primary/5 border-l-2 border-primary'
              )}
            >
              <span className="text-xs text-muted-foreground font-mono w-12 flex-shrink-0 pt-0.5 group-hover:text-primary">
                [{formatTime(segment.startTime)}]
              </span>
              <p className={cn(
                'text-sm text-foreground leading-relaxed flex-1',
                activeTab === 'improved' && segment.isAiImproved && showAiChanges && 'ai-correction'
              )}>
                {activeTab === 'raw' ? (segment.originalText || segment.text) : segment.text}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
