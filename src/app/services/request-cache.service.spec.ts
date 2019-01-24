import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCacheWithMap } from './request-cache.service';

describe('RequestCacheWithMap', () => {
  let requestCache: RequestCacheWithMap;
  let url;
  let request;
  let response;

  beforeEach(() => {
    requestCache = new RequestCacheWithMap();
    url = 'url';
    request = new HttpRequest('GET', url);
    response = new HttpResponse();

    requestCache.put(request, response);
  });

  it('#put stores a response', () => {
    expect(requestCache.cache.get(url)).toBeDefined();
  });

  it('#get returns a cached response', () => {
    expect(requestCache.get(request)).toBe(response);
  });
});
