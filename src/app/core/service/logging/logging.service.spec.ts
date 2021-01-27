import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logging.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('LoggingService', () => {
  let cut: LoggingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    cut = TestBed.inject(LoggingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call logging backend', () => {
    cut.error('ERROR');

    const req = httpTestingController.expectOne(environment.endpoints.log + '/error');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual('ERROR');
    req.flush({});
  });
});
