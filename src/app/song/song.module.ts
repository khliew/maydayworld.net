import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SongDetailComponent } from './song-detail.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
  ],
  declarations: [
    SongDetailComponent
  ]
})
export class SongModule { }
