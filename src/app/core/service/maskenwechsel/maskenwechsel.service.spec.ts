import {TestBed} from '@angular/core/testing';

import {MaskenwechselService} from './maskenwechsel.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../../environments/environment';
import {NavigationEnd} from '@angular/router';
import {HausratRoutes} from '@core/service/navigation/navigation.service';
import {RouterTestingModule} from '@angular/router/testing';
import {UTM_PARAMS, UtmParams} from '../../../utm.model';
import {Model} from '@core/data-model';

const requestBody = {
  maskenName: 'UEBERSICHT',
  utmSource: 'www.ruv.de/hausratversicherung',
  utmMedium: 'affiliate',
  utmCampaign: 'test_hausratversicherung',
  utmTerm: 'rat',
  gclid: 'EAIaIQobChMIz63v_p-E7AIVks_tCh2mlgiOEAAYAyAAEgLxffD_BwE)'
};
describe('MaskenwechselService', () => {
  let cut: MaskenwechselService;
  let httpTestingController: HttpTestingController;
  const utmModel = new Model<UtmParams>({
    utmSource: 'www.ruv.de/hausratversicherung',
    utmMedium: 'affiliate',
    utmCampaign: 'test_hausratversicherung',
    utmTerm: 'rat',
    gclid: 'EAIaIQobChMIz63v_p-E7AIVks_tCh2mlgiOEAAYAyAAEgLxffD_BwE)'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule]
      , providers: [{provide: UTM_PARAMS, useValue: utmModel}]
    });
    cut = TestBed.inject(MaskenwechselService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(cut).toBeTruthy();
  });

  it('should call maskenwechsel on known url', () => {
    cut.reportMaskenwechsel(new NavigationEnd(1, HausratRoutes.absolute.uebersicht, HausratRoutes.absolute.uebersicht));

    const req = httpTestingController.expectOne(environment.endpoints.maskenwechsel);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(requestBody);
    req.flush({});
  });

  it('should do nothing on unknown url', () => {
    cut.reportMaskenwechsel(new NavigationEnd(1, '/test', 'test'));

    httpTestingController.expectNone(environment.endpoints.maskenwechsel);
  });
});
