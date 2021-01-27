import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { instance, mock, when } from 'ts-mockito';
import { ActiveRouteProvider } from './active-route.provider';
import { PagePathProvider } from './page-path.provider';

describe('PagePathProvider', () => {

  let activeRouteProvider: ActiveRouteProvider;
  let cut: PagePathProvider;

  beforeEach(() => {
    activeRouteProvider = mock(ActiveRouteProvider);
    cut = new PagePathProvider(instance(activeRouteProvider));
  });

  const parameters = [
    {
      url: HausratRoutes.absolute.tarifierung,
      pagePath: '/tarifrechner/hausratversicherung/step01-einstieg'
    },
    {
      url: HausratRoutes.absolute.tarifergebnis,
      pagePath: '/tarifrechner/hausratversicherung/step02-preisanzeige'
    },
    {
      url: HausratRoutes.absolute.kundendaten,
      pagePath: '/abschlussstrecke/hausratversicherung/step01-persoenliche_angaben'
    },
    {
      url: HausratRoutes.absolute.vertragsdaten,
      pagePath: '/abschlussstrecke/hausratversicherung/step02-daten_eingeben'
    },
    {
      url: HausratRoutes.absolute.zahlungsdaten,
      pagePath: '/abschlussstrecke/hausratversicherung/step03-zahlungsart'
    },
    {
      url: HausratRoutes.absolute.uebersicht,
      pagePath: '/abschlussstrecke/hausratversicherung/step04-uebersicht'
    },
    {
      url: HausratRoutes.absolute.bestaetigung,
      pagePath: '/abschlussstrecke/hausratversicherung/step05-hinweise'
    }
  ];

  parameters.forEach((params) => {
    it(`should return '${params.pagePath}' for the url ${params.url}`, () => {
      when(activeRouteProvider.activeRoute).thenReturn(params.url);
      expect(cut.pagePath).toBe(params.pagePath);
    });
  });

});
