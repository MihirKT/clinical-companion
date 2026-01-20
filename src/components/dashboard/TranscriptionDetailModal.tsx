import React, { useState } from "react";
import { X, FileText, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transcript } from "@/types/clinical";
import { mockSOAPNote } from "@/data/mockData";
import { format } from "date-fns";

interface TranscriptionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transcript: Transcript;
  patientName: string;
  onOpenInEditor?: () => void;
}

export function TranscriptionDetailModal({
  open,
  onOpenChange,
  transcript,
  patientName,
  onOpenInEditor,
}: TranscriptionDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"transcript" | "summary">(
    "transcript",
  );

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between w-full pr-8">
            <div>
              <DialogTitle className="text-xl">Session Details</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {patientName} • {formatDuration(transcript.duration || 0)} •{" "}
                {format(transcript.createdAt, "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "transcript" | "summary")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transcript" className="gap-2">
              <FileText className="w-4 h-4" />
              Transcript
            </TabsTrigger>
            <TabsTrigger value="summary" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Summary
            </TabsTrigger>
          </TabsList>

          {/* Transcript Tab */}
          <TabsContent value="transcript" className="space-y-4">
            <Tabs defaultValue="raw" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="raw">Raw Transcript</TabsTrigger>
                <TabsTrigger value="enhanced">AI Enhanced</TabsTrigger>
              </TabsList>

              {/* Raw Transcript */}
              <TabsContent value="raw" className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <p>Original transcription as recorded</p>
                </div>
                <ScrollArea className="h-[400px] border rounded-lg p-4 bg-muted/30">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground">
                    {transcript.rawText}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* AI Enhanced Transcript */}
              <TabsContent value="enhanced" className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4" />
                  <p>AI-improved for clarity and medical terminology</p>
                </div>
                <ScrollArea className="h-[400px] border rounded-lg p-4 bg-primary/5">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground">
                    {transcript.improvedText}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Generated Summary</p>
                <p className="text-xs text-muted-foreground">SOAP Note</p>
              </div>
            </div>
            <ScrollArea className="h-[400px] border rounded-lg p-4 bg-muted/30">
              <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono text-foreground">
                {mockSOAPNote}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            variant="clinical"
            onClick={() => {
              onOpenChange(false);
              onOpenInEditor?.();
            }}
          >
            Open in Editor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
