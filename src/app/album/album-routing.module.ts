import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailComponent } from '../song/song-detail.component';
import { AlbumDetailComponent } from './album-detail.component';

const albumRoutes: Routes = [
  {
    path: ':albumId',
    component: AlbumDetailComponent,
    children: [
      {
        path: 'song/:songId',
        component: SongDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
