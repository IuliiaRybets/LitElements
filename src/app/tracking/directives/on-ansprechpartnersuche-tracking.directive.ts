import { Directive, HostListener, Input } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Directive({
  selector: '[appOnClickAnsprechpartnersucheTracking]'
})
export class OnAnsprechpartnersucheTrackingDirective {

  @Input()
  grund: string;

  constructor(private readonly trackingService: TrackingService) { }

  @HostListener('click')
  onClick(){
    this.trackingService.pushAnsprechpartnersucheEvent(this.grund);
  }

}
