import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TarifPreisAnzeigeComponent } from './tarif-preis-anzeige.component';
import { NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { HausratRoutes } from '@core/service/navigation/navigation.service';

describe('TarifPreisAnzeigeComponent', () => {
  let component: TarifPreisAnzeigeComponent;
  let fixture: ComponentFixture<TarifPreisAnzeigeComponent>;

  let navigationTrigger: ReplaySubject<NavigationEnd>;

  beforeEach(async(() => {
    navigationTrigger = new ReplaySubject();

    TestBed.configureTestingModule({
      declarations: [TarifPreisAnzeigeComponent],
      providers: [{
        provide: Router, useClass: class Stub {
          events = navigationTrigger;
        }
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifPreisAnzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#isVisible', () => {

    it('should be visible on page kundendaten', fakeAsync(() => {
      navigationTrigger.next(new NavigationEnd(0, HausratRoutes.absolute.kundendaten, HausratRoutes.absolute.kundendaten));

      component.isVisible().subscribe((bool) => {
        expect(bool).toBe(true);
      });
    }));

    it('should not be visible on page tarifierung', fakeAsync(() => {
      navigationTrigger.next(new NavigationEnd(0, HausratRoutes.absolute.tarifierung, HausratRoutes.absolute.tarifierung));
      fixture.detectChanges();

      component.isVisible().subscribe((bool) => {
        expect(bool).toBe(false);
      });
    }));
  });

});
