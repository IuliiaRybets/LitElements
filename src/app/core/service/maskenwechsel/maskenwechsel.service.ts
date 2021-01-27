/*import {Inject, Injectable} from '@angular/core';
import {NavigationEnd} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { skipErrorHandling } from '@core/interceptors/error.interceptor';
import { skipCacheHandling } from '@core/interceptors/cache.interceptor';
//import {UTM_PARAMS, UtmParams} from '../../../utm.model';
import {Model} from '@core/data-model';

@Injectable({
  providedIn: 'root'
})
export class MaskenwechselService {

  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  gclid: string | null;

  constructor(private readonly httpClient: HttpClient,
             // @Inject(UTM_PARAMS) private readonly model: Model<UtmParams>
              ) {
  }

  private readonly routeMapping = {
    '/': 'TARIFRECHNER',
    [HausratRoutes.absolute.tarifierung]: 'TARIFRECHNER',
    [HausratRoutes.absolute.tarifergebnis]: 'TARIFUEBERSICHT',
    [HausratRoutes.absolute.kundendaten]: 'KUNDENDATEN',
    [HausratRoutes.absolute.vertragsdaten]: 'VERTRAGSDATEN',
    [HausratRoutes.absolute.zahlungsdaten]: 'ZAHLUNGSDATEN',
    [HausratRoutes.absolute.uebersicht]: 'UEBERSICHT',
    [HausratRoutes.absolute.bestaetigung]: 'BESTAETIGUNG',
    [HausratRoutes.absolute.fehler]: 'FEHLER'
  };

  reportMaskenwechsel(navigationEnd: NavigationEnd): void {

    const urlWithoutParams = navigationEnd.urlAfterRedirects.includes('?') ?
      navigationEnd.urlAfterRedirects.substr(0, navigationEnd.urlAfterRedirects.indexOf('?')) :
      navigationEnd.urlAfterRedirects;

    if (!this.routeMapping[urlWithoutParams]) {
      return;
    }

    this.httpClient.post(environment.endpoints.maskenwechsel,
      {...this.maskenwechselBody(urlWithoutParams)},
      {headers: {...skipErrorHandling, ...skipCacheHandling}})
      .subscribe();
  }

  private maskenwechselBody(url: string) {
    return {
      maskenName: this.routeMapping[url],
     // ...this.model.get()
    };
  }
}
*/