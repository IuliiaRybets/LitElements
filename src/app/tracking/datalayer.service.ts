import { Injectable } from '@angular/core';
import { TrackingEvent } from './events.model';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

window.dataLayer = window.dataLayer || [];

@Injectable()
export class DatalayerService {

  constructor() {
  }

  push(event: TrackingEvent) {
    window.dataLayer.push({...event});
  }
}

