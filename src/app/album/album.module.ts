import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumsComponent } from './albums.component';

@NgModule({
  imports: [
    SharedModule,
    AlbumRoutingModule
  ],
  declarations: [
    AlbumDetailComponent,
    AlbumsComponent
  ]
})
export class AlbumModule { }
