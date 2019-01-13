import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SongModule } from '../song/song.module';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumRoutingModule } from './album-routing.module';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    SongModule,
    AlbumRoutingModule
  ],
  declarations: [
    AlbumDetailComponent
  ]
})
export class AlbumModule { }
