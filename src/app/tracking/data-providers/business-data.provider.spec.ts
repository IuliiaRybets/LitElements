import { Kundendaten } from '@antrag/kundendaten/kundendaten.model';
import { Vertragsdaten } from '@antrag/vertragsdaten/vertragsdaten.model';
import { Model } from '@core/data-model';
import { Tarifierung, Tarifname, ZahlweiseEnum } from '@tarifierung/tarifierung.model';
import { UNKNOWN_DEFAULT } from '../util';
import { BusinessDataProvider } from './business-data.provider';
import { UebersichtDaten } from '@antrag/uebersicht/uebersicht.model';
import { ZahlartEnum, Zahlungsdaten } from '@antrag/zahlungsdaten/zahlungsdaten.model';

describe('BusinessDataProvider', () => {

  afterEach(() => jasmine.clock().uninstall());

  it('should be the default if all undefined', () => {
    const cut = new BusinessDataProvider(
      new Model<Tarifierung>({}),
      new Model<Kundendaten>({}),
      new Model<Vertragsdaten>({}),
      new Model<UebersichtDaten>({}),
      new Model<Zahlungsdaten>({}));

    expect(cut.businessData).toEqual({
      wohnflaeche: UNKNOWN_DEFAULT,
      postleitzahl: UNKNOWN_DEFAULT,
      zahlungsperiode: UNKNOWN_DEFAULT,
      selbstbeteiligung: UNKNOWN_DEFAULT,
      fahrradwert: UNKNOWN_DEFAULT,
      zusatzleistungen: UNKNOWN_DEFAULT,
      produktVariante: UNKNOWN_DEFAULT,
      produktPreis: UNKNOWN_DEFAULT,
      produktSteuer: UNKNOWN_DEFAULT,
      userGeschlecht: UNKNOWN_DEFAULT,
      userAlter: UNKNOWN_DEFAULT,
      gebaeudeart: UNKNOWN_DEFAULT,
      bestehendeVersicherung: UNKNOWN_DEFAULT,
      vorherigeVersicherungsgesellschaft: UNKNOWN_DEFAULT,
      werbeeinwilligung: UNKNOWN_DEFAULT,
      auftragId: UNKNOWN_DEFAULT,
      zahlungsart: UNKNOWN_DEFAULT
    });
  });

  it('should write all values from the model to the event', () => {
    const tarifierungModel = new Model<Tarifierung>({
      tarifierungsparameter: {
        selbstbeteiligung: true,
        plz: '65199',
        wohnflaeche: 100,
        elementarschaeden: true,
        fahrraddiebstahl: true,
        fahrradwert: 500,
        glasbruch: true,
        ueberspannungsschaeden: true,
        zahlweise: ZahlweiseEnum.halbjaehrlich,
      },
      selectedTarif: {
        name: Tarifname.Classic,
        beitraege: {
          halbjaehrlich: {
            brutto: 10.50,
            steuer: 2.23
          }
        }
      }
    });

    const kundendatenModel = new Model<Kundendaten>({
      geburtsdatum: '2000-01-01',
      anrede: 'Frau'
    });

    const vertragsdatenModel = new Model<Vertragsdaten>({
      vorversicherungVorhanden: true,
      gebaeudeart: 'Einfamilienhaus',
      gesellschaft: {name: 'Allianz'},
      gekuendigt: 'Versicherer'
    });

    const uebersichtModel = new Model<UebersichtDaten>({
      telefonWerbung: true,
      emailWerbung: true,
      auftragId: '123456789'

    });
    const zahlungsModel = new Model<Zahlungsdaten>({
      zahlart: ZahlartEnum.sepa,
      iban: 'DE3812345678910'
    });

    const cut = new BusinessDataProvider(tarifierungModel, kundendatenModel, vertragsdatenModel, uebersichtModel, zahlungsModel);

    jasmine.clock().mockDate(new Date(2020, 1));
    expect(cut.businessData).toEqual({
      wohnflaeche: '100',
      postleitzahl: '65199',
      zahlungsperiode: 'halbjaehrlich',
      selbstbeteiligung: '150 EUR',
      fahrradwert: '500',
      produktVariante: 'classic',
      zusatzleistungen: 'Elementarschäden | Glasbruch | Überspannungsschäden | Fahrraddiebstahl',
      produktPreis: '10.5',
      produktSteuer: '2.23',
      userGeschlecht: 'weiblich',
      userAlter: '20',
      gebaeudeart: 'Einfamilienhaus',
      bestehendeVersicherung: 'ja',
      vorherigeVersicherungsgesellschaft: 'Allianz',
      werbeeinwilligung: 'Telefon | Elektronische Post',
      auftragId: '123456789',
      zahlungsart: 'SEPA'
    });
  });
});
