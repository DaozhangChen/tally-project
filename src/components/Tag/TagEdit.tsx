import {defineComponent} from "vue";
import comeback from "../../assets/icons/comeback.svg";
import {MainLayout} from "../../shared/MainLayout";
import {useRouter} from "vue-router";
import {IconForm} from "../../shared/IconForm";
import s from './TagEdit.module.scss'

export const TagEdit=defineComponent({
    setup:()=>{
        const router=useRouter()
        const back=()=>{
            router.back()
        }
        return ()=>(
            <MainLayout>{{
                title: () => '编辑标签',
                icon: () => <img src={comeback} alt='一个返回' onClick={back}/>,
                default: () =><>
                <IconForm buttonType='edit'/>
                <div class={s.upDeleteButton}>
                <button class={s.deleteButton}>删除记账和标签</button>
                </div>
                </>
            }}</MainLayout>
        )
    }
})