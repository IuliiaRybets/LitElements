import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import { ausstiegfuerheldenText } from '@shared/component/ausstieg-fuer-helden/ausstieg-fuer-helden.component.text';
import { TerminvereinbarenService } from '@core/service/terminvereinbaren/terminvereinbaren.service';
import { AnsprechpartnerWeiterleitungService } from '@core/service/ap-weiterleitung/ansprechpartner-weiterleitung.service';
import { sharedText } from '@shared/shared.text';

@Component({
  selector: 'app-ausstieg-fuer-helden',
  templateUrl: './ausstieg-fuer-helden.component.html',
  styleUrls: ['./ausstieg-fuer-helden.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AusstiegFuerHeldenComponent {

  @Output() closeEvent = new EventEmitter<void>();
  @Input() ausschlussGrund: string;

  text = ausstiegfuerheldenText;
  sharedText = sharedText;

  constructor(
    private readonly terminvereinbarenService: TerminvereinbarenService,
    private readonly ansprechpartnerService: AnsprechpartnerWeiterleitungService) {
  }

  onCloseMessage() {
    this.closeEvent.emit();
  }

  onTerminvereinbaren() {
    this.terminvereinbarenService.onTerminvereinbaren();
  }

  onAnsprechpartner() {
    this.ansprechpartnerService.onAnsprechpartnersuchen();
  }

}
