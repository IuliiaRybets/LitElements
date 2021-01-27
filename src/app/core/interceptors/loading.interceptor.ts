import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerOverlayService } from '@core/service/spinner/spinner-overlay.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';

export const longRunningRequest = {longRun: 'longRun'};
export const spinnerTextKey = 'spinnerText';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private static readonly SPINNER_DELAY = 100;
  private readonly showSpinner$ = new Subject();

  private alreadyDone: boolean;

  constructor(private readonly loaderService: SpinnerOverlayService) {
    this.showSpinner$.pipe(debounceTime(LoadingInterceptor.SPINNER_DELAY)).subscribe(() => {
      if (!this.alreadyDone) {
        this.loaderService.show();
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let actualReq = req;
    const expectedLongRun = req.headers.has(longRunningRequest.longRun);
    if (expectedLongRun) {
      const spinnerText = req.headers.has(spinnerTextKey);
      if (spinnerText) {
        this.loaderService.setText(req.headers.get(spinnerTextKey) as string);
      }

      actualReq = this.removeHeaders(req, [longRunningRequest.longRun, spinnerTextKey]);

      this.alreadyDone = false;
      this.showSpinner$.next();
    }
    return next.handle(actualReq)
      .pipe(
        finalize(() => {
          if (expectedLongRun) {
            this.alreadyDone = true;
            this.loaderService.hide();
          }
        })
      );
  }

  private removeHeaders(req: HttpRequest<any>, headerNames: string[]) {
    let actualReq = req;

    headerNames.forEach((header) => {
      actualReq = actualReq.clone({headers: actualReq.headers.delete(header)});
    });
    return actualReq;
  }
}
