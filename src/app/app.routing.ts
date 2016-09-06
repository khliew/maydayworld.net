import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsComponent } from './songs.component';
import { SongDetailComponent } from './song-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/songs',
    pathMatch: 'full'
  },
  {
    path: 'songs',
    component: SongsComponent
  },
  {
    path: 'song/:id',
    component: SongDetailComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
