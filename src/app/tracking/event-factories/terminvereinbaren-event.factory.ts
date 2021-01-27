import { Inject, Injectable } from '@angular/core';
import { ApplicationProvider } from '../data-providers/application.provider';
import { TerminvereinbarungEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';

@Injectable({providedIn: 'root'})
export class TerminvereinbarenEventFactory {

  constructor(@Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration,
              private readonly applicationProvider: ApplicationProvider) {
  }

  createTerminvereinbarungEvent(grund: string): TerminvereinbarungEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'Überleitung - Terminvereinbarung',
      eventAction: this.applicationProvider.activeApplication,
      eventLabel: `${grund}`,
      ...this.globalConfiguration
    };
  }
}
