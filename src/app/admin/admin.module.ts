import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SongCreatorComponent } from './song/song-creator.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    SongCreatorComponent
  ]
})
export class AdminModule { }
