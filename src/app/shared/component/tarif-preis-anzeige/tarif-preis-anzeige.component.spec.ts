import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { TarifPreisAnzeigeComponent } from './tarif-preis-anzeige.component';
import { NavigationEnd, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';


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


});
