import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SongModule } from '../song/song.module';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumListComponent } from './album-list.component';
import { AlbumRoutingModule } from './album-routing.module';

@NgModule({
  imports: [
    SharedModule,
    SongModule,
    AlbumRoutingModule
  ],
  declarations: [
    AlbumDetailComponent,
    AlbumListComponent,
  ]
})
export class AlbumModule { }
