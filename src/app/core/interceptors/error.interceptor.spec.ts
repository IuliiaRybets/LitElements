import { Location } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { noop } from 'rxjs';

@Component({template: ''})
class DummyComponent {
}

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  const TEST_API = 'test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{component: DummyComponent, path: HausratRoutes.relative.fehler}])
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should navigate to fehler page after retry on errors', (done) => {
    inject([HttpClient, Location, Router], (http: HttpClient, location: Location) => {
      http.get(TEST_API).subscribe(
        () => noop(),
        () => {
          expect(location.path()).toBe(HausratRoutes.absolute.fehler);
          done();
        });
      httpMock.expectOne(TEST_API).error(new ErrorEvent('Bad Request'));
      httpMock.expectOne(TEST_API).error(new ErrorEvent('Bad Request'));
      httpMock.expectOne('./api/bff/log/error');
    })();
  });

});
