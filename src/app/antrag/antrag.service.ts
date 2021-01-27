import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
//import { ZahlartEnum, ZAHLUNGSDATEN } from '@antrag/zahlungsdaten/zahlungsdaten.model';
//import { KUNDENDATEN, Kundendaten } from '@antrag/kundendaten/kundendaten.model';
import { UEBERSICHT, UebersichtDaten } from '@antrag/uebersicht/uebersicht.model';
//import { Vertragsdaten, VERTRAGSDATEN } from '@antrag/vertragsdaten/vertragsdaten.model';
import { Model } from '@core/data-model';
import { longRunningRequest, spinnerTextKey } from '@core/interceptors/loading.interceptor';
import { Tarifierung, TARIFIERUNG } from '@tarifierung/tarifierung.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { sharedText } from '@shared/shared.text';
import { skipCacheHandling } from '@core/interceptors/cache.interceptor';
//import { UTM_PARAMS, UtmParams } from '../utm.model';

@Injectable({
  providedIn: 'root'
})
export class AntragService {


  constructor(
    //@Inject(VERTRAGSDATEN) private readonly vertragsdatenModel: Model<Vertragsdaten>,
              @Inject(TARIFIERUNG) private readonly tarifdatenModel: Model<Tarifierung>,
            //  @Inject(ZAHLUNGSDATEN) private readonly zahlungsdatenModel: Model<Zahlungsdaten>,
             // @Inject(KUNDENDATEN) private readonly kundendatenModel: Model<Kundendaten>,
              @Inject(UEBERSICHT) private readonly uebersichtDatenModel: Model<UebersichtDaten>,
             // @Inject(UTM_PARAMS) private readonly utmModel: Model<UtmParams>,
              private readonly httpClient: HttpClient) {
  }

  public startePolicierung(): Observable<string> {
    return this.httpClient.post<{ auftragId: string }>(
      environment.endpoints.policierung,
      {
        ...this.antragProdukt,
        ...this.antragDaten,
       // ...this.relevanteAngaben,
      //  ...this.zahlungsdaten,
    //    ...this.utmModel.get().gclid != null ? this.gclid : null
      }, {headers: {...longRunningRequest, [spinnerTextKey]: sharedText.spinner.antrag}}).pipe(
      map(value => value.auftragId),
      tap(auftragId => this.uebersichtDatenModel.patch({auftragId})));
  }

  /*public sendeVorvertraglicheInformationen() {
    return this.httpClient.post<void>(
      environment.endpoints.vorabmail,
      {
        empfaengerEmail: this.kundendaten.email,
        produktVariante: this.tarifierung.selectedTarif?.name.toUpperCase()
      },
      {headers: skipCacheHandling}
    );
  }*/

  private get antragDaten() {
    return {
      antragDaten: {
        //...this.person,
        ...this.werbeEinwilligung,
        ...this.portalDaten
      }
    };
  }

 /* private get relevanteAngaben() {
    return {
      relevanteAngaben: {
        nutzungsart: this.vertragsdaten.gebaeudeart,
        vorversichererabfrage: this.vertragsdaten.vorversicherungVorhanden,
        vorversichererName: this.vertragsdaten.gesellschaft?.name,
        vorversichererId: this.vertragsdaten.gesellschaft?.id,
        vertragsnummer: this.vertragsdaten.vertragsnummer,
        vertragsende: this.vertragsdaten.vertragsende
      }
    };
  }*/

  private get portalDaten() {
    return {
      portalDaten: {
        kanal: 'ruv',
        portalId: 'e01e3cebb884dd2557b35bd40da770e5'
      }
    };
  }

  private get werbeEinwilligung() {
    return {
      werbeEinwilligung: {
        perEmail: this.uebersichtDaten.emailWerbung,
        perTelefon: this.uebersichtDaten.telefonWerbung
      }
    };
  }

 /*  private get zahlungsdaten() {
    const zahlungsdatenModel = this.zahlungsdatenModel.get();
    return {
      zahlungsdaten: {
        zahlungsart: zahlungsdatenModel.zahlart.toUpperCase(),
        iban: zahlungsdatenModel.zahlart === ZahlartEnum.sepa ? zahlungsdatenModel.iban : undefined,
        checkoutId: zahlungsdatenModel.zahlart !== ZahlartEnum.sepa ? zahlungsdatenModel.checkoutId : undefined
      }
    };
  }

 private get gclid() {
    return {
      gclid: this.utmModel.get().gclid
    };
  }

  private get person() {
    return {
      person: {
        anrede: this.kundendaten.anrede,
        vorname: this.kundendaten.vorname,
        nachname: this.kundendaten.nachname,
        geburtsdatum: this.kundendaten.geburtsdatum.toISOString().slice(0, -14),
        nationalitaet: this.kundendaten.nationalitaet,
        email: this.kundendaten.email,
        festnetzVorwahl: this.kundendaten.festnetzVorwahl,
        festnetzNummer: this.kundendaten.festnetzAnschluss,
        mobilVorwahl: this.kundendaten.mobilVorwahl,
        mobilNummer: this.kundendaten.mobilAnschluss,
        adresse: {
          strasse: this.kundendaten.strasse,
          hausnummer: this.kundendaten.hausnummer,
          plz: this.kundendaten.plz,
          ort: this.kundendaten.ort,
          geprueft: false
        }
      }
    };
  }*/

  private get antragProdukt() {
    return {
      antragProdukt: {
       // versicherungsbeginn: this.vertragsdaten.versicherungsbeginn,
        fahrraddiebstahl: this.tarifierungsParameter.fahrraddiebstahl,
        fahrradwert: this.tarifierungsParameter.fahrradwert,
        plz: this.tarifierungsParameter.plz,
        wohnflaeche: this.tarifierungsParameter.wohnflaeche,
        selbstbeteiligung: this.tarifierungsParameter.selbstbeteiligung,
        bruttoProPeriode: this.tarifierung.selectedTarif?.beitraege[this.tarifierungsParameter.zahlweise]?.brutto,
        steuerProPeriode: this.tarifierung.selectedTarif?.beitraege[this.tarifierungsParameter.zahlweise]?.steuer,
        zahlungsperiode: this.tarifierungsParameter.zahlweise,
        tarif: this.tarifierung.selectedTarif?.name,
        elementarschaeden: this.tarifierungsParameter.elementarschaeden,
        glasbruch: this.tarifierungsParameter.glasbruch,
        ueberspannungsschaeden: this.tarifierungsParameter.ueberspannungsschaeden
      }
    };
  }

  private get uebersichtDaten() {
    return this.uebersichtDatenModel.get();
  }

 /* private get vertragsdaten() {
    return this.vertragsdatenModel.get();
  }

  private get kundendaten() {
    return this.kundendatenModel.get();
  }*/

  private get tarifierungsParameter() {
    return this.tarifierung.tarifierungsparameter;
  }

  private get tarifierung() {
    return this.tarifdatenModel.get();
  }
}
