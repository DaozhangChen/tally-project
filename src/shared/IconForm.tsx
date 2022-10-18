import {defineComponent, PropType, reactive} from "vue";
import {IconList} from "./IconList";
import {hasError, Rules, validate} from "./validate";
import s from './IconForm.module.scss'
import {routerKey, useRoute, useRouter} from "vue-router";
import {http} from "./Http";
import 'vant/es/toast/style'
import { Toast} from "vant";

export const IconForm =defineComponent({
    props:{
        buttonType:{
            type:String as PropType<'create'|'edit'>
        }
    },
    setup: (props, context) => {
        const route=useRoute()
        const router=useRouter()
        const formData = reactive<Partial<Tag>>({
            name: '',
            sign: '',
            kind:route.query.kind
        })
        if (route.query.id){
            formData.name=route.query.name
            formData.sign=route.query.sign
        }
        const errors = reactive<FormErrors<typeof formData>>({})
        const onSubmit = (e: Event) => {
            e.preventDefault()
            const rules: Rules = [
                {key: 'name', type: 'required', message: '必填'},
                {key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符'},
                {key: 'sign', type: 'required', message: '必填'},
            ]
            Object.assign(errors, {
                name: [],
                sign: []
            })
            Object.assign(errors, validate(formData, rules))
            if (!hasError(errors)){
                if (route.query.kind){
                    Object.assign(formData,{kind:route.query.kind})
                    http.post(`/tags`,formData)
                        .then(()=>{
                            Toast.success('添加标签成功')
                            setTimeout(()=>{
                                router.back()
                            },1000)
                        })
                }else {
                http.patch(`/tags/${route.query.id}`,formData,{_autoLoading:true})
                    .then(()=>{
                        Toast.success('修改成功')
                        setTimeout(()=>{
                            router.back()
                        },1000)
                    },(error)=>{throw error})
                }

            }
        }
        return () => (
            <form onSubmit={onSubmit}>
                <div class={s.wrapper}>
                    <div class={s.mainCreateTag}>
                        <header class={s.inputClass}>
                            <span class={s.tagNameClass}>标签名</span>
                            <input type='text' placeholder='2到4个汉字' v-model={formData.name} value={formData.name}/>
                            <span class={s.blank}>{errors.name ? errors.name : '　'}</span>
                        </header>
                        <main class={s.mainClass}>
                            <IconList v-model:modelValue={formData.sign}/>
                            <div class={s.secondBlank}>{errors.sign ? errors.sign : '　'}</div>
                        </main>

                            {(props.buttonType && props.buttonType==='create') ?
                                (
                                    <footer class={s.upButton}>
                                    <button class={s.buttonClass} type='submit'>确定</button>
                                    </footer>
                                )
                                : (
                                    <footer class={s.editButton}>
                                    <button class={s.editButtonClass} type='submit'>确定</button>
                                    </footer>
                                    )
                            }
                    </div>
                </div>
            </form>
        )
    }
})