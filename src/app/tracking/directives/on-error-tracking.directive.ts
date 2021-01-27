import { Directive, Input, OnChanges } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Directive({selector: '[appOnErrorTracking]'})
export class OnErrorTrackingDirective implements OnChanges {

  @Input()
  error: string;

  @Input()
  fieldLabel: string;

  constructor(
    private readonly trackingService: TrackingService) {
  }

  ngOnChanges(): void {
    this.trackingService.pushFehlerEvent(this.fieldLabel, this.error);
  }

}
