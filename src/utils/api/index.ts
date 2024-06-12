import axios from "axios";
import { jwtStorageName, serverUrl } from "../../config";
import dummy from "./dummy";
import user from "./user";
import token from "./token";

let jwt: string | null = null;
export let client = createApi();

function createApi() {
  const client = axios.create({
    baseURL: serverUrl,
    timeout: 32000,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  // Request Middleware
  client.interceptors.request.use(
    function (config) {
      // Config before Request
      return config;
    },
    function (err) {
      // If Request error
      return Promise.reject(err);
    }
  );

  // Response Middleware
  client.interceptors.response.use(
    function (res) {
      if(res.data.invalidToken){
        clearJwt()
        localStorage.removeItem(jwtStorageName)
        location.reload();
      }
      return res;
    },

    function (error) {
      throw error;
      //   return Promise.reject(errMsg.slice(1, -1));
    }
  );

  return client;
}

export function setJwt(token: string) {
  jwt = token;
  client = createApi();
}

export function clearJwt() {
  jwt = null;
}

export function jwtExists() {
  return jwt ? true : false;
}

const api = { dummy, user, token };

export default api;
