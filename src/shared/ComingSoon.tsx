import {defineComponent} from "vue";
import pig from '../assets/icons/pig.svg'
import s from './ComingSoon.module.scss'
import {useRouter} from "vue-router";

export const ComingSoon=defineComponent({
    setup:()=>{
        const router=useRouter()
        return()=>(
            <div class={s.wrapper} onClick={()=>router.back()}>
                <img src={pig} alt='一只猪'/>
                <h1>敬请期待</h1>
                <h2>点击任意位置返回</h2>
            </div>
        )
    }
})