import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NationalitaetenService {

  favorites: Array<Nationalitaet> = [
    {
      value: 'D',
      label: 'Deutschland'
    },
    {
      value: 'A',
      label: 'Österreich'
    },
    {
      value: 'CH',
      label: 'Schweiz'
    }
  ];

  constructor(private readonly http: HttpClient) {
  }

  ladeNationalitaeten() {
    return this.http.get<Nationalitaet[]>(environment.endpoints.nationalitaeten);
  }
}

export class Nationalitaet {
  value: string;
  label: string;
}
