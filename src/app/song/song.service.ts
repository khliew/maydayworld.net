import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Lyrics, SongTag } from '../model';
import { SONG_TAGS } from './test-songs';

@Injectable()
export class SongService {

  constructor(private http: Http) { }

  getSongTags(): Observable<SongTag[]> {
    return of(SONG_TAGS);
  }

  getSongTag(id: string): Observable<SongTag> {
    return this.getSongTags().pipe(map((songTags: SongTag[]) => songTags.find(songTag => songTag.id === id)));
  }

  getSongLyrics(id: string): Observable<Lyrics> {
    return this.http.get('public/lyrics/' + id + '.json')
      .pipe(
        map(response => response.json()),
        catchError(this.handleError)
      );
  }

  private extractLyricsData(res: Response) {
    return res.json() || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
