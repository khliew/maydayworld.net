import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlbumService } from '../album/album.service';
import { Album } from '../model';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  album$: Observable<Album>;
  isTitleTranslationVisible: boolean;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => { 
        console.log('songlist', params);
        return this.albumService.getAlbum(params.get('albumId'));
      }
    ));
  }

  toggleTitleTranslation(): void {
    this.isTitleTranslationVisible = !this.isTitleTranslationVisible;
  }
}
