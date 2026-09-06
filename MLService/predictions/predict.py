import joblib
import pandas as pd
from django.utils import timezone
from predictions.features import get_team_form,get_head_to_head

_model = None

def get_model():
    global _model
    if _model is None:
        _model = joblib.load('predictions/trained_model.joblib')
    return _model


def predict_match(home_team_id:int,away_team_id:int):
    model = get_model()
    now = timezone.now()

    home_form = get_team_form(home_team_id,before_date=now)
    away_form = get_team_form(away_team_id,before_date=now)
    h2h = get_head_to_head(home_team_id,away_team_id,before_date=now)

    features = pd.DataFrame([[
        home_form['wins'],home_form['draws'],home_form['losses'],
        home_form['goals_for'],home_form['goals_against'],home_form['goal_difference'],
        away_form['wins'],away_form['draws'],away_form['losses'],
        away_form['goals_for'],away_form['goals_against'],away_form['goal_difference'],
        h2h['home_team_wins'],h2h['away_team_wins'],h2h['draws']
    ]])


    probabilities = model.predict_proba(features)[0]
    class_order = model.classes_

    result = dict(zip(class_order,probabilities))

    return {
        'home_win_pct':round(float(result.get('HOME_WIN',0))*100,1),
        'draw_pct':round(float(result.get('DRAW',0))*100,1),
        'away_win_pct':round(float(result.get('AWAY_WIN',0))*100,1)
    }
