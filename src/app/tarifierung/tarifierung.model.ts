import { inject, InjectionToken } from '@angular/core';
import { Model, ModelFactory } from '@core/data-model';
import { DeepPartial } from '../global-types';
import { sharedText } from '@shared/shared.text';

export enum Tarifname {
  Classic = 'classic',
  Basic = 'basic',
  Comfort = 'comfort',
}

export const Pakete = [[
    {name: '25 Prüfungen (500,00 EUR)', price: 500},
    {name: '50 Prüfungen (900,00 EUR)', price: 900},
    {name: '100 Prüfungen (1.700,00 EUR)',  price: 1700},
    {name: '250 Prüfungen (4.050,00 EUR)',  price: 4050},
    {name: '500 Prüfungen (7.900,00 EUR)',  price: 7900},
  ],
  [
    {name: '25 Prüfungen (1.100,00 EUR)',  price: 1100},
    {name: '50 Prüfungen (2.100,00 EUR)',  price: 2100},
    {name: '100 Prüfungen (4.000,00 EUR)',  price: 4000},
    {name: '250 Prüfungen (9.500,00 EUR)',  price: 9500},
    {name: '500 Prüfungen (18.600,00 EUR)',  price: 18600},
]]

export enum ZahlweiseEnum {
  default = 'Bitte wählen',
  inland = 'inland',
  ausland = 'ausland',
}


export const BEREICH: Array<any> = [
  { name: 'Inland',
   paketen: [  {name: '25 Prüfungen (500,00 EUR)',
               anzahlen: [ '1', '2', '3', '4', '5'],
              gebuer: ['300']},
              {name: '50 Prüfungen (900,00 EUR)',
              anzahlen: [ '1', '2', '3', '4', '5']},
              {name: '100 Prüfungen (1.700,00 EUR)',
              anzahlen: [ '1', '2', '3', '4', '5']},
              {name: '250 Prüfungen (4.050,00 EUR)',
              anzahlen: [ '1', '2', '3', '4', '5']},
              {name: '500 Prüfungen (7.900,00 EUR)',
              anzahlen: [ '1', '2', '3', '4', '5']},
            ],
},
  { name: 'Ausland',
    paketen: [  {name: '25 Prüfungen (1.100,00 EUR)',
                anzahlen: [ '1', '2', '3', '4', '5', '6', '7']},
                  {name: '50 Prüfungen (2.100,00 EUR)',
                  anzahlen: [ '1', '2', '3', '4', '5', '6', '7']},
                  {name: '100 Prüfungen (4.000,00 EUR)',
                  anzahlen: [ '1', '2', '3', '4', '5', '6', '7']},
                  {name: '250 Prüfungen (9.500,00 EUR)',
                  anzahlen: [ '1', '2', '3', '4', '5', '6', '7']},
                  {name: '500 Prüfungen (18.600,00 EUR)',
                  anzahlen: [ '1', '2', '3', '4', '5', '6', '7']},
            ]}
];


const tarifname = Tarifname;

export const DEFAULT_TARIFIERUNG: DeepPartial<Tarifierung> = {
  tarifierungsparameter: {
    selbstbeteiligung: true,
    zahlweise: ZahlweiseEnum.ausland,
    ueberspannungsschaeden: false,
    glasbruch: false,
    fahrraddiebstahl: false,
    fahrradwert: undefined,
    elementarschaeden: false,
  },
  tarife: [
    {name: tarifname.Basic},
    {name: tarifname.Classic},
    {name: tarifname.Comfort},
  ]
};

export const TARIFIERUNG = new InjectionToken<Model<Tarifierung>>('Tarifierung Model', {
  providedIn: 'root',
  factory: () => (inject(ModelFactory) as ModelFactory<Tarifierung>).create('tarifierung', DEFAULT_TARIFIERUNG)
});

export interface Tarifierung {
  tarifierungsparameter: Tarifierungsparameter;
  tarife: Tarif[];
  selectedTarif?: Tarif;
    zahlweise: ZahlweiseEnum;
}

export function asZahlweise(value: any) {
  return value as keyof typeof sharedText.bereich;
}

export interface Tarifierungsparameter {
  selbstbeteiligung: boolean;
  elementarschaeden: boolean;
  fahrraddiebstahl: boolean;
  fahrradwert?: number;
  glasbruch: boolean;
  plz: string;
  ueberspannungsschaeden: boolean;
  wohnflaeche: number;
  zahlweise: ZahlweiseEnum;
}


export interface Tarife {
  tarife: Tarif[];
}

export interface Tarif {
  name: Tarifname;
  beitraege: {
    [key in ZahlweiseEnum]: {
      brutto: number,
      steuer: number
    }
  };
}

