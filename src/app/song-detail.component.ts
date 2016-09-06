import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Song } from './song';
import { SongService } from './song.service';

@Component({
  selector: 'song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})

export class SongDetailComponent {
  song: Song;

  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.songService.getSong(id)
        .then(song => this.song = song);
    })
  }
}
