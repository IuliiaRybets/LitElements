import { Injectable } from '@angular/core';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { ActiveRouteProvider } from './active-route.provider';

@Injectable({providedIn: 'root'})
export class ApplicationProvider {

  private readonly mapping = {
    [HausratRoutes.absolute.tarifierung]: 'Tarifrechner',
    [HausratRoutes.absolute.tarifergebnis]: 'Tarifrechner',
    [HausratRoutes.absolute.kundendaten]: 'Abschlussstrecke',
    [HausratRoutes.absolute.vertragsdaten]: 'Abschlussstrecke',
    [HausratRoutes.absolute.zahlungsdaten]: 'Abschlussstrecke',
    [HausratRoutes.absolute.uebersicht]: 'Abschlussstrecke',
    [HausratRoutes.absolute.bestaetigung]: 'Abschlussstrecke'
  };

  constructor(private readonly activeRouteProvider: ActiveRouteProvider) {
  }

  get activeApplication() {
    return this.mapping[this.activeRouteProvider.activeRoute];
  }
}
