import { useState, useCallback, useRef } from 'react';

interface TranscriptionResult {
  transcript: string;
  isTranscribing: boolean;
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  resetTranscript: () => void;
}

/**
 * Hook for handling speech-to-text transcription
 * Using Web Speech API as a foundation
 */
export function useTranscription(): TranscriptionResult {
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = useCallback(async () => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Speech Recognition API not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.language = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setIsTranscribing(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          final += transcriptSegment + ' ';
        } else {
          interim += transcriptSegment;
        }
      }

      if (final) {
        setTranscript(prev => prev + final);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsTranscribing(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsTranscribing(false);
    };

    recognition.start();
  }, []);

  const stopRecording = useCallback(async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    transcript,
    isTranscribing,
    isRecording,
    startRecording,
    stopRecording,
    resetTranscript,
  };
}
