import { CustomRouting } from '@core/service/navigation/navigation.service';
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
      url: CustomRouting.absolute.tarifierung,
      pagePath: '/tarifrechner/testversicherung/step01-einstieg'
    },
    {
      url: CustomRouting.absolute.tarifergebnis,
      pagePath: '/tarifrechner/testversicherung/step02-preisanzeige'
    },
    {
      url: CustomRouting.absolute.uebersicht,
      pagePath: '/abschlussstrecke/testversicherung/step04-uebersicht'
    },
    {
      url: CustomRouting.absolute.bestaetigung,
      pagePath: '/abschlussstrecke/testversicherung/step05-hinweise'
    }
  ];

  parameters.forEach((params) => {
    it(`should return '${params.pagePath}' for the url ${params.url}`, () => {
      when(activeRouteProvider.activeRoute).thenReturn(params.url);
      expect(cut.pagePath).toBe(params.pagePath);
    });
  });

});
