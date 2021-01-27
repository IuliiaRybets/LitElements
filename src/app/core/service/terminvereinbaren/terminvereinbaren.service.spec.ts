import { TestBed } from '@angular/core/testing';

import { TerminvereinbarenService } from './terminvereinbaren.service';
import { EnvironmentService } from '@core/service/environment/environment.service';

describe('TerminvereinbarenService', () => {

  let cut: TerminvereinbarenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: EnvironmentService, useValue: {env: {so: 'url'}}}
      ]
    });
    cut = TestBed.inject(TerminvereinbarenService);
  });

  describe('#onTerminvereinbaren', () => {

    it('should open new window', () => {
      spyOn(window, 'open');

      cut.onTerminvereinbaren();

      expect(window.open).toHaveBeenCalledWith('url/service/kontakt/terminvereinbarung?b=1080100&kunde=p');
    });
  });
});
