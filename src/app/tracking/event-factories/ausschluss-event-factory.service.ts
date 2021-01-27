import { Inject, Injectable } from '@angular/core';
import { ApplicationProvider } from '../data-providers/application.provider';
import { AusschlussEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';

@Injectable({providedIn: 'root'})
export class AusschlussEventFactory {

  constructor(@Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration,
              private readonly applicationProvider: ApplicationProvider) {
  }

  createAusschlussEvent(grund: string): AusschlussEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'Checkouts',
      eventAction: this.applicationProvider.activeApplication,
      eventLabel: `${grund}`,
      ...this.globalConfiguration
    };
  }
}
