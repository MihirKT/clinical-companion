import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Suggestion {
  id: string;
  type: 'grammar' | 'clarity' | 'tone' | 'completeness';
  text: string;
  suggestion: string;
}

interface SuggestionCardProps {
  suggestion: Suggestion;
  onAccept: () => void;
  onReject: () => void;
}

export default function SuggestionCard({
  suggestion,
  onAccept,
  onReject,
}: SuggestionCardProps) {
  const typeColors = {
    grammar: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800', label: 'Grammar' },
    clarity: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-800', label: 'Clarity' },
    tone: { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800', label: 'Tone' },
    completeness: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-800', label: 'Completeness' },
  };

  const colors = typeColors[suggestion.type];

  return (
    <div className={cn('p-3 rounded-lg border', colors.bg, colors.border)}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase">
          {colors.label}
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current:</p>
          <p className="text-sm bg-black/5 dark:bg-white/5 p-2 rounded line-through opacity-75">
            {suggestion.text}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Suggested:</p>
          <p className="text-sm bg-white dark:bg-black/20 p-2 rounded font-medium">
            {suggestion.suggestion}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <Button
          size="sm"
          variant="outline"
          onClick={onAccept}
          className="flex-1 gap-1"
        >
          <Check className="h-3 w-3" />
          Accept
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onReject}
          className="flex-1 gap-1"
        >
          <X className="h-3 w-3" />
          Reject
        </Button>
      </div>
    </div>
  );
}
