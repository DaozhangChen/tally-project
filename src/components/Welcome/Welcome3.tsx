import {defineComponent} from "vue";
import s from "./Welcome.module.scss";
import chart from "../../assets/icons/charts.svg";

export const Welcome3=defineComponent({
    setup:()=>{
        return()=>(
            <>
                <main class={s.wrapper}>
                    <img src={chart} alt='一个数据表' class={s.icon}/>
                    <h1 class={s.text}>数据可视化</h1>
                    <h1>收支一目了然</h1>
                </main>
            </>
        )
    }
})