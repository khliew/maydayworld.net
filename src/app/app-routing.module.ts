import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AlbumsComponent } from './albums/albums.component';
import { SongsComponent } from './songs/songs.component';
import { AuthGuard } from './admin/auth.guard';
import { LogInComponent } from './log-in/log-in.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  { path: 'albums', component: AlbumsComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'login', component: LogInComponent },
  { path: 'album', loadChildren: () => import('./album/album.module').then(m => m.AlbumModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad: [AuthGuard] },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: '**', redirectTo: '/albums', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
