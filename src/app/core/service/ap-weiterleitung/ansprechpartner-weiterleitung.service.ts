import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '@core/environment.model';

@Injectable({
  providedIn: 'root'
})
export class AnsprechpartnerWeiterleitungService {

  uri = 'assets/env.json';

  constructor(private readonly httpClient: HttpClient) {
  }

  onAnsprechpartnersuchen() {
    this.readEnvironmentConfig().subscribe((response) => {
      window.open(response.so + '/service/kontakt/ansprechpartnersuche/');
    });
  }

  private readEnvironmentConfig() {
    return this.httpClient.get<Environment>(this.uri);
  }

}
