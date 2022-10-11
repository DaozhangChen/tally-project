import {defineComponent} from "vue";
import pig from '../../assets/icons/pig.svg'
import s from './Welcome.module.scss'

export const Welcome1= defineComponent({
    setup:()=> {
        return ()=>(
            <div>
            <div class={s.wrapper}>
                <img src={pig} alt='一只猪' class={s.pig}/>
                <h1 class={s.text}>会省钱</h1>
                <h1>还要会花钱</h1>
            </div>
            </div>
        )
    }
})
