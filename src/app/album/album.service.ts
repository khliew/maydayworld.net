import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

import { ALBUMS } from './test-albums';
import { Album, SongTag } from '../model';

@Injectable()
export class AlbumService {

  constructor (private http: Http) {}

  getAlbums(): Observable<Album[]> {
    return Observable.of(ALBUMS); // TODO: use http call?
  }

  getAlbum(id: string): Observable<Album> {
    return Observable.from(ALBUMS).filter(album => album.id === id); // TODO: use http call?
  }
}
