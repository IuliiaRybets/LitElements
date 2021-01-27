import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { tarifergebnisText } from '@tarifierung/tarifergebnis/tarifergebnis.text';
import { sharedText } from '@shared/shared.text';
import {Tarif, ZahlweiseEnum} from '@tarifierung/tarifierung.model';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.scss']
})
export class TarifComponent {

  @Input() tarif!: Tarif;
  @Input() tarifdetails!: string[];
  @Input() isSelected = false;
  @Input() topseller = false;
  @Input() zahlweise!: ZahlweiseEnum;
  @Input() defaultpreis: string;

  @Output() tarifSelected = new EventEmitter<Tarif>();

  text = tarifergebnisText;
  sharedText = sharedText;

  constructor() {
  }


  onClickTarif() {
    this.tarifSelected.emit(this.tarif);
  }

  getPreis() {
    if (this.tarif.beitraege) {
      switch (this.zahlweise) {
        case ZahlweiseEnum.inland:
          return this.tarif.beitraege.inland.brutto;
        case ZahlweiseEnum.ausland:
          return this.tarif.beitraege.ausland.brutto;
      }
    }
    return null;
  }

}

