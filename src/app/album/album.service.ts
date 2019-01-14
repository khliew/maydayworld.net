import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Discography } from '../model';

@Injectable()
export class AlbumService {

  constructor(private http: HttpClient) { }

  getDiscography(artist: string = 'mayday'): Observable<Discography> {
    return this.http.get<Discography>(`assets/disco/${artist}.json`)
      .pipe(
        catchError(this.handleError<Discography>('getDiscography'))
      );
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`assets/albums.json`)
      .pipe(
        catchError(this.handleError<Album[]>('getAlbums'))
      );
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`assets/albums/${id}.json`)
      .pipe(
        catchError(this.handleError<Album>('getAlbums'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
