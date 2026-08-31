import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'leagues/:leagueId',
    loadChildren: () => import('./features/league-detail/league-detail.module').then((m) => m.LeagueDetailModule),
  },
  {
    path: 'server-error',
    loadChildren: () => import('./features/server-error/server-error.module').then((m) => m.ServerErrorModule),
  },
  {
    path: '**',
    loadChildren: () => import('./features/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
