import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { LoadingInterceptor, longRunningRequest, spinnerTextKey } from '@core/interceptors/loading.interceptor';
import { SpinnerOverlayService } from '@core/service/spinner/spinner-overlay.service';
import { SpinnerOverlayModule } from '@shared/spinner-overlay/spinner-overlay.module';
import { noop } from 'rxjs';
import { instance, mock, verify } from 'ts-mockito';

describe('LoadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let spinner: SpinnerOverlayService;

  const TEST_API = 'test';

  beforeEach(() => {
    spinner = mock(SpinnerOverlayService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SpinnerOverlayModule
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
        {provide: SpinnerOverlayService, useFactory: () => instance(spinner)}
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show and hide the loading spinner when long running request',
    fakeAsync(() => {
      http.get(TEST_API, {headers: longRunningRequest}).subscribe(() => verify(spinner.hide()));
      tick(200);
      const testRequest = httpMock.expectOne(TEST_API);
      expect(testRequest.request.headers.has(longRunningRequest.longRun)).toBeFalsy();
      testRequest.flush({}, {status: 200, statusText: 'Ok'});
      flushMicrotasks();
      verify(spinner.show()).calledBefore(spinner.hide());
    })
  );

  it('should show and hide the loading spinner on loading error when long running request',
    fakeAsync(() => {
      http.get(TEST_API, {headers: longRunningRequest}).subscribe(() => noop(), () => verify(spinner.hide()));
      tick(200);
      const testRequest = httpMock.expectOne(TEST_API);
      expect(testRequest.request.headers.has(longRunningRequest.longRun)).toBeFalsy();
      testRequest.error(new ErrorEvent('Bad Request'));
      flushMicrotasks();
      verify(spinner.show()).calledBefore(spinner.hide());
    })
  );

  it('should not show the spinner when not longRunningRequest',
    fakeAsync(() => {
      http.get(TEST_API).subscribe();
      tick(200);
      const testRequest = httpMock.expectOne(TEST_API);
      expect(testRequest.request.headers.has(longRunningRequest.longRun)).toBeFalsy();
      testRequest.flush({}, {status: 200, statusText: 'Ok'});
      flushMicrotasks();
      verify(spinner.show()).never();
      verify(spinner.hide()).never();
    })
  );

  it('should not show the spinner when done in under 100ms',
    fakeAsync(() => {
      http.get(TEST_API, {headers: longRunningRequest}).subscribe();
      const testRequest = httpMock.expectOne(TEST_API);
      testRequest.flush({}, {status: 200, statusText: 'Ok'});
      tick(500);
      verify(spinner.show()).never();
    })
  );

  it('should set custom text when header present', () => {
    fakeAsync(() => {
      http.get(TEST_API, {headers: {[spinnerTextKey]: 'Custom Text'}}).subscribe();
      const testRequest = httpMock.expectOne(TEST_API);
      testRequest.flush({}, {status: 200, statusText: 'Ok'});
      tick(500);
      verify(spinner.setText('Custom Text')).called();
    });
  });

});
