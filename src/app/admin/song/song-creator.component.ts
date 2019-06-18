import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Line, Song, Title } from '../../model';
import { LyricsParser } from './lyrics-parser';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-song-creator',
  templateUrl: './song-creator.component.html',
  styleUrls: ['./song-creator.component.css']
})
export class SongCreatorComponent implements OnInit {
  songForm = this.fb.group({
    songId: [''],
    chineseTitle: [''],
    englishTitle: [''],
    lyricist: [''],
    composer: [''],
    arranger: [''],
    lyrics: ['']
  });
  outputForm = this.fb.control('');
  accessForm = this.fb.control('');

  lyricsParser: LyricsParser;
  hideOutput: boolean;
  output: Song;
  response: string;
  buttonsDisabled: boolean;

  searchDisabled: boolean;
  searchError: string;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.lyricsParser = new LyricsParser();
    this.hideOutput = true;
    this.response = '';
    this.buttonsDisabled = false;

    this.searchDisabled = false;
    this.searchError = '';
  }

  ngOnInit() { }

  searchSong() {
    const songId = this.songForm.get('songId').value;

    if (!!songId) {
      this.searchError = '';
      this.searchDisabled = true;

      this.adminService.getSong(songId)
        .subscribe(song => {
          this.searchDisabled = false;
          this.fillForm(song);
        }, err => {
          this.searchDisabled = false;
          this.searchError = err;
        });
    }
  }

  fillForm(song: Song) {
    this.songForm.get('songId').setValue(song.id);

    const title = song.title;
    this.songForm.get('chineseTitle').setValue(`${title.chinese.zht}\n${title.chinese.zhp}\n${title.chinese.eng}`);
    this.songForm.get('englishTitle').setValue(title.english);

    this.songForm.get('lyricist').setValue(song.lyricist);
    this.songForm.get('composer').setValue(song.composer);
    this.songForm.get('arranger').setValue(song.arranger);

    const lyrics = song.lyrics
      .map(line => {
        switch (line.type) {
          case 'lyric': {
            return `L\n${line.zht}\n${line.zhp}\n${line.eng}\n`;
          }
          case 'break': {
            return 'B\n\n';
          }
          case 'text': {
            return `T\n${line.text}\n`;
          }
        }
      })
      .join('\n');
    this.songForm.get('lyrics').setValue(lyrics);
  }

  clear() {
    this.songForm.reset();
    this.response = '';
    this.searchError = '';
  }

  generateJson() {
    this.output = new Song();
    this.output.id = this.songForm.get('songId').value;
    this.output.lyricist = this.songForm.get('lyricist').value;
    this.output.composer = this.songForm.get('composer').value;
    this.output.arranger = this.songForm.get('arranger').value;

    this.output.title = this.parseTitle(
      this.songForm.get('chineseTitle').value,
      this.songForm.get('englishTitle').value
    );

    this.output.lyrics = this.parseLyrics(this.songForm.get('lyrics').value);

    this.hideOutput = false;
    this.response = '';
    this.searchError = '';
    this.outputForm.setValue(JSON.stringify(this.output, null, 2));
  }

  parseTitle(chinese: string, english: string): Title {
    const title = new Title();
    title.english = english;

    const parts = chinese.split('\n');
    title.chinese = {
      zht: parts[0] && parts[0].trim(),
      zhp: parts[1] && parts[1].trim(),
      eng: parts[2] && parts[2].trim()
    };

    return title;
  }

  parseLyrics(lyrics: string): Line[] {
    return this.lyricsParser.parse(lyrics);
  }

  createSong() {
    this.adminService.setAccess(this.accessForm.value);

    this.response = '';
    this.buttonsDisabled = true;
    this.adminService.createSong(this.output)
      .subscribe(res => {
        this.response = 'Song created!';
        this.buttonsDisabled = false;
      }, err => {
        this.response = err;
        this.buttonsDisabled = false;
      });
  }

  replaceSong() {
    this.adminService.setAccess(this.accessForm.value);

    this.response = '';
    this.buttonsDisabled = true;
    this.adminService.replaceSong(this.output)
      .subscribe(res => {
        this.response = 'Song replaced!';
        this.buttonsDisabled = false;
      }, err => {
        this.response = err;
        this.buttonsDisabled = false;
      });
  }
}
