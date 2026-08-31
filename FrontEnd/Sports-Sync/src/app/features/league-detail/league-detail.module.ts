import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LeagueDetailRoutingModule } from './league-detail-routing.module';
import { LeagueDetail } from './league-detail';
import { StandingsTable } from './components/standings-table/standings-table';
import { FixturesList } from './components/fixtures-list/fixtures-list';
import { TeamsGrid } from './components/teams-grid/teams-grid';
import { RecentResultsPanel } from './components/recent-results-panel/recent-results-panel';

@NgModule({
  declarations: [LeagueDetail, StandingsTable, FixturesList, TeamsGrid, RecentResultsPanel],
  imports: [LeagueDetailRoutingModule, SharedModule],
})
export class LeagueDetailModule {}
