import { Component, Input, OnInit } from '@angular/core';

import { Lyrics } from '../model';

@Component({
  selector: 'song-lyrics',
  templateUrl: './song-lyrics.component.html',
  styleUrls: ['./song-lyrics.component.css']
})
export class SongLyricsComponent implements OnInit {
  @Input() lyrics: Lyrics;

  cht: String[];
  eng: String[];
  pinyin: String[];

  ngOnInit(): void {
    this.cht = this.lyrics.cht.split('\n');
    this.eng = this.lyrics.eng.split('\n');
    this.pinyin = this.lyrics.pinyin.split('\n');
  }
}
