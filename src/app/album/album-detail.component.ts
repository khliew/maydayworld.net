import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../model';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { album: Album }) => {
        this.album = data.album;
      });
  }
}
