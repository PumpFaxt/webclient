import axios from "axios";
import { serverUrl } from "../../config";
import dummy from "./dummy";
import user from "./user";

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
}

export function clearJwt() {
  jwt = null;
}

export function jwtExists() {
  return jwt ? true : false;
}

const api = { dummy, user };

export default api;
