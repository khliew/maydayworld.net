import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../model';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song: Song;

  constructor(private route: ActivatedRoute, private sidenavService: SidenavService) {
    this.sidenavService.setEnabled(true);
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: { song: Song }) => {
        this.song = data.song;
      });
  }
}
