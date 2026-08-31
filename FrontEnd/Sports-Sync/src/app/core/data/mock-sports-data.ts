import { League, NavSportItem, SportCoverageItem, Team } from '../models/sport.models';

/**
 * Single source of demo data for the whole app. Swap this module for a real
 * API-backed service later without touching any component.
 */

const premierLeagueTeams: Team[] = [
  { id: 'man-city', name: 'Manchester City', shortCode: 'MC', badgeClass: 'bg-sky-500', stadium: 'Etihad Stadium', founded: 1880, manager: 'Pep Guardiola' },
  { id: 'arsenal', name: 'Arsenal', shortCode: 'AR', badgeClass: 'bg-red-600', stadium: 'Emirates Stadium', founded: 1886, manager: 'Mikel Arteta' },
  { id: 'liverpool', name: 'Liverpool', shortCode: 'LI', badgeClass: 'bg-red-700', stadium: 'Anfield', founded: 1892, manager: 'Arne Slot' },
  { id: 'tottenham', name: 'Tottenham', shortCode: 'TO', badgeClass: 'bg-slate-100 text-slate-900', stadium: 'Tottenham Hotspur Stadium', founded: 1882, manager: 'Ange Postecoglou' },
  { id: 'aston-villa', name: 'Aston Villa', shortCode: 'AV', badgeClass: 'bg-fuchsia-900', stadium: 'Villa Park', founded: 1874, manager: 'Unai Emery' },
  { id: 'man-united', name: 'Manchester United', shortCode: 'MU', badgeClass: 'bg-red-600', stadium: 'Old Trafford', founded: 1878, manager: 'Ruben Amorim' },
  { id: 'newcastle', name: 'Newcastle United', shortCode: 'NU', badgeClass: 'bg-neutral-900 border border-white/30', stadium: "St James' Park", founded: 1892, manager: 'Eddie Howe' },
  { id: 'chelsea', name: 'Chelsea', shortCode: 'CH', badgeClass: 'bg-blue-600', stadium: 'Stamford Bridge', founded: 1905, manager: 'Enzo Maresca' },
  { id: 'brighton', name: 'Brighton', shortCode: 'BR', badgeClass: 'bg-blue-400', stadium: 'Amex Stadium', founded: 1901, manager: 'Fabian Hürzeler' },
  { id: 'west-ham', name: 'West Ham', shortCode: 'WH', badgeClass: 'bg-rose-900', stadium: 'London Stadium', founded: 1895, manager: 'Julen Lopetegui' },
  { id: 'crystal-palace', name: 'Crystal Palace', shortCode: 'CP', badgeClass: 'bg-red-800', stadium: 'Selhurst Park', founded: 1905, manager: 'Oliver Glasner' },
  { id: 'everton', name: 'Everton', shortCode: 'EV', badgeClass: 'bg-blue-800', stadium: 'Goodison Park', founded: 1878, manager: 'David Moyes' },
  { id: 'burnley', name: 'Burnley', shortCode: 'BU', badgeClass: 'bg-purple-950', stadium: 'Turf Moor', founded: 1882, manager: 'Scott Parker' },
];

const laLigaTeams: Team[] = [
  { id: 'real-madrid', name: 'Real Madrid', shortCode: 'RM', badgeClass: 'bg-slate-100 text-slate-900', stadium: 'Santiago Bernabéu', founded: 1902, manager: 'Xabi Alonso' },
  { id: 'barcelona', name: 'Barcelona', shortCode: 'BA', badgeClass: 'bg-blue-800', stadium: 'Spotify Camp Nou', founded: 1899, manager: 'Hansi Flick' },
  { id: 'atletico-madrid', name: 'Atlético Madrid', shortCode: 'AT', badgeClass: 'bg-red-700', stadium: 'Cívitas Metropolitano', founded: 1903, manager: 'Diego Simeone' },
  { id: 'real-sociedad', name: 'Real Sociedad', shortCode: 'RS', badgeClass: 'bg-blue-500', stadium: 'Reale Arena', founded: 1909, manager: 'Imanol Alguacil' },
  { id: 'athletic-bilbao', name: 'Athletic Bilbao', shortCode: 'AB', badgeClass: 'bg-red-600', stadium: 'San Mamés', founded: 1898, manager: 'Ernesto Valverde' },
  { id: 'real-betis', name: 'Real Betis', shortCode: 'BE', badgeClass: 'bg-emerald-700', stadium: 'Benito Villamarín', founded: 1907, manager: 'Manuel Pellegrini' },
  { id: 'villarreal', name: 'Villarreal', shortCode: 'VI', badgeClass: 'bg-yellow-500 text-slate-900', stadium: 'Estadio de la Cerámica', founded: 1923, manager: 'Marcelino' },
  { id: 'girona', name: 'Girona', shortCode: 'GI', badgeClass: 'bg-red-500', stadium: 'Montilivi', founded: 1930, manager: 'Míchel' },
];

