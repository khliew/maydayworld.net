import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { combineLatest } from 'rxjs';
import { Album, Song, Title } from '../../model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-album-creator',
  templateUrl: './album-creator.component.html',
  styleUrls: ['./album-creator.component.css']
})
export class AlbumCreatorComponent implements OnInit, AfterViewInit {
  tracksForm = this.fb.array([this.createTrackForm()]);
  albumForm = this.fb.group({
    albumId: [''],
    disabled: [false],
    chineseTitle: [''],
    englishTitle: [''],
    releaseDate: [{ value: '', disabled: true }],
    tracks: this.tracksForm
  });
  outputForm = this.fb.control('');
  readonly = this.fb.control(true);

  @ViewChild('albumId', { static: false }) albumId: ElementRef;

  songs: Song[];
  hideOutput: boolean;
  output: Album;
  response: string;
  buttonsDisabled: boolean;

  searchDisabled: boolean;
  searchError: string;

  originalTracks: { [trackNum: number]: string };
  addedTracks: string[];
  removedTracks: Set<string>;
  resetting: boolean;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.hideOutput = true;
    this.response = '';
    this.buttonsDisabled = false;

    this.searchDisabled = false;
    this.searchError = '';
    this.addedTracks = [];
    this.removedTracks = new Set<string>();
    this.originalTracks = {};
  }

  ngOnInit() {
    this.tracksForm.disable();

    this.adminService.getSongs()
      .subscribe(songs => {
        this.songs = songs.sort((a, b) => {
          const titleA = !!a.title.chinese.zht ? a.title.chinese.zht : a.title.english;
          const titleB = !!b.title.chinese.zht ? b.title.chinese.zht : b.title.english;
          return titleA.localeCompare(titleB, 'zh');
        });

        this.tracksForm.enable();
      });
  }

  ngAfterViewInit() {
    setTimeout(() => this.albumId.nativeElement.focus(), 10);
  }

  searchAlbum() {
    const albumId = this.albumForm.get('albumId').value;

    if (!!albumId) {
      this.searchError = '';
      this.searchDisabled = true;

      this.adminService.getAlbum(albumId)
        .subscribe(album => {
          this.searchDisabled = false;

          if (album) {
            this.clear();
            this.fillForm(album);
          } else {
            this.searchError = `Album not found: ${albumId}`;
          }
        });
    }
  }

  fillForm(album: Album) {
    this.albumForm.get('albumId').setValue(album.id);

    this.albumForm.get('disabled').setValue(typeof album.disabled !== 'undefined' ? album.disabled : false);

    const title = album.title;
    this.albumForm.get('chineseTitle').setValue(`${title.chinese.zht}\n${title.chinese.zhp}\n${title.chinese.eng}`);
    this.albumForm.get('englishTitle').setValue(title.english);

    this.albumForm.get('releaseDate').setValue(album.releaseDate);

    const trackKeys = Object.keys(album.songs);
    trackKeys.forEach(key => {
      const trackNum = Number(key);
      if (trackNum <= 0) {
        return;
      }

      while (this.tracksForm.length < trackNum) {
        this.addTrackForm(this.tracksForm.length);
      }

      const songId = album.songs[key].id;
      this.tracksForm.get(String(trackNum - 1)).setValue(songId);
      this.originalTracks[trackNum] = songId;
      this.addedTracks[trackNum - 1] = songId;
    });
  }

  clear() {
    this.albumForm.reset();
    this.response = '';
    this.searchError = '';

    this.tracksForm.clear();
    this.addTrackForm(0);

    this.addedTracks.length = 0;
    this.removedTracks.clear();
    this.originalTracks = {};

    this.hideOutput = true;
    this.readonly.setValue(true);
    this.outputForm.setValue('');

    this.albumId.nativeElement.focus();
  }

  createFormAlbum() {
    const album = new Album();
    album.id = this.albumForm.get('albumId').value;

    album.disabled = this.albumForm.get('disabled').value;

    album.title = this.parseTitle(
      this.albumForm.get('chineseTitle').value,
      this.albumForm.get('englishTitle').value
    );

    album.releaseDate = this.parseDate(this.albumForm.get('releaseDate').value);

    return album;
  }

  generateJson() {
    this.output = this.createFormAlbum();

    this.hideOutput = false;
    this.response = '';
    this.searchError = '';
    this.outputForm.setValue(JSON.stringify(this.output, null, 2));
  }

  createTrackForm() {
    const control = this.fb.control(['']);
    control.valueChanges
      .subscribe(
        value => {
          if (this.resetting) {
            return;
          }

          const index = this.tracksForm.controls.findIndex(item => item === control);

          if (index !== -1) {
            const oldValue = this.addedTracks[index];
            this.addedTracks[index] = value;

            if (!!oldValue) {
              this.removedTracks.add(oldValue);
            }

            if (!!value) {
              this.removedTracks.delete(value);
            }
          }

          // clear other track controls that has the currently selected value
          this.resetting = true;
          for (let i = 0; i < this.tracksForm.controls.length; i++) {
            const item = this.tracksForm.controls[i];
            if (item !== control && item.value === value) {
              item.reset();
              this.addedTracks[i] = '';
            }
          }
          this.resetting = false;

        }
      );
    return control;
  }

  addTrackForm(index: number) {
    this.tracksForm.insert(index, this.createTrackForm());
    this.addedTracks.push('');
  }

  removeTrackForm(index: number) {
    if (index < this.tracksForm.length && this.tracksForm.length > 1) {
      // add to removed tracks
      const control = this.tracksForm.get(String(index));
      if (!!control.value) {
        this.removedTracks.add(control.value);
      }

      this.tracksForm.removeAt(index);
      this.addedTracks.splice(index, 1);
    }
  }

  updateOriginalTracksAfterSave() {
    this.originalTracks = {};
    for (let i = 0; i < this.addedTracks.length; i++) {
      this.originalTracks[i] = this.addedTracks[i];
    }
    this.removedTracks.clear();
  }

  parseTitle(chinese: string, english: string): Title {
    const title = new Title();
    title.english = english;

    if (!!chinese) {
      const parts = chinese.split('\n');
      title.chinese = {
        zht: parts[0] && parts[0].trim(),
        zhp: parts[1] && parts[1].trim(),
        eng: parts[2] && parts[2].trim()
      };
    }

    return title;
  }

  parseDate(date: string): string {
    return moment(date).format('YYYY-MM-DD');
  }

  parseSongs(songIds: string): string[] {
    return songIds.split('\n').map(token => token.trim()).filter(token => token.length > 0);
  }

  save() {
    if (this.readonly.value) {
      this.output = this.createFormAlbum();
    } else {
      this.output = JSON.parse(this.outputForm.value);
    }

    this.response = '';
    this.buttonsDisabled = true;
    const results = [];

    results.push(this.adminService.setAlbum(this.output.id, this.output));

    const added: { trackNum: number; songId: string; }[] = [];
    for (let i = 0; i < this.addedTracks.length; i++) {
      if (!!this.addedTracks[i] && this.originalTracks[i + 1] !== this.addedTracks[i]) {
        added.push({ trackNum: i + 1, songId: this.addedTracks[i] });
      }
    }
    const original = new Set(Object.values(this.originalTracks));
    const removed = [... this.removedTracks].filter(x => original.has(x)); // removedTracks intersect originalTracks

    results.push(this.adminService.setAlbumSongs(this.output.id, added, removed));

    combineLatest(results)
      .subscribe(() => {
        this.response = 'Album saved!';
        this.buttonsDisabled = false;

        this.updateOriginalTracksAfterSave();
      }, err => {
        this.response = err;
        this.buttonsDisabled = false;
      });
  }
}
