import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from './song.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  constructor(private router: Router, private songService: SongService) { }

  ngOnInit() {
  }
}
