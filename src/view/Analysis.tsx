import {defineComponent} from "vue";
import {MainLayout} from "../shared/MainLayout";
import back from '../assets/icons/comeback.svg'
import {AnalysisMainPage} from "../components/AnalysisPage/AnalysisMainPage";
import {useRouter} from "vue-router";

export const Analysis=defineComponent({
    setup:()=>{
        const router=useRouter()
        return()=>
            <MainLayout>
                {{
                    title:()=>'统计图表',
                    icon:()=><img src={back} onClick={()=>router.back()}/>,
                    default:()=>
                        <div>
                        <AnalysisMainPage />
                        </div>
                }}
            </MainLayout>

    }
})