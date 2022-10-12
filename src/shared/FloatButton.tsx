import {defineComponent} from "vue";
import s from "./FloatButton.module.scss";
import add from "../assets/icons/add.svg";
import {useRouter} from "vue-router";

export const FloatButton=defineComponent({
    setup:()=>{
        const router=useRouter()
        const startAccount=()=>{
            router.push('/account').then(
                (response)=>{return response},
                (error)=>{throw error}
            )
        }
        return ()=>(
            <div>
            <div class={s.floatButton} onClick={startAccount}>
                <img src={add} alt='浮动按钮'/>
            </div>
            </div>
        )
    }
})