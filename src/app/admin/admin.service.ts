import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Album, Song } from '../model';

@Injectable()
export class AdminService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  createAlbum(album: Album): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
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
      })
    };

    return this.http.put<any>(`${this.baseUrl}/albums/${album.albumId}`, album, httpOptions)
      .pipe(
        map(response => {
          console.log(response);
          return response.data;
        }),
        catchError(this.handleError)
      );
  }

  createSong(song: Song): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
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
