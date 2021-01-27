import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  private readonly defaultOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private readonly httpClient: HttpClient) {
  }

  findOrtByPLZ(plz: string) {
    return this.httpClient.post<string[]>(environment.endpoints.plz, plz, this.defaultOptions);
  }

}

export interface Adresse {
  strasse?: string;
  hausnummer?: string;
  plz?: string;
  ort?: string;
}
