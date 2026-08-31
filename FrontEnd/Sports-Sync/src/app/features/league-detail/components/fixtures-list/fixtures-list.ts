import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Fixture, Team } from '../../../../core/models/sport.models';

interface FixtureRow extends Fixture {
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;
}

@Component({
  selector: 'app-fixtures-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fixtures-list.html',
})
export class FixturesList {
  readonly fixtures = input.required<Fixture[]>();
  readonly teams = input.required<Team[]>();

  protected readonly rows = computed<FixtureRow[]>(() => {
    const teams = this.teams();
    const find = (id: string) => teams.find((team) => team.id === id);
    return [...this.fixtures()]
      .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt))
      .map((fixture) => ({
        ...fixture,
        homeTeam: find(fixture.homeTeamId),
        awayTeam: find(fixture.awayTeamId),
      }));
  });
}
