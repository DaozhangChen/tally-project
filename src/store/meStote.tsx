import {defineStore} from "pinia";
import {http} from "../shared/Http";

type meResponse = {
    resource:{
        created_at:string,
        email:string,
        id:number,
        name:null|string,
        updated_at:string
    }
}
type meState={
    me:undefined|string,
    mePromise:undefined|any,
    meEmail:undefined|string

}
export const meStore=defineStore('me',{
    state:():meState=>({
        me:undefined,
        mePromise:undefined,
        meEmail:undefined
    }),
    actions:{
        async refreshMe() {
            // @ts-ignore
            await http.get('/me').then((response:AxiosResponse)=>{
                    this.mePromise = response
                    this.meEmail = this.mePromise.data.resource.email
             }
             //@ts-ignore
            ,(error)=>{throw error})
        },
    }
})