import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Lyrics, SongTag } from '../model';
import { SongService } from './song.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  errorMessage: string;
  lyrics: Lyrics;
  songTag: SongTag;

  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.songService.getSongTag(id)
        .subscribe(songTag => this.songTag = songTag);
      this.songService.getSongLyrics(id)
        .subscribe(
          lyrics => this.lyrics = lyrics,
          error => this.errorMessage = <any>error);
    });
  }
}
