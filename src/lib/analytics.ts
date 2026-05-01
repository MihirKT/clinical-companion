/**
 * Analytics tracking for Heidi Scribe
 * Tracks user interactions, document events, and feature usage
 */

export interface AnalyticsEvent {
  type: 'document_created' | 'recording_started' | 'recording_stopped' | 'suggestion_accepted' | 'suggestion_rejected' | 'export_initiated' | 'patient_linked' | 'error_encountered' | 'feature_used';
  timestamp: Date;
  metadata?: Record<string, any>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionStartTime: Date = new Date();

  /**
   * Track an analytics event
   */
  trackEvent(type: AnalyticsEvent['type'], metadata?: Record<string, any>) {
    const event: AnalyticsEvent = {
      type,
      timestamp: new Date(),
      metadata: {
        ...metadata,
        sessionDuration: Date.now() - this.sessionStartTime.getTime(),
        userAgent: navigator.userAgent,
      },
    };

    this.events.push(event);

    // Send to analytics service (if configured)
    this.sendToAnalyticsService(event);
  }

  /**
   * Track document creation
   */
  trackDocumentCreated(documentId: string, template?: string) {
    this.trackEvent('document_created', { documentId, template });
  }

  /**
   * Track recording session
   */
  trackRecordingStarted() {
    this.trackEvent('recording_started', {
      timestamp: new Date().toISOString(),
    });
  }

  trackRecordingStopped(duration: number, wordCount: number) {
    this.trackEvent('recording_stopped', {
      durationSeconds: duration,
      wordCount,
    });
  }

  /**
   * Track AI suggestion interactions
   */
  trackSuggestionAccepted(type: string, confidence: number) {
    this.trackEvent('suggestion_accepted', { suggestionType: type, confidence });
  }

  trackSuggestionRejected(type: string) {
    this.trackEvent('suggestion_rejected', { suggestionType: type });
  }

  /**
   * Track export
   */
  trackExportInitiated(format: 'pdf' | 'docx' | 'txt') {
    this.trackEvent('export_initiated', { format });
  }

  /**
   * Track patient linking
   */
  trackPatientLinked(patientId: string) {
    this.trackEvent('patient_linked', { patientId });
  }

  /**
   * Track errors
   */
  trackError(errorType: string, errorMessage: string) {
    this.trackEvent('error_encountered', {
      errorType,
      errorMessage,
    });
  }

  /**
   * Track feature usage
   */
  trackFeatureUsed(featureName: string, featureProperty?: string) {
    this.trackEvent('feature_used', {
      feature: featureName,
      property: featureProperty,
    });
  }

  /**
   * Get all tracked events
   */
  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  /**
   * Reset events (for testing)
   */
  reset() {
    this.events = [];
    this.sessionStartTime = new Date();
  }

  /**
   * Send event to analytics service (stub)
   */
  private sendToAnalyticsService(event: AnalyticsEvent) {
    // TODO: Implement actual analytics service integration
    // This would typically send to Google Analytics, Mixpanel, Amplitude, etc.
    console.debug('[Analytics]', event.type, event.metadata);
  }

  /**
   * Generate session report
   */
  generateSessionReport() {
    const eventsByType = this.events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      sessionDuration: Date.now() - this.sessionStartTime.getTime(),
      totalEvents: this.events.length,
      eventsByType,
      startTime: this.sessionStartTime,
    };
  }
}

// Export singleton instance
export const analytics = new Analytics();
