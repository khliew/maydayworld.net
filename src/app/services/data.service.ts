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
        catchError(() => this.getDiscography2(artistId))
      );
  }

  /** @deprecated */
  getDiscography2(artistId: string = 'mayday'): Observable<Discography> {
    return this.http.get<any>(`${this.fallbackUrl}/disco/${artistId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Discography>('getDiscography'))
      );
  }

  getAlbum(albumId: string, artistId: string = 'mayday'): Observable<Album> {
    return this.http.get<any>(`${this.baseUrl}/${artistId}/albums/${albumId}.json`)
      .pipe(
        catchError(() => this.getAlbum2(albumId))
      );
  }

  /** @deprecated */
  getAlbum2(albumId: string): Observable<Album> {
    return this.http.get<any>(`${this.fallbackUrl}/albums/${albumId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Album>('getAlbum'))
      );
  }

  getSong(songId: string, artistId: string = 'mayday'): Observable<Song> {
    return this.http.get<any>(`${this.baseUrl}/${artistId}/songs/${songId}.json`)
      .pipe(
        catchError(() => this.getSong2(songId))
      );
  }

  /** @deprecated */
  getSong2(songId: string): Observable<Song> {
    return this.http.get<any>(`${this.fallbackUrl}/songs/${songId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<Song>('getSongLyrics'))
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
