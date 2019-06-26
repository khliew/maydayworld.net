import { Component, OnInit } from '@angular/core';
import { Discography } from '../model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  discography: Discography;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getDiscography();
  }

  getDiscography(): void {
    this.dataService.getDiscography()
      .subscribe(
        discography => this.discography = discography
      );
  }
}
