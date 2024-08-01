from django.db import models
from datetime import datetime
# Create your models here.

class Bet(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    match = models.ForeignKey('match.Match', on_delete=models.CASCADE,default=None)
    timestamp = models.DateTimeField()
    team1Score = models.IntegerField(null=True)
    team2Score = models.IntegerField(null=True)
