import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AnsprechpartnerWeiterleitungService } from '@core/service/ap-weiterleitung/ansprechpartner-weiterleitung.service';

let httpTestingController: HttpTestingController;
let cut: AnsprechpartnerWeiterleitungService;

describe('AnsprechpartnerWeiterleitungService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    cut = TestBed.inject(AnsprechpartnerWeiterleitungService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#onAnsprechpartnersuchen', () => {

    it('should query the env.json', () => {
      cut.onAnsprechpartnersuchen();
      const req = httpTestingController.expectOne('assets/env.json');

      expect(req.request.method).toEqual('GET');

      req.flush({so: '123'});
    });

    it('should open new window', () => {
      spyOn(window, 'open');

      cut.onAnsprechpartnersuchen();
      const req = httpTestingController.expectOne('assets/env.json');
      expect(req.request.method).toEqual('GET');
      req.flush({so: 'url'});

      expect(window.open).toHaveBeenCalledWith('url/service/kontakt/ansprechpartnersuche/');
    });
  });
});
