import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private readonly httpClient: HttpClient) {
  }

  error(message: string) {
    this.httpClient.post(environment.endpoints.log + '/error', message,
      {headers: {skipError: 'skipError', skipCache: 'skipCache'}})
      .subscribe();
  }
}
