import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about-us/about-us.component';
import { AlbumsComponent } from './albums/albums.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors';
import { LogInComponent } from './log-in/log-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DataService } from './services/data.service';
import { EnvironmentService } from './services/environment.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cache.service';
import { SidenavService } from './services/sidenav.service';
import { TitleService } from './services/title.service';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirestoreService } from './services/firestore.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [
    AboutUsComponent,
    AppComponent,
    AlbumsComponent,
    LogInComponent,
    PageNotFoundComponent,
    PrivacyComponent
  ],
  providers: [
    Title,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders,
    DataService,
    EnvironmentService,
    FirestoreService,
    SidenavService,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
