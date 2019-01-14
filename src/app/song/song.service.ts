import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Song } from '../model';

@Injectable()
export class SongService {

  constructor(private http: HttpClient) { }

  getSongLyrics(id: string): Observable<Song> {
    return this.http.get<Song>(`assets/songs/${id}.json`)
      .pipe(
        catchError(this.handleError<Song>('getSongLyrics'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
