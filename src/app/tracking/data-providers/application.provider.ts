import { Injectable } from '@angular/core';
import { CustomRouting } from '@core/service/navigation/navigation.service';
import { ActiveRouteProvider } from './active-route.provider';

@Injectable({providedIn: 'root'})
export class ApplicationProvider {

  private readonly mapping = {
    [CustomRouting.absolute.tarifierung]: 'Tarifrechner',
    [CustomRouting.absolute.tarifergebnis]: 'Tarifrechner',
    [CustomRouting.absolute.uebersicht]: 'Abschlussstrecke',
    [CustomRouting.absolute.bestaetigung]: 'Abschlussstrecke'
  };

  constructor(private readonly activeRouteProvider: ActiveRouteProvider) {
  }

  get activeApplication() {
    return this.mapping[this.activeRouteProvider.activeRoute];
  }
}
