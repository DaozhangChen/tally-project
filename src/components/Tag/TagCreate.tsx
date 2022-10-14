import {defineComponent, reactive, ref, watch} from "vue";
import {MainLayout} from "../../shared/MainLayout";
import comeback from "../../assets/icons/comeback.svg";
import {RouterView, useRouter} from "vue-router";
import s from './TagCreate.module.scss'
import {IconList} from "../../shared/IconList";
import {Rules, validate} from "../../shared/validate";
import {IconForm} from "../../shared/IconForm";

export const TagCreatePage=defineComponent({
    setup: (props,context) => {
        const router=useRouter()
        const back=()=>{
            router.back()
        }
        return () => (
            <MainLayout>{{
                title: () => '新建标签',
                icon: () => <img src={comeback} alt='一个返回' onClick={back}/>,
                default: () =>
                <IconForm buttonType='create'>
                    {{button:()=><button class={s.buttonClass} type='submit'>确定</button>}}
                </IconForm>
            }}</MainLayout>
        )

    }
})