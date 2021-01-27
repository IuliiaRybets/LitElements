import { inject, InjectionToken } from '@angular/core';
import { Model, ModelFactory } from '@core/data-model';

export const UEBERSICHT = new InjectionToken<Model<UebersichtDaten>>('Uebersicht Model', {
  providedIn: 'root',
  factory: () => (inject(ModelFactory) as ModelFactory<UebersichtDaten>).create('uebersicht')
});

export interface UebersichtDaten {
  auftragId: string;
  telefonWerbung: boolean;
  emailWerbung: boolean;
  vorvertragsMailSent: boolean;
  beratungsverzicht: boolean;
}
