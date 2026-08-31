import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SportsDataService } from '../../core/services/sports-data.service';

@Component({
  selector: 'app-home',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  private readonly data = inject(SportsDataService);

  protected readonly leagues = this.data.leagues;
  protected readonly sportsCoverage = this.data.sportsCoverage;
}
