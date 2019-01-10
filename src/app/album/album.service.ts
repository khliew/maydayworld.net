import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../model';
import { ALBUMS } from './test-albums';

@Injectable()
export class AlbumService {

  constructor (private http: Http) {}

  getAlbums(): Observable<Album[]> {
    return of(ALBUMS);
  }

  getAlbum(id: string): Observable<Album> {
    return this.getAlbums().pipe(map((albums: Album[]) => albums.find(album => album.id === id)));
  }
}
