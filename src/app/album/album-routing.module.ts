import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongDetailComponent } from '../song/song-detail.component';
import { AlbumDetailComponent } from './album-detail.component';
import { MasterDetailComponent } from './master-detail.component';
import { AlbumListComponent } from './album-list.component';
import { SongListComponent } from '../song/song-list.component';

const albumRoutes: Routes = [
  {
    path: '',
    component: MasterDetailComponent,
    children: [
      {
        path: ':albumId',
        children: [
          {
            path: '',
            component: AlbumListComponent,
            outlet: 'sidenav'
          },
          {
            path: '',
            component: AlbumDetailComponent,
          },
        ]
      },
      {
        path: ':albumId/song/:songId',
        children: [
          {
            path: '',
            component: SongListComponent,
            outlet: 'sidenav'
          },
          {
            path: '',
            component: SongDetailComponent,
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
