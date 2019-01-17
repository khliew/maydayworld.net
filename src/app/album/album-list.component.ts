import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Discography } from '../model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
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
