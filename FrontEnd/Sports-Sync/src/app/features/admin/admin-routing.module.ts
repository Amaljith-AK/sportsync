import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin-page';
import { AdminLogin } from './admin-login';
import { adminAuthGuard } from './admin-auth.guard';

const routes: Routes = [
  { path: '', component: AdminPage, canActivate: [adminAuthGuard] },
  { path: 'login', component: AdminLogin },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
