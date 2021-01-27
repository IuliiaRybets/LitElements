import { Inject, Injectable } from '@angular/core';
import { BusinessDataProvider } from '../data-providers/business-data.provider';
import { PagePathProvider } from '../data-providers/page-path.provider';
import { StepProvider } from '../data-providers/step.provider';
import { VirtualPathEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';
import { ApplicationProvider } from '../data-providers/application.provider';

@Injectable({providedIn: 'root'})
export class VirtualPathEventFactory {

  constructor(@Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration,
              private readonly pagePathProvider: PagePathProvider,
              private readonly stepProvider: StepProvider,
              private readonly businessDataProvider: BusinessDataProvider,
              private readonly applicationProvider: ApplicationProvider) {
  }

 /* public createVirtualPathEvent(): VirtualPathEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'virtPath',
      pagePath: this.pagePathProvider.pagePath,
      title: this.stepProvider.activeStep,
      checkoutTyp: this.applicationProvider.activeApplication,
      ...this.businessDataProvider.businessData,
      ...this.globalConfiguration
    };
  }*/
}
