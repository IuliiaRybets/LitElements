import { Spied, spyOnClass } from '../../test';
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
import { TrackingService } from './tracking.service';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({template: ``})
class DummyComponent {

}

describe('TrackingService', () => {

  let cut: TrackingService;
  let datalayer: Spied<DatalayerService>;
  let virtualPathEventFactory: Spied<VirtualPathEventFactory>;
  let onEnterEventFactory: Spied<OnEnterEventFactory>;
  let purchaseEventFactory: Spied<PurchaseEventFactory>;
  let backEventFactory: Spied<BackEventFactory>;
  let downloadEventFactory: Spied<DownloadEventFactory>;
  let ausschlussEventFactory: Spied<AusschlussEventFactory>;
  let terminvereinbarenEventFactory: Spied<TerminvereinbarenEventFactory>;
  let ansprechpartnersucheEventFactory: Spied<AnsprechpartnersucheEventFactory>;
  let errorEventFactory: Spied<ErrorEventFactory>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: 'test', component: DummyComponent}])]
    }).compileComponents();

    datalayer = spyOnClass(DatalayerService);
    virtualPathEventFactory = spyOnClass(VirtualPathEventFactory);
    onEnterEventFactory = spyOnClass(OnEnterEventFactory);
    purchaseEventFactory = spyOnClass(PurchaseEventFactory);
    backEventFactory = spyOnClass(BackEventFactory);
    downloadEventFactory = spyOnClass(DownloadEventFactory);
    ausschlussEventFactory = spyOnClass(AusschlussEventFactory);
    terminvereinbarenEventFactory = spyOnClass(TerminvereinbarenEventFactory);
    ansprechpartnersucheEventFactory = spyOnClass(AnsprechpartnersucheEventFactory);
    errorEventFactory = spyOnClass(ErrorEventFactory);
    router = TestBed.inject(Router);

    cut = new TrackingService(
      datalayer,
      virtualPathEventFactory as any,
      onEnterEventFactory as any,
      purchaseEventFactory as any,
      backEventFactory as any,
      downloadEventFactory as any,
      ausschlussEventFactory as any,
      terminvereinbarenEventFactory as any,
      ansprechpartnersucheEventFactory as any,
      errorEventFactory as any,
      router
    );
  });

  describe('#pushOnEnterEvent', () => {
    it('should create an OnEnterEvent and a VirtualPathEvent', () => {
      cut.pushOnEnterEvent();

      expect(virtualPathEventFactory.createVirtualPathEvent).toHaveBeenCalled();
      expect(onEnterEventFactory.createOnEnterEvent).toHaveBeenCalled();
      expect(datalayer.push).toHaveBeenCalledTimes(2);
    });
  });

  describe('#initTracking', () => {
    it('should push EnterEvents on router navigate after init', fakeAsync(() => {
      cut.initTracking();
      router.navigate(['/test']);
      tick();

      expect(virtualPathEventFactory.createVirtualPathEvent).toHaveBeenCalled();
      expect(onEnterEventFactory.createOnEnterEvent).toHaveBeenCalled();
      expect(datalayer.push).toHaveBeenCalledTimes(2);
    }));
  });

  describe('#pushOnPurchaseEvent', () => {
    it('should create an OnPurchaseEvent', () => {
      cut.pushOnPurchaseEvent();

      expect(purchaseEventFactory.createPurchaseEvent).toHaveBeenCalled();
      expect(datalayer.push).toHaveBeenCalled();
    });
  });

  describe('#pushOnBackNavigationEvent', () => {
    it('should create a BackEvent', () => {
      cut.pushOnBackNavigationEvent('back');

      expect(backEventFactory.createBackEvent).toHaveBeenCalledWith('back', undefined);
      expect(datalayer.push).toHaveBeenCalled();
    });
  });

  describe('#pushOnDownloadEvent', () => {
    it('should create a DownloadEvent', () => {
      cut.pushOnDownloadEvent('myfile.pdf', 'Download');

      expect(downloadEventFactory.createDownloadEvent).toHaveBeenCalledWith('myfile.pdf', 'Download');
      expect(datalayer.push).toHaveBeenCalled();
    });
  });

  describe('#pushAusschlussEvent', () => {
    it('should create an AusschlussEvent', () => {
      cut.pushAusschlussEvent('dummheit');

      expect(ausschlussEventFactory.createAusschlussEvent).toHaveBeenCalledWith('dummheit');
      expect(datalayer.push).toHaveBeenCalled();
    });
  });

  describe('#pushTerminvereinbarungEvent', () => {
    it('should create a TerminvereinbadungEvent', () => {
      cut.pushTerminvereinbarungEvent('inkompetenz');

      expect(terminvereinbarenEventFactory.createTerminvereinbarungEvent).toHaveBeenCalledWith('inkompetenz');
      expect(datalayer.push).toHaveBeenCalled();
    });
  });

  describe('#pushAnsprechpartnersucheEvent', () => {
    it('should create an AnsprechpartnersucheEvent', () => {
      cut.pushAnsprechpartnersucheEvent('intoleranz');

      expect(ansprechpartnersucheEventFactory.createAnsprechpartnersucheEvent).toHaveBeenCalledWith('intoleranz');
      expect(datalayer.push).toHaveBeenCalled();
    });
  });

  describe('#pushFehlerEvent', () => {
    it('should create a FehlerEvent', () => {
      cut.pushFehlerEvent('Geburtsdatum', 'Sie sind zu alt');

      expect(errorEventFactory.createErrorEvent).toHaveBeenCalledWith('Geburtsdatum', 'Sie sind zu alt');
      expect(datalayer.push).toHaveBeenCalled();
    });

  });
});
