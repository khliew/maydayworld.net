import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../model';
import { SidenavService } from '../services/sidenav.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {
  song: Song;

  constructor(private titleService: TitleService, private route: ActivatedRoute, private sidenavService: SidenavService) {
    this.sidenavService.setEnabled(true);
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        this.song = data.song;

        this.titleService.setTitle(this.song.title.chinese.zht);
      });
  }
}