const bundesligaTeams: Team[] = [
  { id: 'bayern-munich', name: 'Bayern Munich', shortCode: 'BM', badgeClass: 'bg-red-700', stadium: 'Allianz Arena', founded: 1900, manager: 'Vincent Kompany' },
  { id: 'bayer-leverkusen', name: 'Bayer Leverkusen', shortCode: 'BL', badgeClass: 'bg-red-500', stadium: 'BayArena', founded: 1904, manager: 'Erik ten Hag' },
  { id: 'rb-leipzig', name: 'RB Leipzig', shortCode: 'RB', badgeClass: 'bg-slate-100 text-slate-900', stadium: 'Red Bull Arena', founded: 2009, manager: 'Marco Rose' },
  { id: 'dortmund', name: 'Borussia Dortmund', shortCode: 'BVB', badgeClass: 'bg-yellow-400 text-slate-900', stadium: 'Signal Iduna Park', founded: 1909, manager: 'Niko Kovač' },
  { id: 'stuttgart', name: 'VfB Stuttgart', shortCode: 'VFB', badgeClass: 'bg-red-600', stadium: 'MHPArena', founded: 1893, manager: 'Sebastian Hoeneß' },
  { id: 'frankfurt', name: 'Eintracht Frankfurt', shortCode: 'SGE', badgeClass: 'bg-red-800', stadium: 'Deutsche Bank Park', founded: 1899, manager: 'Dino Toppmöller' },
  { id: 'freiburg', name: 'SC Freiburg', shortCode: 'SCF', badgeClass: 'bg-slate-800 border border-white/30', stadium: 'Europa-Park Stadion', founded: 1904, manager: 'Julian Schuster' },
  { id: 'gladbach', name: "M'gladbach", shortCode: 'BMG', badgeClass: 'bg-emerald-800', stadium: 'Borussia-Park', founded: 1900, manager: 'Gerardo Seoane' },
];

const serieATeams: Team[] = [
  { id: 'inter-milan', name: 'Inter Milan', shortCode: 'IN', badgeClass: 'bg-blue-900', stadium: 'San Siro', founded: 1908, manager: 'Cristian Chivu' },
  { id: 'ac-milan', name: 'AC Milan', shortCode: 'MI', badgeClass: 'bg-red-600', stadium: 'San Siro', founded: 1899, manager: 'Massimiliano Allegri' },
  { id: 'juventus', name: 'Juventus', shortCode: 'JU', badgeClass: 'bg-neutral-900 border border-white/30', stadium: 'Allianz Stadium', founded: 1897, manager: 'Igor Tudor' },
  { id: 'napoli', name: 'Napoli', shortCode: 'NA', badgeClass: 'bg-sky-600', stadium: 'Diego Armando Maradona', founded: 1926, manager: 'Antonio Conte' },
  { id: 'as-roma', name: 'AS Roma', shortCode: 'RO', badgeClass: 'bg-red-800', stadium: 'Stadio Olimpico', founded: 1927, manager: 'Gian Piero Gasperini' },
  { id: 'atalanta', name: 'Atalanta', shortCode: 'AT', badgeClass: 'bg-blue-700', stadium: 'Gewiss Stadium', founded: 1907, manager: 'Raffaele Palladino' },
  { id: 'lazio', name: 'Lazio', shortCode: 'LA', badgeClass: 'bg-sky-400 text-slate-900', stadium: 'Stadio Olimpico', founded: 1900, manager: 'Maurizio Sarri' },
  { id: 'fiorentina', name: 'Fiorentina', shortCode: 'FI', badgeClass: 'bg-purple-700', stadium: 'Artemio Franchi', founded: 1926, manager: 'Paolo Vanoli' },
];

