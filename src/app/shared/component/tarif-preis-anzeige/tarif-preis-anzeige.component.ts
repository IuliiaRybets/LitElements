import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { sharedText } from '@shared/shared.text';
import { TARIFIERUNG, Tarifierung, ZahlweiseEnum } from '@tarifierung/tarifierung.model';
import { Model } from '@core/data-model';
import { filter, map, shareReplay } from 'rxjs/operators';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tarif-preis-anzeige',
  templateUrl: './tarif-preis-anzeige.component.html',
  styleUrls: ['./tarif-preis-anzeige.component.scss']
})
export class TarifPreisAnzeigeComponent {

  private static readonly VISIBLE_CONFIG = [
    HausratRoutes.absolute.kundendaten,
    HausratRoutes.absolute.vertragsdaten,
    HausratRoutes.absolute.zahlungsdaten
  ];

  private readonly activeStep$: Observable<number>;

  sharedText = sharedText;
  tarifdatenModel$: Observable<Tarifierung>;
  zahlweiseEnum = ZahlweiseEnum;

  constructor(private readonly router: Router,
              @Inject(TARIFIERUNG) private readonly model: Model<Tarifierung>) {
    this.activeStep$ = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      map(url => TarifPreisAnzeigeComponent.VISIBLE_CONFIG.findIndex((stepConfig) => stepConfig.includes(url))),
      shareReplay(1),
    );

    this.tarifdatenModel$ = this.model.data$;
  }

  asZahlweise(value: any) {
    return value as keyof typeof sharedText.bereich;
  }

  isVisible() {
    return this.activeStep$.pipe(map(index => index >= 0));
  }
}
