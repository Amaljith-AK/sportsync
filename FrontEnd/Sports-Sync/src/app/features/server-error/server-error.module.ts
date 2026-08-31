import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ServerErrorRoutingModule } from './server-error-routing.module';
import { ServerError } from './server-error';

@NgModule({
  declarations: [ServerError],
  imports: [ServerErrorRoutingModule, SharedModule],
})
export class ServerErrorModule {}
