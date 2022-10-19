import {defineComponent} from "vue";
import {MainLayout} from "../shared/MainLayout";
import back from '../assets/icons/comeback.svg'
import s from './Analysis.module.scss'
import {AnalysisMainPage} from "../components/AnalysisPage/AnalysisMainPage";

export const Analysis=defineComponent({
    setup:()=>{
        return()=>
            <MainLayout>
                {{
                    title:()=>'统计图表',
                    icon:()=><img src={back}/>,
                    default:()=>
                        <div>
                        <AnalysisMainPage />
                        </div>
                }}
            </MainLayout>

    }
})