from django.shortcuts import render
from .models import Bet
from django.http import JsonResponse
# Create your views here.
import json
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from match.models import Match
from team.models import Team
from users.models import User
from users.views import validate_token
import pytz
from main.Image import compress_and_resize_base64_image
@csrf_exempt
def bet(request,userId=None):
    if request.method == 'GET':
        headers = request.headers
        token = headers.get('token')
        isSameUser = validate_token(token,userId)
        if not isSameUser:
            jerusalem_tz = pytz.timezone('Asia/Jerusalem')
            matches = Match.objects.filter(timestamp__lt=datetime.now().astimezone(jerusalem_tz))
        else:
            matches = Match.objects.all()
        response = []
        bets = Bet.objects.filter(user_id=userId,match__in=matches)
        bet_map = {bet.match_id:bet for bet in bets}
        for m in matches:
            bet = Bet.objects.filter(user_id=userId,match=m).first()
            common_data = {
                    'id':m.id,
                    'matchId':m.id,
                    'team1':m.team1.name,
                    'team1Logo':compress_and_resize_base64_image(m.team1.logo,(80,80)),
                    'team2':m.team2.name,
                    'team2Logo':compress_and_resize_base64_image(m.team2.logo,(80,80)),
                    'team1ActualScore':m.team1Score,
                    'team2ActualScore':m.team2Score,
                    'timestamp':m.timestamp,
                    'isBettable':m.is_bettable()
            }
            if m.id in bet_map:
                bet = bet_map[m.id]
                common_data.update({
                    'team1Score': bet.team1Score,
                    'team2Score': bet.team2Score,
                })
            else:
                common_data.update({
                    'team1Score': None,
                    'team2Score': None,
                })
            response.append(common_data)
        response = sorted(response,key=lambda x: x['timestamp'],reverse=True)
        return JsonResponse(response,safe=False)
    
    if request.method == 'POST':
        data = json.loads(request.body)
        keys = data.keys()
        if 'matchId' not in keys  or 'team1Score' not in keys or 'team2Score' not in keys:
            return JsonResponse({'error':'Invalid request'},status=400)
        matchId = data.get('matchId')
        try:
            match = Match.objects.get(id=matchId)

        except:
            return JsonResponse({'error':'Invalid match id'},status=400)
        team1Score = data.get('team1Score')
        team2Score = data.get('team2Score')
        current_time = datetime.now()
        bet = Bet.objects.filter(user_id=userId,match_id=match.id).first()
        if bet:
            bet.team1Score = team1Score
            bet.team2Score = team2Score
            bet.timestamp = current_time
            bet.save()
            return JsonResponse({'id':bet.id},status=200)
        new_bet = Bet(user_id=userId,match_id=match.id,team1Score=team1Score,team2Score=team2Score,timestamp=current_time)
        new_bet.save()
        return JsonResponse({'id':new_bet.id},status=200)