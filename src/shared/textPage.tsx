import {defineComponent} from "vue";
import s from "../view/StartPage.module.scss";
import {MainLayout} from "./MainLayout";
import menu from "../assets/icons/menu.svg";
import pig from "../assets/icons/pig.svg";
import add from "../assets/icons/add.svg";
import {FloatButton} from "./FloatButton";


export const textPage=defineComponent({
    setup:(props,context)=>{
        return ()=>(
            <MainLayout>
                {{
                    icon:()=><img src={menu} alt='一个菜单' class={s.titleIcon}/>,
                    title:()=>'深蓝记账',
                    default:()=>
                        <div>
                        <main class={s.bodyText}>
                        <img src={pig} alt='一只猪' class={s.bodyIcon}/>
                        <button class={s.bodyButton}>开始记账</button>
                    </main>
                            <div class={s.floatButton}>
                                <img src={add} alt='浮动按钮'/>
                            </div>
                    </div>
                }}
            </MainLayout>
        )
    }
})