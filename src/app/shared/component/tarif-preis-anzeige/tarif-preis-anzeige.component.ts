import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { sharedText } from '@shared/shared.text';
import { TARIFIERUNG, Tarif, Region } from '@tarifierung/tarifierung.model';
import { Model } from '@core/data-model';
import { filter, map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-tarif-preis-anzeige',
  templateUrl: './tarif-preis-anzeige.component.html',
  styleUrls: ['./tarif-preis-anzeige.component.scss']
})
export class TarifPreisAnzeigeComponent {


  private readonly activeStep$: Observable<string>;

  sharedText = sharedText;
  tarifdatenModel$: Observable<Tarif[]>;
  Region = Region;

  constructor(private readonly router: Router,
              @Inject(TARIFIERUNG) private readonly model: Model<Tarif>) {
    this.activeStep$ = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      shareReplay(1),
    );
    
    //this.tarifdatenModel$ = this.model.data$;
  }

  asZahlweise(value: any) {
    return value as keyof typeof sharedText.bereich;
  }

  isVisible() {
    return this.activeStep$.pipe(map(index => index));
  }
}
