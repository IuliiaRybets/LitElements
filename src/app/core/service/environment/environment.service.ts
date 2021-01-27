import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '@core/environment.model';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  uri = 'assets/env.json';
  env: Environment;

  constructor(private readonly httpClient: HttpClient) {
  }

  initEnvironment() {
    this.httpClient.get<Environment>(this.uri)
      .subscribe((response) => this.env = response);
  }
}
