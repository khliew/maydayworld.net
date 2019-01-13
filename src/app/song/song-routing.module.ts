import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailComponent } from './song-detail.component';
import { SongsComponent } from './songs.component';

const songRoutes: Routes = [
  { path: 'album/:id/song/:songId', component: SongDetailComponent },
  { path: 'songs',  component: SongsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(songRoutes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
