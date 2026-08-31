import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { StandingEntry, Team } from '../../../../core/models/sport.models';

interface StandingRow extends StandingEntry {
  position: number;
  team: Team | undefined;
}

@Component({
  selector: 'app-standings-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './standings-table.html',
})
export class StandingsTable {
  readonly standings = input.required<StandingEntry[]>();
  readonly teams = input.required<Team[]>();

  protected readonly rows = computed<StandingRow[]>(() => {
    const teams = this.teams();
    return this.standings().map((entry, index) => ({
      ...entry,
      position: index + 1,
      team: teams.find((team) => team.id === entry.teamId),
    }));
  });
}
