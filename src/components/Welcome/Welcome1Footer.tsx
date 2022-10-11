import {defineComponent} from "vue";
import {RouterLink} from "vue-router";

export const Welcome1Footer=defineComponent({
    setup:()=>{
        return()=>(
            <>
                <RouterLink to='/start'>跳过</RouterLink>
                <RouterLink to='/welcome/2'>完成</RouterLink>
                <RouterLink to='/start'>跳过</RouterLink>
            </>
        )
    }
})