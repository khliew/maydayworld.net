import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SongTag } from '../model';
import { SongService } from './song.service';

@Component({
  selector: 'songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {
  songTags: SongTag[];

  constructor(private router: Router, private songService: SongService) { }

  ngOnInit() {
    this.getSongTags();
  }

  getSongTags(): void {
    this.songService.getSongTags().then(songTags => this.songTags = songTags);
  }

  onSelect(songTag: SongTag): void {
    this.router.navigate(['/song', songTag.id]);
  }
}
