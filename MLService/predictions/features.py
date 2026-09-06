from django.db.models import Q
from .models import Match


def get_team_form(team_id:int,before_date,num_matches:int = 5):
    matches = Match.objects.filter(
        Q(home_team_id=team_id) | Q(away_team_id=team_id),
        status = 'FINISHED',
        utc_date__lt=before_date
    ).order_by('-utc_date')[:num_matches]

    wins = draws = losses = goals_for = goals_against = 0

    for m in matches:
        is_home = m.home_team_id == team_id
        team_score = m.home_score if is_home else m.away_score
        opp_score = m.away_score if is_home else m.home_score

        if team_score is None or opp_score is None:
            continue

        goals_for += team_score
        goals_against += opp_score

        if team_score > opp_score:
            wins+=1
        elif team_score == opp_score:
            draws+=1
        else:
            losses+=1

    return {
        'matches_played':len(matches),
        'wins':wins,
        'draws':draws,
        'losses':losses,
        'goals_for':goals_for,
        'goals_against':goals_against,
        'goal_difference':goals_for - goals_against
    } 


def get_head_to_head(home_team_id:int,away_team_id:int,before_date,num_matches:int = 5):
    matches = Match.objects.filter(
        Q(home_team_id=home_team_id) | Q(away_team_id=away_team_id) |
        Q(home_team_id=away_team_id) | Q(away_team_id=home_team_id),
        status='FINISHED',
        utc_date__lt=before_date,
    ).order_by('-utc_date')[:num_matches]

    home_wins = away_wins = draws = 0

    for m in matches:
        if m.home_score is None or m.away_score is None:
            continue

        if m.home_team_id == home_team_id:
            team_a_score,team_b_score = m.home_score,m.away_score
        else:
            team_a_score,team_b_score = m.away_score,m.home_score

        if team_a_score > team_b_score:
            home_wins += 1
        elif team_a_score == team_b_score:
            draws += 1
        else:
            away_wins += 1

    return {
        'matches_played':len(matches),
        'home_team_wins':home_wins,
        'away_team_wins':away_wins,
        'draws':draws
    }