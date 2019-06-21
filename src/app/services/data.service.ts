import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';
import { FirestoreCache } from './firestore-cache.service';
import { FirestoreService } from './firestore.service';

@Injectable()
export class DataService {

  constructor(private fsService: FirestoreService, private fsCache: FirestoreCache) { }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    const cached = this.fsCache.getDiscography(artistId);

    return !!cached ? of(cached) : this.fsService.getDiscography(artistId)
      .pipe(
        tap(disco => this.fsCache.putDiscography(disco)),
        catchError(this.handleError<Discography>('getDiscography'))
      );
  }

  getAlbum(albumId: string, artistId: string = 'mayday'): Observable<Album> {
    const cached = this.fsCache.getAlbum(albumId);

    return !!cached ? of(cached) : this.fsService.getAlbum(albumId)
      .pipe(
        tap(album => this.fsCache.putAlbum(album)),
        catchError(this.handleError<Album>('getAlbum'))
      );
  }

  getSong(songId: string, artistId: string = 'mayday'): Observable<Song> {
    const cached = this.fsCache.getSong(songId);

    return !!cached ? of(cached) : this.fsService.getSong(songId)
      .pipe(
        tap(song => this.fsCache.putSong(song)),
        catchError(this.handleError<Song>('getSong'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
