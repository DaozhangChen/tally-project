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

export const routes:RouteRecordRaw[] = [
    {path:'/',redirect:'/welcome'},
    {path:'/welcome',component: AdvertisingPage,children:[
        {path:'',redirect:'/welcome/1'},
        {path:'1',components:{default:Welcome1,footer:Welcome1Footer}},
        {path:'2',components:{default:Welcome2,footer:Welcome2Footer}},
        {path:'3',components:{default:Welcome3,footer:Welcome3Footer}},
        {path:'4',components:{default:Welcome4,footer:Welcome4Footer}},
        ]},
]