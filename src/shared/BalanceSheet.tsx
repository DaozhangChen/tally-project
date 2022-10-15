import {defineComponent} from "vue";
import s from  './BalanceSheet.module.scss'

export const BalanceSheet=defineComponent({
    setup:(prop,context)=>{
        return ()=>
            <div class={s.wrapper}>
                <div class={s.mainBalanceClass}>
                    <div class={[s.navClass,s.income]}>
                        <div>收入</div>
                        <span>128</span>
                    </div>
                    <div class={[s.navClass,s.expend]}>
                        <div>支出</div>
                        <span>100</span>
                    </div>
                    <div class={[s.navClass,s.balance]}>
                        <div>净收入</div>
                        <span>28</span>
                    </div>
                </div>
            </div>

    }
})