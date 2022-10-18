import {defineStore} from "pinia";
import {http} from "../shared/Http";

export const meStore=defineStore('me',{
    state:()=>({
        me:undefined,
        mePromise:undefined,
        meEmail:undefined
    }),
    actions:{
        refreshMe() {
            this.mePromise = http.get('/me')
        },
        fetchMe() {
           this.refreshMe()
        },
        getEmail(){
            console.log(this.mePromise)
        }
    }
})