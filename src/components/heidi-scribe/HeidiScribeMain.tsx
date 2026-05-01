import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TopNavigation from './TopNavigation';
import LeftSidebar from './LeftSidebar';
import EditorWorkspace from './EditorWorkspace';
import RightAIPanel from './RightAIPanel';
import { useTranscription } from '@/hooks/useTranscription';

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  transcriptionTime: number;
  linkedPatientId?: string;
  metadata?: {
    wordCount: number;
    charCount: number;
  };
}

interface HeidiScribeMainProps {
  initialDocument?: Document;
  onSave?: (document: Document) => void;
}

export default function HeidiScribeMain({ initialDocument, onSave }: HeidiScribeMainProps) {
  const [currentDocument, setCurrentDocument] = useState<Document>(
    initialDocument || {
      id: `doc-${Date.now()}`,
      title: 'Untitled Document',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      transcriptionTime: 0,
    }
  );

  const [documents, setDocuments] = useState<Document[]>(initialDocument ? [initialDocument] : []);
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ id: string; type: string; text: string; suggestion: string }>>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const { transcript, isTranscribing, startRecording, stopRecording, resetTranscript } = useTranscription();

  // Handle title change
  const handleTitleChange = useCallback((newTitle: string) => {
    setCurrentDocument(prev => ({
      ...prev,
      title: newTitle,
      updatedAt: new Date(),
    }));
  }, []);

  // Handle content change
  const handleContentChange = useCallback((newContent: string) => {
    setCurrentDocument(prev => ({
      ...prev,
      content: newContent,
      updatedAt: new Date(),
      metadata: {
        wordCount: newContent.split(/\s+/).filter(w => w.length > 0).length,
        charCount: newContent.length,
      },
    }));
  }, []);

  // Handle recording
  const handleStartRecording = useCallback(async () => {
    setIsRecording(true);
    await startRecording();
  }, [startRecording]);

  const handleStopRecording = useCallback(async () => {
    setIsRecording(false);
    await stopRecording();
    // Append transcribed text to content
    if (transcript) {
      const newContent = currentDocument.content + ' ' + transcript;
      handleContentChange(newContent);
      resetTranscript();
    }
  }, [stopRecording, transcript, currentDocument.content, handleContentChange, resetTranscript]);

  // Save document
  const handleSaveDocument = useCallback(() => {
    const updatedDoc = {
      ...currentDocument,
      updatedAt: new Date(),
    };
    setCurrentDocument(updatedDoc);
    onSave?.(updatedDoc);
  }, [currentDocument, onSave]);

  // Load document
  const handleLoadDocument = useCallback((doc: Document) => {
    setCurrentDocument(doc);
  }, []);

  // Create new document
  const handleNewDocument = useCallback(() => {
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      title: 'Untitled Document',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      transcriptionTime: 0,
    };
    setDocuments(prev => [newDoc, ...prev]);
    setCurrentDocument(newDoc);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Main container with sidebar */}
      <div className={`flex flex-1 ${isSidebarOpen ? 'ml-64' : ''}`}>
        {/* Left Sidebar */}
        {isSidebarOpen && (
          <div className="fixed left-0 top-0 w-64 h-screen border-r border-border overflow-y-auto bg-secondary/10">
            <LeftSidebar
              documents={documents}
              currentDocumentId={currentDocument.id}
              onLoadDocument={handleLoadDocument}
              onNewDocument={handleNewDocument}
            />
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <TopNavigation
            documentTitle={currentDocument.title}
            onTitleChange={handleTitleChange}
            onSave={handleSaveDocument}
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isRightPanelOpen={isRightPanelOpen}
            onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
          />

          {/* Content area with editor and AI panel */}
          <div className={`flex flex-1 overflow-hidden ${isRightPanelOpen ? 'mr-80' : ''}`}>
            {/* Editor Workspace */}
            <div className="flex-1 overflow-y-auto">
              <EditorWorkspace
                content={currentDocument.content}
                onContentChange={handleContentChange}
                isRecording={isRecording}
                transcript={transcript}
                isTranscribing={isTranscribing}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                metadata={currentDocument.metadata}
              />
            </div>

            {/* Right AI Panel */}
            {isRightPanelOpen && (
              <div className="fixed right-0 top-16 w-80 h-[calc(100vh-4rem)] border-l border-border overflow-y-auto bg-secondary/5">
                <RightAIPanel suggestions={suggestions} onSuggestionAction={() => {}} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
