import { Component, OnInit } from '@angular/core';
import { Discography } from '../model';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  discography: Discography;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.getDiscography();
  }

  getDiscography(): void {
    this.albumService.getDiscography()
      .subscribe(
        discography => this.discography = discography,
        error => console.log(error)
      );
  }
}
