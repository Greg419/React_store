import _axios from "axios";

const axios = baseURL => {
  const instance = _axios.create({
    baseURL:
      baseURL || process.env.REACT_APP_API_DOMAIN || "http://localhost:3003",
    timeout: 1000
  });

  // You can intercept requests or responses before they are handled by then or catch.
  // 對 instance 的 request 作攔截, 並加上導入 token 的邏輯
  instance.interceptors.request.use(
    config => {
      // config 即為上方我們自定義 axios 的整個配置
      // 送出請求前, 所有頭部訊息都加上 token
      const jwToken = global.auth.getToken();
      config.headers["Authorization"] = "Bearer " + jwToken;
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return instance;
};

// 可傳遞參數出去: 目前沒用到
export { axios };

export default axios();
