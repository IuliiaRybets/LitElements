import { Injectable } from '@angular/core';
import { ApplicationProvider } from '../data-providers/application.provider';
import { ErrorEvent } from '../events.model';

@Injectable({providedIn: 'root'})
export class ErrorEventFactory {

  constructor(private readonly applicationProvider: ApplicationProvider) {
  }

  createErrorEvent(fieldLabel: string, error: string): ErrorEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'Fehlermeldungen',
      eventAction: this.applicationProvider.activeApplication,
      eventLabel: `${fieldLabel} - ${error}`
    };
  }
}
