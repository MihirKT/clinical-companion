import { useCallback, useRef, useEffect } from 'react';

interface AutoSaveConfig {
  interval?: number; // ms between saves (default: 10000)
  onSave?: (data: any) => void | Promise<void>;
  debounce?: boolean;
}

/**
 * Hook for auto-saving document changes
 * Saves every 10 seconds of inactivity by default
 */
export function useAutoSave(data: any, config: AutoSaveConfig = {}) {
  const { interval = 10000, onSave, debounce = true } = config;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<any>(null);

  const triggerSave = useCallback(async () => {
    if (JSON.stringify(data) !== JSON.stringify(lastSaveRef.current)) {
      lastSaveRef.current = data;
      try {
        await onSave?.(data);
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }
  }, [data, onSave]);

  useEffect(() => {
    if (debounce) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(triggerSave, interval);
    } else {
      triggerSave();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, interval, triggerSave, debounce]);

  return {
    saveNow: triggerSave,
  };
}
