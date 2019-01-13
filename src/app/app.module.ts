import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumService } from './album/album.service';
import { AlbumsComponent } from './album/albums.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SongService } from './song/song.service';
import { SongsComponent } from './song/songs.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AlbumsComponent,
    SongsComponent
  ],
  providers: [
    AlbumService,
    SongService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
