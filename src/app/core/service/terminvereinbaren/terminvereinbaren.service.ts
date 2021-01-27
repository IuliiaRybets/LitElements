import { Injectable } from '@angular/core';
import { EnvironmentService } from '@core/service/environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class TerminvereinbarenService {

  uri = 'assets/env.json';

  constructor(private readonly environmentService: EnvironmentService) {
  }

  onTerminvereinbaren() {
    window.open(this.terminvereinbarenLink);
  }

  get terminvereinbarenLink() {
    return this.environmentService.env.so + '/service/kontakt/terminvereinbarung?b=1080100&kunde=p';
  }

}
