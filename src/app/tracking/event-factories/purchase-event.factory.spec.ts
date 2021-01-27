import { instance, mock, when } from 'ts-mockito';
import { BusinessDataProvider } from '../data-providers/business-data.provider';
import { GlobalConfiguration } from '../provider.definitions';
import { PurchaseEventFactory } from './purchase-event.factory';

describe('PurchaseEventFactory', () => {

  let cut: PurchaseEventFactory;
  const globalConfiguration: GlobalConfiguration = {
    produktname: 'Hausrat',
    produktId: '10100',
    produktKategorie: 'Bauen + Wohnen',
    vertragslaufzeit: '1 Jahr',
    portalId: '1234'
  };
  let businessDataProvider: BusinessDataProvider;

  beforeEach(() => {
    businessDataProvider = mock(BusinessDataProvider);
    cut = new PurchaseEventFactory(
      instance(businessDataProvider),
      globalConfiguration);
  });

  it('should create a PurchaseEvent', () => {
    when(businessDataProvider.businessData).thenReturn({
      produktVariante: 'basic',
      produktPreis: '10.2',
      produktSteuer: '2.23',
      zahlungsperiode: 'jaehrlich',
      wohnflaeche: '100',
      zusatzleistungen: 'keine',
      selbstbeteiligung: '150 EUR',
      bestehendeVersicherung: 'ja',
      vorherigeVersicherungsgesellschaft: 'Allianz',
      werbeeinwilligung: 'nein',
      postleitzahl: '65199',
      gebaeudeart: 'Einfamilienhaus',
      fahrradwert: '500',
      auftragId: '123456789',
      zahlungsart: 'SEPA'
    } as any);

    const purchaseEvent = cut.createPurchaseEvent();

    expect(purchaseEvent).toEqual({
      event: 'EEC-purchase',
      ecommerce: {
        purchase: {
          actionField: {
            id: '123456789',
            revenue: '10.2',
            tax: '2.23'
          },
          products: [{
            name: 'Hausrat',
            id: '10100',
            price: '10.2',
            category: 'Bauen + Wohnen',
            variant: 'basic',
            quantity: 1,
            dimension51: 'Abschlussstrecke',
            dimension53: 'jaehrlich',
            dimension55: '1 Jahr',
            dimension61: '100',
            dimension63: 'keine',
            dimension75: '150 EUR',
            dimension87: 'ja',
            dimension89: 'Allianz',
            dimension93: '1234',
            dimension99: 'nein',
            dimension101: '65199',
            dimension103: 'Einfamilienhaus',
            dimension121: 'SEPA',
            dimension132: '500'
          }]
        }
      }
    });
  });
});
