import {defineComponent} from "vue";
import pig from '../assets/icons/pig.svg'
import s from './StartPage.module.scss'
import {MainLayout} from "../shared/MainLayout";
import {FloatButton} from "../shared/FloatButton";
import {Menu} from "../shared/Menu";
import {useRouter} from "vue-router";

export const StartPage=defineComponent({
    setup:()=> {
        const router=useRouter()
        const startAccount=()=>{
            router.push('/account').then(
                (response)=>{return response},
                (error)=>{throw error}
            )
        }
        return () => (
            <div>
                <MainLayout>
                    {{
                        icon:()=><Menu />,
                        title:()=>'深蓝记账',
                        default:()=>
                            <div>
                                <main class={s.bodyText}>
                                    <img src={pig} alt='一只猪' class={s.bodyIcon}/>
                                    <button class={s.bodyButton} onClick={startAccount}>开始记账</button>
                                </main>
                                <FloatButton />
                            </div>
                    }}
                </MainLayout>
            </div>
        )
    }
})