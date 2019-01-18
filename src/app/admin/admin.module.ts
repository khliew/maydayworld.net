import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SongCreatorComponent } from './song/song-creator.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    SongCreatorComponent
  ]
})
export class AdminModule { }
