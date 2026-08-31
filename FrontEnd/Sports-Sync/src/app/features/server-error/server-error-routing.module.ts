import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerError } from './server-error';

const routes: Routes = [{ path: '', component: ServerError, title: 'SportSync · Server Issue' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServerErrorRoutingModule {}
