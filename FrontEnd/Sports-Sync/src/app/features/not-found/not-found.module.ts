import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFound } from './not-found';

@NgModule({
  declarations: [NotFound],
  imports: [NotFoundRoutingModule, SharedModule],
})
export class NotFoundModule {}
