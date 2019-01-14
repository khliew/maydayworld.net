import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Song } from '../model';
import { SongService } from './song.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  song$: Observable<Song>;
  isTitleTranslationVisible: boolean;

  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    this.song$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.songService.getSongLyrics(params.get('songId')))
    );
  }

  toggleTitleTranslation(): void {
    this.isTitleTranslationVisible = !this.isTitleTranslationVisible;
  }
}
