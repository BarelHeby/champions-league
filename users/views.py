from django.shortcuts import render
from .models import User
from django.http import JsonResponse
import uuid
from django.views.decorators.csrf import csrf_exempt
import json
from bet.models import Bet
from match.models import Match
from team.models import Team
from main.Image import compress_and_resize_base64_image
@csrf_exempt 
def login(request):
    pass
    if request.method == 'POST':
        data = json.loads(request.body)
        if 'username' not in data or 'password' not in data:
            return JsonResponse({'error':'Invalid request'},status=400)
        username = data.get('username')
        password = data.get('password')
        print(username,password)
        try:    
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            print("User not found")
            return JsonResponse({'error':'Invalid User/Password '},status=404)
        if user.password == password:
            new_token = uuid.uuid4()
            user.token = new_token
            user.save()
            return JsonResponse({'token':new_token,"id":user.id},status=200)
        else:
            return JsonResponse({'error':'Invalid User/Password '},status=401)

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if 'username' not in data or 'password' not in data:
            return JsonResponse({'error':'Invalid request'},status=400)
        username = data.get('username')
        password = data.get('password')
        photo = data.get('photo')
        photo = compress_and_resize_base64_image(photo,(300,300))
        nickName = data.get('nickName')
        winnerTeamId = data.get('winnerTeamId')
        topScorer = data.get('topScorer')
        t = Team.objects.get(id=winnerTeamId)
        token = uuid.uuid4()
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error':'User already exists'},status=400)
        new_user = User(username=username,password=password,photo=photo,nickName=nickName,token=token,winnerTeam=t,topScorer=topScorer)
        new_user.save()
        return JsonResponse({'id':new_user.id,"token":token},status=200)
    return JsonResponse({'error':'Invalid request'},status=400)
    
@csrf_exempt
def user(request,id=None):
    if request.method == 'GET':
        if id:
            try:
                isPhotoRequired = request.GET.get('isPhotoRequired')
                isPhotoRequired = True if isPhotoRequired == 'true' else False
                user = User.objects.get(id=id)
            except User.DoesNotExist:
                return JsonResponse({'error':'User not found'},status=404)
            return JsonResponse(user.toJson(isPhotoRequired),status=200)
        
        users = User.objects.all()
        response = []
        for user in users:
            response.append(user.toJson())
        return JsonResponse(response,safe=False)
    if request.method == 'PUT':
        if id is None:
            return JsonResponse({'error':'Invalid request'},status=400)
        data = json.loads(request.body)
        if 'token' not in data or 'id' not in data:
            return JsonResponse({'error':'Invalid request'},status=400)
        token = data.get('token')
        userId = data.get('id')
        if not validate_token(token,userId):
            return JsonResponse({'error':'Invalid request'},status=400)
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return JsonResponse({'error':'User not found'},status=404)
        if 'username' in data:
            user.username = data.get('username')
        if 'password' in data:
            user.password = data.get('password')
        if 'photo' in data:
            user.photo = data.get('photo')
        if 'nickName' in data:
            user.nickName = data.get('nickName')
        user.save()
        return JsonResponse(user.toJson(),status=200)

    if request.method=="DELETE":
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return JsonResponse({'error':'User not found'},status=404)
        user.delete()
        return JsonResponse({'message':'User deleted'},status=200)


@csrf_exempt
def table(request):
    if request.method == 'GET':
        users = User.objects.all()
        response = []
        for user in users:
            response.append(user.toJsonTable())
        response = sorted(response,key=lambda x: x['score'],reverse=True)
        return JsonResponse(response,safe=False)
    return JsonResponse({'error':'Invalid request'},status=400)
def validate_token(token,userId):
    try:
        user = User.objects.filter(token=token).first()
    except User.DoesNotExist:
        return False
    if user is None or int(user.id) != int(userId):
        return False
    return True

@csrf_exempt
def validate(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if 'token' not in data or 'id' not in data:
            return JsonResponse({'error':'Invalid request'},status=400)
        token = data.get('token')
        userId = data.get('id')
        isAdmin = data.get('isAdmin')
        print(token,userId)
        if not validate_token(token,userId):
            return JsonResponse({'error':'Invalid request'},status=400)
        if not isAdmin:
            return JsonResponse({'message':'Valid token'},status=200)
        try:
            user = User.objects.get(id=userId)
        except User.DoesNotExist:
            return JsonResponse({'error':'User not found'},status=404)
        if user.isAdmin:
            return JsonResponse({'message':'Valid token'},status=200)
    return JsonResponse({'error':'Invalid request'},status=400)

@csrf_exempt
def change_admin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if  'id' not in data or 'isAdmin' not in data :
            return JsonResponse({'error':'Invalid request'},status=400)
        userId = data.get('id')
        isAdmin = data.get('isAdmin')
        try:
            user = User.objects.get(id=userId)
            user.isAdmin = isAdmin
            user.save()
        except User.DoesNotExist:
            return JsonResponse({'error':'User not found'},status=404)
        return JsonResponse(user.toJson(),status=200)
    return JsonResponse({'error':'Invalid request'},status=400)