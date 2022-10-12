import {defineComponent, PropType, ref} from "vue";
import s from './Sidebar.module.scss'
import pig from '../assets/icons/pig.svg'
import chart from '../assets/icons/charts.svg'
import exports from '../assets/icons/export.svg'
import notice from '../assets/icons/notice.svg'

export const Sidebar=defineComponent({
    props:{
        onClose:{
            type:Function as PropType<()=>void>
        }
    },
    setup:(props)=>{
        const close=()=>{
            props.onClose?.()
        }
        return ()=>(
            <div class={s.wrapper}>
            <main class={s.mainBar}>
            <div class={s.userTitle}>
                <h1 class={s.userText}>未登录用户</h1>
                <p class={s.underUserText}>点击这里登录</p>
            </div>
            <ul class={s.listClass}>
                <li>
                    <img src={pig} class={s.miniIcon}/>
                    <p>记账</p>
                </li>
                <li>
                    <img src={chart} class={s.miniIcon}/>
                    <p>统计图表</p>
                </li>
                <li>
                    <img src={exports} class={s.miniIcon}/>
                    <p>导出数据</p>
                </li>
                <li>
                    <img src={notice} class={s.miniIcon}/>
                    <p>记账提醒</p>
                </li>
            </ul>
            </main>
            <div class={s.mask} onClick={close}/>
            </div>
        )
    }
})