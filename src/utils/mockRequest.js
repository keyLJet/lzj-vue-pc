/* 封装axios拦截器 */

import axios from "axios";
//引入element-ui中的Message组件
import { Message } from "element-ui";
//引入进度条插件及其样式
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  baseURL: "/mock", //  用 / 即代表当前服务器地址
  headers: {},
});

//请求拦截器
instance.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

//响应拦截器
instance.interceptors.response.use(
  //响应成功
  (response) => {
    NProgress.done();
    if (response.data.code === 200) {
      //功能成功，返回所需数据
      return response.data.data;
    }

    //使用element-ui中的Message组件进行错误提示
    const { message } = response.data;
    Message.error(message);
    //功能失败，需要返回一个失败状态的promise对象
    return Promise.reject(message);
  },
  //响应失败
  (err) => {
    NProgress.done();
    const message = err.message || "网络出错了";
    
    //使用element-ui中的Message组件进行错误提示
    Message.error(message);
    return Promise.reject(message);
  }
);

export default instance;
