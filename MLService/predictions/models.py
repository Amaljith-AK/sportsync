from django.db import models

# Create your models here.

class Team(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255,null=True,db_column='shortName')
    tla = models.CharField(max_length=10,null=True)
    crest_url = models.TextField(null=True,db_column='crestUrl')
    # stadium = models.CharField(max_length=255,null=True) For Future purpose
    # founded = models.IntegerField(null=True)
    # manager = models.CharField(max_length=255,null=True)

    class Meta:
        managed = False
        db_table = 'Team'

    def __str__(self):
        return self.name

class Match(models.Model):
    id = models.IntegerField(primary_key=True)
    competition_code = models.CharField(max_length=10, db_column='competitionCode')
    season = models.IntegerField()
    matchday = models.IntegerField(null=True)
    utc_date = models.DateTimeField(db_column='utcDate')
    status = models.CharField(max_length=20)
    home_team = models.ForeignKey(Team, on_delete=models.DO_NOTHING, db_column='homeTeamId', related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.DO_NOTHING, db_column='awayTeamId', related_name='away_matches')
    home_score = models.IntegerField(null=True, db_column='homeScore')
    away_score = models.IntegerField(null=True, db_column='awayScore')
    winner = models.CharField(max_length=20, null=True)

    class Meta:
        managed = False
        db_table = 'Match'

    def __str__(self):
        return f"{self.home_team} vs {self.away_team}"


class HistoricalMatchStats(models.Model):
    match_id = models.IntegerField(primary_key=True)  # matches the synthetic Match.id
    home_shots = models.IntegerField(null=True)
    away_shots = models.IntegerField(null=True)
    home_shots_on_target = models.IntegerField(null=True)
    away_shots_on_target = models.IntegerField(null=True)

    class Meta:
        db_table = 'historical_match_stats'