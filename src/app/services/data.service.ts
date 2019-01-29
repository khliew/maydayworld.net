import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';
import { EnvironmentService } from './environment.service';

@Injectable()
export class DataService {
  baseUrl: string;

  constructor(private http: HttpClient, environmentService: EnvironmentService) {
    this.baseUrl = environmentService.env.apiBaseUrl;
  }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    return this.http.get<any>(`${this.baseUrl}/disco/${artistId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Discography>('getDiscography'))
      );
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.http.get<any>(`${this.baseUrl}/albums/${albumId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Album>('getAlbum'))
      );
  }

  getSong(songId: string): Observable<Song> {
    return this.http.get<any>(`${this.baseUrl}/songs/${songId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Song>('getSongLyrics'))
      );
  }

  logIn(access: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-MDW-Auth': access })
    };

    return this.http.get<any>(`${this.baseUrl}/login`, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<boolean>('logIn', false))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
