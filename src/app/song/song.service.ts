import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { SONG_TAGS } from './test-songs';
import { Lyrics, SongTag } from '../model';

@Injectable()
export class SongService {

  constructor (private http: Http) {}

  getSongTags(): Observable<SongTag[]> {
    return Observable.of(SONG_TAGS); // TODO: use http call?
  }

    getSongTag(id: string): Observable<SongTag> {
      return Observable.from(SONG_TAGS).filter(songTag => songTag.id === id); // TODO: use http call?
    }

  getSongLyrics(id: string): Observable<Lyrics> {
    return this.http.get('public/lyrics/' + id + '.json')
                    .map(this.extractLyricsData)
                    .catch(this.handleError);
  }

  private extractLyricsData(res: Response) {
    return res.json() || { };
  }

  private handleError (error: Response | any) {
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
