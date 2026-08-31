import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { Home } from './home';
import { LeagueCard } from './components/league-card/league-card';
import { SportCoverageCard } from './components/sport-coverage-card/sport-coverage-card';

@NgModule({
  declarations: [Home, LeagueCard, SportCoverageCard],
  imports: [HomeRoutingModule],
})
export class HomeModule {}
