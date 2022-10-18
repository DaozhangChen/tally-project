import {createApp, ref} from 'vue'
import {App} from "./App";
import {createRouter} from "vue-router";
import {history} from "./shared/history";
import {routes} from "./router/routes";
import {http} from "./shared/Http";
import {createPinia, storeToRefs} from "pinia";
import {meStore, meStote} from "./store/meStote";

const router = createRouter({history,routes})
const app=createApp(App)


app.use(router)
app.mount('#app')
app.use(createPinia())

const whiteList: Record<string, 'exact' | 'startsWith'> = {
    '/': 'exact',
    '/start': 'exact',
    '/welcome': 'startsWith',
    '/sign_in': 'startsWith',
}
const useMeStore=meStore()
const {mePromise}=storeToRefs(useMeStore)
const meData=ref()
const jwt=localStorage.getItem('jwt')

if (jwt){
    useMeStore.fetchMe()
    meData.value=await mePromise.value
    useMeStore.meEmail=meData.value.data.resource.email
}

router.beforeEach(async (to,from)=>{
    for (const key in whiteList){
        const value=whiteList[key]
        if (value==='exact' && to.path===key){
            return true
        }
        if (value==='startsWith' && to.path.startsWith(key)){
            return true
        }
    }

    useMeStore.fetchMe()
    return mePromise.value.then(async ()=>{
       meData.value= await mePromise.value
        useMeStore.meEmail=meData.value.data.resource.email
    },
        ()=>'/sign_in?return_to=' + from.path)
})