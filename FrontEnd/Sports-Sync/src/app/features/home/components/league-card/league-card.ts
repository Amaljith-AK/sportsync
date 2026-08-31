import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { League } from '../../../../core/models/sport.models';

@Component({
  selector: 'app-league-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './league-card.html',
})
export class LeagueCard {
  private readonly router = inject(Router);

  readonly league = input.required<League>();

  protected open(): void {
    void this.router.navigate(['/leagues', this.league().id]);
  }
}
