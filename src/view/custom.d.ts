declare module 'axios' {
    export interface AxiosRequestConfig {
        _autoLoading?: boolean
        _mock?: string
    }
}