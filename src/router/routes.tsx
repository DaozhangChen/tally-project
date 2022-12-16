import {RouteRecordRaw} from "vue-router";
import {Welcome1} from "../components/Welcome/Welcome1";
import {Welcome1Footer} from "../components/Welcome/Welcome1Footer";
import {Welcome2} from "../components/Welcome/Welcome2";
import {Welcome2Footer} from "../components/Welcome/Welcome2Footer";
import {Welcome3} from "../components/Welcome/Welcome3";
import {Welcome4} from "../components/Welcome/Welcome4";
import {Welcome3Footer} from "../components/Welcome/Welcome3Footer";
import {Welcome4Footer} from "../components/Welcome/Welcome4Footer";


export const routes:RouteRecordRaw[] = [
    {path:'/',redirect:'/welcome'},
    {path:'/welcome',component:()=>import("../view/AdvertisingPage") ,
        beforeEnter:(_to,_from,next)=>{
            localStorage.getItem('skipFeatures')==='yes' ? next('/accountDetail') : next()
        },
        children:[
        {path:'',redirect:'/welcome/1'},
        {path:'1',components:{main:Welcome1,footer:Welcome1Footer}},
        {path:'2',components:{main:Welcome2,footer:Welcome2Footer}},
        {path:'3',components:{main:Welcome3,footer:Welcome3Footer}},
        {path:'4',components:{main:Welcome4,footer:Welcome4Footer}},
        ]},
    {path:'/start',component:()=>import("../view/StartPage")},
    {path:'/account',component:()=>import("../view/StartAccount")},
    {path:'/tagCreate',component:()=>import("../components/Tag/TagCreate")},
    {path:'/tagEdit',component:()=>import("../components/Tag/TagEdit")},
    {path:'/accountDetail',component:()=>import("../view/AccountDetail")},
    {path:'/sign_in',component:()=>import("../view/SignInPage")},
    {path:'/analysis',component:()=>import("../view/Analysis")},
    {path:'/export',component:()=>import("../shared/ComingSoon")},
    {path:'/remind',component:()=>import("../shared/ComingSoon")}
]