import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AlbumModule } from './album/album.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';

@NgModule({
  imports: [
    AlbumModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    SharedModule,
    SongModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
