import { instance, mock, when } from 'ts-mockito';
import { BusinessDataProvider } from '../data-providers/business-data.provider';
import { PagePathProvider } from '../data-providers/page-path.provider';
import { StepProvider } from '../data-providers/step.provider';
import { GlobalConfiguration } from '../provider.definitions';
import { VirtualPathEventFactory } from './virtual-path-event.factory';
import { ApplicationProvider } from '../data-providers/application.provider';

describe('VirtualPathEventFactory', () => {

  let cut: VirtualPathEventFactory;
  const globalConfiguration: GlobalConfiguration = {
    produktname: 'Hausrat',
    produktId: '10100',
    produktKategorie: 'Bauen + Wohnen',
    vertragslaufzeit: '1 Jahr',
    portalId: '1234'
  };
  let businessDataProvider: BusinessDataProvider;
  let stepProvider: StepProvider;
  let pagePathProvider: PagePathProvider;
  let applicationProvider: ApplicationProvider;

  beforeEach(() => {
    businessDataProvider = mock(BusinessDataProvider);
    stepProvider = mock(stepProvider);
    pagePathProvider = mock(PagePathProvider);
    applicationProvider = mock(ApplicationProvider);
    cut = new VirtualPathEventFactory(
      globalConfiguration,
      instance(pagePathProvider),
      instance(stepProvider),
      instance(businessDataProvider),
      instance(applicationProvider));
  });

  it('should create a VirtualpathEvent', () => {
    when(pagePathProvider.pagePath).thenReturn('/myfancyurl');
    when(stepProvider.activeStep).thenReturn('Schritt 1 - Einstieg Tarifrechner');
    when(businessDataProvider.businessData).thenReturn({produktVariante: 'basic'} as any);
    when(applicationProvider.activeApplication).thenReturn('Tarifrechner');

    const virtualPathEvent = cut.createVirtualPathEvent();

    expect(virtualPathEvent).toEqual({
      event: 'Generic Event',
      eventCategory: 'virtPath',
      pagePath: '/myfancyurl',
      title: 'Schritt 1 - Einstieg Tarifrechner',
      produktVariante: 'basic',
      checkoutTyp: 'Tarifrechner',
      ...globalConfiguration
    } as any);
  });
});
