from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Team
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@csrf_exempt
def team(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        name = body.get('name')
        logo = body.get('logo')
        logo =  Team.removeBackround(logo)
        is_exists = Team.objects.filter(name=name).exists()
        if is_exists:
            return JsonResponse({'error':'Team already exists'},status=400)
        new_team = Team(name=name,logo=logo)
        new_team.save()
        return JsonResponse({'id':new_team.id},status=200)

    if request.method == 'GET':
        teams = Team.objects.all()
        data = []
        for team in teams:
            data.append({'id':team.id,'name':team.name,'logo':team.logo})
        return JsonResponse(data,safe=False)