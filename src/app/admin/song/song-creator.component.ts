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

  lyricsParser: LyricsParser;
  hideOutput: boolean;
  output: Song;
  response: string;
  buttonsDisabled: boolean;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.lyricsParser = new LyricsParser();
    this.hideOutput = true;
    this.response = '';
    this.buttonsDisabled = false;
  }

  ngOnInit() { }

  clear() {
    this.songForm.reset();
  }

  generateJson() {
    this.output = new Song();
    this.output.songId = this.songForm.get('songId').value;
    this.output.lyricist = this.songForm.get('lyricist').value;
    this.output.composer = this.songForm.get('composer').value;
    this.output.arranger = this.songForm.get('arranger').value;

    this.output.title = this.parseTitle(
      this.songForm.get('chineseTitle').value,
      this.songForm.get('englishTitle').value
    );

    this.output.lyrics = this.parseLyrics(this.songForm.get('lyrics').value);

    this.hideOutput = false;
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
