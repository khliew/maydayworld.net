import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { Album, Title } from '../../model';
import { AdminService } from '../admin.service';

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
  response: string;
  buttonsDisabled: boolean;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.hideOutput = true;
    this.response = '';
    this.buttonsDisabled = false;
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

  createAlbum() {
    this.response = '';
    this.buttonsDisabled = true;
    this.adminService.createAlbum(this.output)
      .subscribe(res => {
        this.response = 'Album created!';
        this.buttonsDisabled = false;
      }, err => {
        console.log('err', err);
        this.response = err;
        this.buttonsDisabled = false;
      });
  }

  replaceAlbum() {
    this.response = '';
    this.buttonsDisabled = true;
    this.adminService.replaceAlbum(this.output)
      .subscribe(res => {
        console.log('res', res);
        this.response = 'Album replaced!';
        this.buttonsDisabled = false;
      }, err => {
        console.log('err', err);
        this.response = err;
        this.buttonsDisabled = false;
      });
  }
}
