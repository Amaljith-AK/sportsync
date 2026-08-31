import { NgModule } from '@angular/core';
import { ErrorPage } from './error-page/error-page';
import { TeamBadge } from './team-badge/team-badge';

/**
 * Building blocks reused across two or more feature modules. Anything
 * only used inside a single feature belongs in that feature's module.
 */
@NgModule({
  declarations: [TeamBadge, ErrorPage],
  exports: [TeamBadge, ErrorPage],
})
export class SharedModule {}
