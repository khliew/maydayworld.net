import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album } from '../model';

@Injectable()
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`assets/albums.json`)
      .pipe(
        catchError(this.handleError<Album[]>('getAlbums'))
      );
  }

  getAlbum(id: string): Observable<Album> {
    return this.getAlbums().pipe(map((albums: Album[]) => albums.find(album => album.id === id)));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
