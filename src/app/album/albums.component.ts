import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Album } from '../model';

import { SONG_TAGS } from '../song/test-songs';

@Component ({
    selector: 'mdw-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): void {
    // TODO: use a service instead?
    this.albums = [
      { id: '8', name: '第二人生 Second Round', songs: null },
      { id: '9', name: '自傳 History of Tomorrow', songs: SONG_TAGS }
    ]
  }

  onSelect(album: Album): void {
    this.router.navigate(['/album', album.id]);
  }
}

/*
TODO
- create album list
 */
