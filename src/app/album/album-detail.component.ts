import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../model';
import { AlbumService } from './album.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album;
  isTitleTranslationVisible: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('albumId');
    this.albumService.getAlbum(id).subscribe(album => {
      this.album = album;

      // navigate to first track if none is selected.
      if (this.route.snapshot.children.length === 0 && this.album.tracks.length > 0) {
        this.router.navigate(['song', this.album.tracks[0].id], { relativeTo: this.route });
      }
    });
  }

  toggleTitleTranslation(): void {
    this.isTitleTranslationVisible = !this.isTitleTranslationVisible;
  }
}
