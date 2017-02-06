import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Album, SongTag } from '../model';
import { AlbumService } from './album.service';

@Component({
  selector: 'mdw-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  errorMessage: string;
  album: Album;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.albumService.getAlbum(id)
        .subscribe(album => this.album = album);
    });
  }
}
