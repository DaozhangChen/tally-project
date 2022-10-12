import {defineComponent} from "vue";
import menu from '../assets/icons/menu.svg'
import pig from '../assets/icons/pig.svg'
import s from './StartPage.module.scss'
import {MainLayout} from "../shared/MainLayout";
import {FloatButton} from "../shared/FloatButton";
import {Menu} from "../shared/Menu";

export const StartPage=defineComponent({
    setup:()=> {
        return () => (
            <div>
                <MainLayout>
                    {{
                        icon:()=><Menu />,
                        title:()=>'山竹记账',
                        default:()=>
                            <div>
                                <main class={s.bodyText}>
                                    <img src={pig} alt='一只猪' class={s.bodyIcon}/>
                                    <button class={s.bodyButton}>开始记账</button>
                                </main>
                                <FloatButton />
                            </div>
                    }}
                </MainLayout>
            </div>
        )
    }
})