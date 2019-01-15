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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { album: Album }) => {
        this.album = data.album;
      });
  }
}
