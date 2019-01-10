import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AlbumDetailComponent } from './album-detail.component';
import { AlbumService } from './album.service';
import { AlbumsComponent } from './albums.component';
import { albumsRouting } from './albums.routing';

@NgModule({
  imports: [
    albumsRouting,
    SharedModule
  ],
  declarations: [
    AlbumDetailComponent,
    AlbumsComponent
  ],
  providers: [
    AlbumService
  ]
})
export class AlbumModule { }
