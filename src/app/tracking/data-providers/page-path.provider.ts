import { Injectable } from '@angular/core';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { ActiveRouteProvider } from './active-route.provider';

@Injectable({providedIn: 'root'})
export class PagePathProvider {

  private readonly mapping = {
    [HausratRoutes.absolute.tarifierung]: '/tarifrechner/hausratversicherung/step01-einstieg',
    [HausratRoutes.absolute.tarifergebnis]: '/tarifrechner/hausratversicherung/step02-preisanzeige',
    [HausratRoutes.absolute.kundendaten]: '/abschlussstrecke/hausratversicherung/step01-persoenliche_angaben',
    [HausratRoutes.absolute.vertragsdaten]: '/abschlussstrecke/hausratversicherung/step02-daten_eingeben',
    [HausratRoutes.absolute.zahlungsdaten]: '/abschlussstrecke/hausratversicherung/step03-zahlungsart',
    [HausratRoutes.absolute.uebersicht]: '/abschlussstrecke/hausratversicherung/step04-uebersicht',
    [HausratRoutes.absolute.bestaetigung]: '/abschlussstrecke/hausratversicherung/step05-hinweise'
  };

  constructor(private readonly activeRouteProvider: ActiveRouteProvider) {
  }

  get pagePath() {
    return this.mapping[this.activeRouteProvider.activeRoute];
  }
}
