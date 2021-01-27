import { InjectionToken } from '@angular/core';

export interface GlobalConfiguration {
  produktname: string;
  produktId: string;
  produktKategorie: string;
  vertragslaufzeit: string;
  portalId: string;
}

export const GLOBAL_CONFIGURATION = new InjectionToken<GlobalConfiguration>('GlobalConfiguration');
