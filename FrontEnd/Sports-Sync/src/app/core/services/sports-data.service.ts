import { Injectable, signal } from '@angular/core';
import { MOCK_LEAGUES, NAV_SPORTS, SPORTS_COVERAGE } from '../data/mock-sports-data';
import {
  Fixture,
  FixtureStatus,
  League,
  NavSportItem,
  SportCoverageItem,
  StandingEntry,
  Team,
} from '../models/sport.models';
import { BaseService } from './base.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import {
  BackendMatch,
  BackendTeam,
  BADGE_COLORS,
  LEAGUE_CONFIGS,
  LeagueConfig,
  StandingsResponse,
} from './service.model';

/**
 * Central read model for sports data. Backed by static demo data today;
 * swap the private signals' source for an HTTP call later and every
 * consumer (all of which only read the public signals) keeps working.
 */
@Injectable({ providedIn: 'root' })
export class SportsDataService extends BaseService {
  private readonly _leagues = signal<League[]>(MOCK_LEAGUES);
  private readonly _sportsCoverage = signal<SportCoverageItem[]>(SPORTS_COVERAGE);
  private readonly _navSports = signal<NavSportItem[]>(NAV_SPORTS);
  private readonly _loadingLeagueIds = signal<ReadonlySet<string>>(
    new Set(LEAGUE_CONFIGS.map((config) => config.id)),
  );

  readonly leagues = this._leagues.asReadonly();
  readonly sportsCoverage = this._sportsCoverage.asReadonly();
  readonly navSports = this._navSports.asReadonly();

  constructor() {
    (super(), this.loadAllLeagues());
  }

  private loadAllLeagues():void{
    LEAGUE_CONFIGS.forEach(config => this.loadLeague(config))
  }


  private loadLeague(config:LeagueConfig):void{
    forkJoin({
      matches:this.get<BackendMatch[]>(`/football/matches/${config.code}`),
      standings:this.get<StandingsResponse>(`/football/standings/${config.code}`)
    }).pipe(takeUntilDestroyed()).subscribe({
      next:({matches,standings})=>{
          const league = this.buildLeague(config,matches,this.mapStandings(standings));
          this._leagues.update((leagues)=>{
            const others = leagues.filter((l)=>l.id !== league.id)
            const merged = [...others,league]
            return this.sortByConfigOrder(merged)
          })
          this.finishLoading(config.id)
      },
      error:(err)=>{
        console.error(`Failed to load ${config.name}`, err)
        this.finishLoading(config.id)
      },
    })
  }

  private finishLoading(leagueId: string): void {
    this._loadingLeagueIds.update((ids) => {
      const next = new Set(ids);
      next.delete(leagueId);
      return next;
    });
  }

  isLeagueLoading(leagueId: string): boolean {
    return this._loadingLeagueIds().has(leagueId);
  }

  private sortByConfigOrder(leagues:League[]):League[]{
    const orderMap = new Map(LEAGUE_CONFIGS.map((c,index)=>[c.id,index]))
    return [...leagues].sort((a,b)=>(orderMap.get(a.id)??0)-(orderMap.get(b.id)??0))
  }


  findLeague(leagueId: string): League | undefined {
    return this._leagues().find((league) => league.id === leagueId);
  }

  findTeam(league: League, teamId: string): Team | undefined {
    return league.teams.find((team) => team.id === teamId);
  }

  private mapStatus(status: string): FixtureStatus {
    if (status === 'FINISHED') return 'FT';
    if (status === 'IN_PLAY' || status === 'PAUSED') return 'LIVE';
    return 'UPCOMING';
  }

  private mapTeams(t: BackendTeam, index: number): Team {
    return {
      id: String(t.id),
      name: t.name,
      shortCode: t.tla ?? t.name.slice(0, 2).toUpperCase(),
      badgeClass: BADGE_COLORS[index % BADGE_COLORS.length],
      stadium: 'Unknown',
      founded: 0,
      manager: 'Unknown',
    };
  }

  private mapFixture(m: BackendMatch): Fixture {
    const status = this.mapStatus(m.status);
    const kickoff = new Date(m.utcDate);
    return {
      id: String(m.id),
      matchday: m.matchday ?? 0,
      homeTeamId: String(m.homeTeamId),
      awayTeamId: String(m.awayTeamId),
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      status,
      kickoffLabel:
        status === 'FT'
          ? 'FT'
          : kickoff
              .toLocaleString(undefined, { weekday: 'short', hour: '2-digit', minute: '2-digit' })
              .toUpperCase(),
      kickoffAt: m.utcDate,
    };
  }

  private buildLeague(config:LeagueConfig ,matches: BackendMatch[],standings:StandingEntry[]): League {
    const teamsMap = new Map<string, Team>();
    let index = 0;

    matches.forEach((m) => {
      if (!teamsMap.has(String(m.homeTeam.id))) {
        teamsMap.set(String(m.homeTeam.id), this.mapTeams(m.homeTeam, index++));
      }
      if (!teamsMap.has(String(m.awayTeam.id))) {
        teamsMap.set(String(m.awayTeam.id), this.mapTeams(m.awayTeam, index++));
      }
    });

    const matchdays = matches.map((m) => m.matchday ?? 0);

    return {
      id: config.id,
      code: config.code,
      name: config.name,
      country: config.country,
      season: this.deriveSeasonLabel(matches),
      clubCount: teamsMap.size,
      currentMatchday: matchdays.length ? Math.max(...matchdays) : 0,
      logoUrl: config.logoUrl,
      teams: Array.from(teamsMap.values()),
      standings,
      fixtures: matches.map((m) => this.mapFixture(m)),
    };
  }

  private mapStandings(res: StandingsResponse): StandingEntry[] {
    const totalTable = res.standings.find((s) => s.type == 'TOTAL');
    if (!totalTable) return [];

    return totalTable.table.map((row) => ({
      teamId: String(row.team.id),
      played: row.playedGames,
      won: row.won,
      drawn: row.draw,
      lost: row.lost,
      goalDifference: row.goalDifference,
      points: row.points,
    }));
  }

  private deriveSeasonLabel(matches: BackendMatch[]): string {
    if (!matches.length) return '';

    const dates = matches.map((m) => new Date(m.utcDate));
    const earliest = new Date(Math.min(...dates.map((d) => d.getTime())));

    const year = earliest.getMonth() < 7 ? earliest.getFullYear() - 1 : earliest.getFullYear();
    const nextYearShort = String((year + 1) % 100).padStart(2, '0');

    return `${year}/${nextYearShort}`;
  }
}
