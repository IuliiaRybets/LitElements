import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdresseService } from '@core/service/adresse/adresse.service';
import { environment } from '../../../../environments/environment';

describe('AdresseService', () => {
  let httpTestingController: HttpTestingController;
  let cut: AdresseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    cut = TestBed.inject(AdresseService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#findOrtByPLZ', () => {
    it('should return ort', () => {
      cut.findOrtByPLZ('12345').subscribe(liste => {
        expect(liste.length).toBe(1);
        expect(liste[0]).toEqual('Wiesbaden');
      });

      const req = httpTestingController.expectOne(environment.endpoints.plz);
      expect(req.request.method).toEqual('POST');
      req.flush(['Wiesbaden']);

    });
  });

});
