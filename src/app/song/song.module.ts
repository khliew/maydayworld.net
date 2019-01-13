import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SongDetailComponent } from './song-detail.component';
import { SongLyricsComponent } from './song-lyrics.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
  ],
  declarations: [
    SongDetailComponent,
    SongLyricsComponent
  ]
})
export class SongModule { }
