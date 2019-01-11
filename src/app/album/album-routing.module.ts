import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumsComponent } from './albums.component';

const albumRoutes: Routes = [
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: 'albums', component: AlbumsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
