import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCache, RequestCacheWithMap } from './request-cache.service';

describe('RequestCacheWithMap', () => {
  let requestCache: RequestCacheWithMap;
  let url1;
  let url2;
  let request1;
  let request2;
  let response1;
  let response2;

  beforeEach(() => {
    jasmine.clock().install();

    requestCache = new RequestCacheWithMap();
    url1 = 'url';
    request1 = new HttpRequest('GET', url1);
    response1 = new HttpResponse();

    url2 = 'url2';
    request2 = new HttpRequest('GET', url2);
    response2 = new HttpResponse();

    jasmine.clock().mockDate(new Date());

    spyOn(Date, 'now').and.callFake(() => new Date().getTime());
    requestCache.put(request1, response1);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('#put', () => {
    it('removes expired responses', () => {
      spyOn(requestCache.cache, 'delete');

      jasmine.clock().tick(RequestCache.MAX_AGE + 1);
      requestCache.put(request2, response2);

      expect(requestCache.cache.delete).toHaveBeenCalled();
    });

    it('stores a response', () => {
      expect(requestCache.cache.get(url1)).toBeDefined();
    });
  });

  describe('#get', () => {
    it('#returns a cached response', () => {
      expect(requestCache.get(request1)).toBe(response1);
    });

    it('#returns undefined when cached response is expired', () => {
      jasmine.clock().tick(RequestCache.MAX_AGE + 1);

      expect(requestCache.get(request1)).toBe(undefined);
    });

    it('#returns undefined when no response is cached', () => {
      expect(requestCache.get(request2)).toBe(undefined);
    });
  });
});
