import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-league-detail-skeleton',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './league-detail-skeleton.html',
})
export class LeagueDetailSkeleton {
  protected readonly statBlocks = Array.from({ length: 2 });
  protected readonly tabBlocks = Array.from({ length: 3 });
  protected readonly standingsRows = Array.from({ length: 8 });
  protected readonly sidePanelBlocks = Array.from({ length: 3 });
}
