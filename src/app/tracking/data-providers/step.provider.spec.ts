import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { instance, mock, when } from 'ts-mockito';
import { ActiveRouteProvider } from './active-route.provider';
import { StepProvider } from './step.provider';

describe('StepProvider', () => {

  let activeRouteProvider: ActiveRouteProvider;
  let cut: StepProvider;

  beforeEach(() => {
    activeRouteProvider = mock(ActiveRouteProvider);
    cut = new StepProvider(instance(activeRouteProvider));
  });

  const parameters = [
    {url: HausratRoutes.absolute.tarifierung, activeStep: 'Schritt 1 - Einstieg Tarifrechner'},
    {url: HausratRoutes.absolute.tarifergebnis, activeStep: 'Schritt 2 - Preisanzeige'},
    {url: HausratRoutes.absolute.kundendaten, activeStep: 'Schritt 1 - persönliche Angaben'},
    {url: HausratRoutes.absolute.vertragsdaten, activeStep: 'Schritt 2 - Daten eingeben'},
    {url: HausratRoutes.absolute.zahlungsdaten, activeStep: 'Schritt 3 - Zahlungsart'},
    {url: HausratRoutes.absolute.uebersicht, activeStep: 'Schritt 4 - Übersicht'},
    {url: HausratRoutes.absolute.bestaetigung, activeStep: 'Schritt 5 - Hinweise'}
  ];

  parameters.forEach((params) => {
    it(`should return '${params.activeStep}' for the url ${params.url}`, () => {
      when(activeRouteProvider.activeRoute).thenReturn(params.url);
      expect(cut.activeStep).toBe(params.activeStep);
    });
  });

});
