import { defineComponent } from "vue";
import { MainLayout } from "../../shared/MainLayout";
import comeback from "../../assets/icons/comeback.svg";
import { useRoute, useRouter } from "vue-router";
import s from './TagCreate.module.scss'
import { IconForm } from "../../shared/IconForm";

export const TagCreatePage = defineComponent({
    setup: (props, context) => {
        const router = useRouter()
        return () => (
            <MainLayout>{{
                title: () => '新建标签',
                icon: () => <img src={comeback} alt='一个返回' onClick={()=>{router.back()}} />,
                default: () =>
                    <IconForm buttonType='create' />
            }}</MainLayout>
        )

    }
})

export default TagCreatePage