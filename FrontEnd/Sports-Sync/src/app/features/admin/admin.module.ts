import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPage } from './admin-page';
import { AdminLogin } from './admin-login';

@NgModule({
  declarations: [AdminPage, AdminLogin],
  imports: [AdminRoutingModule, FormsModule],
})
export class AdminModule {}
