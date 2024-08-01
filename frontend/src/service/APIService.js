import axios from "axios";

export default class APIService {
  static API_URL = process.env.REACT_APP_API_URL + "/apiv1/";
  static async post(url, data) {
    return axios.post(APIService.API_URL + url, data);
  }
  static async get(url, headers = {}) {
    return axios.get(APIService.API_URL + url, { headers });
  }
  static async update(url, data) {
    return axios.put(APIService.API_URL + url, data);
  }
  static async delete(url) {
    return axios.delete(APIService.API_URL + url);
  }
}
