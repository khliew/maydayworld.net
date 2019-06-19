import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';
import { EnvironmentService } from '../services/environment.service';
import { RequestCache } from '../services/request-cache.service';
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AdminService {
  baseUrl: string;

  constructor(
    private fss: FirestoreService,
    private afs: AngularFirestore,
    private http: HttpClient,
    environmentService: EnvironmentService
  ) {
    this.baseUrl = environmentService.env.apiBaseUrl;
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<any>(`${this.baseUrl}/albums/${album.id}`, album, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  getSong(songId: string): Observable<Song> {
    return this.fss.getSong(songId);
  }

  setSong(songId: string, song: Song): Observable<void> {
    return from(this.afs.doc<Song>(`songs/${songId}`).set(JSON.parse(JSON.stringify(song))));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error); // log to console instead
    return throwError(error.error.error.message); // return message
  }
}
