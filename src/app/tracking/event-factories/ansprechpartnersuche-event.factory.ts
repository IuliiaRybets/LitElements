import { Inject, Injectable } from '@angular/core';
import { ApplicationProvider } from '../data-providers/application.provider';
import { AnsprechpartnersucheEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';

@Injectable({providedIn: 'root'})
export class AnsprechpartnersucheEventFactory {

  constructor(@Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration,
              private readonly applicationProvider: ApplicationProvider) {
  }

  createAnsprechpartnersucheEvent(grund: string): AnsprechpartnersucheEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'Überleitung - Ansprechpartnersuche',
      eventAction: this.applicationProvider.activeApplication,
      eventLabel: `${grund}`,
      ...this.globalConfiguration
    };
  }
}
