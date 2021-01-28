import { Injectable } from '@angular/core';
import { CustomRouting } from '@core/service/navigation/navigation.service';
import { ActiveRouteProvider } from './active-route.provider';

@Injectable({providedIn: 'root'})
export class StepProvider {

  private readonly mapping = {
    [CustomRouting.absolute.tarifierung]: 'Schritt 1 - Einstieg Tarifrechner',
    [CustomRouting.absolute.tarifergebnis]: 'Schritt 2 - Preisanzeige',
    [CustomRouting.absolute.uebersicht]: 'Schritt 4 - Übersicht',
    [CustomRouting.absolute.bestaetigung]: 'Schritt 5 - Hinweise'
  };

  constructor(private readonly activeRouteProvider: ActiveRouteProvider) {
  }

  get activeStep() {
    return this.mapping[this.activeRouteProvider.activeRoute];
  }
}
