import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './album/albums.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SongsComponent } from './song/songs.component';

const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'albums', component: AlbumsComponent },
  { path: 'songs',  component: SongsComponent },
  { path: 'album', loadChildren: './album/album.module#AlbumModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // enableTracing: true, // <-- debugging purposes only
      // preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
