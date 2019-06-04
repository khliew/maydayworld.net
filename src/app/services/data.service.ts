import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';
import { EnvironmentService } from './environment.service';

@Injectable()
export class DataService {
  baseUrl: string;
  fallbackUrl: string;

  constructor(private http: HttpClient, environmentService: EnvironmentService) {
    this.baseUrl = environmentService.env.apiBaseUrl;
    this.fallbackUrl = environmentService.env.apiFallbackUrl;
  }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    return this.http.get<any>(`${this.baseUrl}/disco/${artistId}.json`)
      .pipe(
        catchError(this.handleError<Discography>('getDiscography'))
      );
  }

  getAlbum(albumId: string, artistId: string = 'mayday'): Observable<Album> {
    return this.http.get<any>(`${this.baseUrl}/${artistId}/albums/${albumId}.json`)
      .pipe(
        catchError(this.handleError<Album>('getAlbum'))
      );
  }

  getSong(songId: string, artistId: string = 'mayday'): Observable<Song> {
    return this.http.get<any>(`${this.baseUrl}/${artistId}/songs/${songId}.json`)
      .pipe(
        catchError(this.handleError<Song>('getSong'))
      );
  }

  /** @deprecated */
  logIn(access: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ 'X-MDW-Auth': access })
    };

    return this.http.get<any>(`${this.fallbackUrl}/login`, httpOptions)
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
