export interface Team {
  id: string;
  name: string;
  shortCode: string;
  badgeClass: string;
  crestUrl: string | null;
  stadium: string;
  founded: number;
  manager: string;
}

export interface StandingEntry {
  teamId: string;
  teamCrest: string | null;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
  points: number;
}

export type FixtureStatus = 'FT' | 'UPCOMING' | 'LIVE';

export interface MatchPrediction {
  id: number;
  matchId: number;
  homeWinPct: number;
  drawPct: number;
  awayWinPct: number;
  computedAt: string;
}

export interface Fixture {
  id: string;
  matchday: number;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: FixtureStatus;
  kickoffLabel: string;
  kickoffAt: string;
  prediction: MatchPrediction | null;
}

export interface League {
  id: string;
  code: string;
  name: string;
  country: string;
  season: string;
  clubCount: number;
  currentMatchday: number;
  logoUrl: string;
  teams: Team[];
  standings: StandingEntry[];
  fixtures: Fixture[];
}

export type CoverageStatus = 'live' | 'soon';

export interface SportCoverageItem {
  id: string;
  name: string;
  status: CoverageStatus;
  description: string;
}

export interface NavSportItem {
  id: string;
  label: string;
  status: CoverageStatus;
  route: string | null;
}
