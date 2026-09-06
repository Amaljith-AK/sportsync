import csv
import requests
from datetime import datetime
from django.core.management.base import BaseCommand
from django.db import connection
from predictions.team_mapping import CSV_TEAM_NAME_TO_ID
from predictions.models import HistoricalMatchStats

LEAGUE_CODES = {
    'E0':'PL',
    'SP1':'PD',
    'D1':'BL1',
    'I1':'SA'
}

SEASONS = ['2021','2122','2223','2324','2425'] # adjust format per site's actual pattern

# Synthetic ID range - safely outside football-data.org's real ID space
NEXT_SYNTHETIC_ID = 9000000

class Command(BaseCommand):
    help = 'Import historical match data from football-data.co.uk CSVs'

    def handle(self,*args,**options):
        global NEXT_SYNTHETIC_ID
        skipped_team = set()
        imported_count = 0

        for csv_code,competition_code in LEAGUE_CODES.items():
            for season in SEASONS:
                url = f'https://www.football-data.co.uk/mmz4281/{season}/{csv_code}.csv'
                self.stdout.write(f'Fetching {url}...')

                try:
                    response = requests.get(url,timeout=15)
                    response.raise_for_status()
                except Exception as e:
                    self.stderr.write(f'Failed to fetch {url}:{e}')
                    continue


                lines = response.content.decode('utf-8',errors='ignore').splitlines()
                reader = csv.DictReader(lines) 

                for row in reader:
                    home_name = row.get('HomeTeam','').strip()
                    away_name = row.get('AwayTeam','').strip()

                    home_id = CSV_TEAM_NAME_TO_ID.get(home_name)
                    away_id = CSV_TEAM_NAME_TO_ID.get(away_name)

                    if home_id is None:
                        skipped_team.add(home_name)
                        continue
                    if away_id is None:
                        skipped_team.add(away_name)
                        continue

                    try:
                        fthg = int(row['FTHG'])
                        ftag = int(row['FTAG'])
                        ftr = row['FTR']
                        match_date = datetime.strptime(row['Date'],'%d/%m/%Y')
                        home_shots = int(row['HS']) if row.get('HS') else None
                        home_shots_on_target = int(row['HST']) if row.get('HST') else None
                        away_shots = int(row['AS']) if row.get('AS') else None
                        away_shots_on_target = int(row['AST']) if row.get('AST') else None

                    except(ValueError,KeyError):
                        continue

                    winner = {'H':'HOME_TEAM','A':'AWAY_TEAM','D':'DRAW'}.get(ftr)
                    season_year = 2000 + int(season[:2])

                    with connection.cursor() as cursor:
                        cursor.execute(
                            '''
                            INSERT INTO "Match" (
                                id, "competitionCode", season, "utcDate", status,
                                "homeTeamId", "awayTeamId", "homeScore", "awayScore", winner, "lastSyncedAt"
                            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                            ON CONFLICT (id) DO NOTHING
                            ''',
                            [
                                NEXT_SYNTHETIC_ID,competition_code,season_year,
                                match_date,'FINISHED',home_id,away_id,fthg,ftag,winner
                            ]
                        )

                    HistoricalMatchStats.objects.update_or_create(
                        match_id=NEXT_SYNTHETIC_ID,
                        defaults={
                            'home_shots':home_shots,
                            'away_shots':away_shots,
                            'home_shots_on_target':home_shots_on_target,
                            'away_shots_on_target':away_shots_on_target,
                        }
                    )

                    NEXT_SYNTHETIC_ID += 1
                    imported_count += 1

        self.stdout.write(self.style.SUCCESS(f'Imported {imported_count} historical matches'))
        if skipped_team:
            self.stdout.write(self.style.WARNING(f'Skipped rows referencing unmapped teams:{sorted(skipped_team)}'))