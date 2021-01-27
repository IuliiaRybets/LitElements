import { Directive, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Directive({
  selector: '[appOnPurchaseTracking]'
})
export class OnPurchaseTrackingDirective implements OnInit {

  constructor(private readonly trackingService: TrackingService) {
  }

  ngOnInit(): void {
    this.trackingService.pushOnPurchaseEvent();
  }

}
