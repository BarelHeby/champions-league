from django.db import models
from team.models import Team
from match.models import Match
from bet.models import Bet
# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=256)
    nickName = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    photo = models.TextField()
    password = models.CharField(max_length=200)
    topScorer = models.CharField(max_length=100,default=None,null=True)
    winnerTeam = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='winnerTeam',default=None,null=True)
    isAdmin = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def toJson(self):
        return {
            "id":self.id,
            "username":self.username,
            "photo":self.photo,
            "nickName":self.nickName,
            "topScorer":self.topScorer ,
            "winnerTeam":self.winnerTeam.toJson() if self.winnerTeam is not None else None,
            "score":self.get_score(),
            "isAdmin":self.isAdmin
        }
    
    def get_score(self):
        try:
            bets = Bet.objects.filter(user_id=self.id)
        except Bet.DoesNotExist:
            return 0
        score = 0
        for bet in bets:
            if  bet.team1Score is None or bet.team2Score is None:
                continue 
            match = Match.objects.get(id=bet.match.id)
            if match.team1Score is None or match.team2Score is None:
                continue
            if bet.team1Score == match.team1Score and bet.team2Score == match.team2Score:
                score += match.ExactAward
            elif bet.team1Score>bet.team2Score and match.team1Score>match.team2Score:
                score += match.directionAward
            elif bet.team1Score<bet.team2Score and match.team1Score<match.team2Score:
                score += match.directionAward
        return score