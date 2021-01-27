import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export const skipCacheHandling = {skipCache: 'skipCache'};

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private readonly cachedData = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cacheKey = CacheKey.from(req);
    const skipCache = req.headers.has(skipCacheHandling.skipCache);
    if (!skipCache && this.cachedData.get(cacheKey)) {
      return of(this.cachedData.get(cacheKey).clone());
    }

    const actualRequest = req.clone({headers: req.headers.delete(skipCacheHandling.skipCache)});
    return next.handle(actualRequest).pipe(tap(httpEvent => {
      if (httpEvent instanceof HttpResponse) {
        this.cachedData.set(cacheKey, httpEvent.clone());
      }
    }));
  }
}

class CacheKey {

  public static from(req: HttpRequest<any>): string {
    return req.urlWithParams + req.serializeBody();
  }
}
