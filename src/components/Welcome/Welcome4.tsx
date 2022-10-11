import {defineComponent} from "vue";
import s from "./Welcome.module.scss";
import cloud from "../../assets/icons/cloud.svg";

export const Welcome4=defineComponent({
    setup:()=>{
        return()=>(
            <>
                <main class={s.wrapper}>
                    <img src={cloud} alt='一朵云' class={s.icon}/>
                    <h1 class={s.text}>云备份</h1>
                    <h1>再也不怕数据丢失</h1>
                </main>
            </>
        )
    }
})