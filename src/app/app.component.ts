import {Component, Inject} from '@angular/core';
import {NavigationService} from '@core/service/navigation/navigation.service';
import {NavigationEnd, Router} from '@angular/router';
import {WindowRef} from '@core/browser-globals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(readonly navigationService: NavigationService,
              private readonly windowRef: WindowRef,
              private readonly router: Router,
            //  @Inject(UTM_PARAMS) private readonly model: Model<UtmParams>
              ) {
    navigationService.observeUrlChange();
 
    this.saveUtmParameter();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
     
        windowRef.getNativeWindow().setTimeout(() => {
          windowRef.getNativeWindow().scrollTo(0, 0);
        }, 50);
      }
    });
  }

  private saveUtmParameter() {
    const url = this.windowRef.getNativeWindow().location.search;
    const urlParams = new URLSearchParams(url);
  }
}
