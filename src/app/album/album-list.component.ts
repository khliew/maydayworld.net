import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Discography } from '../model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnDestroy {
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
