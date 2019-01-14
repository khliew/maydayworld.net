import { Component, OnInit } from '@angular/core';
import { Discography } from '../model';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
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
