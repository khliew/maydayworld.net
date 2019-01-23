import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us/about-us.component';
import { AlbumsComponent } from './album/albums.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestCache, RequestCacheWithMap } from './cache/request-cache.service';
import { DataService } from './data.service';
import { httpInterceptorProviders } from './http-interceptors';
import { LogInComponent } from './log-in/log-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SidenavService } from './service/sidenav.service';
import { SharedModule } from './shared/shared.module';
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
    AboutUsComponent,
    AppComponent,
    AlbumsComponent,
    LogInComponent,
    PageNotFoundComponent,
    PrivacyComponent,
    SongsComponent
  ],
  providers: [
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders,
    SidenavService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
