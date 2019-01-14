import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailComponent } from '../song/song-detail.component';
import { SongListComponent } from '../song/song-list.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumListComponent } from './album-list.component';

const albumRoutes: Routes = [
  {
    path: '',
    component: AlbumListComponent,
    children: [
      {
        path: ':albumId',
        component: AlbumDetailComponent
      }
    ]
  },
  {
    path: ':albumId',
    component: SongListComponent,
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
