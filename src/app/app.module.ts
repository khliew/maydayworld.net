import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumModule } from './album/album.module';
import { AlbumService } from './album/album.service';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';
import { SongService } from './song/song.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JsonpModule,
    AppMaterialModule,
    SharedModule,
    AlbumModule,
    SongModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AlbumService,
    SongService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
