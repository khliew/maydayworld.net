import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SongModule } from '../song/song.module';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumListComponent } from './album-list.component';
import { AlbumRoutingModule } from './album-routing.module';
import { MasterDetailComponent } from './master-detail.component';

@NgModule({
  imports: [
    SharedModule,
    SongModule,
    AlbumRoutingModule
  ],
  declarations: [
    AlbumDetailComponent,
    AlbumListComponent,
    MasterDetailComponent
  ]
})
export class AlbumModule { }
