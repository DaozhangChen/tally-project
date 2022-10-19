import {defineStore} from "pinia";
import {http} from "../shared/Http";

export const meStore=defineStore('me',{
    state:()=>({
        me:undefined,
        mePromise:undefined,
        meEmail:undefined
    }),
    actions:{
        async refreshMe() {
            await http.get('/me').then((response)=>{
                this.mePromise=response
                this.meEmail=this.mePromise.data.resource.email
             }
            ,(error)=>{throw error})

        },
        fetchMe() {
           this.refreshMe()
        },
    }
})