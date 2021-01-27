import {Component, Inject} from '@angular/core';
import {NavigationService} from '@core/service/navigation/navigation.service';
import {TrackingService} from './tracking/tracking.service';
import {EnvironmentService} from '@core/service/environment/environment.service';
import {NavigationEnd, Router} from '@angular/router';
import {WindowRef} from '@core/browser-globals';
//import {MaskenwechselService} from '@core/service/maskenwechsel/maskenwechsel.service';
import {Model} from '@core/data-model';
//import {UTM_PARAMS, UtmParams} from './utm.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(readonly navigationService: NavigationService,
              private readonly trackingService: TrackingService,
              private readonly environmentService: EnvironmentService,
              private readonly windowRef: WindowRef,
              //private readonly maskenwechselService: MaskenwechselService,
              private readonly router: Router,
            //  @Inject(UTM_PARAMS) private readonly model: Model<UtmParams>
              ) {
    navigationService.observeUrlChange();
    trackingService.initTracking();
    environmentService.initEnvironment();
    this.saveUtmParameter();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      //  maskenwechselService.reportMaskenwechsel(event);
        // using setTimeout, otherwise Firefox will not always work
        windowRef.getNativeWindow().setTimeout(() => {
          windowRef.getNativeWindow().scrollTo(0, 0);
        }, 50);
      }
    });
  }

  private saveUtmParameter() {
    const url = this.windowRef.getNativeWindow().location.search;
    const urlParams = new URLSearchParams(url);

 /*   this.model.patch( {
      utmSource: urlParams.get('utm_source'),
      utmMedium: urlParams.get('utm_medium'),
      utmCampaign: urlParams.get('utm_campaign'),
      utmTerm: urlParams.get('utm_term'),
      gclid: urlParams.get('gclid')
    });*/
  }
}
