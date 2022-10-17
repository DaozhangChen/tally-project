import {defineComponent, reactive, ref, watch} from "vue";
import {MainLayout} from "../shared/MainLayout";
import {Menu} from "../shared/Menu";
import {FloatButton} from "../shared/FloatButton";
import {BalanceSheet} from "../shared/BalanceSheet";
import {Tab,Tabs} from "../shared/Tabs";
import {Bill} from "../shared/Bill";
import {Time} from "../shared/time";
import 'vant/es/popup/style'
import 'vant/es/datetime-picker/style'
import {DatetimePicker, Popup} from "vant";
import s from './AccountDetail.module.scss'


export const AccountDetail=defineComponent({
    setup:(props,context)=> {
        const selected=ref<string>('thisMonth')
        const refTime=new Time()
        const StartEndTime=reactive({
            startTime:new Time(),
            endTime:new Time()
        })
        const refShow=ref(false)
        const controlShow=()=>{
            if (selected.value==='anyTime'){
                refShow.value = !refShow.value
            }
        }
        const showDatePicker=ref(false)
        const currentDate=ref(new Date())
        const StartOrEnd=ref('start')

        const setStartTime=()=>{
            showDatePicker.value=true
            StartOrEnd.value='start'
            console.log(StartOrEnd.value)
        }
        const setEndTime=()=>{
            showDatePicker.value=true
            StartOrEnd.value='end'
            console.log(StartOrEnd.value)
        }
        const setAnyTime=(date:Date)=>{
            console.log('1111')
            if (StartOrEnd.value==='start'){
                StartEndTime.startTime=new Time(date)
                console.log(StartEndTime.startTime)
                showDatePicker.value=false
            }else if (StartOrEnd.value==='end'){
                StartEndTime.endTime=new Time(date)
                showDatePicker.value=false
            }

        }

        watch(selected,()=>{
            if (selected.value==='thisMonth'){
                Object.assign(StartEndTime,{
                    startTime:refTime.firstDayOfMonth(),
                    endTime:refTime.lastDayOfMonth()
                })
                console.log(StartEndTime)
            }else if (selected.value==='beforeMonth'){
                Object.assign(StartEndTime,{
                    startTime:refTime.add(-1,'month').firstDayOfMonth(),
                    endTime:refTime.add(-1,'month').lastDayOfMonth()
                })
                console.log(StartEndTime)
            }else if (selected.value==='thisYear'){
                Object.assign(StartEndTime,{
                    startTime:refTime.firstDayOfYear(),
                    endTime:refTime.lastDayOfYear()
                })
                console.log(StartEndTime)
            }else if (selected.value==='anyTime'){
                console.log('444')

            }else {return }
          },{immediate:true}
        )

        return () => (
            <MainLayout>{{
                title: () => '山竹记账',
                icon: () => <Menu/>,
                default: () =>
                    { return <div>
                    <Tabs v-model:selected={selected.value} onClick={controlShow}>
                        <Tab text='本月' name='thisMonth'/>
                        <Tab text='上月' name='beforeMonth'></Tab>
                        <Tab text='今年' name='thisYear'></Tab>
                        <Tab text='自定义时间' name='anyTime'></Tab>
                    </Tabs>
                    <BalanceSheet />
                    <Bill selected={selected.value}/>
                    <FloatButton />
                     <Popup v-model:show={refShow.value}>
                         <div class={s.topAnyTimeClass}>
                             <div class={s.title}>请选择时间</div>
                             <div class={s.startTime}>
                                 <span>开始时间</span>
                                 <div onClick={setStartTime}>{StartEndTime.startTime.format()}</div>
                             </div>
                             <div class={s.endTime}>
                                 <span>结束时间</span>
                                 <div onClick={setEndTime}>{StartEndTime.endTime.format()}</div>
                             </div>
                             <button type='button' class={s.yesButton}>确定</button>
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
                    </div>;}

            }}</MainLayout>
        )
    }
})