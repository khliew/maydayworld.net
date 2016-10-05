import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { SongDetailComponent } from './song-detail.component';
import { SongLyricsComponent } from './song-lyrics.component';
import { SongService }  from './song.service';
import { SongsComponent } from './songs.component';
import { songsRouting } from './songs.routing';

@NgModule({
  imports: [
    SharedModule,
    songsRouting
  ],
  declarations: [
    SongDetailComponent,
    SongLyricsComponent,
    SongsComponent
  ],
  providers: [
    SongService
  ]
})
export class SongModule { }
