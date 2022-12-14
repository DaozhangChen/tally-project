import {createApp, onMounted, ref} from 'vue'
import {App} from "./App";
import {createRouter} from "vue-router";
import {history} from "./shared/history";
import {routes} from "./router/routes";
import {createPinia} from "pinia";
import {meStore} from "./store/meStote";

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

useMeStore.refreshMe().then(()=>{return},()=>{return})

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

    return useMeStore.refreshMe().then(()=>{return},()=>'/sign_in?return_to=' + from.path)
})