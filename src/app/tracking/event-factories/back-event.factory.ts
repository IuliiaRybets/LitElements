import { Inject, Injectable } from '@angular/core';
import { ApplicationProvider } from '../data-providers/application.provider';
import { StepProvider } from '../data-providers/step.provider';
import { BackEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';
import { mapString } from '../util';

@Injectable({providedIn: 'root'})
export class BackEventFactory {

  constructor(@Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration,
              private readonly applicationProvider: ApplicationProvider,
              private readonly stepProvider: StepProvider) {
  }

  createBackEvent(action: 'back' | 'change', details?: string): BackEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'Checkouts',
      eventAction: this.applicationProvider.activeApplication,
      eventLabel: `${mapString(action, {back: 'Zurück', change: 'Daten ändern'})} - ${this.stepProvider.activeStep}${details ? ' - ' + details : ''}`,
      ...this.globalConfiguration
    };
  }
}
