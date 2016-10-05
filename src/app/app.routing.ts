import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongsComponent } from './song/songs.component';
import { SongDetailComponent } from './song/song-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/songs',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
