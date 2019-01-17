import { Component, OnInit } from '@angular/core';
import { Discography } from '../model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  discography: Discography;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getDiscography();
  }

  getDiscography(): void {
    this.dataService.getDiscography()
      .subscribe(
        discography => this.discography = discography,
        error => console.log(error)
      );
  }
}
