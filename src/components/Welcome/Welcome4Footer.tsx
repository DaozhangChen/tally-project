import {defineComponent} from "vue";
import {RouterLink} from "vue-router";
import s from "./Welcome.module.scss";

export const Welcome4Footer=defineComponent({
    setup:()=>{
        return()=>(
            <>
                <RouterLink to='/start' class={s.fake}>跳过</RouterLink>
                <RouterLink to='/start'>完成</RouterLink>
                <RouterLink to='/start' class={s.fake}>跳过</RouterLink>
            </>
        )
    }
})