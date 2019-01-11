import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Album } from '../model';

import { AlbumService } from './album.service';

@Component ({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[];

  constructor(private router: Router, private albumService: AlbumService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumService.getAlbums()
      .subscribe(albums => {
        this.albums = albums;
      });
  }

  onSelect(album: Album): void {
    this.router.navigate(['/album', album.id]);
  }
}

/*
TODO
- create album list
 */
