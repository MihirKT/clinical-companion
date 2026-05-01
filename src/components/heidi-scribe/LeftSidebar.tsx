import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, Trash2 } from 'lucide-react';
import { Document } from './HeidiScribeMain';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LeftSidebarProps {
  documents: Document[];
  currentDocumentId: string;
  onLoadDocument: (doc: Document) => void;
  onNewDocument: () => void;
}

export default function LeftSidebar({
  documents,
  currentDocumentId,
  onLoadDocument,
  onNewDocument,
}: LeftSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (d.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* New Document Button */}
      <div className="p-4 border-b border-border">
        <Button
          onClick={onNewDocument}
          className="w-full gap-2"
          variant="clinical"
        >
          <Plus className="h-4 w-4" />
          New Document
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-9"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto">
        {filteredDocuments.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {documents.length === 0
              ? 'No documents yet. Create your first one!'
              : 'No documents match your search.'}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredDocuments.map(doc => (
              <div
                key={doc.id}
                className={`group flex items-start justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  doc.id === currentDocumentId
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-secondary/50 border border-transparent'
                }`}
                onClick={() => onLoadDocument(doc)}
              >
                <div className="flex-1 min-w-0 flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-foreground">
                      {doc.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {doc.metadata?.wordCount || 0} words • {formatDate(doc.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* Delete button (visible on hover) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="text-destructive">
                      Delete Document
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
