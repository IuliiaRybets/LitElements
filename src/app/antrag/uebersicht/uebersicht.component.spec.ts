import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckboxComponent } from '@shared/component/checkbox/checkbox.component';

import { UebersichtComponent } from './uebersicht.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Model } from '@core/data-model';
import { TARIFIERUNG, Tarifierung, Tarifname, ZahlweiseEnum } from '@tarifierung/tarifierung.model';
import { TrackingDirectiveMocks } from '../../../test';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { Location } from '@angular/common';
//import { ZahlartEnum, ZAHLUNGSDATEN, Zahlungsdaten } from '@antrag/zahlungsdaten/zahlungsdaten.model';
import { AntragService } from '@antrag/antrag.service';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';

@Component({template: ``})
class DummyComponent {
}

describe('UebersichtComponent', () => {
  let component: UebersichtComponent;
  let fixture: ComponentFixture<UebersichtComponent>;

  let page: Page;
  let router: Router;
  let tarifierungModel: Model<Tarifierung>;
 // let zahlungsModel: Model<Zahlungsdaten>;
  let antragService: AntragService;
  let location: Location;

  beforeEach(async(() => {
    tarifierungModel = new Model<Tarifierung>({...tarifierungDummy});
   // zahlungsModel = new Model<Zahlungsdaten>({zahlart: ZahlartEnum.sepa});
    antragService = mock(AntragService);

    TestBed.configureTestingModule({
      declarations: [UebersichtComponent, CheckboxComponent, ...TrackingDirectiveMocks],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: TARIFIERUNG, useValue: tarifierungModel},
       // {provide: ZAHLUNGSDATEN, useValue: zahlungsModel},
        {provide: AntragService, useFactory: () => instance(antragService)}
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {path: HausratRoutes.relative.tarifierung, component: DummyComponent},
          {path: HausratRoutes.relative.tarifierung + '/' + HausratRoutes.relative.tarifergebnis, component: DummyComponent},
          {path: HausratRoutes.relative.antrag + '/' + HausratRoutes.relative.kundendaten, component: DummyComponent},
         // {path: HausratRoutes.relative.antrag + '/' + HausratRoutes.relative.zahlungsdaten, component: DummyComponent},
          {path: HausratRoutes.relative.antrag + '/' + HausratRoutes.relative.vertragsdaten, component: DummyComponent},
          {path: HausratRoutes.relative.antrag + '/' + HausratRoutes.relative.bestaetigung, component: DummyComponent}
        ])]
    })
      .compileComponents();

    when(antragService.sendeVorvertraglicheInformationen()).thenReturn(of());
  }));

  beforeEach(() => {
    sessionStorage.removeItem('app-state');

    fixture = TestBed.createComponent(UebersichtComponent);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    page = new Page(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Back Buttons', () => {
    it('should go back to Tarifierung on click', fakeAsync(() => {
      page.backToTarifierung();
      tick();
      expect(location.path()).toBe(HausratRoutes.absolute.tarifierung);
    }));

    it('should go back to Tarifergebnis on click', fakeAsync(() => {
      page.backToTarifergebnis();
      tick();
      expect(location.path()).toBe(HausratRoutes.absolute.tarifergebnis);
    }));

    it('should go back to Kundendaten Daten on click', fakeAsync(() => {
      page.backToKundendaten();
      tick();
      expect(location.path()).toBe(HausratRoutes.absolute.kundendaten);
    }));

    it('should go back to Zahlungsdaten on click', fakeAsync(() => {
      page.backToZahlungsdaten();
      tick();
      expect(location.path()).toBe(HausratRoutes.absolute.zahlungsdaten);
    }));

    it('should go back to Vertragsdaten on click', fakeAsync(() => {
      page.backToVertragsdaten();
      tick();
      expect(location.path()).toBe(HausratRoutes.absolute.vertragsdaten);
    }));
  });


  describe('Vertragsgrundlagen', () => {
    it('should show the correct avb and ipid pdfs for tarif basic', () => {
      const tarifierung = {...tarifierungDummy};
      if (tarifierung.selectedTarif) {
        tarifierung.selectedTarif.name = Tarifname.Basic;
      }
      tarifierungModel.set(tarifierung);
      fixture.detectChanges();

      expect(page.getAvbLink()).toEqual('https://www.ruv.de/dam/jcr/privatkunden/downloads/versicherungsbedingungen/versicherungsbedingungen-hausrat-basic.pdf');
      expect(page.getIPidLink()).toEqual('https://www.ruv.de/dam/jcr/privatkunden/downloads/infoblatt-zu-versicherungsprodukten/hr.pdf');
    });

    it('should show the correct avb and ipid pdfs for tarif classic', () => {
      const tarifierung = {...tarifierungDummy};
      if (tarifierung.selectedTarif) {
        tarifierung.selectedTarif.name = Tarifname.Classic;
      }
      tarifierungModel.set(tarifierung);
      fixture.detectChanges();

      expect(page.getAvbLink()).toEqual('https://www.ruv.de/dam/jcr/privatkunden/downloads/versicherungsbedingungen/versicherungsbedingungen-hausrat-classic.pdf');
      expect(page.getIPidLink()).toEqual('https://www.ruv.de/dam/jcr/privatkunden/downloads/infoblatt-zu-versicherungsprodukten/hausrat-classic-comfort.pdf');
    });

    it('should show the correct avb and ipid pdfs for tarif comfort', () => {
      const tarifierung = {...tarifierungDummy};
      if (tarifierung.selectedTarif) {
        tarifierung.selectedTarif.name = Tarifname.Comfort;
      }
      tarifierungModel.set(tarifierung);
      fixture.detectChanges();

      expect(page.getAvbLink()).toEqual('https://www.ruv.de/dam/jcr/privatkunden/downloads/versicherungsbedingungen/versicherungsbedingungen-hausrat-comfort.pdf');
      expect(page.getIPidLink()).toEqual('https://www.ruv.de/dam/jcr/privatkunden/downloads/infoblatt-zu-versicherungsprodukten/hausrat-classic-comfort.pdf');
    });
  });


  describe('Einwilligungen', () => {
    it('must be checked to go ahead', () => {
      expect(page.isBeratungsverzichtChecked()).toBe(false);
      expect(page.isErrorSichtbar()).toBe(false);

      page.abschliessen();

      expect(page.isErrorSichtbar()).toBe(true);

      page.beratungsverzicht(true);

      expect(page.isBeratungsverzichtChecked()).toBe(true);
      page.abschliessen();

      return fixture.whenStable().then(() => {
        expect(router.url).toEqual(HausratRoutes.absolute.bestaetigung);
      });

    });
  });

  describe('#berechneterGesamtbeitrag', () => {
    it('should return correct gesamtbeitrag for zahlweise jaehrlich', () => {
      const tarifierung = {...tarifierungDummy};
      if (tarifierung.tarifierungsparameter) {
        tarifierung.tarifierungsparameter.zahlweise = ZahlweiseEnum.jaehrlich;
      }
      tarifierungModel.set(tarifierung);
      expect(component.berechneterGesamtbeitrag).toBe(31.17);
    });

    it('should return correct gesamtbeitrag for zahlweise vierteljaehrlich', () => {
      const tarifierung = {...tarifierungDummy};
      if (tarifierung.tarifierungsparameter) {
        tarifierung.tarifierungsparameter.zahlweise = ZahlweiseEnum.vierteljaehrlich;
      }
      tarifierungModel.set(tarifierung);
      expect(component.berechneterGesamtbeitrag).toBe(34.32);
    });

    it('should return correct gesamtbeitrag for zahlweise halbjaehrlich', () => {
      const tarifierung = {...tarifierungDummy};
      if (tarifierung.tarifierungsparameter) {
        tarifierung.tarifierungsparameter.zahlweise = ZahlweiseEnum.halbjaehrlich;
      }
      tarifierungModel.set(tarifierung);
      expect(component.berechneterGesamtbeitrag).toBe(32.74);
    });
  });

});

