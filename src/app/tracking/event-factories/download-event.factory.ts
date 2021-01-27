import { Inject, Injectable } from '@angular/core';
import { DownloadEvent } from '../events.model';
import { GLOBAL_CONFIGURATION, GlobalConfiguration } from '../provider.definitions';
import { mapString } from '../util';

@Injectable({providedIn: 'root'})
export class DownloadEventFactory {

  constructor(@Inject(GLOBAL_CONFIGURATION) private readonly globalConfiguration: GlobalConfiguration) {
  }

  createDownloadEvent(filename: string, type: 'Download' | 'Mail'): DownloadEvent {
    return {
      event: 'Generic Event',
      eventCategory: 'Downloads',
      eventAction: 'Produkt',
      eventLabel: `${filename} - ${mapString(type, {Download: 'Download', Mail: 'per Mail'})}`,
      ...this.globalConfiguration
    };
  }
}
