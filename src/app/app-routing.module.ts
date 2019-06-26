import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { LogInComponent } from './log-in/log-in.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LogOutComponent } from './log-out/log-out.component';
import { AuthGuard } from './admin/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'login',
    component: LogInComponent,
    ...canActivate(redirectLoggedInTo(['admin']))
  },
  { path: 'logout', component: LogOutComponent },
  { path: 'album', loadChildren: () => import('./album/album.module').then(m => m.AlbumModule) },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    ...canActivate(redirectUnauthorizedTo(['login']))
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
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
