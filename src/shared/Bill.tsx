import {defineComponent, PropType, reactive, ref, watch} from "vue";
import s from './Bill.module.scss'
import {Time} from "./time";
import {http} from "./Http";
import {count} from "echarts/types/src/component/dataZoom/history";

export const Bill=defineComponent({
    props:{
        selected:String,
        startTime:Time,
        endTime:Time,
        onConfirm:Boolean
    },

    setup:(props,context)=> {
        const resourceData=ref([])
        const hasMore=ref<boolean>(false)
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
            if (pager.count===25){
                getItem.page += 1
                hasMore.value=true
            }else{
                hasMore.value=false
            }
        }

        const fetchMore=()=>{
            getBills()
        }

        watch(()=>[props.selected,props.onConfirm],async (value)=>{
            if (props.selected==='anyTime'){
                if (props.onConfirm){
                    resourceData.value=[]
                    getItem.page=1
                    await getBills()
                }else return
            }else {
                resourceData.value=[]
                getItem.page=1
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
                <div class={s.buttonClass}>
                    {hasMore.value? <button class={s.buttonMainClass} onClick={fetchMore}>加载更多</button>
                        :
                        <div>暂无更多记账</div>
                    }

                </div>
            </div>
        </div>
    }
})