class Page {
  constructor(private readonly fixture: ComponentFixture<UebersichtComponent>) {
  }

  backToTarifierung() {
    this.fixture.debugElement.query(By.css(`a[ng-reflect-router-link="${HausratRoutes.absolute.tarifierung}"]`))
      .nativeElement.click();
  }

  backToTarifergebnis() {
    this.fixture.debugElement.query(By.css(`a[ng-reflect-router-link="${HausratRoutes.absolute.tarifergebnis}"]`))
      .nativeElement.click();
  }

  backToKundendaten() {
    this.fixture.debugElement.query(By.css(`a[ng-reflect-router-link="${HausratRoutes.absolute.kundendaten}"]`))
      .nativeElement.click();
  }

  backToZahlungsdaten() {
    this.fixture.debugElement.query(By.css(`a[ng-reflect-router-link="${HausratRoutes.absolute.zahlungsdaten}"]`))
      .nativeElement.click();
  }

  backToVertragsdaten() {
    this.fixture.debugElement.query(By.css(`a[ng-reflect-router-link="${HausratRoutes.absolute.vertragsdaten}"]`))
      .nativeElement.click();
  }

  getAvbLink() {
    return this.fixture.debugElement.query(By.css('.vertragsgrundlagen li:nth-child(2) a')).nativeElement.href;
  }

  getIPidLink() {
    return this.fixture.debugElement.query(By.css('.vertragsgrundlagen li:nth-child(1) a')).nativeElement.href;
  }

  beratungsverzicht(bool: boolean) {
    if (bool && !this.isBeratungsverzichtChecked()) {
      this.getDebugElement('label[for="beratungsverzicht_input"]').nativeElement.click();
    }

    if (!bool && this.isBeratungsverzichtChecked()) {
      this.getDebugElement('label[for="beratungsverzicht_input"]').nativeElement.click();
    }
    this.fixture.detectChanges();
    return this;
  }

  isBeratungsverzichtChecked() {
    return this.getDebugElement('#beratungsverzicht_input:checked') != null;
  }

  isErrorSichtbar() {
    return this.fixture.debugElement.query(By.css('.error-text')) !== null &&
      this.fixture.debugElement.query(By.css('.error-text')).nativeElement !== null;
  }

  abschliessen() {
    this.getDebugElement('button[type="submit"]').nativeElement.click();
    this.fixture.detectChanges();
  }

  private getDebugElement(selector: string) {
    return this.fixture.debugElement.query(By.css(selector));
  }

}

const tarifierungDummy: Tarifierung = {
  tarifierungsparameter: {
    selbstbeteiligung: true,
    zahlweise: ZahlweiseEnum.jaehrlich,
    ueberspannungsschaeden: false,
    glasbruch: false,
    fahrraddiebstahl: false,
    elementarschaeden: false,
    wohnflaeche: 54,
    plz: '65185'
  },
  tarife: [],
  selectedTarif: {
    name: Tarifname.Basic,
    beitraege: {
      jaehrlich: {
        brutto: 31.17,
        steuer: 4.33
      },
      vierteljaehrlich: {
        brutto: 8.58,
        steuer: 1.19
      },
      halbjaehrlich: {
        brutto: 16.37,
        steuer: 2.28
      }
    }
  }
};
