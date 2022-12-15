/*
  example
  import { Time } from 'shared/time';
  const time = new Time();
  time.format('YYYY-MM-DD');
  time.firstDayOfMonth();
  time.firstDayOfYear();
  time.lastDayOfMonth();
  time.lastDayOfYear();
  time.add(1, 'month');
*/
export class Time{
    date:Date;
    constructor(date?:string|Date) {
        if (date===undefined){
            this.date=new Date()
        }else if (typeof date=== 'string'){
            this.date=new Date(date)
        }else {
            this.date=date
        }
    }
    format(pattern='YYYY-MM-DD'){
        //获取年月日时分秒
        const year=this.date.getFullYear()
        const month=this.date.getMonth()+1
        const day=this.date.getDate()
        const hour=this.date.getHours()
        const minute=this.date.getMinutes()
        const second=this.date.getSeconds()
        const msecond=this.date.getMilliseconds()
        return pattern.replace(/YYYY/g, year.toString())
            .replace(/MM/, month.toString().padStart(2, '0'))
            .replace(/DD/, day.toString().padStart(2, '0'))
            .replace(/HH/, hour.toString().padStart(2, '0'))
            .replace(/mm/, minute.toString().padStart(2, '0'))
            .replace(/ss/, second.toString().padStart(2, '0'))
            .replace(/SSS/, msecond.toString().padStart(3, '0'))
    }
    firstDayOfMonth() {
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0));
    }
    firstDayOfYear() {
        return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0));
    }
    lastDayOfMonth() {
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0));
    }
    lastDayOfYear() {
        return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0));
    }
    lastHourOfDay(){
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 23, 59, 59))
    }
    getTimestamp() {
        return this.date.valueOf()
    }
    add(amount:number,unit:'year'|'month'|'day'|'hour'|'minute'|'second'|'millisecond'){
        const date=new Date(this.date.getTime())
        switch (unit){
            case 'year':
                date.setFullYear(date.getFullYear()+amount)
                break;
            case 'month':
                //有坑，直接setMonth会获取当月的天数直接加入，会造成跳月的情况
                //获取两个月的天数，哪个天数少就加哪个
                const d = date.getDate()
                date.setDate(1)
                date.setMonth(date.getMonth()+amount)
                //获取该月的最后一天
                const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
                date.setDate(Math.min(d,d2))
                break;
            case 'day':
                date.setDate(date.getDate() + amount);
                break;
            case 'hour':
                date.setHours(date.getHours() + amount);
                break;
            case 'minute':
                date.setMinutes(date.getMinutes() + amount);
                break;
            case 'second':
                date.setSeconds(date.getSeconds() + amount);
                break;
            case 'millisecond':
                date.setMilliseconds(date.getMilliseconds() + amount);
                break;
            default:
                throw new Error('Time.add: unknown unit');
        }
        return new Time(date)
    }
}
