import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HausratRoutes } from '@core/service/navigation/navigation.service';
import { Observable, throwError } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, retry, switchMap } from 'rxjs/operators';
import { LoggingService } from '@core/service/logging/logging.service';

export const skipErrorHandling = {skipError: 'skipError'};

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private static readonly RETRY_TIMES = 1;

  constructor(private readonly router: Router,
              private readonly log: LoggingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has(skipErrorHandling.skipError)) {
      const actualRequest = req.clone({headers: req.headers.delete(skipErrorHandling.skipError)});
      return next.handle(actualRequest);
    } else {
      return next.handle(req).pipe(
        retry(ErrorInterceptor.RETRY_TIMES),
        catchError(err => {
          this.log.error(`Error during http call. requestUri: ${req.url}`);
          return fromPromise(this.router.navigate([HausratRoutes.absolute.fehler]))
            .pipe(switchMap(_ => throwError(err)));
        }));

    }
  }
}
