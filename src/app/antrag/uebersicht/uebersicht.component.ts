import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UEBERSICHT, UebersichtDaten } from '@antrag/uebersicht/uebersicht.model';
import { uebsersichtText } from '@antrag/uebersicht/uebersicht.text';
import { Model } from '@core/data-model';
import { CustomRouting, scrollToError } from '@core/service/navigation/navigation.service';
import { sharedText } from '@shared/shared.text';
import { tarifergebnisText } from '@tarifierung/tarifergebnis/tarifergebnis.text.ts';
import { Tarif, TARIFIERUNG } from '../../tarifierung/tarifierung.model';


@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.scss']
})
export class UebersichtComponent implements OnInit {
  routes = CustomRouting;
  uebsersichtText = uebsersichtText;
  tarifergebnisText = tarifergebnisText;
  sharedText = sharedText;

  uebersichtForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              @Inject(TARIFIERUNG) private readonly tarifdaten: Model<Tarif>,
              @Inject(UEBERSICHT) private readonly uebersichtDaten: Model<UebersichtDaten>,
  ) {
    this.uebersichtForm = this.fb.group({
      beratungsverzicht: [uebersichtDaten.get().beratungsverzicht, [Validators.required, Validators.requiredTrue]],
      telefonWerbung: [uebersichtDaten.get().telefonWerbung],
      emailWerbung: [uebersichtDaten.get().emailWerbung]
    });
  }

  ngOnInit() {

    this.uebersichtDaten.patch({auftragId: undefined});
  }

  onAbschliessen() {
    this.uebersichtForm.markAllAsTouched();

    if (this.uebersichtForm.valid) {
      this.uebersichtDaten.patch({
        telefonWerbung: this.uebersichtForm.controls.telefonWerbung.value,
        emailWerbung: this.uebersichtForm.controls.emailWerbung.value,
        beratungsverzicht: this.beratungsverzicht?.value
      });
    } else {
      scrollToError();
    }
  }

  asZahlweise(value: any) {
    return value as keyof typeof sharedText.bereich;
  }


  get beratungsverzicht(): AbstractControl | null {
    return this.uebersichtForm.controls.beratungsverzicht;
  }

  asTarif(value: any) {
    return value as keyof typeof tarifergebnisText.tarife;
  }

}
