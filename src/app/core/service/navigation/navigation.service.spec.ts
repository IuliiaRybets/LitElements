import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Model } from '@core/data-model';
import { ReplaySubject } from 'rxjs';

import { CustomRouting, NAVIGATION_DATA, NavigationData, NavigationService } from './navigation.service';

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
    navigate(CustomRouting.absolute.tarifierung);

    expect(model.get().visited).toContain(CustomRouting.absolute.tarifierung);
  });

  it('should not store visited pages twice', () => {
    navigate(CustomRouting.absolute.tarifierung);
    navigate(CustomRouting.absolute.tarifierung);
    navigate(CustomRouting.absolute.tarifierung);

    expect(model.get().visited).toContain(CustomRouting.absolute.tarifierung);
    expect(model.get().visited.length).toBe(1);
  });

  it('should store subsequent navigation events', () => {
    navigate(CustomRouting.absolute.tarifierung);
    navigate(CustomRouting.absolute.tarifergebnis);
    navigate(CustomRouting.absolute.kundendaten);
    expect(model.get().visited).toEqual([CustomRouting.absolute.tarifierung,
      CustomRouting.absolute.tarifergebnis,
      CustomRouting.absolute.kundendaten]);
  });

  function navigate(url: string) {
    navigationTrigger.next(new NavigationEnd(0, url, url));
  }
});
