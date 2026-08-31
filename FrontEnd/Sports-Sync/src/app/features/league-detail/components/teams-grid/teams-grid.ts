import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Team } from '../../../../core/models/sport.models';

@Component({
  selector: 'app-teams-grid',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './teams-grid.html',
})
export class TeamsGrid {
  readonly teams = input.required<Team[]>();
}
