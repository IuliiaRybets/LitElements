import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DatalayerService } from './datalayer.service';
import { OnAnsprechpartnersucheTrackingDirective } from './directives/on-ansprechpartnersuche-tracking.directive';
import { OnAusschlussTrackingDirective } from './directives/on-ausschluss-tracking.directive';
import { OnBackTrackingDirective } from './directives/on-back-tracking.directive';
import { OnDownloadTrackingDirective } from './directives/on-download-tracking.directive';
import { OnErrorTrackingDirective } from './directives/on-error-tracking.directive';
import { OnPurchaseTrackingDirective } from './directives/on-purchase-tracking.directive';
import { OnTerminvereinbarungTrackingDirective } from './directives/on-terminvereinbarung-tracking.directive';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from './provider.definitions';
import { TrackingService } from './tracking.service';

@NgModule({
  declarations: [
    OnPurchaseTrackingDirective,
    OnBackTrackingDirective,
    OnDownloadTrackingDirective,
    OnAusschlussTrackingDirective,
    OnTerminvereinbarungTrackingDirective,
    OnAnsprechpartnersucheTrackingDirective,
    OnErrorTrackingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnPurchaseTrackingDirective,
    OnBackTrackingDirective,
    OnDownloadTrackingDirective,
    OnAusschlussTrackingDirective,
    OnTerminvereinbarungTrackingDirective,
    OnAnsprechpartnersucheTrackingDirective,
    OnErrorTrackingDirective
  ]
})
export class TrackingModule {

  static forRoot(config: GlobalConfiguration): ModuleWithProviders<TrackingModule> {
    return {
      ngModule: TrackingModule,
      providers: [
        {provide: GLOBAL_CONFIGURATION, useValue: config},
        DatalayerService,
        TrackingService
      ]
    };
  }
}
