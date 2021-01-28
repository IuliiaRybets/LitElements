import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Model, ModelFactory } from '@core/data-model';
import { filter, map } from 'rxjs/operators';

export const CustomRouting = {

  get relative() {
    return {
      antrag: 'antrag',
      tarifierung: 'tarifierung',
      tarifergebnis: 'tarifergebnis',
      kundendaten: 'kundendaten',
      vertragsdaten: 'vertragsdaten',
      zahlungsdaten: 'zahlungsdaten',
      uebersicht: 'uebersicht',
      zahlungbestaetigen: 'zahlungbestaetigen',
      bestaetigung: 'bestaetigung',
      fehler: 'fehler'
    };
  },

  get absolute() {
    return {
      get tarifierung() {
        return `/${CustomRouting.relative.tarifierung}`;
      },
      get tarifergebnis() {
        return `/${CustomRouting.relative.tarifierung}/${CustomRouting.relative.tarifergebnis}`;
      },
      get uebersicht() {
        return `/${CustomRouting.relative.antrag}/${CustomRouting.relative.uebersicht}`;
      },
      get bestaetigung() {
        return `/${CustomRouting.relative.antrag}/${CustomRouting.relative.bestaetigung}`;
      },
      get fehler() {
        return `/${CustomRouting.relative.fehler}`;
      }
    };
  }

};

export const AllowedNavigation = {
  [CustomRouting.absolute.tarifergebnis]: requires(CustomRouting.absolute.tarifierung),
  [CustomRouting.absolute.tarifierung]: requires(CustomRouting.absolute.tarifergebnis),
  [CustomRouting.absolute.tarifergebnis]: requires(CustomRouting.absolute.uebersicht),
  [CustomRouting.absolute.bestaetigung]: [
    requires(CustomRouting.absolute.uebersicht)
  ],
};

function requires(value: string) {
  return value;
}

export const NAVIGATION_DATA = new InjectionToken<Model<NavigationData>>('Navigation Data', {
  providedIn: 'root',
  factory: () => (inject(ModelFactory) as ModelFactory<NavigationData>).create('navigationData')
});

export interface NavigationData {
  visited: string[];
}

export function scrollToError() {
  document.querySelector('.ng-invalid[formControlName]')?.scrollIntoView({behavior: 'smooth', block: 'center'});
}

@Injectable({providedIn: 'root'})
export class NavigationService {

  constructor(readonly router: Router, @Inject(NAVIGATION_DATA) readonly navigationDataModel: Model<NavigationData>) {
  }

  observeUrlChange() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => ([(e.urlAfterRedirects.split('?')[0]), this.navigationDataModel.get().visited || []] as [string, string[]])),
      filter(([url, alreadyVisited]) => alreadyVisited.indexOf(url) === -1)
    ).subscribe(([url, alreadyVisited]) => {
      this.navigationDataModel.patch({visited: [...alreadyVisited, url]});
    });
  }
}
