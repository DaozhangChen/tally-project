import {defineComponent, ref, resolveTransitionHooks} from "vue";
import s from './Tabs.module.scss'

export const Tabs=defineComponent({
    props:{
        selected:String
    },
    emits:['update:selected'],
    setup:(props,context)=>{
        return ()=>{
        const tabs=context.slots.default?.()
        if (!tabs) return ()=> null
        for (const element of tabs){
            if (element.type !== Tab){
                throw new Error('<Tabs> only accepts <Tab> as children')
            }
        }
        return <div class={s.wrapper}>
                <ul class={s.tabClass}>
                    {tabs.map(item =>
                        <li class={(props.selected===item.props?.name) ?  [s.normal,s.selected]: s.normal}
                            onClick={()=>context.emit('update:selected',item.props?.name)}
                        >
                            {item.props?.text}
                        </li>
                    )}
                </ul>
               </div>
        }
    }
})


export const Tab =defineComponent({
    props:{
        name:String,
        text:String
    },
    setup:(props,context)=>{
        return ()=>(
            <div>{context.slots.default?.()}</div>
        )
    }
})