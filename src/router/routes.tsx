import {RouteRecordRaw} from "vue-router";
import {AdvertisingPage} from "../view/AdvertisingPage";
import {Welcome1} from "../components/Welcome/Welcome1";
import {Welcome1Footer} from "../components/Welcome/Welcome1Footer";
import {Welcome2} from "../components/Welcome/Welcome2";
import {Welcome2Footer} from "../components/Welcome/Welcome2Footer";
import {Welcome3} from "../components/Welcome/Welcome3";
import {Welcome4} from "../components/Welcome/Welcome4";
import {Welcome3Footer} from "../components/Welcome/Welcome3Footer";
import {Welcome4Footer} from "../components/Welcome/Welcome4Footer";
import {StartPage} from "../view/StartPage";
import {StartAccount} from "../view/StartAccount";
import {TagCreatePage} from "../components/Tag/TagCreate";
import {TagEdit} from "../components/Tag/TagEdit";
import {AccountDetail} from "../view/AccountDetail";
import {SignInPage} from "../view/SignInPage";
import {Analysis} from "../view/Analysis";
import {ComingSoon} from "../shared/ComingSoon";

export const routes:RouteRecordRaw[] = [
    {path:'/',redirect:'/welcome'},
    {path:'/welcome',component: AdvertisingPage,
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
    {path:'/start',component:StartPage},
    {path:'/account',component:StartAccount},
    {path:'/tagCreate',component:TagCreatePage},
    {path:'/tagEdit',component:TagEdit},
    {path:'/accountDetail',component:AccountDetail},
    {path:'/sign_in',component:SignInPage},
    {path:'/analysis',component:Analysis},
    {path:'/export',component:ComingSoon},
    {path:'/remind',component:ComingSoon}
]