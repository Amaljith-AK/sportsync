import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score,classification_report
from predictions.build_dataset import build_training_dataset


def train():
    df = build_training_dataset()

    feature_cols = [
    'home_wins', 'home_draws', 'home_losses', 'home_goals_for', 'home_goals_against', 'home_goal_diff',
    'away_wins', 'away_draws', 'away_losses', 'away_goals_for', 'away_goals_against', 'away_goal_diff',
    'h2h_home_wins', 'h2h_away_wins', 'h2h_draws',
]

    X = df[feature_cols]
    Y = df['result']

    # time based split
    # first 85% for training
    # last 15% for testing
    split_idx = int(len(df) * 0.85)
    X_train,X_test = X.iloc[:split_idx],X.iloc[split_idx:]
    Y_train,Y_test = Y.iloc[:split_idx],Y.iloc[split_idx:]

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=8,
        min_samples_leaf=10,
        random_state=42
    )

    model.fit(X_train,Y_train)

    predictions = model.predict(X_test)
    accuracy = accuracy_score(Y_test,predictions)

    print(f'Test accuracy: {accuracy:.3f}')
    print(classification_report(Y_test,predictions))

    joblib.dump(model,'predictions/trained_model.joblib')
    print('Model saved to predictions/trained_model.joblib')

    return model,accuracy