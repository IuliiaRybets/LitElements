import { Directive, Input, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Directive({
  selector: '[appOnAusschlussVisibleTracking]'
})
export class OnAusschlussTrackingDirective implements OnInit {

  @Input()
  grund: string;

  constructor(private readonly trackingService: TrackingService) {
  }

  ngOnInit(): void {
    this.trackingService.pushAusschlussEvent(this.grund);
  }

}
