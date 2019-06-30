import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album, Song } from '../model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  paths: Path[];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.paths = [];
  }

  ngOnInit() {
    this.createBreadcrumb(this.router.url);
  }

  ngOnDestroy() {
  }

  private createBreadcrumb(url: string) {
    console.log('createBreadcrumb', url);
    this.paths.length = 0;

    const data = this.getRouteData() as { album: Album, song: Song };
    console.log('- data', data);
    if (!data || !data.album || !data.song) {
      return;
    }

    // match song url
    const tokens = url.match(/^(\/album\/\w+)(\/song\/[\w-]+)$/);
    if (!!tokens) {
      console.log('- tokens', tokens);

      // album
      this.paths.push({
        label: data.album.title.english,
        link: tokens[1]
      });

      // song
      this.paths.push({
        label: data.song.title.english,
        link: null
      });
    }
  }

  private getRouteData() {
    let child = this.route;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data) {
        return child.snapshot.data;
      } else {
        return null;
      }
    }
  }
}

interface Path {
  label: string;
  link: string;
}
