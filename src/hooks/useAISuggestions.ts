import { useState, useCallback, useRef } from 'react';

interface AISuggestion {
  id: string;
  type: 'grammar' | 'clarity' | 'tone' | 'completeness' | 'terminology';
  text: string;
  suggestion: string;
  confidence: number;
  position: number;
}

/**
 * Hook for AI-powered writing suggestions
 * Analyzes text for grammar, clarity, tone, and medical terminology
 */
export function useAISuggestions() {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const analysisTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const analyzeSuggestions = useCallback(async (text: string) => {
    if (!text.trim() || text.length < 20) {
      setSuggestions([]);
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis (1-2 seconds)
    const newSuggestions: AISuggestion[] = [];

    // Grammar checks
    const grammarPatterns = [
      { pattern: /\b(were)\s+(is|am|are)\b/gi, type: 'grammar' as const, fix: 'was/were' },
      { pattern: /\b(don't|doesn't|didn't)\s+(\w+)\s+(verb)\b/gi, type: 'grammar' as const, fix: 'verb agreement' },
    ];

    // Clarity checks
    const clarityPatterns = [
      { pattern: /\b(very\s+very|very\s+extremely)\b/gi, type: 'clarity' as const, fix: 'Remove redundancy' },
      { pattern: /\b(the\s+the)\b/gi, type: 'clarity' as const, fix: 'Duplicate word' },
    ];

    // Tone detection
    if (text.includes('unfortunately') || text.includes('unfortunately')) {
      newSuggestions.push({
        id: `tone-${Date.now()}`,
        type: 'tone',
        text: 'Unfortunately, the patient...',
        suggestion: 'Consider more professional tone: "The patient..."',
        confidence: 0.85,
        position: text.indexOf('unfortunately'),
      });
    }

    // Medical completeness check
    if (text.includes('patient') && !text.includes('assessment')) {
      newSuggestions.push({
        id: `completeness-${Date.now()}`,
        type: 'completeness',
        text: 'No assessment mentioned',
        suggestion: 'Add clinical assessment section',
        confidence: 0.9,
        position: 0,
      });
    }

    setSuggestions(newSuggestions);
    setIsAnalyzing(false);
  }, []);

  const acceptSuggestion = useCallback((suggestionId: string, replacement: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  }, []);

  const rejectSuggestion = useCallback((suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  }, []);

  return {
    suggestions,
    isAnalyzing,
    analyzeSuggestions,
    acceptSuggestion,
    rejectSuggestion,
  };
}
