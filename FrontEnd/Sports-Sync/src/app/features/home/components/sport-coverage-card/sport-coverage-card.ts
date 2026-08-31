import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SportCoverageItem } from '../../../../core/models/sport.models';

@Component({
  selector: 'app-sport-coverage-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sport-coverage-card.html',
})
export class SportCoverageCard {
  readonly sport = input.required<SportCoverageItem>();
}
