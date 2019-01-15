import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SongCreatorComponent } from './song/song-creator.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'create-song', component: SongCreatorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
