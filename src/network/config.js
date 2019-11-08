import axios from "axios";

let baseURL =
  process.env.NODE_ENV === "development"
    ? "/api"
    : "http://192.168.124.133/API/VALUES";

axios.defaults.baseURL = baseURL;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return err;
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    let data = response.data;

    response.data = JSON.parse(data);

    return response;
  },
  error => {
    return error;
  }
);

export default axios;
