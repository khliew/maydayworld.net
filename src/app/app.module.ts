import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SongsComponent } from './songs.component';
import { SongDetailComponent } from './song-detail.component';
import { SongService }  from './song.service';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent
  ],
  providers: [
    SongService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
