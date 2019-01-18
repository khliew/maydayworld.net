import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AlbumCreatorComponent } from './album/album-creator.component';
import { SongCreatorComponent } from './song/song-creator.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AlbumCreatorComponent,
    SongCreatorComponent
  ]
})
export class AdminModule { }
