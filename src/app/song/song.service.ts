import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Lyrics, SongTag } from '../model';
import { SONG_TAGS } from './test-songs';

@Injectable()
export class SongService {

  constructor(private http: HttpClient) { }

  getSongTags(): Observable<SongTag[]> {
    return of(SONG_TAGS);
  }

  getSongTag(id: string): Observable<SongTag> {
    return this.getSongTags().pipe(map((songTags: SongTag[]) => songTags.find(songTag => songTag.id === id)));
  }

  getSongLyrics(id: string): Observable<Lyrics> {
    return this.http.get<HttpResponse<Lyrics>>(`assets/lyrics/${id}.json`)
      .pipe(
        map(response => {
          return response.body;
        }),
        catchError(this.handleError<Lyrics>('getSongLyrics'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
