import { Injectable } from '@angular/core';
import { CustomRouting } from '@core/service/navigation/navigation.service';
import { ActiveRouteProvider } from './active-route.provider';

@Injectable({providedIn: 'root'})
export class PagePathProvider {

  private readonly mapping = {
    [CustomRouting.absolute.tarifierung]: '/tarifrechner/testversicherung/step01-einstieg',
    [CustomRouting.absolute.tarifergebnis]: '/tarifrechner/testversicherung/step02-preisanzeige',
    [CustomRouting.absolute.uebersicht]: '/abschlussstrecke/testversicherung/step04-uebersicht',
    [CustomRouting.absolute.bestaetigung]: '/abschlussstrecke/testversicherung/step05-hinweise'
  };

  constructor(private readonly activeRouteProvider: ActiveRouteProvider) {
  }

  get pagePath() {
    return this.mapping[this.activeRouteProvider.activeRoute];
  }
}
