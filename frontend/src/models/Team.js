import APIService from "../service/APIService";
export default class Team {
  constructor(id, name, logo) {
    this.id = id;
    this.name = name;
    this.logo = logo;
  }
  static async getAll() {
    return await APIService.get("teams/").then((res) => {
      return res.data.map((team) => new Team(team.id, team.name, team.logo));
    });
  }

  static async addTeam(name, logo) {
    return await APIService.post("teams/", {
      name: name,
      logo: logo,
    });
  }
}
