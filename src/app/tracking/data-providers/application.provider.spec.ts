import { CustomRouting } from '@core/service/navigation/navigation.service';
import { instance, mock, when } from 'ts-mockito';
import { ActiveRouteProvider } from './active-route.provider';
import { ApplicationProvider } from './application.provider';

describe('ApplicationProvider', () => {

  let activeRouteProvider: ActiveRouteProvider;
  let cut: ApplicationProvider;

  beforeEach(() => {
    activeRouteProvider = mock(ActiveRouteProvider);
    cut = new ApplicationProvider(instance(activeRouteProvider));
  });

  const parameters = [
    {url: CustomRouting.absolute.tarifierung, applicationPart: 'Tarifrechner'},
    {url: CustomRouting.absolute.tarifergebnis, applicationPart: 'Tarifrechner'},
    {url: CustomRouting.absolute.uebersicht, applicationPart: 'Abschlussstrecke'},
    {url: CustomRouting.absolute.bestaetigung, applicationPart: 'Abschlussstrecke'}
  ];

  parameters.forEach((params) => {
    it(`should return '${params.applicationPart}' for the url ${params.url}`, () => {
      when(activeRouteProvider.activeRoute).thenReturn(params.url);
      expect(cut.activeApplication).toBe(params.applicationPart);
    });
  });

});
