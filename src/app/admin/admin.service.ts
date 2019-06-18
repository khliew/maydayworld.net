import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';
import { EnvironmentService } from '../services/environment.service';
import { RequestCache } from '../services/request-cache.service';

@Injectable()
export class AdminService {
  private static readonly AUTH_HEADER = 'X-MDW-Auth';

  baseUrl: string;
  auth: string;

  constructor(private http: HttpClient, environmentService: EnvironmentService) {
    this.baseUrl = environmentService.env.apiBaseUrl;
  }

  setAccess(auth: string) {
    this.auth = auth;
  }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    const httpOptions = {
      headers: new HttpHeaders({
        [RequestCache.NO_CACHE_HEADER]: 'true'
      })
    };

    return this.http.get<any>(`${this.baseUrl}/disco/${artistId}`, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  createDiscography(discography: Discography): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [AdminService.AUTH_HEADER]: this.auth
      })
    };

    return this.http.post<any>(`${this.baseUrl}/disco`, discography, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  replaceDiscography(discography: Discography): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [AdminService.AUTH_HEADER]: this.auth
      })
    };

    return this.http.put<any>(`${this.baseUrl}/disco/${discography.id}`, discography, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  getAlbum(albumId: string): Observable<Album> {
    const httpOptions = {
      headers: new HttpHeaders({
        [RequestCache.NO_CACHE_HEADER]: 'true'
      })
    };

    return this.http.get<any>(`${this.baseUrl}/albums/${albumId}`, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  createAlbum(album: Album): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [AdminService.AUTH_HEADER]: this.auth
      })
    };

    return this.http.post<any>(`${this.baseUrl}/albums`, album, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  replaceAlbum(album: Album): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [AdminService.AUTH_HEADER]: this.auth
      })
    };

    return this.http.put<any>(`${this.baseUrl}/albums/${album.id}`, album, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  getSong(songId: string): Observable<Song> {
    const httpOptions = {
      headers: new HttpHeaders({
        [RequestCache.NO_CACHE_HEADER]: 'true'
      })
    };

    return this.http.get<any>(`${this.baseUrl}/songs/${songId}`, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  createSong(song: Song): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [AdminService.AUTH_HEADER]: this.auth
      })
    };

    return this.http.post<any>(`${this.baseUrl}/songs`, song, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  replaceSong(song: Song): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [AdminService.AUTH_HEADER]: this.auth
      })
    };

    return this.http.put<any>(`${this.baseUrl}/songs/${song.id}`, song, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error); // log to console instead
    return throwError(error.error.error.message); // return message
  }
}
