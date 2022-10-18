import {defineComponent, reactive, watch} from "vue";
import s from  './BalanceSheet.module.scss'
import {Time} from "./time";
import {http} from "./Http";

export const BalanceSheet=defineComponent({
    props:{
        startTime:Time,
        endTime:Time,
        select:String,
        onConfirm:Boolean
    },
    setup:(props,context)=>{
        const itemsBalance = reactive({
            expenses: 0, income: 0, balance: 0
        })
        watch(()=>[props.startTime,props.endTime,props.onConfirm],async ()=>{
            if (props.select==='anyTime'){
                if (props.onConfirm){
                    const response=await http.get('/items/balance',{
                        happen_after:props.startTime?.format(),
                        happen_before:props.endTime?.format()
                    })
                    Object.assign(itemsBalance, response.data)
                }else return
            }else {
                const response = await http.get('/items/balance', {
                    happen_after: props.startTime?.format(),
                    happen_before: props.endTime?.format()
                })
                Object.assign(itemsBalance, response.data)
            }

        },{immediate:true})
        return ()=>
            <div class={s.wrapper}>
                <div class={s.mainBalanceClass}>
                    <div class={[s.navClass,s.income]}>
                        <div>收入</div>
                        <span>{(itemsBalance.income)/100}</span>
                    </div>
                    <div class={[s.navClass,s.expend]}>
                        <div>支出</div>
                        <span>{(itemsBalance.expenses)/100}</span>
                    </div>
                    <div class={[s.navClass,s.balance]}>
                        <div>净收入</div>
                        <span>{(itemsBalance.balance)/100}</span>
                    </div>
                </div>
            </div>

    }
})