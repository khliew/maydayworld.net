import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private titleService: TitleService,
    private router: Router,
    private route: ActivatedRoute,
    private sidenavService: SidenavService
  ) {
    this.sidenavService.setEnabled(true);
  }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        if (data.song) {
          this.song = data.song;
          this.titleService.setTitle(this.song.title.chinese.zht);
        } else {
          this.router.navigate(['../../../'], { relativeTo: this.route });
        }
      });
  }
}
