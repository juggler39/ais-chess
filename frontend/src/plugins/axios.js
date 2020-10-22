"use strict";

import Vue from "vue";
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// eslint-disable-next-line
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
if (localStorage.getItem("userLog"))
  axios.defaults.headers.common[
    "Authorization"
  ] = `Token ${localStorage.getItem("userLog")}`;
//axios.defaults.headers.common["Authorization"] = "Token asd";
axios.defaults.headers.post["Content-Type"] = "application/json";

let config = {
  // baseURL:
  //   process.env.baseURL ||
  //   process.env.apiUrl ||
  //   'http://chess.edu2020.devais.work',
  timeout: 0,
  withCredentials: false
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

// eslint-disable-next-line no-unused-vars
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
