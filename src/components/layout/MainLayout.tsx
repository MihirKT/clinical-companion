import React from 'react';
import { WorkflowStepper } from './WorkflowStepper';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <WorkflowStepper />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
