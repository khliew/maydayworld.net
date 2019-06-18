import { HttpErrorResponse } from '@angular/common/http';
import { Album, Discography, Song } from '../model';
import { asyncData, asyncError } from '../../testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: { get: jasmine.Spy };
  let environmentService;

  beforeEach(() => {
    environmentService = {
      env: { apiBaseUrl: 'api-base-url' }
    };
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new DataService(httpClientSpy as any, environmentService);
  });

  describe('#getDiscography', () => {
    it('should return expected discography', (done: DoneFn) => {
      const expectedDisco: Discography = {
        artistId: 'id', sections: [{ label: 'label', albums: [] }]
      };

      httpClientSpy.get.and.returnValue(asyncData({ data: expectedDisco }));

      service.getDiscography('id').subscribe(
        disco => {
          expect(disco).toEqual(expectedDisco);
          done();
        },
        fail
      );
    });

    it('should return undefined when the server returns a 404', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      service.getDiscography('id').subscribe(
        disco => {
          expect(disco).toEqual(undefined);
          done();
        },
        fail
      );
    });
  });

  describe('#getAlbum', () => {
    it('should return expected album', (done: DoneFn) => {
      const expectedAlbum: Album = {
        albumId: 'id',
        title: { chinese: { zht: 'title', zhp: 'pinyin', eng: 'eng' }, english: 'english' },
        songs: []
      };

      httpClientSpy.get.and.returnValue(asyncData({ data: expectedAlbum }));

      service.getAlbum('id').subscribe(
        album => {
          expect(album).toEqual(expectedAlbum);
          done();
        },
        fail
      );
    });

    it('should return undefined when the server returns a 404', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      service.getAlbum('id').subscribe(
        album => {
          expect(album).toEqual(undefined);
          done();
        },
        fail
      );
    });
  });

  describe('#getSong', () => {
    it('should return expected song', (done: DoneFn) => {
      const expectedSong: Song = {
        songId: 'id',
        title: { chinese: { zht: 'title', zhp: 'pinyin', eng: 'eng' }, english: 'english' },
        lyrics: []
      };

      httpClientSpy.get.and.returnValue(asyncData({ data: expectedSong }));

      service.getSong('id').subscribe(
        song => {
          expect(song).toEqual(expectedSong);
          done();
        },
        fail
      );
    });

    it('should return undefined when the server returns a 404', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      service.getSong('id').subscribe(
        song => {
          expect(song).toEqual(undefined);
          done();
        },
        fail
      );
    });
  });

  describe('#logIn', () => {
    it('should return a boolean', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(asyncData({ data: true }));

      service.logIn('access').subscribe(
        result => {
          expect(result).toEqual(true);
          done();
        },
        fail
      );
    });

    it('should return false when the server returns a 404', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found'
      });

      httpClientSpy.get.and.returnValue(asyncError(errorResponse));

      service.logIn('access').subscribe(
        result => {
          expect(result).toEqual(false);
          done();
        },
        fail
      );
    });
  });
});
