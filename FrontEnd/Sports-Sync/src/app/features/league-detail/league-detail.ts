import { ChangeDetectionStrategy, Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SportsDataService } from '../../core/services/sports-data.service';

type LeagueTab = 'standings' | 'fixtures' | 'teams';

@Component({
  selector: 'app-league-detail',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './league-detail.html',
})
export class LeagueDetail implements OnInit {
  private readonly data = inject(SportsDataService);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly location = inject(Location);

  readonly leagueId = input.required<string>();

  protected readonly tabs: readonly LeagueTab[] = ['standings', 'fixtures', 'teams'];

  protected readonly activeTab = signal<LeagueTab>('standings');

  protected readonly league = computed(() => this.data.findLeague(this.leagueId()));

  protected readonly leaderName = computed(() => {
    const league = this.league();
    if (!league) return '';
    const leaderId = league.standings[0]?.teamId;
    return league.teams.find((team) => team.id === leaderId)?.name ?? '';
  });

  protected readonly recentResults = computed(() => {
    const league = this.league();
    if (!league) return [];
    return league.fixtures
      .filter((fixture) => fixture.status === 'FT')
      .sort((a, b) => b.kickoffAt.localeCompare(a.kickoffAt))
      .slice(0, 2);
  });

  protected readonly nextFixture = computed(() => {
    const league = this.league();
    if (!league) return undefined;
    return league.fixtures
      .filter((fixture) => fixture.status === 'UPCOMING')
      .sort((a, b) => a.kickoffAt.localeCompare(b.kickoffAt))[0];
  });

  constructor() {
    effect(() => {
      const league = this.league();
      this.titleService.setTitle(league ? `SportSync · ${league.name}` : 'SportSync · League Not Found');
    });
  }

  ngOnInit(): void {
    console.log(this.location.path(), 'url');
  }

  protected setTab(tab: LeagueTab): void {
    this.activeTab.set(tab);
  }

  protected goHome(): void {
    void this.router.navigate(['/']);
  }
}
