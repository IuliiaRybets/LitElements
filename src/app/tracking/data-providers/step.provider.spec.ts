import { CustomRouting } from '@core/service/navigation/navigation.service';
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
    {url: CustomRouting.absolute.tarifierung, activeStep: 'Schritt 1 - Einstieg Tarifrechner'},
    {url: CustomRouting.absolute.tarifergebnis, activeStep: 'Schritt 2 - Preisanzeige'},
    {url: CustomRouting.absolute.kundendaten, activeStep: 'Schritt 1 - persönliche Angaben'},
    {url: CustomRouting.absolute.vertragsdaten, activeStep: 'Schritt 2 - Daten eingeben'},
    {url: CustomRouting.absolute.zahlungsdaten, activeStep: 'Schritt 3 - Zahlungsart'},
    {url: CustomRouting.absolute.uebersicht, activeStep: 'Schritt 4 - Übersicht'},
    {url: CustomRouting.absolute.bestaetigung, activeStep: 'Schritt 5 - Hinweise'}
  ];

  parameters.forEach((params) => {
    it(`should return '${params.activeStep}' for the url ${params.url}`, () => {
      when(activeRouteProvider.activeRoute).thenReturn(params.url);
      expect(cut.activeStep).toBe(params.activeStep);
    });
  });

});
