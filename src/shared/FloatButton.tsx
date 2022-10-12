import {defineComponent} from "vue";
import s from "./FloatButton.module.scss";
import add from "../assets/icons/add.svg";

export const FloatButton=defineComponent({
    setup:()=>{
        return ()=>(
            <div>
            <div class={s.floatButton}>
                <img src={add} alt='浮动按钮'/>
            </div>
            </div>
        )
    }
})