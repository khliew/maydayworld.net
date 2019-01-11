import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SongDetailComponent } from './song-detail.component';
import { SongLyricsComponent } from './song-lyrics.component';
import { SongRoutingModule } from './song-routing.module';
import { SongsComponent } from './songs.component';



@NgModule({
  imports: [
    SharedModule,
    SongRoutingModule
  ],
  declarations: [
    SongDetailComponent,
    SongLyricsComponent,
    SongsComponent
  ]
})
export class SongModule { }
