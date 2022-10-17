import { defineComponent, ref, watch } from "vue";
import { MainLayout } from "../shared/MainLayout";
import comeback from '../assets/icons/comeback.svg'
import s from './StartAccount.module.scss'
import { Calculator } from "../shared/Calculator";
import { ItemList } from "../shared/ItemList";
import { Tab, Tabs } from "../shared/Tabs";
import { useRouter } from "vue-router";

export const StartAccount = defineComponent({
    setup: () => {
        const router = useRouter()
        const selectedName = ref('expenses')
        const back = () => { router.back() }
        return () => (
            <MainLayout>
                {{
                    icon: () => <img src={comeback} onClick={back} />,
                    title: () => '记一笔',
                    default: () => (
                        <div class={s.wrapper}>
                            <Tabs v-model:selected={selectedName.value}>
                                <Tab text='支出' name='expenses' />
                                <Tab text='收入' name='income' />
                            </Tabs>
                            <div class={s.itemList}>
                                <ItemList kind={selectedName.value} />
                            </div>
                            <div>
                                <Calculator />
                            </div>
                        </div>
                    )
                }}
            </MainLayout>
        )
    }
})