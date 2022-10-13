import {defineComponent} from "vue";
import {MainLayout} from "../../shared/MainLayout";
import comeback from "../../assets/icons/comeback.svg";
import {RouterView, useRouter} from "vue-router";
import s from './TagCreate.module.scss'

export const TagCreatePage=defineComponent({
    setup: () => {
        const router=useRouter()
        const back=()=>{
            router.back()
        }
        return () => (
            <MainLayout>{{
                title: () => '新建标签',
                icon: () => <img src={comeback} alt='一个返回' onClick={back}/>,
                default: () =><div class={s.wrapper}>
                    <div class={s.mainCreateTag}>
                    <header class={s.inputClass}>
                        <span class={s.tagNameClass}>标签名</span>
                        <input type='text' placeholder='2到4个汉字'/>
                        <span class={s.blank}>　</span>
                    </header>
                    <main>
                        <span>符号</span>
                        <div>各种emoji</div>
                    </main>
                    <footer class={s.upButton}>
                        <button class={s.buttonClass}>确定</button>
                    </footer>
                    </div>
                </div>

            }}</MainLayout>
        )

    }
})