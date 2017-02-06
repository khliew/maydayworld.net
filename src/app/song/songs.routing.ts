import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongDetailComponent } from './song-detail.component';
import { SongsComponent } from './songs.component';

const songsRoutes: Routes = [
  { path: 'song/:id', component: SongDetailComponent },
  { path: 'songs',  component: SongsComponent }
];

export const songsRouting: ModuleWithProviders = RouterModule.forChild(songsRoutes);
