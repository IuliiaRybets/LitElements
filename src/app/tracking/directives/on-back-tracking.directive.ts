import { Directive, HostListener, Input } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Directive({
  selector: '[appOnBackTracking]'
})
export class OnBackTrackingDirective {

  @Input()
  action: 'back' | 'change' = 'back';
  @Input() details: string;

  constructor(private readonly trackingService: TrackingService) {
  }

  @HostListener('click')
  onClick() {
    this.trackingService.pushOnBackNavigationEvent(this.action, this.details);
  }

}
