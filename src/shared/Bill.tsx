import {defineComponent, PropType, reactive, watch} from "vue";
import s from './Bill.module.scss'

export const Bill=defineComponent({
    props:{
        selected:String
    },

    setup:(props,context)=> {
        const billList =reactive({
            sign:String,
            name:String,
            kind:String as PropType<'income'|'expenses'>,
            amount:String as PropType<string|number>
        })
        watch(()=>props.selected,(value, oldValue, onCleanup)=>{console.log('22')})
        return () => <div class={s.wrapper}>
            <div class={s.mainFlexClass}>
                <div>
                    <div class={s.billBar}>
                        <div class={s.iconClass}>sign</div>
                        <div class={s.nameAndTime}>
                            <div class={s.name}>name</div>
                            <div class={s.time}>time</div>
                        </div>
                        <div class={s.amountClass}>￥4654655464564</div>
                    </div>
                </div>
            </div>
        </div>
    }
})