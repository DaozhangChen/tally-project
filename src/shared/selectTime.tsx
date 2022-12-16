import {Time} from "./time";
import {ref} from "vue";


export const selectTime=(timeKind:string)=>{
    const refTime=new Time()
    const startTime=ref<Time>()
    const endTime=ref<Time>()
    if (timeKind==='thisMonth'){
            startTime.value=refTime.firstDayOfMonth()
            endTime.value=refTime.lastDayOfMonth()
        } else if (timeKind==='beforeMonth'){
            startTime.value=refTime.add(-1,'month').firstDayOfMonth()
            endTime.value=refTime.add(-1,'month').lastDayOfMonth()
        }else if (timeKind==='thisYear'){
            startTime.value=refTime.firstDayOfYear()
            endTime.value=refTime.lastDayOfYear()
        }else {
        return
    }
    return {startTime:startTime.value,endTime:endTime.value}
}