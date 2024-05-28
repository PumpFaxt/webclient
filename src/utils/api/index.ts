import axios from "axios";
import { serverUrl } from "../../config";
import dummy from "./dummy";

let address: string | null = null;

export let client = createApi();

function createApi() {
  const client = axios.create({
    baseURL: serverUrl,
    timeout: 32000,
    headers: {
      Authorization: address,
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

export function setAddress(addr: string) {
  address = addr;
  client.defaults.headers["Authorization"] = address;
}

export function clearAddress() {
  address = null;
  client.defaults.headers["Authorization"] = null;
}

const api = { dummy };

export default api;
