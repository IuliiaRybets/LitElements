import { instance, mock, when } from 'ts-mockito';
import { ApplicationProvider } from '../data-providers/application.provider';
import { BusinessDataProvider } from '../data-providers/business-data.provider';
import { StepProvider } from '../data-providers/step.provider';
import { GlobalConfiguration } from '../provider.definitions';
import { OnEnterEventFactory } from './on-enter-event.factory';

describe('OnEnterEventFactory', () => {

  let cut: OnEnterEventFactory;
  const globalConfiguration: GlobalConfiguration = {
    produktname: 'Hausrat',
    produktId: '10100',
    produktKategorie: 'Bauen + Wohnen',
    vertragslaufzeit: '1 Jahr',
    portalId: '1234'
  };
  let applicationProvider: ApplicationProvider;
  let businessDataProvider: BusinessDataProvider;
  let stepProvider: StepProvider;

  beforeEach(() => {
    applicationProvider = mock(ApplicationProvider);
    businessDataProvider = mock(BusinessDataProvider);
    stepProvider = mock(stepProvider);
    cut = new OnEnterEventFactory(
      instance(businessDataProvider),
      instance(applicationProvider),
      globalConfiguration,
      instance(stepProvider));
  });

  it('should create an OnEnterEvent', () => {
    when(applicationProvider.activeApplication).thenReturn('Tarifrechner');
    when(stepProvider.activeStep).thenReturn('Schritt 1 - Einstieg Tarifrechner');
    when(businessDataProvider.businessData).thenReturn({produktVariante: 'basic'} as any);

    const onEnterEvent = cut.createOnEnterEvent();

    expect(onEnterEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'Checkouts',
      eventAction: 'Tarifrechner',
      eventLabel: 'Schritt 1 - Einstieg Tarifrechner',
      checkoutTyp: 'Tarifrechner',
      produktVariante: 'basic',
      ...globalConfiguration
    } as any);
  });
});
