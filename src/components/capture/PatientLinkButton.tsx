import React, { useState } from 'react';
import { Users, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types/clinical';
import { PatientSelectModal } from '@/components/modals/PatientSelectModal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PatientLinkButtonProps {
  onSelectPatient: (patient: Patient) => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  showLabel?: boolean;
}

export function PatientLinkButton({
  onSelectPatient,
  variant = 'outline',
  size = 'sm',
  showLabel = false,
}: PatientLinkButtonProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const button = (
    <Button
      variant={variant}
      size={size}
      onClick={() => setModalOpen(true)}
      className="gap-2"
    >
      <Link2 className="w-4 h-4" />
      {showLabel && <span>Link Patient</span>}
    </Button>
  );

  return (
    <>
      {showLabel ? (
        button
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>Link patient to this session</TooltipContent>
        </Tooltip>
      )}

      <PatientSelectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelectPatient={onSelectPatient}
      />
    </>
  );
}
