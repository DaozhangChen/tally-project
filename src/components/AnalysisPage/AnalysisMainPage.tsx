import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import s from './AnalusisMainPage.module.scss'
import {Tab,Tabs} from "../../shared/Tabs";
import {LineChart} from "./Chart/LineChart";
import {PieChart} from "./Chart/PieChart";
import {BarChart} from "./Chart/BarChart";
import {selectTime} from "../../shared/selectTime";
import {http} from "../../shared/Http";
import {Time} from "../../shared/time";
import 'vant/es/datetime-picker/style'
import 'vant/es/popup/style'
import {DatetimePicker, Popup} from "vant";

const DAY=24*3600*1000

type Data1Item = { happen_at: string; amount: number }
type Data1 = Data1Item[]
type Data2Item = { tag_id: number; tag: Tag; amount: number }
type Data2 = Data2Item[]
export const AnalysisMainPage=defineComponent({
    setup:()=>{
        const selected=ref<string>('thisMonth')
        const kind=ref('expenses')
        const data1=ref<Data1>()
        const data2=ref<Data2>()
        const refShow=ref(false)
        const showDatePicker=ref(false)
        const StartOrEnd=ref<'start'|'end'>()
        const currentDate=ref(new Date())
        const controlShow=()=>{
            if (selected.value==='anyTime'){
                refShow.value = !refShow.value
            }
        }

        const formData1=reactive({
            happen_after:String,
            happen_before:String,
            kind:kind.value,
            group_by:'happen_at'
        })
        const formData2=reactive({
            happen_after:String,
            happen_before:String,
            kind:kind.value,
            group_by:'tag_id'
        })

        const betterData1 = computed<[string, number][]>(() => {
            if (!formData1.happen_before || !formData1.happen_before ||!data1.value) {
                return []
            }
            const diff = new Date(formData1.happen_before).getTime() - new Date(formData1.happen_after).getTime()
            const n = diff / DAY + 1
            return Array.from({ length: n }).map((_, i) => {
                const time = new Time(formData1.happen_after + 'T00:00:00.000+0800').add(i, 'day').getTimestamp()
                const item = data1.value[0]
                const amount = item && new Date(item.happen_at + 'T00:00:00.000+0800').getTime() === time ? data1.value.shift()!.amount : 0
                return [new Date(time).toISOString(), amount]
            })
        })

        const betterData2 = computed<{ name: string; value: number }[]>(() => {
            if (!data2.value) {return []}
            return data2.value?.map((item) => ({
                name: item.tag.name,
                value: item.amount
            }))

        })
        const betterData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
            if (!data2.value) {return []}
            const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
            return data2.value.map((item) => ({
                ...item,
                percent: Math.round((item.amount / total) * 100)
            }))
        })

        const fetchData1=async ()=> {
            const response = await http.get<{ groups: Data1; summary: number }>('/items/summary', formData1, {_autoLoading: true})
            data1.value = response.data.groups
        }
        const fetchData2 = async () => {
            const response = await http.get<{ groups: Data2; summary: number }>('/items/summary', formData2)
            data2.value = response.data.groups
        }
        const dataReplace=()=>{
            const {startTime,endTime} = selectTime(selected.value)
            formData1.happen_after =startTime.format()
            formData1.happen_before=endTime.format()
            formData2.happen_after =startTime.format()
            formData2.happen_before=endTime.format()
            formData1.kind=kind.value
            formData2.kind=kind.value
        }

        const setStartTime=()=>{
            showDatePicker.value=true
            StartOrEnd.value='start'
        }
        const setEndTime=()=>{
            showDatePicker.value=true
            StartOrEnd.value='end'
        }
        const confirmSetAnyTime=()=>{
            fetchData1()
            fetchData2()
            refShow.value=false
        }
        const setAnyTime=(date:Date)=>{
            if (StartOrEnd.value==="start"){
                formData1.happen_after=new Time(new Date(date)).format()
                formData2.happen_after=new Time(new Date(date)).format()
            }else if(StartOrEnd.value==="end"){
                formData1.happen_before=new Time(new Date(date)).format()
                formData2.happen_before=new Time(new Date(date)).format()
            }
            showDatePicker.value=false
        }

        watch(()=>[kind.value,selected.value], ()=>{
            if (selected.value==='anyTime'){return}
            dataReplace()
            fetchData1()
            fetchData2()
        },{immediate:true})




        return()=>
            <div>
                <Tabs v-model:selected={selected.value} onClick={controlShow}>
                    <Tab name='thisMonth' text='本月'/>
                    <Tab name='beforeMonth' text='上月'/>
                    <Tab name='anyTime' text='自定义时间'/>
                </Tabs>
                <div class={s.wrapper}>
                    <div class={s.selectClass}>
                        <span class={s.spanText}>类型</span>
                        <select onChange={(e)=>{kind.value=e.target.value}}>
                            <option value='expenses'>支出</option>
                            <option value='income'>收入</option>
                        </select>
                    </div>
                </div>
                <div>
                    <LineChart data={betterData1.value}/>
                </div>
                <div>
                    <PieChart data={betterData2.value}/>
                </div>
                <div>
                    <BarChart data={betterData3.value}/>
                </div>
                <Popup v-model:show={refShow.value}>
                    <div class={s.topAnyTimeClass}>
                        <div class={s.title}>请选择时间</div>
                        <div class={s.startTime}>
                            <span>开始时间</span>
                            <div onClick={setStartTime}>{formData1.happen_after}</div>
                        </div>
                        <div class={s.endTime}>
                            <span>结束时间</span>
                            <div onClick={setEndTime}>{formData1.happen_before}</div>
                        </div>
                        <button type='button' class={s.yesButton} onClick={confirmSetAnyTime}>确定</button>
                        <button type='button' class={s.noButton} onClick={()=>refShow.value=false}>取消</button>
                    </div>
                </Popup>
                <Popup v-model:show={showDatePicker.value} position='bottom'>
                    <DatetimePicker type="date"
                                    v-model={currentDate.value}
                                    title='请选择时间'
                                    onConfirm={setAnyTime}
                                    onCancel={()=>showDatePicker.value=false}
                    />
                </Popup>
            </div>

    }
})