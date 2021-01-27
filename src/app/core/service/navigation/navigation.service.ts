import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Model, ModelFactory } from '@core/data-model';
import { filter, map } from 'rxjs/operators';

export const HausratRoutes = {

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
        return `/${HausratRoutes.relative.tarifierung}`;
      },
      get tarifergebnis() {
        return `/${HausratRoutes.relative.tarifierung}/${HausratRoutes.relative.tarifergebnis}`;
      },
      get kundendaten() {
        return `/${HausratRoutes.relative.antrag}/${HausratRoutes.relative.kundendaten}`;
      },
      get vertragsdaten() {
        return `/${HausratRoutes.relative.antrag}/${HausratRoutes.relative.vertragsdaten}`;
      },
      get zahlungsdaten() {
        return `/${HausratRoutes.relative.antrag}/${HausratRoutes.relative.zahlungsdaten}`;
      },
      get uebersicht() {
        return `/${HausratRoutes.relative.antrag}/${HausratRoutes.relative.uebersicht}`;
      },
      get zahlungbestaetigen() {
        return `/${HausratRoutes.relative.antrag}/${HausratRoutes.relative.zahlungbestaetigen}`;
      },
      get bestaetigung() {
        return `/${HausratRoutes.relative.antrag}/${HausratRoutes.relative.bestaetigung}`;
      },
      get fehler() {
        return `/${HausratRoutes.relative.fehler}`;
      }
    };
  }

};

export const AllowedNavigation = {
  [HausratRoutes.absolute.tarifergebnis]: requires(HausratRoutes.absolute.tarifierung),
  [HausratRoutes.absolute.kundendaten]: requires(HausratRoutes.absolute.tarifergebnis),
  [HausratRoutes.absolute.vertragsdaten]: requires(HausratRoutes.absolute.kundendaten),
  [HausratRoutes.absolute.zahlungsdaten]: requires(HausratRoutes.absolute.vertragsdaten),
  [HausratRoutes.absolute.uebersicht]: requires(HausratRoutes.absolute.zahlungsdaten),
  [HausratRoutes.absolute.zahlungbestaetigen]: requires(HausratRoutes.absolute.uebersicht),
  [HausratRoutes.absolute.bestaetigung]: [
    requires(HausratRoutes.absolute.zahlungbestaetigen),
    requires(HausratRoutes.absolute.uebersicht)
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
