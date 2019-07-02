import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../model';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  album: Album;
  trackKeys: number[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        if (!!data.album) {
          this.album = data.album;

          this.trackKeys = Object.keys(this.album.songs) as unknown as number[];
          this.trackKeys.sort((a, b) => a - b); // sort numerically in ascending order
        }
      });
  }
}
