import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Fixture, Team } from '../../../../core/models/sport.models';

@Component({
  selector: 'app-recent-results-panel',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recent-results-panel.html',
})
export class RecentResultsPanel {
  readonly results = input.required<Fixture[]>();
  readonly upcoming = input<Fixture | undefined>(undefined);
  readonly teams = input.required<Team[]>();

  readonly viewAllFixtures = output<void>();

  protected teamName(teamId: string): string {
    return this.teams().find((team) => team.id === teamId)?.name ?? '';
  }
}
