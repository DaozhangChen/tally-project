import {defineComponent} from "vue";
import comeback from "../../assets/icons/comeback.svg";
import {MainLayout} from "../../shared/MainLayout";
import {useRoute, useRouter} from "vue-router";
import {IconForm} from "../../shared/IconForm";
import s from './TagEdit.module.scss'
import {http} from "../../shared/Http";
import 'vant/es/dialog/style'
import 'vant/es/toast/style'
import {Dialog, Toast} from "vant";

export const TagEdit=defineComponent({
    setup:()=>{
        const router=useRouter()
        const route=useRoute()
        const back=()=>{
            router.back()
        }
        const deleteTag=()=>{
            Dialog.confirm({title:'提醒',message:`确定要删除吗？\n该标签对应的记账也会随之删除`})
                .then(()=>{
                    http.delete(`/tags/${route.query.id}`)
                        .then(()=>{
                        Toast.success('删除成功')
                            setTimeout(()=>{
                                router.back()
                            },1000)
                    })
                })
                .catch(()=>{return})
        }
        return ()=>(
            <MainLayout>{{
                title: () => '编辑标签',
                icon: () => <img src={comeback} alt='一个返回' onClick={back}/>,
                default: () =><div>
                <IconForm buttonType='edit'/>
                <div class={s.upDeleteButton}>
                <button class={s.deleteButton} onClick={deleteTag}>删除记账和标签</button>
                </div>
                </div>
            }}</MainLayout>
        )
    }
})