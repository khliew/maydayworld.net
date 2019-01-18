import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Album, Title } from '../../model';

@Component({
  selector: 'app-album-creator',
  templateUrl: './album-creator.component.html',
  styleUrls: ['./album-creator.component.css']
})
export class AlbumCreatorComponent implements OnInit {
  albumForm = this.fb.group({
    albumId: [''],
    chineseTitle: [''],
    englishTitle: [''],
    releaseDate: [''],
    songs: ['']
  });
  outputForm = this.fb.control('');

  hideOutput: boolean;
  output: Album;

  constructor(private fb: FormBuilder) {
    this.hideOutput = true;
  }

  ngOnInit() {
    this.albumForm.get('releaseDate').disable();
  }

  generateJson() {
    console.log(this.albumForm.value);

    this.output = new Album();
    this.output.albumId = this.albumForm.get('albumId').value;
    this.output.releaseDate = this.parseDate(this.albumForm.get('releaseDate').value);

    this.output.title = this.parseTitle(
      this.albumForm.get('chineseTitle').value,
      this.albumForm.get('englishTitle').value
    );

    this.output.songIds = this.parseSongs(this.albumForm.get('songs').value);

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

  parseDate(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }

  parseSongs(songIds: string): string[] {
    return songIds.split('\n').map(token => token.trim()).filter(token => token.length > 0);
  }
}
