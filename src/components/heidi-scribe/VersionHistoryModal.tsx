import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface DocumentVersion {
  id: string;
  timestamp: Date;
  content: string;
  wordCount: number;
  changesSummary: string;
}

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (version: DocumentVersion) => void;
  versions: DocumentVersion[];
}

export default function VersionHistoryModal({
  isOpen,
  onClose,
  onRestore,
  versions,
}: VersionHistoryModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<DocumentVersion | null>(null);

  const handleRestore = (version: DocumentVersion) => {
    onRestore(version);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
          <DialogDescription>
            View and restore previous versions of your document
          </DialogDescription>
        </DialogHeader>

        {selectedVersion ? (
          // Version Preview
          <div className="space-y-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedVersion(null)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to History
            </Button>

            <div className="space-y-2">
              <h3 className="font-semibold">
                {selectedVersion.timestamp.toLocaleString()}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedVersion.changesSummary}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedVersion.wordCount} words
              </p>
            </div>

            <div className="bg-secondary/30 p-4 rounded-lg max-h-64 overflow-y-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                {selectedVersion.content}
              </pre>
            </div>

            <Button
              onClick={() => handleRestore(selectedVersion)}
              className="w-full"
              variant="clinical"
            >
              Restore This Version
            </Button>
          </div>
        ) : (
          // Version List
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {versions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No version history available yet.</p>
              </div>
            ) : (
              versions.map((version, index) => (
                <div
                  key={version.id}
                  className="border rounded-lg p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedVersion(version)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          Version {versions.length - index}
                        </span>
                        {index === 0 && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {version.timestamp.toLocaleString()}
                      </p>
                      <p className="text-sm mt-2">{version.changesSummary}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {version.wordCount} words
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVersion(version);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
