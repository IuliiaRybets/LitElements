import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EnvironmentService', () => {
  let cut: EnvironmentService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    cut = TestBed.inject(EnvironmentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#initEnvironment', () => {

    it('should query the env.json', () => {
      cut.initEnvironment();
      const req = httpTestingController.expectOne('assets/env.json');

      expect(req.request.method).toEqual('GET');

      req.flush({so: '123'});
    });
  });

});
