import { Inject, Injectable } from '@angular/core';
//import { KUNDENDATEN, Kundendaten } from '@antrag/kundendaten/kundendaten.model';
//import { Vertragsdaten, VERTRAGSDATEN } from '@antrag/vertragsdaten/vertragsdaten.model';
import { Model } from '@core/data-model';
import { tarifergebnisText } from '@tarifierung/tarifergebnis/tarifergebnis.text';
import { asZahlweise, Tarifierung, TARIFIERUNG, Tarifierungsparameter } from '@tarifierung/tarifierung.model';
import { calculateAge, defaultOr, joined, mapBool, mapString } from '../util';
import { UEBERSICHT, UebersichtDaten } from '@antrag/uebersicht/uebersicht.model';
//import { Zahlungsdaten, ZAHLUNGSDATEN } from '@antrag/zahlungsdaten/zahlungsdaten.model';

@Injectable({providedIn: 'root'})
export class BusinessDataProvider {

  constructor(@Inject(TARIFIERUNG) private readonly tarifierungModel: Model<Tarifierung>,
             // @Inject(KUNDENDATEN) private readonly kundendatenModel: Model<Kundendaten>,
              //@Inject(VERTRAGSDATEN) private readonly vertragsdatenModel: Model<Vertragsdaten>,
              @Inject(UEBERSICHT) private readonly uebersichtModel: Model<UebersichtDaten>,
              //@Inject(ZAHLUNGSDATEN) private readonly zahlungsdatenModel: Model<Zahlungsdaten>
              ) {
  }

 /* get businessData(): BusinessData {
    return {
      wohnflaeche: this.wohnflaeche,
      postleitzahl: this.postleitzahl,
      zahlungsperiode: this.zahlungsperiode,
      selbstbeteiligung: this.selbstbeteiligung,
      fahrradwert: this.fahrradwert,
      zusatzleistungen: defaultOr(this.zusatzleistungen),
      produktVariante: defaultOr(this.produktVariante),
      produktPreis: this.produktPreis,
      produktSteuer: this.produktSteuer,
      userGeschlecht: this.userGeschlecht,
      userAlter: this.userAlter,
      gebaeudeart: this.gebaeudeart,
      bestehendeVersicherung: this.bestehendeVersicherung,
      vorherigeVersicherungsgesellschaft: this.vorherigeVersicherungsgesellschaft,
      werbeeinwilligung: defaultOr(this.werbeeinwilligung),
      auftragId: defaultOr(this.auftragId),
      zahlungsart: defaultOr(this.zahlungsart)
    };
  }

  private get userAlter() {
    return defaultOr(calculateAge(this.getKundendaten?.geburtsdatum));
  }

  private get userGeschlecht() {
    return defaultOr(mapString(this.getKundendaten?.anrede, {Herr: 'männlich', Frau: 'weiblich'}));
  }*/

  private get wohnflaeche() {
    return defaultOr(this.tarifierungsparameter?.wohnflaeche);
  }

  private get postleitzahl() {
    return defaultOr(this.tarifierungsparameter?.plz);
  }

  private get zahlungsperiode() {
    return defaultOr(this.tarifierungsparameter?.zahlweise);
  }

  private get selbstbeteiligung() {
    return defaultOr(
      mapBool(this.tarifierungsparameter?.selbstbeteiligung,
        tarifergebnisText.selbstbeteiligung.values.true,
        tarifergebnisText.selbstbeteiligung.values.false));
  }

  private get fahrradwert() {
    return defaultOr(this.tarifierungsparameter?.fahrradwert);
  }

  private get zusatzleistungen() {
    let result =
      joined([
        mapBool(this.tarifierungsparameter?.elementarschaeden, 'Elementarschäden'),
        mapBool(this.tarifierungsparameter?.glasbruch, 'Glasbruch'),
        mapBool(this.tarifierungsparameter?.ueberspannungsschaeden, 'Überspannungsschäden'),
        mapBool(this.tarifierungsparameter?.fahrraddiebstahl, 'Fahrraddiebstahl')
      ]);
    if (this.produktVariante && !result) {
      result = 'keine';
    }
    return result;
  }

  private get produktVariante() {
    return this.tarifierung?.selectedTarif?.name;
  }

 /* private get produktPreis() {
    return defaultOr(this.tarifierung?.selectedTarif?.beitraege[asZahlweise(this.tarifierungsparameter?.zahlweise)]?.brutto);
  }

  private get produktSteuer() {
    return defaultOr(this.tarifierung?.selectedTarif?.beitraege[asZahlweise(this.tarifierungsparameter?.zahlweise)]?.steuer);
  }*/

  private get tarifierung(): Tarifierung | undefined {
    return this.tarifierungModel.get();
  }

  private get tarifierungsparameter(): Tarifierungsparameter | undefined {
    return this.tarifierung?.tarifierungsparameter;
  }

 /* private get getKundendaten(): Kundendaten | undefined {
    return this.kundendatenModel.get();
  }*/

 /* private get vertragsdaten(): Vertragsdaten | undefined {
    return this.vertragsdatenModel.get();
  }*/

  private get uebersichtDaten(): UebersichtDaten | undefined {
    return this.uebersichtModel.get();
  }

 /* private get zahlungsDaten(): Zahlungsdaten | undefined {
    return this.zahlungsdatenModel.get();
  }*/

  private get werbeeinwilligung(): string | undefined {
    if (this.auftragId && !(this.uebersichtDaten?.telefonWerbung || this.uebersichtDaten?.emailWerbung)) {
      return 'keine';
    }
    return joined([
      mapBool(this.uebersichtDaten?.telefonWerbung, 'Telefon'),
      mapBool(this.uebersichtDaten?.emailWerbung, 'Elektronische Post')
    ]);
  }

  private get auftragId(): string | undefined {
    return this.uebersichtDaten?.auftragId;
  }

 /* private get zahlungsart(): string | undefined {
    return this.zahlungsDaten?.zahlart?.toUpperCase();
  }*/

}

export interface BusinessData {
  wohnflaeche: string;
  postleitzahl: string;
  zahlungsperiode: string;
  selbstbeteiligung: string;
  fahrradwert: string;
  zusatzleistungen: string;
  produktVariante: string;
  produktPreis: string;
  produktSteuer: string;
  userGeschlecht: string;
  userAlter: string;
  gebaeudeart: string;
  bestehendeVersicherung: string;
  vorherigeVersicherungsgesellschaft: string;
  werbeeinwilligung: string;
  auftragId: string;
  //zahlungsart: string;
}
