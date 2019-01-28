import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';
import { RequestCache } from '../services/request-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (!this.isCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req);

    // cache then refresh
    if (req.headers.get(RequestCache.REFRESH_HEADER)) {
      const results$ = this.sendRequest(req, next, this.cache);
      return cachedResponse ? results$.pipe(startWith(cachedResponse)) : results$;
    }

    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  isCachable(req: HttpRequest<any>) {
    return req.method === 'GET' && !req.headers.has(RequestCache.NO_CACHE_HEADER);
  }

  private sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(req, event);
        }
      })
    );
  }
}
