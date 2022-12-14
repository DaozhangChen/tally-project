import {defineComponent, PropType, ref, resolveTransitionHooks} from "vue";
import s from './Tabs.module.scss'

export const Tabs=defineComponent({
    props:{
        selected:String,
        onClick:Function as PropType<()=>void >
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
        return <div class={s.wrapper} onClick={props.onClick}>
                <ul class={s.tabClass}>
                    {tabs.map(item =>
                        <li class={(props.selected===item.props?.name) ?  [s.normal,s.selected]: s.normal}
                            onClick={()=>{
                                context.emit('update:selected',item.props?.name)
                                 if(item.props?.name==="income" || item.props?.name ==="expenses") {
                                     localStorage.setItem('kind', item.props?.name)
                                 }
                            }}
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
        text:String,
    },
    setup:(props,context)=>{
        return ()=>(
            <div />
        )
    }
})