export type TrackingEvent = VirtualPathEvent | OnEnterEvent | BackEvent | PurchaseEvent | DownloadEvent | AusschlussEvent | ErrorEvent;

export interface GenericEvent {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
  produktname: string;
  produktId: string;
  portalId: string;
}

export interface VirtualPathEvent {
  event: string;
  eventCategory: string;
  pagePath: string;
  title: string;
  checkoutTyp: string;
  produktname: string;
  produktId: string;
  portalId: string;
}

export interface OnEnterEvent extends GenericEvent {
  produktVariante: string;
  produktPreis: string;
  produktKategorie: string;
  checkoutTyp: string;
  zahlungsperiode: string;
  vertragslaufzeit: string;
  wohnflaeche: string;
  zusatzleistungen: string;
  fahrradwert: string;
  selbstbeteiligung: string;
  bestehendeVersicherung: string;
  vorherigeVersicherungsgesellschaft: string;
  userGeschlecht: string;
  userAlter: string;
  werbeeinwilligung: string;
  postleitzahl: string;
  gebaeudeart: string;
}

export interface PurchaseEvent {
  event: string;
  ecommerce: {
    purchase: {
      actionField: {
        id: string;
        revenue: string;
        tax: string;
      };
      products: {
        name: string;
        id: string;
        price: string;
        category: string;
        variant: string;
        quantity: number;
        dimension51: string;
        dimension53: string;
        dimension55: string;
        dimension61: string;
        dimension63: string;
        dimension75: string;
        dimension87: string;
        dimension89: string;
        dimension93: string;
        dimension99: string;
        dimension101: string;
        dimension103: string;
        dimension121: string;
        dimension132: string;
      }[]
    }
  };
}

export interface ErrorEvent {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
}

// tslint:disable-next-line:no-empty-interface
export interface BackEvent extends GenericEvent {
}

// tslint:disable-next-line:no-empty-interface
export interface DownloadEvent extends GenericEvent {
}

// tslint:disable-next-line:no-empty-interface
export interface AusschlussEvent extends GenericEvent {
}

// tslint:disable-next-line:no-empty-interface
export interface TerminvereinbarungEvent extends GenericEvent {
}

// tslint:disable-next-line:no-empty-interface
export interface AnsprechpartnersucheEvent extends GenericEvent {
}
