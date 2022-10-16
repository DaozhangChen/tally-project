import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http{
    instance:AxiosInstance
    constructor(baseURL:string) {
       this.instance=axios.create({baseURL})
    }
    get<R = unknown>(url:string,query?:Record<string, JSONValue>,config?:GetConfig){
        return this.instance.request<R>({...config,url:url,params:query,method:'get'})
    }
    post<R = unknown>(url:string,data?:Record<string, JSONValue>,config?:PostConfig){
        return this.instance.request<R>({...config,url,data,method:'post'})
    }
    patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
        return this.instance.request<R>({ ...config, url, data, method: 'patch' })
    }
    delete<R = unknown>(url:string,query?:Record<string, JSONValue>,config?:DeleteConfig){
        return this.instance.request<R>({...config,url:url,params:query,method:'delete'})
    }
 }

 export const http=new Http('api/v1')

http.instance.interceptors.request.use(config =>{
    const jwt=localStorage.getItem('jwt')
    if (jwt){
        config.headers!.Authorization=`Bearer ${jwt}`
    }
    return config
})