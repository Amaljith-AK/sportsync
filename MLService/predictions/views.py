from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from predictions.predict import predict_match
from predictions.models import Team


@api_view(['POST'])
def predict(request):
    home_team_id = request.data.get('homeTeamId')
    away_team_id = request.data.get('awayTeamId')

    if home_team_id is None or away_team_id is None:
        return Response(
            {'error':'homeTeamId and awayTeamId are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not Team.objects.filter(id = home_team_id).exists():
        return Response({'error': f'Team {home_team_id} not found'}, status=status.HTTP_404_NOT_FOUND)
    if not Team.objects.filter(id = away_team_id).exists():
        return Response({'error': f'Team {away_team_id} not found'}, status=status.HTTP_404_NOT_FOUND)


    try:
        result = predict_match(home_team_id=int(home_team_id),away_team_id=int(away_team_id))
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)