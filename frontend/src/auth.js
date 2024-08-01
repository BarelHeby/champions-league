import User from "./models/User";
export default class Auth {
  static async isAuthenticated(isAdmin) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      return false;
    }
    try {
      const resp = await User.validateToken(userId, token, isAdmin);
      return resp.status === 200;
    } catch (error) {
      return false;
    }
  }
  static login(token, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  }
  static logout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    } catch (e) {
      console.error(e);
    }
  }

  static getUserId() {
    return localStorage.getItem("userId");
  }

  static async checkAuth(isAuthMust = true, isAdmin = false) {
    const isAuthenticated = await Auth.isAuthenticated(isAdmin);
    console.log("isAuthenticated", isAuthenticated);
    console.log("isAuthMust", isAuthMust);
    if (isAuthenticated && !isAuthMust) {
      window.location.href = "/";
    }
    if (!isAuthenticated && isAuthMust) {
      if (isAdmin) {
        window.location.href = "/";
      } else window.location.href = "/login";
    }
  }
}
