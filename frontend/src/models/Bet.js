import APIService from "../service/APIService";
export default class Bet {
  constructor(
    betId,
    matchId,
    team1,
    team1Logo,
    team1ActualScore,
    team2,
    team2Logo,
    team2ActualScore,
    team1Score,
    team2Score,
    timestamp,
    isBettable = false
  ) {
    this.betId = betId;
    this.matchId = matchId;
    this.team1 = team1;
    this.team1Logo = team1Logo;
    this.team1ActualScore = team1ActualScore;
    this.team2 = team2;
    this.team2Logo = team2Logo;
    this.team2ActualScore = team2ActualScore;
    this.team1Score = team1Score;
    this.team2Score = team2Score;
    this.timestamp = timestamp;
    this.isBettable = isBettable;
  }
  static fromJson(json) {
    return new Bet(
      json.id,
      json.matchId,
      json.team1,
      json.team1Logo,
      json.team1ActualScore,
      json.team2,
      json.team2Logo,
      json.team2ActualScore,
      json.team1Score,
      json.team2Score,
      new Date(json.timestamp),
      json.isBettable
    );
  }

  static toJson(bet) {
    return {
      matchId: bet.matchId,
      team1Score: bet.team1Score,
      team2Score: bet.team2Score,
    };
  }
  static async getBets(userId) {
    const url = "bets/" + userId;
    const headers = {
      token: localStorage.getItem("token"),
    };
    try {
      const resp = await APIService.get(url, headers);
      return resp.data.map((bet) => Bet.fromJson(bet));
    } catch (e) {
      return [];
    }
  }

  static async updateBet(userId, bet, team, score) {
    if (team === 1) {
      bet.team1Score = score;
    } else {
      bet.team2Score = score;
    }
    const url = "bets/" + userId;
    await APIService.post(url, bet);
  }
}
