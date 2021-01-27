import { Inject, Injectable } from '@angular/core';
import { BusinessDataProvider } from '../data-providers/business-data.provider';
import { PurchaseEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';

@Injectable({providedIn: 'root'})
export class PurchaseEventFactory {

  constructor(private readonly businessDataProvider: BusinessDataProvider,
              @Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration) {
  }

 /* createPurchaseEvent(): PurchaseEvent {
    //const data = this.businessDataProvider.businessData;

    const constants = this.globalConfiguration;
    return {
      event: 'EEC-purchase',
      ecommerce: {
        purchase: {
          actionField: {
            id: data.auftragId,
            revenue: data.produktPreis,
            tax: data.produktSteuer
          },
          products: [{
            name: constants.produktname,
            id: constants.produktId,
            price: data.produktPreis,
            category: constants.produktKategorie,
            variant: data.produktVariante,
            quantity: 1,
            dimension51: 'Abschlussstrecke',
            dimension53: data.zahlungsperiode,
            dimension55: constants.vertragslaufzeit,
            dimension61: data.wohnflaeche,
            dimension63: data.zusatzleistungen,
            dimension75: data.selbstbeteiligung,
            dimension87: data.bestehendeVersicherung,
            dimension89: data.vorherigeVersicherungsgesellschaft,
            dimension93: constants.portalId,
            dimension99: data.werbeeinwilligung,
            dimension101: data.postleitzahl,
            dimension103: data.gebaeudeart,
            dimension121: data.zahlungsart,
            dimension132: data.fahrradwert
          }]
        }
      }
    };
  }*/
}
