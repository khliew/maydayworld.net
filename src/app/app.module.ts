import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { SongModule } from './song/song.module';

@NgModule({
  imports: [
    BrowserModule,
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
