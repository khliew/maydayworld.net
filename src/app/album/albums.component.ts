import { Component, OnInit } from '@angular/core';
import { Discography } from '../model';
import { DataService } from '../data.service';
import { SidenavService } from '../service/sidenav.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  discography: Discography;

  constructor(private dataService: DataService, private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.sidenavService.setOpen(false);
    
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
