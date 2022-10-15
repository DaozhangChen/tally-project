import {defineComponent, ref} from "vue";
import {MainLayout} from "../shared/MainLayout";
import {Menu} from "../shared/Menu";
import {FloatButton} from "../shared/FloatButton";
import {BalanceSheet} from "../shared/BalanceSheet";
import {Tab,Tabs} from "../shared/Tabs";
import {Bill} from "../shared/Bill";

export const AccountDetail=defineComponent({
    setup:(props,context)=> {
        const selected=ref<string>('thisMonth')
        return () => (
            <MainLayout>{{
                title: () => '山竹记账',
                icon: () => <Menu/>,
                default: () =>
                    <div>
                    <Tabs v-model:selected={selected.value}>
                        <Tab text='本月' name='thisMonth'></Tab>
                        <Tab text='上月' name='beforeMonth'></Tab>
                        <Tab text='今年' name='thisYear'></Tab>
                        <Tab text='自定义时间' name='anyTime'></Tab>
                    </Tabs>
                    <BalanceSheet />
                    <Bill />
                    <FloatButton />
                    </div>

            }}</MainLayout>
        )
    }
})