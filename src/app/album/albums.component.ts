import { Component, OnInit } from '@angular/core';
import { Album } from '../model';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[];

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums(): void {
    this.albumService.getAlbums()
      .subscribe(albums => {
        this.albums = albums;
      }, error => console.log(error));
  }
}
