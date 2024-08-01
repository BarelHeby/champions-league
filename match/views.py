from django.shortcuts import render
from .models import Match
import json
from django.http import JsonResponse
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from team.models import Team
@csrf_exempt
def match(request,id=None):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            team1 = body.get('team1')
            team1 = Team.objects.get(id=team1)
            team2 = body.get('team2')
            team2 = Team.objects.get(id=team2)
            timestamp = body.get('timestamp')
            directionAward = body.get('directionAward')
            ExactAward = body.get('exactAward')
            new_match = Match(team1=team1,team2=team2,timestamp=timestamp,finished=False,directionAward=directionAward,ExactAward=ExactAward)
            new_match.save()
            return JsonResponse({'id':new_match.id},status=200)
        except Exception as e:
            return JsonResponse({'error':str(e)},status=400)
    if request.method == 'GET':
        matches = Match.objects.all()
        return JsonResponse([
            {"id":match.id,
             "team1":match.team1.name,
             "team2":match.team2.name,
             "team1Score":match.team1Score,
             "team2Score":match.team2Score,
             "timestamp":match.timestamp,
             "finished":match.finished,
                "directionAward":match.directionAward,
                "exactAward":match.ExactAward
            } 
            for match in matches],safe=False)
    if request.method == 'PUT':
        body = json.loads(request.body)
        matchId = body.get('id')
        match = Match.objects.get(id=matchId)
        team1Score = body.get('team1Score')
        team2Score = body.get('team2Score')
        team1 = body.get('team1')
        team2 = body.get('team2')
        timestamp = body.get('timestamp')
        finished = body.get('finished')
        directionAward = body.get('directionAward')
        ExactAward = body.get('exactAward')
        match.team1Score = team1Score if team1Score is not None else match.team1Score
        match.team2Score = team2Score if team2Score is not None else match.team2Score
        team1Object = Team.objects.get(name=team1)
        team2Object = Team.objects.get(name=team2)
        match.team1 = team1Object if team1 is not None else match.team1
        match.team2 = team2Object if team2 is not None else match.team2
        match.timestamp = timestamp if timestamp is not None else match.timestamp
        match.finished = finished if finished is not None else match.finished
        match.directionAward = directionAward if directionAward is not None else match.directionAward
        match.ExactAward = ExactAward if ExactAward is not None else match.ExactAward
        match.save()    
        return JsonResponse({'id':match.id},status=200)
    
    if request.method == 'DELETE':
        if id is None:
            return JsonResponse({'error':'Invalid request'},status=400)
        match = Match.objects.get(id=id)
        match.delete()
        return JsonResponse({'id':match.id},status=200)