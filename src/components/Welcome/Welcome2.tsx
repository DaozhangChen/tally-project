import {defineComponent} from "vue";
import s from "./Welcome.module.scss";
import clock from '../../assets/icons/clock.svg'

export const Welcome2=defineComponent({
    setup:()=> {
        return()=> (
          <div>
            <div class={s.wrapper}>
                <img src={clock} alt='一个闹钟' class={s.icon}/>
                <h1 class={s.text}>每日提醒</h1>
                <h1>不会遗漏一笔账单</h1>
            </div>
          </div>

        )
    }
})