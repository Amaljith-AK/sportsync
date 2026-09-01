export interface BackendTeam {
  id: number;
  name: string;
  shortName: string | null;
  tla: string | null;
  crestUrl: string | null;
}

export interface BackendMatch {
  id: number;
  competitionCode: string;
  season: number;
  matchday: number | null;
  utcDate: string;
  status: string;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number | null;
  awayScore: number | null;
  winner: string | null;
  homeTeam: BackendTeam;
  awayTeam: BackendTeam;
}

export interface StandingsResponse {
  standings: {
    type: string;
    table: {
      team: { id: number; name: string };
      playedGames: number;
      won: number;
      draw: number;
      lost: number;
      goalDifference: number;
      points: number;
    }[];
  }[];
}

export interface LeagueConfig {
  code: string;
  id: string;
  name: string;
  country: string;
  logoUrl: string;
}

/**
 *! Add for new league if needed
 *! BE changes in file scheduler.ts to add new league code in key "COMPETITIONS"
 */
export const LEAGUE_CONFIGS: LeagueConfig[] = [
  {
    code: 'PL',
    id: 'premier-league',
    name: 'Premier League',
    country: 'England',
    logoUrl: 'assets/leagues/premier-league.png',
  },
  {
    code: 'PD',
    id: 'la-liga',
    name: 'La Liga',
    country: 'Spain',
    logoUrl: 'assets/leagues/la-liga.png',
  },
  {
    code: 'BL1',
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Germany',
    logoUrl: 'assets/leagues/bundesliga.png',
  },
  {
    code: 'SA',
    id: 'serie-a',
    name: 'Serie A',
    country: 'Italy',
    logoUrl: 'assets/leagues/serie-a.png',
  },
];

export const BADGE_COLORS = [
  'bg-sky-500',
  'bg-red-600',
  'bg-red-700',
  'bg-blue-600',
  'bg-emerald-700',
  'bg-purple-700',
  'bg-fuchsia-900',
  'bg-blue-800',
  'bg-rose-900',
  'bg-slate-700',
];


export const THEME_CLASSES = ['theme-f1']