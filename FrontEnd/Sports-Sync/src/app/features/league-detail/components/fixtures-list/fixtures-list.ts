import { ChangeDetectionStrategy, Component, computed, HostListener, inject, input, signal } from '@angular/core';
import { Fixture, Team } from '../../../../core/models/sport.models';
import { LivePopupService } from '../../../live-popup/live-popup.service';
import { LiveUpdateService } from '../../../../core/services/live-update.service';

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
export class FixturesList{
  private readonly livePopup = inject(LivePopupService);
  private liveUpdates = inject(LiveUpdateService)

  readonly fixtures = input.required<Fixture[]>();
  readonly teams = input.required<Team[]>();
  readonly leagueName = input<string>('');

  /** Which upcoming fixture's win-probability popover is pinned open via tap (mobile has no hover). */
  protected readonly activeProbabilityId = signal<string | null>(null);

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

  protected onRowClick(fixture: FixtureRow, event: MouseEvent): void {
    if (fixture.status === 'LIVE') {
      event.stopPropagation();
      this.openLive(fixture);
      return;
    }
    // Desktop already reveals the win-probability popover on hover; tap-to-toggle
    // is only needed where hover doesn't exist, i.e. below the `sm` breakpoint.
    if (fixture.status === 'UPCOMING' && this.isSmallScreen()) {
      event.stopPropagation();
      this.toggleProbability(fixture);
    }
  }

  // Any click that wasn't handled above (a different row, or anywhere else on
  // the page) bubbles up here and closes whichever popover is pinned open.
  @HostListener('document:click')
  protected closeProbabilityPopover(): void {
    this.activeProbabilityId.set(null);
  }

  private isSmallScreen(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches;
  }

  private openLive(fixture: FixtureRow): void {
    this.liveUpdates.connect()
    this.livePopup.open({
      fixture,
      homeTeam: fixture.homeTeam,
      awayTeam: fixture.awayTeam,
      leagueName: this.leagueName(),
      score:this.getDisplayScore(fixture)
    });
  }

  /** Touch devices have no hover, so tapping an upcoming fixture pins its
   * win-probability popover open instead; tapping it again closes it. */
  private toggleProbability(fixture: FixtureRow): void {
    this.activeProbabilityId.update((id) => (id === fixture.id ? null : fixture.id));
  }


  getDisplayScore(fixture:Fixture){
    const live = this.liveUpdates.getUpdateFormMatch(Number(fixture.id));
    if(live){
      return {
        home:live.homeScore,
        away:live.awayScore,
        status:live.status
      }
    }
    return {
      home:fixture.homeScore,
      away:fixture.awayScore,
      status:fixture.status
    }
  }
}
