from django.db import models
from datetime import datetime
from django.utils import timezone
# Create your models here.
import pytz
class Match(models.Model):
    team1 = models.ForeignKey('team.Team', related_name='team1', on_delete=models.CASCADE)
    team2 = models.ForeignKey('team.Team', related_name='team2', on_delete=models.CASCADE)
    team1Score = models.IntegerField(null=True)
    team2Score = models.IntegerField(null=True)
    directionAward = models.IntegerField(null=False,default=1)
    ExactAward = models.IntegerField(null=False,default=3)
    timestamp = models.DateTimeField()
    finished = models.BooleanField()

    def __str__(self):
        return self.team1.name + ' vs ' + self.team2.name   
    
    def is_bettable(self):
        jerusalem_tz = pytz.timezone('Asia/Jerusalem')
        return self.finished == False and self.timestamp > datetime.now().astimezone(jerusalem_tz)