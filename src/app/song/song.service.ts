import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SongTag } from '../model';
import { Song } from '../model/song';
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

  getSongLyrics(id: string): Observable<Song> {
    return this.http.get<Song>(`assets/lyrics/${id}.json`)
      .pipe(
        catchError(this.handleError<Song>('getSongLyrics'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T); // let the app keep running by returning an empty result.
    };
  }
}
