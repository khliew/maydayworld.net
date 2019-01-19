import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Album, Discography, Song } from '../model';

@Injectable()
export class AdminService {
  private static readonly AUTH_HEADER = 'X-MDW-Auth';

  baseUrl = environment.apiBaseUrl;
  auth: string;

  constructor(private http: HttpClient) { }

  setAuth(auth: string) {
    this.auth = auth;
  }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    return this.http.get<any>(`${this.baseUrl}/disco/${artistId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  createDiscography(discography: Discography): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        AUTH_HEADER: this.auth
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
        AUTH_HEADER: this.auth
      })
    };

    return this.http.put<any>(`${this.baseUrl}/disco/${discography.artistId}`, discography, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.http.get<any>(`${this.baseUrl}/albums/${albumId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  createAlbum(album: Album): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        AUTH_HEADER: this.auth
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
        AUTH_HEADER: this.auth
      })
    };

    return this.http.put<any>(`${this.baseUrl}/albums/${album.albumId}`, album, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  getSong(songId: string): Observable<Song> {
    return this.http.get<any>(`${this.baseUrl}/songs/${songId}`)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  createSong(song: Song): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        AUTH_HEADER: this.auth
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
        AUTH_HEADER: this.auth
      })
    };

    return this.http.put<any>(`${this.baseUrl}/songs/${song.songId}`, song, httpOptions)
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
