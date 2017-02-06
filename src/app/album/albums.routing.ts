import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumDetailComponent } from './album-detail.component';
import { AlbumsComponent } from './albums.component';

const albumsRoutes: Routes = [
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: 'albums',  component: AlbumsComponent }
];

export const albumsRouting: ModuleWithProviders = RouterModule.forChild(albumsRoutes);
