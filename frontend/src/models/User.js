import APIService from "../service/APIService";
import { saveResponse, getResponse } from "../LocalDb";
import Auth from "../auth";
export default class User {
  constructor(
    id,
    nickName,
    photo,
    score,
    topScorer = null,
    winnerTeam = null,
    isAdmin = false
  ) {
    this.id = id;
    this.nickName = nickName;
    this.photo = photo;
    this.score = score;
    this.topScorer = topScorer;
    this.winnerTeam = winnerTeam;
    this.isAdmin = isAdmin;
  }

  saveLocally() {
    try {
      localStorage.setItem("user_info", Auth.encrypt(JSON.stringify(this)));
    } catch (e) {}
  }

  static getLocally() {
    const user_info = localStorage.getItem("user_info");

    if (user_info) {
      const encrypted_user = JSON.parse(Auth.decrypt(user_info));
      return encrypted_user;
    } else {
      return null;
    }
  }
  static async getAll() {
    const url = "users/";
    const resp = await APIService.get(url);
    return resp.data.map(
      (user) =>
        new User(
          user.id,
          user.nickName,
          user.photo,
          user.score,
          user.topScorer,
          user.winnerTeam,
          user.isAdmin
        )
    );
  }
  static async getUser(id, isPhotoRequired = true) {
    const local_user = User.getLocally();
    if (
      local_user !== null &&
      local_user.id.toString() === id.toString() &&
      local_user.photo
    ) {
      return local_user;
    }

    const url = "users/" + id + "?isPhotoRequired=" + isPhotoRequired;
    try {
      const resp = await APIService.get(url);
      const new_user = new User(
        resp.data.id,
        resp.data.nickName,
        resp.data.photo,
        resp.data.score,
        resp.data.topScorer,
        resp.data.winnerTeam,
        resp.data.isAdmin
      );
      if (isPhotoRequired) new_user.saveLocally();
      return new_user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async delete(id) {
    const url = "users/" + id;
    return await APIService.delete(url);
  }
  static async getTable() {
    const url = "users/table";
    try {
      const resp = await APIService.get(url);
      const users_resp = resp.data.map(
        (user) =>
          new User(
            user.id,
            user.nickName,
            user.photo,
            user.score,
            user.topScorer,
            user.winnerTeam
          )
      );
      saveResponse("users_table", JSON.stringify(users_resp));
      // sessionStorage.setItem("users_table", JSON.stringify(users_resp));
      return users_resp;
    } catch (e) {
      return null;
    }
  }

  static async getTableFromCache() {
    const local_info = await getResponse("users_table");
    if (local_info) {
      return JSON.parse(local_info);
    } else {
      return null;
    }
  }

  static async createUser(
    username,
    nickName,
    photo,
    password,
    winnerTeamId,
    topScorer
  ) {
    return await APIService.post("users/register", {
      nickName: nickName,
      password: password,
      username: username,
      photo: photo,
      winnerTeamId: winnerTeamId,
      topScorer: topScorer,
    });
  }

  static async isAdmin(id, token) {
    return await APIService.post("users/isadmin/", {
      id: id,
      token: token,
    });
  }

  static async validateToken(id, token, isAdmin) {
    return await APIService.post("users/validate/", {
      id: id,
      token: token,
      isAdmin: isAdmin,
    });
  }

  static async changeAdmin(id, isAdmin) {
    return await APIService.post("users/changeadmin/", {
      id: id,
      isAdmin: isAdmin,
    });
  }
}
