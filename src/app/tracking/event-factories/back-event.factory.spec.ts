import { instance, mock, when } from 'ts-mockito';
import { ApplicationProvider } from '../data-providers/application.provider';
import { StepProvider } from '../data-providers/step.provider';
import { GlobalConfiguration } from '../provider.definitions';
import { BackEventFactory } from './back-event.factory';

describe('BackEventFactory', () => {

  let cut: BackEventFactory;
  const globalConfiguration: GlobalConfiguration = {
    produktname: 'Test',
    produktId: '10100',
    produktKategorie: 'Bauen + Wohnen',
    vertragslaufzeit: '1 Jahr',
    portalId: '1234'
  };
  let applicationProvider: ApplicationProvider;
  let stepProvider: StepProvider;

  beforeEach(() => {
    applicationProvider = mock(ApplicationProvider);
    stepProvider = mock(StepProvider);
    cut = new BackEventFactory(globalConfiguration, instance(applicationProvider), instance(stepProvider));
  });

  it('should create a BackEvent for back navigation', () => {
    when(applicationProvider.activeApplication).thenReturn('Tarifierung');
    when(stepProvider.activeStep).thenReturn('Schritt 1 - Einstieg Tarifrechner');

    const backEvent = cut.createBackEvent('back');

    expect(backEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Checkouts',
      eventAction: 'Tarifierung',
      eventLabel: 'Zurück - Schritt 1 - Einstieg Tarifrechner',
      ...globalConfiguration
    });
  });

  it('should create a BackEvent for change navigation', () => {
    when(applicationProvider.activeApplication).thenReturn('Tarifierung');
    when(stepProvider.activeStep).thenReturn('Schritt 1 - Einstieg Tarifrechner');

    const backEvent = cut.createBackEvent('change');

    expect(backEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Checkouts',
      eventAction: 'Tarifierung',
      eventLabel: 'Daten ändern - Schritt 1 - Einstieg Tarifrechner',
      ...globalConfiguration
    });
  });
});
