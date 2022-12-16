import {defineComponent, onMounted, reactive, ref, watch} from "vue";
import { MainLayout } from "../shared/MainLayout";
import comeback from '../assets/icons/comeback.svg'
import s from './StartAccount.module.scss'
import { Calculator } from "../shared/Calculator";
import { ItemList } from "../shared/ItemList";
import { Tab, Tabs } from "../shared/Tabs";
import {useRouter} from "vue-router";
import {http} from "../shared/Http";
import {hasError, Rules, validate} from "../shared/validate";
import 'vant/es/dialog/style'
import {Dialog, Toast} from "vant";

export const StartAccount = defineComponent({
    setup: () => {
        const router = useRouter()
        const back = () => { router.push('/accountDetail') }
        const formData=reactive<Partial<Item>>({
            kind: 'expenses',
            tag_ids: undefined,
            amount:0,
            happen_at:new Date().toISOString()
        })
        if (localStorage.getItem('kind') && (localStorage.getItem('kind') === 'expenses' || localStorage.getItem('kind') === 'income')) {
            // @ts-ignore
            formData.kind = localStorage.getItem('kind')
        }
        const onError= (error: any) =>{
            if (error.response?.status===422){
                Dialog.alert({
                    title:'出错',
                    message:Object.values(error.response.data.errors).join('/n')
                })
            }
            throw error
        }

        const timeoutId=ref()
        const isLongPress=ref()
        const longPressIcon=ref()
        const onTouchStart=(e:any)=>{
            if (e.target.id===null||e.target.id===undefined||e.target.id===''){
                return
            }
            isLongPress.value=setTimeout(()=>{
                longPressIcon.value=e.target.id
            },150)

            timeoutId.value=setTimeout(()=>{
                e.preventDefault()
               router.push(`/tagEdit?id=${e.target.id}&name=${e.target.title}&sign=${e.target.innerText}`)
            },800)
        }

        const onTouchMove=()=>{
            clearTimeout(isLongPress.value)
            longPressIcon.value=null
            clearTimeout(timeoutId.value)

        }
        const onTouchEnd=()=>{
            clearTimeout(isLongPress.value)
            longPressIcon.value=null
            clearTimeout(timeoutId.value)
        }

        const onSubmit=async (e:Event)=>{
            e.preventDefault()
            const errors = reactive<FormErrors<typeof formData>>({ kind: [], tag_ids: [], amount: [], happen_at: [] })
            const rules: Rules = [
                { key: 'kind', type: 'required', message: '类型必填' },
                { key: 'tag_ids', type: 'required', message: '标签必填' },
                { key: 'amount', type: 'required', message: '金额必填' },
                { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为零' },
                { key: 'amount', type: 'notNaN', message: '金额未知' },
                { key: 'happen_at', type: 'required', message: '时间必填' },
            ]
            Object.assign(errors,validate(formData,rules))

            if(hasError(errors)){
                Dialog.alert({
                    title: '出错',
                    message: Object.values(errors).filter(i=>i.length>0).join('\n')
                })
                return
            }
            await http.post('/items',formData,{
                _autoLoading:true
            }).then(()=>{
                Toast.success('记账成功')
            },()=>{onError})
            setTimeout(()=>{
                router.push('/accountDetail')
            },1000)
        }
        onMounted(()=>{
            if(localStorage.getItem('fistTime')){
                return
            }else {
                Dialog.alert({
                    message: '长按标签图标，即可进入编辑页面',
                }).then(() => {
                    localStorage.setItem('fistTime','true')
                });
            }
        })
        // @ts-ignore
        return () => (
            <MainLayout>
                {{
                    icon: () => <img src={comeback} onClick={back} />,
                    title: () => '记一笔',
                    default: () => (
                        <form class={s.wrapper} onSubmit={onSubmit}>
                            <Tabs v-model:selected={formData.kind}>
                                <Tab text='支出' name='expenses' />
                                <Tab text='收入' name='income' />
                            </Tabs>
                            <div class={s.itemList}
                                 onTouchstart={onTouchStart}
                                 onTouchend={onTouchEnd}
                                 onTouchmove={onTouchMove}
                            >
                                <ItemList kind={formData.kind||'expenses'} v-model:id={formData.tag_ids} longPress={longPressIcon.value}/>
                            </div>
                            <div>
                                <Calculator v-model:amount={formData.amount}
                                            onClick={onSubmit}
                                            v-model:time={formData.happen_at}
                                />
                            </div>
                        </form>
                    )
                }}
            </MainLayout>
        )
    }
})

export default StartAccount