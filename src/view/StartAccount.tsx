import { defineComponent, ref, watch } from "vue";
import { MainLayout } from "../shared/MainLayout";
import comeback from '../assets/icons/comeback.svg'
import s from './StartAccount.module.scss'
import { Calculator } from "../shared/Calculator";
import { ItemList } from "../shared/ItemList";
import { Tab, Tabs } from "../shared/Tabs";
import { useRouter } from "vue-router";
import {Time} from "../shared/time";
import {http} from "../shared/Http";

export const StartAccount = defineComponent({
    setup: () => {
        const router = useRouter()
        const selectedName = ref('expenses')
        const back = () => { router.push('/start') }
        const amount=ref()
        const time=ref()
        const refId=ref()
        const onSubmit=async (e:Event)=>{
            e.preventDefault()
            console.log(amount.value)
            console.log(selectedName.value)
            console.log(time.value)
            console.log(refId.value)
            await http.post('/items',{
                amount:amount.value,
                kind:selectedName.value,
                happen_at:time.value,
                tag_ids:[Number(refId.value)]
            },{
                _autoLoading:true
            })
        }
        return () => (
            <MainLayout>
                {{
                    icon: () => <img src={comeback} onClick={back} />,
                    title: () => '记一笔',
                    default: () => (
                        <form class={s.wrapper} onSubmit={onSubmit}>
                            <Tabs v-model:selected={selectedName.value}>
                                <Tab text='支出' name='expenses' />
                                <Tab text='收入' name='income' />
                            </Tabs>
                            <div class={s.itemList}>
                                <ItemList kind={selectedName.value} v-model:id={refId.value}/>
                            </div>
                            <div>
                                <Calculator v-model:amount={amount.value}
                                            onClick={onSubmit}
                                            v-model:time={time.value}
                                />
                            </div>
                        </form>
                    )
                }}
            </MainLayout>
        )
    }
})