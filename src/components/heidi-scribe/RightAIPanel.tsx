import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, X, AlertCircle } from 'lucide-react';
import SuggestionCard from './SuggestionCard';

interface Suggestion {
  id: string;
  type: 'grammar' | 'clarity' | 'tone' | 'completeness';
  text: string;
  suggestion: string;
}

interface RightAIPanelProps {
  suggestions: Suggestion[];
  onSuggestionAction: (suggestionId: string, action: 'accept' | 'reject') => void;
}

export default function RightAIPanel({ suggestions, onSuggestionAction }: RightAIPanelProps) {
  const actionButtons = [
    { id: 'summarize', label: 'Summarize', icon: Sparkles },
    { id: 'rewrite', label: 'Rewrite', icon: Sparkles },
    { id: 'keypoints', label: 'Key Points', icon: Sparkles },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Assistant
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Action Buttons */}
        <div className="p-4 border-b border-border space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Quick Actions
          </p>
          {actionButtons.map(btn => (
            <Button
              key={btn.id}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <btn.icon className="h-4 w-4" />
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Suggestions */}
        <div className="p-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Suggestions
          </p>

          {suggestions.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">
                No suggestions yet. Keep writing!
              </p>
            </div>
          ) : (
            suggestions.map(suggestion => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onAccept={() => onSuggestionAction(suggestion.id, 'accept')}
                onReject={() => onSuggestionAction(suggestion.id, 'reject')}
              />
            ))
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-border bg-secondary/30">
        <p className="text-xs text-muted-foreground">
          💡 Start typing or speaking to get AI suggestions for grammar, clarity, and tone.
        </p>
      </div>
    </div>
  );
}
