import User from "./models/User";
import CryptoJS from "crypto-js";
export default class Auth {
  static async isAuthenticated(isAdmin) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      return false;
    }
    if (Auth.checkAuthData(token, userId)) {
      console.log("Auth data is valid");
      return true;
    }
    try {
      const resp = await User.validateToken(userId, token, isAdmin);
      if (resp.status !== 200) {
        return false;
      }
      Auth.login(token, userId);
    } catch (error) {
      return false;
    }
  }
  static login(token, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    const token_cipher = Auth.encrypt(token);
    const userId_cipher = Auth.encrypt(userId);
    localStorage.setItem("auth_token", token_cipher);
    localStorage.setItem("auth_userId", userId_cipher);
  }
  static logout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_userId");
      window.location.href = "/login";
    } catch (e) {
      console.error(e);
    }
  }

  static getUserId() {
    const userId_cipher = localStorage.getItem("auth_userId");
    if (!userId_cipher) {
      return null;
    }
    const userId_decrypted = Auth.decrypt(userId_cipher);
    return userId_decrypted;
  }

  static async checkAuth(isAuthMust = true, isAdmin = false) {
    const isAuthenticated = await Auth.isAuthenticated(isAdmin);
    if (isAuthenticated && !isAuthMust) {
      window.location.href = "/";
    }
    if (!isAuthenticated && isAuthMust) {
      if (isAdmin) {
        window.location.href = "/";
      } else window.location.href = "/login";
    }
  }

  static encrypt(data) {
    const str_data = data.toString();
    let cipher = CryptoJS.AES.encrypt(
      str_data,
      process.env.REACT_APP_SECRET_KEY
    ).toString();
    return cipher;
  }

  static decrypt(cipher) {
    const bytes = CryptoJS.AES.decrypt(
      cipher.toString(),
      process.env.REACT_APP_SECRET_KEY
    );
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
  static checkAuthData(token, userId) {
    const token_cipher = localStorage.getItem("auth_token");
    const userId_cipher = localStorage.getItem("auth_userId");
    if (!token || !userId || !token_cipher || !userId_cipher) {
      return false;
    }
    const token_decrypted = Auth.decrypt(token_cipher);
    const userId_decrypted = Auth.decrypt(userId_cipher);
    if (token_decrypted !== token || userId_decrypted !== userId) {
      return false;
    }
    return true;
  }
}
