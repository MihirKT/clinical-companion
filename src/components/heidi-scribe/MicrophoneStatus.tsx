import React, { useEffect, useState } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

export type MicStatus = 'ready' | 'recording' | 'paused' | 'offline' | 'muted' | 'error';

interface MicrophoneStatusProps {
  status?: MicStatus;
  onStatusChange?: (status: MicStatus) => void;
}

export default function MicrophoneStatus({ status = 'ready', onStatusChange }: MicrophoneStatusProps) {
  const [micStatus, setMicStatus] = useState<MicStatus>(status);

  useEffect(() => {
    // Check microphone availability
    const checkMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        setMicStatus('ready');
        onStatusChange?.('ready');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          setMicStatus('muted');
          onStatusChange?.('muted');
        } else {
          setMicStatus('offline');
          onStatusChange?.('offline');
        }
      }
    };

    checkMicrophone();
  }, [onStatusChange]);

  const statusConfig = {
    ready: {
      icon: Mic,
      label: 'Microphone Ready',
      color: 'text-green-600 dark:text-green-400',
      dot: 'bg-green-600',
    },
    recording: {
      icon: Mic,
      label: 'Recording',
      color: 'text-red-600 dark:text-red-400',
      dot: 'bg-red-600',
    },
    paused: {
      icon: Mic,
      label: 'Recording Paused',
      color: 'text-amber-600 dark:text-amber-400',
      dot: 'bg-amber-600',
    },
    offline: {
      icon: MicOff,
      label: 'Microphone Offline',
      color: 'text-gray-600 dark:text-gray-400',
      dot: 'bg-gray-600',
    },
    muted: {
      icon: MicOff,
      label: 'Microphone Muted',
      color: 'text-gray-600 dark:text-gray-400',
      dot: 'bg-gray-600',
    },
    error: {
      icon: AlertCircle,
      label: 'Microphone Error',
      color: 'text-red-600 dark:text-red-400',
      dot: 'bg-red-600',
    },
  };

  const config = statusConfig[micStatus];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${config.dot} ${micStatus === 'recording' ? 'animate-pulse' : ''}`} />
      <Icon className={`h-4 w-4 ${config.color}`} />
      <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
    </div>
  );
}
