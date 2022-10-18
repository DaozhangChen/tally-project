import {defineComponent, onMounted, PropType, ref} from "vue";
import s from './Sidebar.module.scss'
import pig from '../assets/icons/pig.svg'
import chart from '../assets/icons/charts.svg'
import exports from '../assets/icons/export.svg'
import notice from '../assets/icons/notice.svg'
import {RouterLink} from "vue-router";
import {http} from "./Http";
import {meStore} from "../store/meStote";


export const Sidebar=defineComponent({
    props:{
        onClose:{
            type:Function as PropType<()=>void>
        }
    },
    setup:(props)=>{
        const useMeStore=meStore()
        const me=ref()
        onMounted( ()=>{
            me.value=useMeStore.mePromise
        })
        return ()=>(
            <div class={s.wrapper}>
            <main class={s.mainBar}>
            <div class={s.userTitle}>
                {me.value ? (
                    <div>
                    <h1 class={s.emailText}>{useMeStore.meEmail}</h1>
                    <p class={s.underUserText}>点击这里退出登录</p>
                    </div>
                    )
                    :
                    (   <div>
                        <h1 class={s.userText}>未登录用户</h1>
                        <p class={s.underUserText}>点击这里登录</p>
                        </div>
                    )
                }

            </div>
            <ul class={s.listClass}>
                <RouterLink to='/account'>
                <li>
                    <img src={pig} class={s.miniIcon}/>
                    <p>记账</p>
                </li>
                </RouterLink>
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
            <div class={s.mask} onClick={props.onClose}/>
            </div>
        )
    }
})