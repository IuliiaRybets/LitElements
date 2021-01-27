import { Inject, Injectable } from '@angular/core';
import { ApplicationProvider } from '../data-providers/application.provider';
import { BusinessDataProvider } from '../data-providers/business-data.provider';
import { StepProvider } from '../data-providers/step.provider';
import { OnEnterEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';

@Injectable({providedIn: 'root'})
export class OnEnterEventFactory {

  constructor(private readonly businessDataProvider: BusinessDataProvider,
              private readonly applicationProvider: ApplicationProvider,
              @Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration,
              private readonly stepProvider: StepProvider) {
  }

  /*createOnEnterEvent(): OnEnterEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'Checkouts',
      eventAction: this.applicationProvider.activeApplication,
      eventLabel: this.stepProvider.activeStep,
      checkoutTyp: this.applicationProvider.activeApplication,
      ...this.businessDataProvider.businessData,
      ...this.globalConfiguration
    };
  }*/
}
