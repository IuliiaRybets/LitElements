import { Directive, HostListener, Input } from '@angular/core';
import { TrackingService } from '../tracking.service';

export enum  DokumentenNamen {
  infoblatt = 'Infoblatt',
  faq = 'FAQ',
  berechnungsbeispiel = 'Berechnungsbeispiel',
  antragsuebersicht = 'Antragsübersicht',
  avb = 'Allgemeine Versicherungsbedingungen',
  vvg = 'VVG-Informationspflichtenverordnung',
  antragserlaeuterungen = 'Erläuterungen Antrag',
  ipid = 'ipid',
  merkblattDV = 'Merkblatt Datenverarbeitung',
  widerrufbelehrung = 'Widerrufsbelehrung',
  leistungsuebersicht = 'Leistungsübersicht'
}

@Directive({
  selector: '[appOnClickDownloadTracking]'
})
export class OnDownloadTrackingDirective {

  @Input()
  fileName: DokumentenNamen;

  @Input()
  type: 'Download' | 'Mail' = 'Download';

  constructor(private readonly trackingService: TrackingService) { }

  @HostListener('click')
  onClick(){
    this.trackingService.pushOnDownloadEvent(this.fileName, this.type);
  }

}
