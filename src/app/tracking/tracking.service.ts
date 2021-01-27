import { Injectable } from '@angular/core';
import { DatalayerService } from './datalayer.service';
import { AnsprechpartnersucheEventFactory } from './event-factories/ansprechpartnersuche-event.factory';
import { AusschlussEventFactory } from './event-factories/ausschluss-event-factory.service';
import { BackEventFactory } from './event-factories/back-event.factory';
import { DownloadEventFactory } from './event-factories/download-event.factory';
import { ErrorEventFactory } from './event-factories/error-event.factory';
import { OnEnterEventFactory } from './event-factories/on-enter-event.factory';
import { PurchaseEventFactory } from './event-factories/purchase-event.factory';
import { TerminvereinbarenEventFactory } from './event-factories/terminvereinbaren-event.factory';
import { VirtualPathEventFactory } from './event-factories/virtual-path-event.factory';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class TrackingService {

  constructor(
    private readonly datalayer: DatalayerService,
    private readonly virtualPathEventFactory: VirtualPathEventFactory,
    private readonly onEnterEventFactory: OnEnterEventFactory,
    private readonly purchaseEventFactory: PurchaseEventFactory,
    private readonly backEventFactory: BackEventFactory,
    private readonly downloadEventFactory: DownloadEventFactory,
    private readonly ausschlussEventFactory: AusschlussEventFactory,
    private readonly terminvereinbarenEventFactory: TerminvereinbarenEventFactory,
    private readonly ansprechpartnersucheEventFactory: AnsprechpartnersucheEventFactory,
    private readonly errorEventFactory: ErrorEventFactory,
    private readonly router: Router) {
  }

  public initTracking() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.pushOnEnterEvent();
      }
    });
  }

  public pushOnEnterEvent() {
    //this.datalayer.push(this.virtualPathEventFactory.createVirtualPathEvent());
   // this.datalayer.push(this.onEnterEventFactory.createOnEnterEvent());
  }

  public pushOnPurchaseEvent() {
  //  this.datalayer.push(this.purchaseEventFactory.createPurchaseEvent());
  }

  public pushOnBackNavigationEvent(action: 'back' | 'change', details?: string) {
    this.datalayer.push(this.backEventFactory.createBackEvent(action, details));
  }

  public pushOnDownloadEvent(fileName: string, type: 'Download' | 'Mail') {
    this.datalayer.push(this.downloadEventFactory.createDownloadEvent(fileName, type));
  }

  public pushAusschlussEvent(grund: string) {
    this.datalayer.push(this.ausschlussEventFactory.createAusschlussEvent(grund));
  }

  public pushTerminvereinbarungEvent(grund: string) {
    this.datalayer.push(this.terminvereinbarenEventFactory.createTerminvereinbarungEvent(grund));
  }

  public pushAnsprechpartnersucheEvent(grund: string) {
    this.datalayer.push(this.ansprechpartnersucheEventFactory.createAnsprechpartnersucheEvent(grund));
  }

  public pushFehlerEvent(fieldLabel: string, error: string) {
    this.datalayer.push(this.errorEventFactory.createErrorEvent(fieldLabel, error));
  }
}
