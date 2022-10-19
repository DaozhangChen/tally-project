import {defineComponent, ref} from "vue";
import s from './AnalusisMainPage.module.scss'
import {Tab,Tabs} from "../../shared/Tabs";
import {LineChart} from "./Chart/LineChart";
import {PieChart} from "./Chart/PieChart";
import {BarChart} from "./Chart/BarChart";

export const AnalysisMainPage=defineComponent({
    setup:()=>{
        const selected=ref<string>('thisMonth')
        const refShow=ref(false)
        const controlShow=()=>{
            if (selected.value==='anyTime'){
                refShow.value = !refShow.value
            }
        }
        return()=>
            <div>
                <Tabs v-model:selected={selected.value} onClick={controlShow}>
                    <Tab name='thisMonth' text='本月'/>
                    <Tab name='beforeMonth' text='上月'/>
                    <Tab name='thisYear' text='今年'/>
                    <Tab name='anyTime' text='自定义时间'/>
                </Tabs>
                <div class={s.wrapper}>
                    <div class={s.selectClass}>
                        <span class={s.spanText}>类型</span>
                        <select>
                            <option value='expenses'>支出</option>
                            <option value='income'>收入</option>
                        </select>
                    </div>
                </div>
                <div>
                    <LineChart/>
                </div>
                <div>
                    <PieChart />
                </div>
                <div>
                    <BarChart />
                </div>
            </div>

    }
})