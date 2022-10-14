import {defineComponent, ref, watch} from "vue";
import {MainLayout} from "../../shared/MainLayout";
import comeback from "../../assets/icons/comeback.svg";
import {RouterView, useRouter} from "vue-router";
import s from './TagCreate.module.scss'
import {IconList} from "../../shared/IconList";

export const TagCreatePage=defineComponent({
    setup: (props,context) => {
        const router=useRouter()
        const back=()=>{
            router.back()
        }
        const Icon=ref<string>()
        const IconChange=(value:string)=>{
            Icon.value=value
        }
        watch(Icon,()=>{
            console.log(Icon.value)
        })
        console.log(Icon.value)
        return () => (
            <MainLayout>{{
                title: () => '新建标签',
                icon: () => <img src={comeback} alt='一个返回' onClick={back}/>,
                default: () =><div class={s.wrapper}>
                    <div class={s.mainCreateTag}>
                    <header class={s.inputClass}>
                        <span class={s.tagNameClass}>标签名 {Icon.value}</span>
                        <input type='text' placeholder='2到4个汉字'/>
                        <span class={s.blank}>　</span>
                    </header>
                    <main class={s.mainClass}>
                        <IconList v-model:modelValue={Icon.value} />
                        <div class={s.secondBlank}>　</div>
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