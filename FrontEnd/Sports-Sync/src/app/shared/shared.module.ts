import { NgModule } from '@angular/core';
import { ErrorPage } from './error-page/error-page';
import { TeamBadge } from './team-badge/team-badge';
import { LeagueDetailSkeleton } from './league-detail-skeleton/league-detail-skeleton';
import { LoadingOverlay } from './loading-overlay/loading-overlay';

/**
 * Building blocks reused across two or more feature modules. Anything
 * only used inside a single feature belongs in that feature's module.
 */
@NgModule({
  declarations: [TeamBadge, ErrorPage, LeagueDetailSkeleton, LoadingOverlay],
  exports: [TeamBadge, ErrorPage, LeagueDetailSkeleton, LoadingOverlay],
})
export class SharedModule {}
