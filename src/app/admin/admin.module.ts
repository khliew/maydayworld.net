import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { AlbumCreatorComponent } from './album/album-creator.component';
import { SongCreatorComponent } from './song/song-creator.component';
import { DiscographyCreatorComponent } from './discography/discography-creator.component';

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
    DiscographyCreatorComponent,
    SongCreatorComponent
  ],
  providers: [
    AdminService
  ],
})
export class AdminModule { }
