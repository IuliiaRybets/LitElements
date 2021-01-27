import { instance, mock, when } from 'ts-mockito';
import { ApplicationProvider } from '../data-providers/application.provider';
import { GlobalConfiguration } from '../provider.definitions';
import { AnsprechpartnersucheEventFactory } from './ansprechpartnersuche-event.factory';

describe('AnsprechpartnersucheEventFactory', () => {

  let cut: AnsprechpartnersucheEventFactory;
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
    cut = new AnsprechpartnersucheEventFactory(globalConfiguration, instance(applicationProvider));
  });

  it('should create an AnsprechpartnersucheEvent with the given ausschlussGrund', () => {
    when(applicationProvider.activeApplication).thenReturn('Tarifierung');

    const ansprechpartnersucheEvent = cut.createAnsprechpartnersucheEvent('Dummheit');

    expect(ansprechpartnersucheEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Überleitung - Ansprechpartnersuche',
      eventAction: 'Tarifierung',
      eventLabel: 'Dummheit',
      ...globalConfiguration
    });
  });
});
