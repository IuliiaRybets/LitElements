import { instance, mock, when } from 'ts-mockito';
import { ApplicationProvider } from '../data-providers/application.provider';
import { GlobalConfiguration } from '../provider.definitions';
import { TerminvereinbarenEventFactory } from './terminvereinbaren-event.factory';

describe('TerminvereinbarenEventFactory', () => {

  let cut: TerminvereinbarenEventFactory;
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
    cut = new TerminvereinbarenEventFactory(globalConfiguration, instance(applicationProvider));
  });

  it('should create an TerminvereinbarenEvent with the given ausschlussGrund', () => {
    when(applicationProvider.activeApplication).thenReturn('Tarifierung');

    const terminvereinbarungEvent = cut.createTerminvereinbarungEvent('Dummheit');

    expect(terminvereinbarungEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Überleitung - Terminvereinbarung',
      eventAction: 'Tarifierung',
      eventLabel: 'Dummheit',
      ...globalConfiguration
    });
  });
});
