import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Album } from '../model';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit, OnDestroy {
  paths: Path[];

  private eventsSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.paths = [];
  }

  ngOnInit() {
    this.eventsSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.createBreadcrumb(event.url);
      });

    this.route.data
      .subscribe(data => {
        console.log('app-bar route.data', data);
      });
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

  private createBreadcrumb(url: string) {
    console.log('createBreadcrumb', url);
    this.paths.length = 0;

    const album = this.getRouteAlbum();
    console.log('- album', album);
    if (!album) {
      return;
    }

    // match song url
    const tokens = url.match(/^(\/album\/\w+)(\/song\/[\w-]+)$/);
    if (!!tokens) {
      console.log('- tokens', tokens);
      this.paths.push({
        label: album.title.english,
        link: tokens[1]
      });
    }
  }

  private getRouteAlbum(): Album {
    let child = this.route.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data.album) {
        return child.snapshot.data.album;
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
