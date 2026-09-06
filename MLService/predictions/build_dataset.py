import pandas as pd;
from predictions.models import Match
from predictions.features import get_team_form,get_head_to_head

def build_training_dataset():
    matches = Match.objects.filter(status = 'FINISHED').order_by('utc_date')
    rows = []

    for m in matches:
        if m.home_score is None or m.away_score is None:
            continue

        home_form = get_team_form(m.home_team_id,before_date=m.utc_date)
        away_form = get_team_form(m.away_team_id,before_date=m.utc_date)
        h2h = get_head_to_head(m.home_team_id,m.away_team_id,before_date=m.utc_date)

        if home_form['matches_played'] < 3 or away_form['matches_played'] < 3:
            continue

        if m.home_score > m.away_score:
            result = 'HOME_WIN'
        elif m.home_score == m.away_score:
            result = 'DRAW'
        else:
            result = 'AWAY_WIN'

        rows.append({
            'match_id':m.id,
            'home_wins':home_form['wins'],
            'home_draws':home_form['draws'],
            'home_losses':home_form['losses'],
            'home_goals_for':home_form['goals_for'],
            'home_goals_against':home_form['goals_against'],
            'home_goal_diff':home_form['goal_difference'],

            'away_wins':away_form['wins'],
            'away_draws':away_form['draws'],
            'away_losses':away_form['losses'],
            'away_goals_for':away_form['goals_for'],
            'away_goals_against':away_form['goals_against'],
            'away_goal_diff':away_form['goal_difference'],

            'h2h_home_wins':h2h['home_team_wins'],
            'h2h_away_wins':h2h['away_team_wins'],
            'h2h_draws':h2h['draws'],
            'result':result,
        })
    
    return pd.DataFrame(rows)