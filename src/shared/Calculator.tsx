import {defineComponent, PropType, ref, watch} from "vue";
import s from './Calculator.module.scss'
import dateIcon from '../assets/icons/date.svg'
import {DatetimePicker, Popup} from "vant/es";
import 'vant/es/datetime-picker/style'
import 'vant/es/popup/style'
import {Time} from "./time";


export const Calculator=defineComponent({
    props:{
        amount:Number,
        onClick:Function as PropType<(e:Event)=>void>,
        time:String
    },
    emits:['update:amount','update:time'],
    setup:(props,context)=>{
        const refTime=ref(new Date().toISOString())
        console.log(new Time())

        //计算器输入规则
        const appendText = (n: number | string) => {
            const nString = n.toString()
            const dotIndex = refAmount.value.indexOf('.')
            if (refAmount.value.length >= 13) {
                return
            }
            if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
                return
            }
            if (nString === '.') {
                if (dotIndex >= 0) { // 已经有小数点了
                    return
                }
            } else if (nString === '0') {
                if (dotIndex === -1) { // 没有小数点
                    if (refAmount.value === '0') { // 没小数点，但是有0
                        return
                    }
                }
            } else {
                if (refAmount.value === '0') {
                    refAmount.value = ''
                }
            }
            refAmount.value += n.toString()
        }
        const button=[
            {text:'1',onClick:()=>{appendText(1)}},
            {text:'2',onClick:()=>{appendText(2)}},
            {text:'3',onClick:()=>{appendText(3)}},
            {text:'4',onClick:()=>{appendText(4)}},
            {text:'5',onClick:()=>{appendText(5)}},
            {text:'6',onClick:()=>{appendText(6)}},
            {text:'7',onClick:()=>{appendText(7)}},
            {text:'8',onClick:()=>{appendText(8)}},
            {text:'9',onClick:()=>{appendText(9)}},
            {text:'0',onClick:()=>{appendText(0)}},
            {text:'.',onClick:()=>{appendText('.')}},
            {text:'清空',onClick:()=>{refAmount.value=''}},
            {text:'提交',onClick:props.onClick},
        ]
        const pressNumber=ref(null)
        const press=(e:any)=>{
            pressNumber.value= e.target.innerText
            setTimeout(()=>{
                pressNumber.value=null
            },200)
        }
        const refAmount = ref('')
        watch([refAmount,refTime],()=>{
            context.emit('update:amount',parseFloat(refAmount.value) * 100);
            context.emit('update:time',refTime.value);
        },{immediate:true})

        //时间选择器与弹出层
        const refShow=ref(false)
        const controlShow=()=>{
            refShow.value= !refShow.value
        }
        const hideDatePicker=()=>refShow.value=false

        const setTime=(date:Date)=>{
            console.log(refTime.value)
            context.emit('update:time',date.toISOString())
            hideDatePicker()
        }

        return ()=>(
            <div class={s.wrapper}>
                <div class={s.dateAndAmount}>
                    <div class={s.datePicker} >
                        <div onClick={controlShow} class={s.miniDatePicker}>
                        <img src={dateIcon} alt='一本日历' class={s.dateIcon} />
                        <span class={s.showTime}>{new Time(props.time).format()}</span>
                        </div>
                        <Popup v-model:show={refShow.value} position='bottom'>
                            <DatetimePicker title='选择时间'
                                            modelValue={new Date(refTime.value)}
                                            onCancel={hideDatePicker}
                                            onConfirm={setTime}
                            />
                        </Popup>
                    </div>
                    <span class={s.AmountNumber}>{refAmount.value}</span>
                </div>
                <div class={s.gridCalculator} onClick={press}>
                    {button.map(item=>
                    <button onClick={item.onClick}
                            class={(pressNumber.value===item.text) ? s.pressOn: s.pressUp}
                            type='button'
                    >{item.text}
                    </button>
                    )}
                </div>
            </div>
        )
    }
})