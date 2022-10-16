import { createApp } from 'vue'
import {App} from "./App";
import {createRouter, createWebHashHistory} from "vue-router";
import {history} from "./shared/history";
import {routes} from "./router/routes";
import {http} from "./shared/Http";

const router = createRouter({history,routes})
const app=createApp(App)

app.use(router)
app.mount('#app')

const whiteList: Record<string, 'exact' | 'startsWith'> = {
    '/': 'exact',
    '/items': 'exact',
    '/welcome': 'startsWith',
    '/sign_in': 'startsWith',
}

router.beforeEach((to,from)=>{
    for (const key in whiteList){
        const value=whiteList[key]
        if (value==='exact' && to.path===key){
            return true
        }
        if (value==='startsWith' && to.path.startsWith(key)){
            return true
        }
    }
    return http.get('/me').then(()=>true,()=>'/sign_in?return_to=' + from.path)
})
