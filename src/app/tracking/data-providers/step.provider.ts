import { Injectable } from '@angular/core';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { ActiveRouteProvider } from './active-route.provider';

@Injectable({providedIn: 'root'})
export class StepProvider {

  private readonly mapping = {
    [HausratRoutes.absolute.tarifierung]: 'Schritt 1 - Einstieg Tarifrechner',
    [HausratRoutes.absolute.tarifergebnis]: 'Schritt 2 - Preisanzeige',
    [HausratRoutes.absolute.kundendaten]: 'Schritt 1 - persönliche Angaben',
    [HausratRoutes.absolute.vertragsdaten]: 'Schritt 2 - Daten eingeben',
    [HausratRoutes.absolute.zahlungsdaten]: 'Schritt 3 - Zahlungsart',
    [HausratRoutes.absolute.uebersicht]: 'Schritt 4 - Übersicht',
    [HausratRoutes.absolute.bestaetigung]: 'Schritt 5 - Hinweise'
  };

  constructor(private readonly activeRouteProvider: ActiveRouteProvider) {
  }

  get activeStep() {
    return this.mapping[this.activeRouteProvider.activeRoute];
  }
}
