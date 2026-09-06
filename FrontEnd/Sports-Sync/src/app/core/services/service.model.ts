export interface BackendTeam {
  id: number;
  name: string;
  shortName: string | null;
  tla: string | null;
  crestUrl: string | null;
  stadium: string | null;
  founded: number | null;
  manager: string | null;
}

export interface BackendPrediction {
  id: number;
  matchId: number;
  homeWinPct: number;
  drawPct: number;
  awayWinPct: number;
  computedAt: string;
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
  prediction: BackendPrediction | null;
}

export interface BackendStanding {
  id: number;
  competitionCode: string;
  season: number;
  teamId: number;
  position: number;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  team: BackendTeam;
}

export interface LeagueConfig {
  code: string;
  id: string;
  name: string;
  country: string;
  logoUrl: string;
}

export interface LiveUpdate {
  matchId: number;
  homeScore: number;
  awayScore: number;
  status: string;
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

export const SOCKET_URL = "wss://sportsync-backend-badh.onrender.com"

export const STORAGE_KEY = 'sportsync_admin_key';

