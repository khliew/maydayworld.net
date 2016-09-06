import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Song } from './song';
import { SongService } from './song.service';

@Component({
  selector: 'songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {
  songs: Song[];

  constructor(private router: Router, private songService: SongService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs().then(songs => this.songs = songs);
  }

  onSelect(song: Song): void {
    this.router.navigate(['/song', song.id]);
  }
}
