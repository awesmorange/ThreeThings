//request.js
import axios from "axios";
import qs from "qs";
import app from "../main.js";

/****** 创建axios实例 ******/
const service = axios.create({
    baseURL: process.env.BASE_URL,  // api的base_url
    timeout: 5000  // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    app.$vux.loading.show({
        text: '数据加载中……'
    });
 
    config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.params};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
 
    return config;
}, error => {  //请求错误处理
    app.$vux.toast.show({
        type: 'warn',
        text: error
    });
    Promise.reject(error)
});