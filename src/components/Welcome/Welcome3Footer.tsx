import {defineComponent} from "vue";
import {RouterLink} from "vue-router";
import s from "./Welcome.module.scss";

export const Welcome3Footer=defineComponent({
    setup:()=>{
        return()=>(
            <>
                <RouterLink to='/start' class={s.fake}>跳过</RouterLink>
                <RouterLink to='/welcome/4'>下一页</RouterLink>
                <RouterLink to='/start'>跳过</RouterLink>
            </>
        )
    }
})