import { Injectable } from '@angular/core';

import { SONG_LYRICS, SONG_TAGS } from './test-songs';
import { Lyrics, SongTag } from '../model';

@Injectable()
export class SongService {

  getSongTags(): Promise<SongTag[]> {
    return Promise.resolve(SONG_TAGS);
  }

  getSongTag(id: string): Promise<SongTag> {
    return this.getSongTags()
      .then(songTags => songTags.find(songTag => songTag.id === id));
  }

  getSongLyrics(id: string): Promise<Lyrics> {
    return Promise.resolve(SONG_LYRICS)
      .then(songLyrics => songLyrics.find(lyrics => lyrics.id === id));
  }
}
