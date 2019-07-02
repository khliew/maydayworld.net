import { Component, OnInit, OnDestroy } from '@angular/core';
import { Discography } from '../model';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  discoSub: Subscription;
  discography: Discography;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.discoSub = this.dataService.getDiscography()
      .subscribe(
        discography => this.discography = discography
      );
  }

  ngOnDestroy(): void {
    this.discoSub.unsubscribe();
  }
}
