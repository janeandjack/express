import axios from "axios";
import Vue from "vue";
import { throwErr } from "@/utils";
import store from "@/store";

import { mainDomain } from "@/MainAPI.js";

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("Authorization")) {
      config.headers.Authorization = localStorage.getItem("Authorization");
    }
    config.timeout = 10 * 1000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      store.dispatch("logInResponse", response.data);
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    if (error && error.response) {
      store.dispatch("logInResponse", error.response);
      let res = {};
      res.code = error.response.status;
      res.msg = throwErr(error.response.status, error.response);
      Vue.prototype.$message({
        message: error.response.data,
        type: "error",
      });
      if (error.response.status == 401) {
        Vue.prototype.$message({
          message: '权限已过期，请重新登陆！',
          type: "error",
        });
        Vue.$router.push("/login/login");
        localStorage.clear();
        sessionStorage.clear();
      }
      return Promise.reject(res);
    }
    return Promise.reject(error);
  }
);

export default function request(method, address, data) {
  const url = `${mainDomain}${address}`;
  method = method.toLowerCase();
  if (method === "post") {
    return axios.post(url, data);
  } else if (method === "get") {
    return axios.get(url);
  } else if (method === "delete") {
    return axios.delete(url, data);
  } else if (method === "put") {
    return axios.put(url, data);
  }
}