const premierLeague: League = {
  id: 'premier-league',
  code: 'ENG-1',
  name: 'Premier League',
  country: 'England',
  season: '2025/26',
  clubCount: 20,
  currentMatchday: 24,
  logoUrl: 'assets/leagues/premier-league.png',
  teams: premierLeagueTeams,
  standings: [
    { teamId: 'man-city', played: 24, won: 18, drawn: 3, lost: 3, goalDifference: 38, points: 57 },
    { teamId: 'arsenal', played: 24, won: 17, drawn: 4, lost: 3, goalDifference: 31, points: 55 },
    { teamId: 'liverpool', played: 24, won: 16, drawn: 6, lost: 2, goalDifference: 33, points: 54 },
    { teamId: 'tottenham', played: 24, won: 14, drawn: 5, lost: 5, goalDifference: 15, points: 47 },
    { teamId: 'aston-villa', played: 24, won: 14, drawn: 4, lost: 6, goalDifference: 12, points: 46 },
    { teamId: 'man-united', played: 24, won: 12, drawn: 5, lost: 7, goalDifference: 6, points: 41 },
    { teamId: 'newcastle', played: 24, won: 11, drawn: 5, lost: 8, goalDifference: 8, points: 38 },
    { teamId: 'chelsea', played: 24, won: 10, drawn: 6, lost: 8, goalDifference: 4, points: 36 },
    { teamId: 'brighton', played: 24, won: 9, drawn: 7, lost: 8, goalDifference: 1, points: 34 },
    { teamId: 'west-ham', played: 24, won: 8, drawn: 6, lost: 10, goalDifference: -9, points: 30 },
    { teamId: 'crystal-palace', played: 24, won: 7, drawn: 8, lost: 9, goalDifference: -6, points: 29 },
    { teamId: 'everton', played: 24, won: 6, drawn: 7, lost: 11, goalDifference: -12, points: 25 },
    { teamId: 'burnley', played: 24, won: 4, drawn: 5, lost: 15, goalDifference: -24, points: 17 },
  ],
  fixtures: [
    { id: 'pl-24-1', matchday: 24, homeTeamId: 'man-united', awayTeamId: 'aston-villa', homeScore: 1, awayScore: 2, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-21T15:00:00' },
    { id: 'pl-24-2', matchday: 24, homeTeamId: 'west-ham', awayTeamId: 'arsenal', homeScore: 0, awayScore: 6, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-21T15:00:00' },
    { id: 'pl-24-3', matchday: 24, homeTeamId: 'liverpool', awayTeamId: 'burnley', homeScore: 3, awayScore: 1, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-21T17:30:00' },
    { id: 'pl-24-4', matchday: 24, homeTeamId: 'man-city', awayTeamId: 'everton', homeScore: 2, awayScore: 0, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T14:00:00' },
    { id: 'pl-24-5', matchday: 24, homeTeamId: 'newcastle', awayTeamId: 'chelsea', homeScore: 2, awayScore: 2, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T16:30:00' },
    { id: 'pl-24-6', matchday: 24, homeTeamId: 'brighton', awayTeamId: 'crystal-palace', homeScore: 1, awayScore: 0, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-23T14:00:00' },
    { id: 'pl-25-1', matchday: 25, homeTeamId: 'crystal-palace', awayTeamId: 'chelsea', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'MON 20:00', kickoffAt: '2026-02-24T20:00:00' },
    { id: 'pl-25-2', matchday: 25, homeTeamId: 'tottenham', awayTeamId: 'brighton', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SAT 15:00', kickoffAt: '2026-02-28T15:00:00' },
    { id: 'pl-25-3', matchday: 25, homeTeamId: 'arsenal', awayTeamId: 'man-city', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SAT 17:30', kickoffAt: '2026-02-28T17:30:00' },
    { id: 'pl-25-4', matchday: 25, homeTeamId: 'aston-villa', awayTeamId: 'newcastle', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SUN 14:00', kickoffAt: '2026-03-01T14:00:00' },
    { id: 'pl-25-5', matchday: 25, homeTeamId: 'everton', awayTeamId: 'man-united', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SUN 16:30', kickoffAt: '2026-03-01T16:30:00' },
    { id: 'pl-25-6', matchday: 25, homeTeamId: 'burnley', awayTeamId: 'west-ham', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SUN 14:00', kickoffAt: '2026-03-01T14:00:00' },
  ],
};

const laLiga: League = {
  id: 'la-liga',
  code: 'ESP-1',
  name: 'La Liga',
  country: 'Spain',
  season: '2025/26',
  clubCount: 20,
  currentMatchday: 23,
  logoUrl: 'assets/leagues/la-liga.png',
  teams: laLigaTeams,
  standings: [
    { teamId: 'real-madrid', played: 23, won: 17, drawn: 4, lost: 2, goalDifference: 34, points: 55 },
    { teamId: 'barcelona', played: 23, won: 16, drawn: 5, lost: 2, goalDifference: 36, points: 53 },
    { teamId: 'atletico-madrid', played: 23, won: 15, drawn: 4, lost: 4, goalDifference: 22, points: 49 },
    { teamId: 'athletic-bilbao', played: 23, won: 12, drawn: 6, lost: 5, goalDifference: 14, points: 42 },
    { teamId: 'real-sociedad', played: 23, won: 10, drawn: 7, lost: 6, goalDifference: 8, points: 37 },
    { teamId: 'real-betis', played: 23, won: 9, drawn: 6, lost: 8, goalDifference: 2, points: 33 },
    { teamId: 'villarreal', played: 23, won: 8, drawn: 6, lost: 9, goalDifference: -3, points: 30 },
    { teamId: 'girona', played: 23, won: 6, drawn: 5, lost: 12, goalDifference: -14, points: 23 },
  ],
  fixtures: [
    { id: 'll-23-1', matchday: 23, homeTeamId: 'real-madrid', awayTeamId: 'girona', homeScore: 3, awayScore: 0, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-21T20:00:00' },
    { id: 'll-23-2', matchday: 23, homeTeamId: 'barcelona', awayTeamId: 'villarreal', homeScore: 2, awayScore: 2, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T18:30:00' },
    { id: 'll-23-3', matchday: 23, homeTeamId: 'atletico-madrid', awayTeamId: 'real-betis', homeScore: 1, awayScore: 0, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T21:00:00' },
    { id: 'll-23-4', matchday: 23, homeTeamId: 'athletic-bilbao', awayTeamId: 'real-sociedad', homeScore: 2, awayScore: 1, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-23T16:15:00' },
    { id: 'll-24-1', matchday: 24, homeTeamId: 'real-sociedad', awayTeamId: 'real-madrid', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SAT 21:00', kickoffAt: '2026-02-28T21:00:00' },
    { id: 'll-24-2', matchday: 24, homeTeamId: 'villarreal', awayTeamId: 'atletico-madrid', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SUN 18:30', kickoffAt: '2026-03-01T18:30:00' },
  ],
};

const bundesliga: League = {
  id: 'bundesliga',
  code: 'GER-1',
  name: 'Bundesliga',
  country: 'Germany',
  season: '2025/26',
  clubCount: 18,
  currentMatchday: 22,
  logoUrl: 'assets/leagues/bundesliga.png',
  teams: bundesligaTeams,
  standings: [
    { teamId: 'bayern-munich', played: 22, won: 18, drawn: 2, lost: 2, goalDifference: 45, points: 56 },
    { teamId: 'bayer-leverkusen', played: 22, won: 14, drawn: 5, lost: 3, goalDifference: 24, points: 47 },
    { teamId: 'rb-leipzig', played: 22, won: 13, drawn: 4, lost: 5, goalDifference: 19, points: 43 },
    { teamId: 'dortmund', played: 22, won: 11, drawn: 6, lost: 5, goalDifference: 13, points: 39 },
    { teamId: 'stuttgart', played: 22, won: 10, drawn: 5, lost: 7, goalDifference: 6, points: 35 },
    { teamId: 'frankfurt', played: 22, won: 9, drawn: 5, lost: 8, goalDifference: 1, points: 32 },
    { teamId: 'freiburg', played: 22, won: 7, drawn: 6, lost: 9, goalDifference: -5, points: 27 },
    { teamId: 'gladbach', played: 22, won: 5, drawn: 6, lost: 11, goalDifference: -16, points: 21 },
  ],
  fixtures: [
    { id: 'bl-22-1', matchday: 22, homeTeamId: 'bayern-munich', awayTeamId: 'gladbach', homeScore: 4, awayScore: 1, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-21T19:30:00' },
    { id: 'bl-22-2', matchday: 22, homeTeamId: 'bayer-leverkusen', awayTeamId: 'freiburg', homeScore: 2, awayScore: 0, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T15:30:00' },
    { id: 'bl-22-3', matchday: 22, homeTeamId: 'dortmund', awayTeamId: 'stuttgart', homeScore: 1, awayScore: 1, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T15:30:00' },
    { id: 'bl-23-1', matchday: 23, homeTeamId: 'rb-leipzig', awayTeamId: 'bayern-munich', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SAT 18:30', kickoffAt: '2026-02-28T18:30:00' },
    { id: 'bl-23-2', matchday: 23, homeTeamId: 'frankfurt', awayTeamId: 'bayer-leverkusen', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SAT 15:30', kickoffAt: '2026-02-28T15:30:00' },
  ],
};

const serieA: League = {
  id: 'serie-a',
  code: 'ITA-1',
  name: 'Serie A',
  country: 'Italy',
  season: '2025/26',
  clubCount: 20,
  currentMatchday: 24,
  logoUrl: 'assets/leagues/serie-a.png',
  teams: serieATeams,
  standings: [
    { teamId: 'inter-milan', played: 24, won: 17, drawn: 4, lost: 3, goalDifference: 30, points: 55 },
    { teamId: 'napoli', played: 24, won: 16, drawn: 5, lost: 3, goalDifference: 26, points: 53 },
    { teamId: 'ac-milan', played: 24, won: 14, drawn: 6, lost: 4, goalDifference: 18, points: 48 },
    { teamId: 'atalanta', played: 24, won: 13, drawn: 6, lost: 5, goalDifference: 17, points: 45 },
    { teamId: 'juventus', played: 24, won: 11, drawn: 8, lost: 5, goalDifference: 10, points: 41 },
    { teamId: 'as-roma', played: 24, won: 10, drawn: 6, lost: 8, goalDifference: 3, points: 36 },
    { teamId: 'lazio', played: 24, won: 8, drawn: 7, lost: 9, goalDifference: -4, points: 31 },
    { teamId: 'fiorentina', played: 24, won: 6, drawn: 8, lost: 10, goalDifference: -9, points: 26 },
  ],
  fixtures: [
    { id: 'sa-24-1', matchday: 24, homeTeamId: 'inter-milan', awayTeamId: 'fiorentina', homeScore: 3, awayScore: 1, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-21T20:45:00' },
    { id: 'sa-24-2', matchday: 24, homeTeamId: 'napoli', awayTeamId: 'lazio', homeScore: 2, awayScore: 0, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T18:00:00' },
    { id: 'sa-24-3', matchday: 24, homeTeamId: 'ac-milan', awayTeamId: 'as-roma', homeScore: 1, awayScore: 1, status: 'FT', kickoffLabel: 'FT', kickoffAt: '2026-02-22T20:45:00' },
    { id: 'sa-25-1', matchday: 25, homeTeamId: 'juventus', awayTeamId: 'inter-milan', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SUN 20:45', kickoffAt: '2026-03-01T20:45:00' },
    { id: 'sa-25-2', matchday: 25, homeTeamId: 'atalanta', awayTeamId: 'napoli', homeScore: null, awayScore: null, status: 'UPCOMING', kickoffLabel: 'SAT 18:00', kickoffAt: '2026-02-28T18:00:00' },
  ],
};

export const MOCK_LEAGUES: League[] = [premierLeague, laLiga, bundesliga, serieA];

export const SPORTS_COVERAGE: SportCoverageItem[] = [
  { id: 'football', name: 'Football', status: 'live', description: '4 leagues · standings, fixtures, squads' },
  { id: 'formula-1', name: 'Formula 1', status: 'soon', description: 'Laptimes, tire strategy, race replays' },
  { id: 'tennis', name: 'Tennis', status: 'soon', description: 'Draws, head-to-head, rankings' },
  { id: 'nba', name: 'NBA', status: 'soon', description: 'Box scores, pace, shot charts' },
];

export const NAV_SPORTS: NavSportItem[] = [
  { id: 'football', label: 'Football', status: 'live', route: '/' },
  { id: 'formula-1', label: 'Formula 1', status: 'soon', route: null },
  { id: 'tennis', label: 'Tennis', status: 'soon', route: null },
  { id: 'nba', label: 'NBA', status: 'soon', route: null },
];
