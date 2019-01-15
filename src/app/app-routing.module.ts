import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './admin/auth.guard';
import { AlbumsComponent } from './album/albums.component';
import { SongsComponent } from './song/songs.component';

const routes: Routes = [
  { path: 'albums', component: AlbumsComponent },
  { path: 'songs',  component: SongsComponent },
  { path: 'album', loadChildren: './album/album.module#AlbumModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuard] },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: '**', redirectTo: '/albums', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
