import {defineComponent, reactive, ref, watch} from "vue";
import { MainLayout } from "../shared/MainLayout";
import comeback from '../assets/icons/comeback.svg'
import s from './StartAccount.module.scss'
import { Calculator } from "../shared/Calculator";
import { ItemList } from "../shared/ItemList";
import { Tab, Tabs } from "../shared/Tabs";
import {useRoute, useRouter} from "vue-router";
import {http} from "../shared/Http";
import {hasError, Rules, validate} from "../shared/validate";
import 'vant/es/dialog/style'
import {Dialog, Toast} from "vant";
import {AxiosError} from "axios";

export const StartAccount = defineComponent({
    setup: () => {
        const router = useRouter()
        const route=useRoute()
        const back = () => { router.push('/start') }
        const formData=reactive<Partial<Item>>({
            kind: 'expenses',
            tag_ids: undefined,
            amount:0,
            happen_at:new Date().toISOString()
        })
        if (localStorage.getItem('kind')){
            formData.kind=localStorage.getItem('kind')
        }
        const onError= (error: AxiosError<ResourceError>) =>{
            if (error.response?.status===422){
                Dialog.alert({
                    title:'出错',
                    message:Object.values(error.response.data.errors).join('/n')
                })
            }
            throw error
        }

        const timeoutId=ref()
        const currentId=ref()
        const onTouchStart=(e:any)=>{
            if (e.target.id===null||e.target.id===undefined||e.target.id===''){
                return
            }
            currentId.value=e.target.id
            timeoutId.value=setTimeout(()=>{
                e.preventDefault()
               router.push(`/tagEdit?id=${e.target.id}&name=${e.target.title}&sign=${e.target.innerText}`)
            },500)
        }
        const onTouchMove=()=>{
            clearTimeout(timeoutId.value)
        }
        const onTouchEnd=()=>{
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
            router.push('/start')
        }
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
                                <ItemList kind={formData.kind} v-model:id={formData.tag_ids}/>
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