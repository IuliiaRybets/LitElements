import { instance, mock, when } from 'ts-mockito';
import { ApplicationProvider } from '../data-providers/application.provider';
import { GlobalConfiguration } from '../provider.definitions';
import { AusschlussEventFactory } from './ausschluss-event-factory.service';

describe('AusschlussEventFactory', () => {

  let cut: AusschlussEventFactory;
  const globalConfiguration: GlobalConfiguration = {
    produktname: 'Hausrat',
    produktId: '10100',
    produktKategorie: 'Bauen + Wohnen',
    vertragslaufzeit: '1 Jahr',
    portalId: '1234'
  };
  let applicationProvider: ApplicationProvider;

  beforeEach(() => {
    applicationProvider = mock(ApplicationProvider);
    cut = new AusschlussEventFactory(globalConfiguration, instance(applicationProvider));
  });

  it('should create an AusschlussEvent with the given ausschlussGrund', () => {
    when(applicationProvider.activeApplication).thenReturn('Tarifierung');

    const ausschlussEvent = cut.createAusschlussEvent('Dummheit');

    expect(ausschlussEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Checkouts',
      eventAction: 'Tarifierung',
      eventLabel: 'Dummheit',
      ...globalConfiguration
    });
  });
});
