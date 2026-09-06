import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatchPrediction, Team } from '../../core/models/sport.models';

export type WinProbabilityData = MatchPrediction;

@Component({
  selector: 'app-win-probability',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './win-probability.html',
})
export class WinProbability {
  readonly homeTeam = input<Team | undefined>(undefined);
  readonly awayTeam = input<Team | undefined>(undefined);
  readonly probability = input.required<WinProbabilityData>();
}
