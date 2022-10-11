import {defineComponent} from "vue";
import {RouterLink} from "vue-router";
import s from "./Welcome.module.scss";

export const Welcome2Footer=defineComponent({
    setup:()=>{
        return()=>(
            <>
                <RouterLink to='/start' class={s.fake}>跳过</RouterLink>
                <RouterLink to='/welcome/3'>下一页</RouterLink>
                <RouterLink to='/start'>跳过</RouterLink>
            </>
        )
    }
})