import axios, { AxiosRequestConfig} from "axios";
import 'vant/es/toast/style'
import {Toast} from "vant";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
    instance
    constructor(baseURL: string) {
        // @ts-ignore
        this.instance = axios.create({ baseURL })
    }
    get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
    }
    post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
        return this.instance.request<R>({ ...config, url, data, method: 'post' })
    }
    patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
        return this.instance.request<R>({ ...config, url, data, method: 'patch' })
    }
    delete<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: DeleteConfig) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
    }
}

export const http = new Http('http://121.196.236.94:3000/api/v1')

// @ts-ignore
http.instance.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
        config.headers!.Authorization = `Bearer ${jwt}`
    }
    if (config._autoLoading){
        Toast.loading({
            message:'加载中',
            forbidClick: true,
        })
    }
    return config
})


// @ts-ignore
http.instance.interceptors.response.use(response => {
    if (response.config._autoLoading===true){
        Toast.clear()
    }
    return response
    // @ts-ignore
},(error)=>{
    if (error.config._autoLoading===true){
        Toast.clear()
    }
    throw error
})

