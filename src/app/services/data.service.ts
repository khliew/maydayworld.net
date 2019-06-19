import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';
import { EnvironmentService } from './environment.service';
import { FirestoreService } from './firestore.service';

@Injectable()
export class DataService {
  baseUrl: string;
  fallbackUrl: string;

  constructor(private fss: FirestoreService, private http: HttpClient, environmentService: EnvironmentService) {
    this.baseUrl = environmentService.env.apiBaseUrl;
    this.fallbackUrl = environmentService.env.apiFallbackUrl;
  }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    return this.fss.getDiscography(artistId)
      .pipe(
        catchError(this.handleError<Discography>('getDiscography'))
      );
  }

  getAlbum(albumId: string, artistId: string = 'mayday'): Observable<Album> {
    return this.fss.getAlbum(albumId)
      .pipe(
        catchError(this.handleError<Album>('getAlbum'))
      );
  }

  getSong(songId: string, artistId: string = 'mayday'): Observable<Song> {
    return this.fss.getSong(songId)
      .pipe(
        catchError(this.handleError<Song>('getSong'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
