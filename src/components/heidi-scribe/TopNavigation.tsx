import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Menu, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TopNavigationProps {
  documentTitle: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isRightPanelOpen: boolean;
  onToggleRightPanel: () => void;
}

export default function TopNavigation({
  documentTitle,
  onTitleChange,
  onSave,
  isSidebarOpen,
  onToggleSidebar,
  isRightPanelOpen,
  onToggleRightPanel,
}: TopNavigationProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(documentTitle);

  const handleTitleSave = () => {
    if (editTitle.trim()) {
      onTitleChange(editTitle);
    } else {
      setEditTitle(documentTitle);
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      {/* Left: Menu and Logo */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-9 w-9"
          title="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">HS</span>
          </div>
          <span className="text-lg font-semibold text-foreground hidden sm:inline">
            Heidi Scribe
          </span>
        </div>
      </div>

      {/* Center: Document Title */}
      <div className="flex-1 mx-8 max-w-md">
        {isEditingTitle ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
            autoFocus
            placeholder="Enter document title"
            className="h-8 text-center text-base font-medium"
          />
        ) : (
          <div
            onClick={() => setIsEditingTitle(true)}
            className="px-3 py-1 rounded-md bg-secondary/50 hover:bg-secondary/70 cursor-pointer transition-colors truncate text-center text-base font-medium"
            title="Click to edit title"
          >
            {documentTitle}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Save Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          className="gap-1.5"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">Save</span>
        </Button>

        {/* More options menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onToggleRightPanel}>
              {isRightPanelOpen ? 'Hide AI Assistant' : 'Show AI Assistant'}
            </DropdownMenuItem>
            <DropdownMenuItem>Export as PDF</DropdownMenuItem>
            <DropdownMenuItem>Export as DOCX</DropdownMenuItem>
            <DropdownMenuItem>Share Document</DropdownMenuItem>
            <DropdownMenuItem>Link Patient...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User profile */}
        <Button variant="ghost" size="sm" className="h-9 w-9 rounded-full">
          <span className="text-xs font-semibold">JD</span>
        </Button>
      </div>
    </div>
  );
}
