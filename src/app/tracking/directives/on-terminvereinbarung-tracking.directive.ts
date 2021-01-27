import { Directive, HostListener, Input } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Directive({
  selector: '[appOnClickTerminvereinbarungTracking]'
})
export class OnTerminvereinbarungTrackingDirective {

  @Input()
  grund: string;

  constructor(private readonly trackingService: TrackingService) { }

  @HostListener('click')
  onClick(){
    this.trackingService.pushTerminvereinbarungEvent(this.grund);
  }

}
