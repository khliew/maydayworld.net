import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../model/song';
import { SongService } from './song.service';


@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song: Song;

  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.songService.getSongLyrics(id).subscribe(song => this.song = song);
  }
}
