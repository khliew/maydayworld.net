import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data.service';
import { AlbumsComponent } from './album/albums.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { SongsComponent } from './song/songs.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AboutUsComponent,
    AppComponent,
    AlbumsComponent,
    LogInComponent,
    PageNotFoundComponent,
    SongsComponent
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
