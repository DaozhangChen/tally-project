import {defineComponent, PropType, reactive, ref, watch} from "vue";
import s from './Bill.module.scss'
import {Time} from "./time";
import {http} from "./Http";

export const Bill=defineComponent({
    props:{
        selected:String,
        startTime:Time,
        endTime:Time,
        onConfirm:Boolean
    },

    setup:(props,context)=> {
        const billList =reactive({
            sign:String,
            name:String,
            kind:String as PropType<'income'|'expenses'>,
            amount:String as PropType<string|number>
        })
        const resourceData=ref([])
        const getItem=reactive({
            page:1,
            happen_after:new Time().format(),
            happen_before:new Time().format()
        })

        const getBills=async ()=>{
            getItem.happen_after=props.startTime!.format()
            getItem.happen_before=props.endTime!.format()
            const response = await http.get('/items',getItem,{_autoLoading:true})
            const {resources,pager}=response.data
            resourceData.value.push(...resources)
        }

        watch(()=>[props.selected,props.onConfirm],async (value)=>{
            if (props.selected==='anyTime'){
                if (props.onConfirm){
                    resourceData.value=[]
                    await getBills()
                }else return
            }else {
                resourceData.value=[]
                await getBills()
            }
        },{immediate:true})






        return () => <div class={s.wrapper}>
            <div class={s.mainFlexClass}>
                <div class={s.lastChild}>
                    {resourceData.value.map(item=>
                        <div class={s.billBar}>
                            <div class={s.iconClass}>{item.tags[0].sign}</div>
                            <div class={s.nameAndTime}>
                                <div class={s.name}>{item.tags[0].name}</div>
                                <div class={s.time}>{new Time(item.created_at).format()}</div>
                            </div>
                            <div class={item.tags[0].kind==='expenses'? s.amountClass : s.incomeColor}>{`￥${(item.amount)/100}`}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    }
})