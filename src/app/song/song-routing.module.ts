import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailComponent } from './song-detail.component';

const songRoutes: Routes = [
  { path: 'album/:id/song/:songId', component: SongDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(songRoutes)],
  exports: [RouterModule]
})
export class SongRoutingModule { }
