import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Model } from '@core/data-model';
import { CustomRouting, NAVIGATION_DATA, NavigationData } from '@core/service/navigation/navigation.service';
import { environment } from '../../../environments/environment';

import { CanLoadNextStepGuard } from './can-load-next-step.guard';

@Component({template: ''})
class DummyComponent {
}

describe('CanLoadNextStepGuard', () => {
  let guard: CanLoadNextStepGuard;
  let router: Router;
  let location: Location;
  let model: Model<NavigationData>;

  beforeEach(() => {
    environment.skipGuards = false;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'tarifierung', component: DummyComponent, children: [
            {path: 'tarifergebnis', component: DummyComponent, canActivate: [CanLoadNextStepGuard]}
          ]
        }
      ])]
    });
    guard = TestBed.inject(CanLoadNextStepGuard);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    model = TestBed.inject(NAVIGATION_DATA);
  });

  it('should allow navigation when visited page satisfies prerequisites', async () => {
    model.patch({visited: ['/tarifierung']});

    await router.navigate([CustomRouting.absolute.tarifergebnis]);

    expect(location.path()).toBe('/tarifierung/tarifergebnis');
  });

  it('should not allow navigation when not visited prerequisites', async () => {
    model.patch({visited: ['none']});

    await router.navigate([CustomRouting.absolute.tarifergebnis]);

    expect(location.path()).toBe('/tarifierung');
  });
});
