import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../model';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album;

  constructor(private route: ActivatedRoute, private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setEnabled(true);

    this.route.data
      .subscribe(data => {
        this.album = data.album;
      });
  }
}
