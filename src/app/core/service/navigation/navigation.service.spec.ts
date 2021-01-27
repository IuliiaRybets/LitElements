import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Model } from '@core/data-model';
import { ReplaySubject } from 'rxjs';

import { HausratRoutes, NAVIGATION_DATA, NavigationData, NavigationService } from './navigation.service';

@Component({template: ''})
class DummyComponent {
}

describe('NavigationService', () => {
  let service: NavigationService;
  let model: Model<NavigationData>;
  let navigationTrigger: ReplaySubject<NavigationEnd>;

  beforeEach(() => {
    navigationTrigger = new ReplaySubject();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        NavigationService,
        {
          provide: Router, useClass: class Stub {
            events = navigationTrigger;
          }
        }]
    });
    service = TestBed.inject(NavigationService);
    model = TestBed.inject(NAVIGATION_DATA);
    service.observeUrlChange();
  });

  it('should save the visited pages on every route change', async () => {
    navigate(HausratRoutes.absolute.tarifierung);

    expect(model.get().visited).toContain(HausratRoutes.absolute.tarifierung);
  });

  it('should not store visited pages twice', () => {
    navigate(HausratRoutes.absolute.tarifierung);
    navigate(HausratRoutes.absolute.tarifierung);
    navigate(HausratRoutes.absolute.tarifierung);

    expect(model.get().visited).toContain(HausratRoutes.absolute.tarifierung);
    expect(model.get().visited.length).toBe(1);
  });

  it('should store subsequent navigation events', () => {
    navigate(HausratRoutes.absolute.tarifierung);
    navigate(HausratRoutes.absolute.tarifergebnis);
    navigate(HausratRoutes.absolute.kundendaten);
    expect(model.get().visited).toEqual([HausratRoutes.absolute.tarifierung,
      HausratRoutes.absolute.tarifergebnis,
      HausratRoutes.absolute.kundendaten]);
  });

  function navigate(url: string) {
    navigationTrigger.next(new NavigationEnd(0, url, url));
  }
});
