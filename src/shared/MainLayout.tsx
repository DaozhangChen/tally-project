import {defineComponent} from "vue";
import s from "../view/StartPage.module.scss";
import menu from "../assets/icons/menu.svg";
import pig from "../assets/icons/pig.svg";
import add from "../assets/icons/add.svg";

export const MainLayout=defineComponent({
    setup:(props,context)=>{
        return ()=>(
            <div>
                <div class={s.wrapper}>
                    <header class={s.headerText}>
                        {context.slots.icon?.()}
                        <h1 class={s.titleText}>{context.slots.title?.()}</h1>
                    </header>
                    <div>
                        {context.slots.default?.()}
                    </div>
                </div>
            </div>
        )
    }
})