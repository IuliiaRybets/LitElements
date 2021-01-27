import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Model } from '@core/data-model';
import { longRunningRequest, spinnerTextKey } from '@core/interceptors/loading.interceptor';
import { Tarife, Tarifierung, TARIFIERUNG, Tarifierungsparameter } from '@tarifierung/tarifierung.model';
import { debounceTime, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { sharedText } from '@shared/shared.text';

@Injectable({
  providedIn: 'root'
})
export class TarifeService {

  constructor(private readonly http: HttpClient,
              @Inject(TARIFIERUNG) private readonly model: Model<Tarifierung>) {
  }

  berechneTarife(tarifierungsparameterPartial: Partial<Tarifierungsparameter>) {
    const tarifierungsparameter = {...this.model.get().tarifierungsparameter, ...tarifierungsparameterPartial};

    return this.http.post<Tarife>(
     environment.endpoints.tarife,
      {...this.model.patch({tarifierungsparameter}).tarifierungsparameter, versicherungsbeginn: this.getTomorrowAsString()},
      {headers: {...longRunningRequest, [spinnerTextKey]: sharedText.spinner.tarifierung}})
      .pipe(
        debounceTime(300),
        map(response => response.tarife),
        map(tarife => tarife.map(value => ({name: value.name, beitraege: value.beitraege}))),
        tap(tarife => {
          this.model.patch({tarife});
          const selectedTarif = this.model.get().selectedTarif;
          if (selectedTarif) {
            this.model.patch({selectedTarif: tarife.find(tarif => tarif.name === selectedTarif.name)});
          }
        })
      );
  }

  private getTomorrowAsString() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().slice(0, -14);
  }

}
