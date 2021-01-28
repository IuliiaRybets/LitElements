import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CustomRouting } from '@core/service/navigation/navigation.service';
import { sharedText } from '@shared/shared.text';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {

  private static readonly PROGRESS_CONFIG = [
    {
      step: sharedText.progressBar.step4,
      matchingRoutes: [CustomRouting.absolute.uebersicht]
    },
  ];

  private readonly activeStep$: Observable<number>;

  constructor(private readonly router: Router) {
    this.activeStep$ = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(ProgressBarComponent.PROGRESS_CONFIG[0].step),
      map(url => ProgressBarComponent.PROGRESS_CONFIG.findIndex((stepConfig) => stepConfig.matchingRoutes.includes(url))),
      shareReplay(1),
    );
  }

  get steps(): string[] {
    return ProgressBarComponent.PROGRESS_CONFIG.map(value => value.step);
  }

  route(i: number) {
    return ProgressBarComponent.PROGRESS_CONFIG[i].matchingRoutes;
  }

  isCompleted(i: number) {
    return this.activeStep$.pipe(map(index => i < index));
  }

  isActive(i: number) {
    return this.activeStep$.pipe(map(index => i === index));
  }

  isVisible() {
    return this.activeStep$.pipe(map(index => index >= 0));
  }
}
