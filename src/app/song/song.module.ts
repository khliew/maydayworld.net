import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared/shared.module';
import { SongDetailComponent } from './song-detail.component';
import { SongListComponent } from './song-list.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
  ],
  declarations: [
    BreadcrumbComponent,
    SongDetailComponent,
    SongListComponent
  ]
})
export class SongModule { }
