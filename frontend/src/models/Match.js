import APIService from "../service/APIService";
export default class Match {
  constructor(
    team1,
    team2,
    timestamp,
    directionAward,
    exactAward,
    id = undefined,
    team1Score = undefined,
    team2Score = undefined,
    finished = false
  ) {
    this.team1 = team1;
    this.team2 = team2;
    this.timestamp = timestamp;
    this.directionAward = directionAward;
    this.exactAward = exactAward;
    this.id = id;
    this.team1Score = team1Score;
    this.team2Score = team2Score;
    this.finished = finished;
  }

  static async addMatch(team1, team2, timestamp, directionAward, exactAward) {
    return await APIService.post("matches/", {
      team1: team1,
      team2: team2,
      timestamp: timestamp,
      directionAward: directionAward,
      exactAward: exactAward,
    });
  }

  static async update(match) {
    return await APIService.update(`matches/`, {
      id: match.id,
      team1: match.team1,
      team2: match.team2,
      timestamp: match.timestamp,
      directionAward: match.directionAward,
      exactAward: match.exactAward,
      team1Score: match.team1Score,
      team2Score: match.team2Score,
      finished: match.finished,
    });
  }

  static async delete(match) {
    const resp = await APIService.delete(`matches/${match.id}`);
    if (resp.status === 200) {
      alert("Match deleted successfully");
      window.location.reload();
    } else {
      alert("Error deleting match");
    }
  }

  static async getAll() {
    return await APIService.get("matches/").then((res) => {
      return res.data.map(
        (match) =>
          new Match(
            match.team1,
            match.team2,
            match.timestamp,
            match.directionAward,
            match.exactAward,
            match.id,
            match.team1Score,
            match.team2Score,
            match.finished
          )
      );
    });
  }
}
