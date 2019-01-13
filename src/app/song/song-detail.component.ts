import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Song } from '../model/song';
import { SongService } from './song.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song$: Observable<Song>;

  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    this.song$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.songService.getSongLyrics(params.get('songId')))
    );
  }
}
