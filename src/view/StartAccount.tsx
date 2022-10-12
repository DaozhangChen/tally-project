import {defineComponent} from "vue";
import {MainLayout} from "../shared/MainLayout";
import comeback from '../assets/icons/comeback.svg'
import s from  './StartAccount.module.scss'
import {Calculator} from "../shared/Calculator";

export const StartAccount=defineComponent({
    setup:()=>{
        return()=>(
                <MainLayout>
                    {{
                        icon:()=><img src={comeback}/>,
                        title:()=>'记一笔',
                        default:()=>(
                            <div class={s.wrapper}>
                                <ul class={s.tabs}>
                                    <li class={s.selected}>
                                        支出
                                    </li>
                                    <li>
                                        收入
                                    </li>
                                </ul>
                                <div>数据</div>
                                <div>
                                    <Calculator />
                                </div>
                            </div>
                        )
                    }}
                </MainLayout>
        )
    }
})