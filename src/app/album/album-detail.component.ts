import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Album } from '../model';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album$: Observable<Album>;
  isTitleTranslationVisible: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.albumService.getAlbum(params.get('albumId')))
    );
  }

  toggleTitleTranslation(): void {
    this.isTitleTranslationVisible = !this.isTitleTranslationVisible;
  }
}
