import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CacheInterceptor, skipCacheHandling } from '@core/interceptors/cache.interceptor';
import { noop } from 'rxjs';

describe('CacheInterceptor', () => {
    let httpMock: HttpTestingController;
    let http: HttpClient;

    const TEST_API = 'test';

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
        ]
      });
      httpMock = TestBed.inject(HttpTestingController);
      http = TestBed.inject(HttpClient);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should call the backend when not cached yet', () => {
      http.get(TEST_API).subscribe(value => {
        expect(value).toEqual({backend: 'done'});
      });
      const testRequest = httpMock.expectOne(TEST_API);
      testRequest.flush({backend: 'done'}, {status: 200, statusText: 'Ok'});
    });

    it('shoul call the backend when skipCache header is set', () => {
      http.get(`${TEST_API}?param=1`, {headers: skipCacheHandling}).subscribe(value => {
        expect(value).toEqual({backend: 'done1'});
      });
      let testRequest = httpMock.expectOne(`${TEST_API}?param=1`);
      testRequest.flush({backend: 'done1'}, {status: 200, statusText: 'Ok'});

      http.get(`${TEST_API}?param=1`, {headers: skipCacheHandling}).subscribe(value => {
        expect(value).toEqual({backend: 'done1'});
      });

      testRequest = httpMock.expectOne(`${TEST_API}?param=1`);
      testRequest.flush({backend: 'done1'}, {status: 200, statusText: 'Ok'});

    });

    it('should return the cached response based on the url', () => {
      http.get(TEST_API).subscribe(value => {
        expect(value).toEqual({backend: 'done'});
      });
      const testRequest = httpMock.expectOne(TEST_API);
      testRequest.flush({backend: 'done'}, {status: 200, statusText: 'Ok'});

      http.get(TEST_API).subscribe(value => {
        expect(value).toEqual({backend: 'done'});
      });
    });

    it('should return the cached response based on the body', () => {
      http.post(TEST_API, {value: 1}).subscribe(value => {
        expect(value).toEqual({backend: 'done'});
      });
      const testRequest = httpMock.expectOne(TEST_API);
      testRequest.flush({backend: 'done'}, {status: 200, statusText: 'Ok'});

      http.post(TEST_API, {value: 1}).subscribe(value => {
        expect(value).toEqual({backend: 'done'});
      });
    });

    it('should not cache when url is different', () => {
      http.get(`${TEST_API}?param=1`).subscribe(value => {
        expect(value).toEqual({backend: 'done1'});
      });
      let testRequest = httpMock.expectOne(`${TEST_API}?param=1`);
      testRequest.flush({backend: 'done1'}, {status: 200, statusText: 'Ok'});

      http.get(`${TEST_API}?param=2`).subscribe(value => {
        expect(value).toEqual({backend: 'done2'});
      });

      testRequest = httpMock.expectOne(`${TEST_API}?param=2`);
      testRequest.flush({backend: 'done2'}, {status: 200, statusText: 'Ok'});
    });

    it('should not cache when body is different', () => {
      http.post(TEST_API, {value: 1}).subscribe(value => {
        expect(value).toEqual({backend: 'done1'});
      });
      let testRequest = httpMock.expectOne(TEST_API);
      testRequest.flush({backend: 'done1'}, {status: 200, statusText: 'Ok'});

      http.post(TEST_API, {value: 2}).subscribe(value => {
        expect(value).toEqual({backend: 'done2'});
      });

      testRequest = httpMock.expectOne(TEST_API);
      testRequest.flush({backend: 'done2'}, {status: 200, statusText: 'Ok'});
    });

    it('should not cache errors', () => {
      http.get(TEST_API).subscribe(
        () => noop(),
        (error: HttpErrorResponse) => {
          expect(error.error).toEqual(new ErrorEvent('Bad Request'));
        });
      let testRequest = httpMock.expectOne(TEST_API);
      testRequest.error(new ErrorEvent('Bad Request'));


      http.get(TEST_API).subscribe(
        () => noop(),
        (error: HttpErrorResponse) => {
          expect(error.error).toEqual(new ErrorEvent('Bad Request'));
        });
      testRequest = httpMock.expectOne(TEST_API);
      testRequest.error(new ErrorEvent('Bad Request'));
    });
  }
);
