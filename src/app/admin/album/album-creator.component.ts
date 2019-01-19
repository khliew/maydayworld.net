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

  searchDisabled: boolean;
  searchError: string;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.hideOutput = true;
    this.response = '';
    this.buttonsDisabled = false;

    this.searchDisabled = false;
    this.searchError = '';
  }

  ngOnInit() {
    this.albumForm.get('releaseDate').disable();
  }

  searchAlbum() {
    const albumId = this.albumForm.get('albumId').value;

    if (!!albumId) {
      this.searchError = '';
      this.searchDisabled = true;

      this.adminService.getAlbum(albumId)
        .subscribe(album => {
          this.searchDisabled = false;
          this.fillForm(album);
        }, err => {
          this.searchDisabled = false;
          this.searchError = err;
        });
    }
  }

  fillForm(album: Album) {
    this.albumForm.get('albumId').setValue(album.albumId);
    this.albumForm.get('releaseDate').setValue(album.releaseDate);

    const title = album.title;
    this.albumForm.get('chineseTitle').setValue(title.chinese.zht + '\n' + title.chinese.zhp + '\n' + title.chinese.eng);
    this.albumForm.get('englishTitle').setValue(title.english);
    this.albumForm.get('songs').setValue(album.songs.map(song => song.songId).join('\n'));
  }

  clear() {
    this.albumForm.reset();
  }

  generateJson() {
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
        this.response = err;
        this.buttonsDisabled = false;
      });
  }

  replaceAlbum() {
    this.response = '';
    this.buttonsDisabled = true;
    this.adminService.replaceAlbum(this.output)
      .subscribe(res => {
        this.response = 'Album replaced!';
        this.buttonsDisabled = false;
      }, err => {
        this.response = err;
        this.buttonsDisabled = false;
      });
  }
}
