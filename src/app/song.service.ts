import { Injectable } from '@angular/core';

import { Song } from './song';

@Injectable()
export class SongService {
  SONGS: Song[] = [
    {id: '2005wr', name: '溫柔 (還你自由版)'},
    {id: '2014jjl', name: '將軍令'},
    {id: '2016hldwm', name: '後來的我們'}
  ];

  getSongs(): Promise<Song[]> {
    return Promise.resolve(this.SONGS);
  }

  getSong(id: string): Promise<Song> {
    return this.getSongs()
      .then(songs => songs.find(song => song.id === id));
  }
}
