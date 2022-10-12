import {defineComponent, ref} from "vue";
import s from './Calculator.module.scss'
import dateIcon from '../assets/icons/date.svg'

export const Calculator=defineComponent({
    setup:()=>{
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
            {text:'提交',onClick:()=>{}},
        ]
        const pressNumber=ref(null)
        const press=(e:any)=>{
            pressNumber.value= e.target.innerText
            console.log(pressNumber.value)
            setTimeout(()=>{
                pressNumber.value=null
            },200)
        }

        const refAmount = ref('')
        return ()=>(
            <div class={s.wrapper}>
                <div class={s.dateAndAmount}>
                    <div class={s.datePicker}>
                        <img src={dateIcon} alt='一本日历' class={s.dateIcon}/>
                        <span>时间</span>
                    </div>
                    <span class={s.AmountNumber}>{refAmount.value}</span>
                </div>
                <div class={s.gridCalculator} onClick={press}>
                    {button.map(button=>
                    <button onClick={button.onClick}
                            class={(pressNumber.value===button.text) ? s.pressOn: s.pressUp}>{button.text}</button>
                    )}
                </div>
            </div>
        )
    }
})