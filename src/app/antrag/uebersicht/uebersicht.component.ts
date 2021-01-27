import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { ZahlartEnum, Zahlungsdaten, ZAHLUNGSDATEN } from '@antrag/zahlungsdaten/zahlungsdaten.model';
//import { KUNDENDATEN, Kundendaten } from '@antrag/kundendaten/kundendaten.model';
import { UEBERSICHT, UebersichtDaten } from '@antrag/uebersicht/uebersicht.model';
import { uebsersichtText } from '@antrag/uebersicht/uebersicht.text';
//import { Vertragsdaten, VERTRAGSDATEN } from '@antrag/vertragsdaten/vertragsdaten.model';
//import { vertragsdatenText } from '@antrag/vertragsdaten/vertragsdaten.text';
import { Model } from '@core/data-model';
import { HausratRoutes, scrollToError } from '@core/service/navigation/navigation.service';
import { sharedText } from '@shared/shared.text';
import { tarifergebnisText } from '@tarifierung/tarifergebnis/tarifergebnis.text.ts';
import { Tarifierung, TARIFIERUNG, Tarifname, ZahlweiseEnum } from '@tarifierung/tarifierung.model';
import { DokumentenNamen } from '../../tracking/directives/on-download-tracking.directive';
import { AntragService } from '@antrag/antrag.service';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.scss']
})
export class UebersichtComponent implements OnInit {
  routes = HausratRoutes;
  uebsersichtText = uebsersichtText;
  tarifergebnisText = tarifergebnisText;
  //vertragsdatenText = vertragsdatenText;
  sharedText = sharedText;
  //zahlweiseEnum = ZahlweiseEnum;
  //zahlartEnum = ZahlartEnum;
  tarifname = Tarifname;
  DokumentenNamen = DokumentenNamen;

  uebersichtForm: FormGroup;

  //vertragsdaten: Vertragsdaten;
 // zahlungsdaten: Zahlungsdaten;
  tarifdatenModel: Tarifierung;
 // kundendaten: Kundendaten;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly antragService: AntragService,
           //   @Inject(VERTRAGSDATEN) private readonly vertragsdatenModel: Model<Vertragsdaten>,
              @Inject(TARIFIERUNG) private readonly tarifdaten: Model<Tarifierung>,
             // @Inject(ZAHLUNGSDATEN) private readonly zahlungsdatenModel: Model<Zahlungsdaten>,
             // @Inject(KUNDENDATEN) private readonly kundendatenModel: Model<Kundendaten>,
              @Inject(UEBERSICHT) private readonly uebersichtDaten: Model<UebersichtDaten>,
  ) {
    this.uebersichtForm = this.fb.group({
      beratungsverzicht: [uebersichtDaten.get().beratungsverzicht, [Validators.required, Validators.requiredTrue]],
      telefonWerbung: [uebersichtDaten.get().telefonWerbung],
      emailWerbung: [uebersichtDaten.get().emailWerbung]
    });
  }

  ngOnInit() {
    this.tarifdatenModel = this.tarifdaten.get();
   // this.vertragsdaten = this.vertragsdatenModel.get();
    //this.zahlungsdaten = this.zahlungsdatenModel.get();
   // this.kundendaten = this.kundendatenModel.get();
    this.uebersichtDaten.patch({auftragId: undefined});

   /* if (!this.uebersichtDaten.get().vorvertragsMailSent) {
      this.antragService.sendeVorvertraglicheInformationen()
        .subscribe(() => this.uebersichtDaten.patch({vorvertragsMailSent: true}));
    }*/
  }

  onAbschliessen() {
    this.uebersichtForm.markAllAsTouched();

    if (this.uebersichtForm.valid) {
      this.uebersichtDaten.patch({
        telefonWerbung: this.uebersichtForm.controls.telefonWerbung.value,
        emailWerbung: this.uebersichtForm.controls.emailWerbung.value,
        beratungsverzicht: this.beratungsverzicht?.value
      });

      /*if (this.zahlungsdaten.zahlart === ZahlartEnum.sepa) {
        this.router.navigate([this.routes.absolute.bestaetigung]);
      } else {
        this.router.navigate([this.routes.absolute.zahlungbestaetigen]);
      }*/
    } else {
      scrollToError();
    }
  }

  asZahlweise(value: any) {
    return value as keyof typeof sharedText.bereich;
  }

  /*asZahlart(value: any) {
    return value as keyof typeof uebsersichtText.zahlungsdaten.zahlart;
  }*/

  get beratungsverzicht(): AbstractControl | null {
    return this.uebersichtForm.controls.beratungsverzicht;
  }

  asTarif(value: any) {
    return value as keyof typeof tarifergebnisText.tarife;
  }

  isZusatzbausteinSelected() {
    return this.tarifdatenModel.tarifierungsparameter.ueberspannungsschaeden || this.tarifdatenModel.tarifierungsparameter.fahrraddiebstahl
      || this.tarifdatenModel.tarifierungsparameter.glasbruch || this.tarifdatenModel.tarifierungsparameter.elementarschaeden;
  }

  /*get berechneterGesamtbeitrag(): number | undefined {
    switch (this.tarifdatenModel.tarifierungsparameter?.zahlweise) {
      case ZahlweiseEnum.inland:
        return this.tarifdatenModel.selectedTarif?.beitraege.inland.brutto;
      case ZahlweiseEnum.ausland:
        return this.tarifdatenModel.selectedTarif?.beitraege.ausland.brutto ?
          this.tarifdatenModel.selectedTarif?.beitraege.ausland.brutto * 2 : undefined;
    }
    return undefined;
  }*/
}
