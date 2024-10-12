import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";
import { useNavigate } from "react-router-dom";
//根域名,超时时间
const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {
    //注入token
    const token = getToken()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})
//响应拦截器
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    //处理token失效 401
    if (error.response.status == 401){
        removeToken()
        router.navigate('/login')
        window.location.reload()
    }
    
    return Promise.reject(error)
})

export { request }