import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../model';
import { SidenavService } from '../services/sidenav.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album;
  trackKeys: number[];

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
        if (data.album) {
          this.album = data.album;

          this.trackKeys = Object.keys(this.album.songs) as unknown as number[];
          this.trackKeys.sort((a, b) => a - b); // sort numerically in ascending order

          this.titleService.setTitle(this.album.title.chinese.zht);
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
