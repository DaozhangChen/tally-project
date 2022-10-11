import {RouteRecordRaw} from "vue-router";
import {AdvertisingPage} from "../view/AdvertisingPage";
import {Welcome1} from "../components/Welcome/Welcome1";
import {Welcome1Footer} from "../components/Welcome/Welcome1Footer";

export const routes:RouteRecordRaw[] = [
    {path:'/',redirect:'/welcome'},
    {path:'/welcome',component: AdvertisingPage,children:[
        {path:'',redirect:'welcome/1'},
        {path:'1',components:{default:Welcome1,footer:Welcome1Footer}},
        // {path:'2',components:{default:Welcome2,footer:Welcome2Footer}},
        // {path:'3',components:{default:Welcome3,footer:Welcome3Footer}},
        // {path:'4',components:{default:Welcome4,footer:Welcome4Footer}},
        ]},
]