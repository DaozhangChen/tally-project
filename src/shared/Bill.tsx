import {defineComponent, PropType, reactive} from "vue";
import s from './Bill.module.scss'

export const Bill=defineComponent({

    setup:()=> {
        const billList =reactive({
            sign:String,
            name:String,
            kind:String as PropType<'income'|'expend'>,
            amount:String as PropType<string|number>
        })
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