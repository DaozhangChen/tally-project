import {defineComponent, reactive, ref, watch} from "vue";
import {MainLayout} from "../../shared/MainLayout";
import comeback from "../../assets/icons/comeback.svg";
import {RouterView, useRouter} from "vue-router";
import s from './TagCreate.module.scss'
import {IconList} from "../../shared/IconList";
import {Rules, validate} from "../../shared/validate";

export const TagCreatePage=defineComponent({
    setup: (props,context) => {
        const router=useRouter()
        const back=()=>{
            router.back()
        }
        const formData=reactive<Partial<Tag>>({
            name:'',
            sign:'',
        })

        const errors=reactive<FormErrors<typeof formData>>({})
        const onSubmit=(e:Event)=>{
            e.preventDefault()
            const rules:Rules = [
                { key: 'name', type: 'required', message: '必填' },
                { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
                { key: 'sign', type: 'required', message: '必填' },
            ]
            Object.assign(errors, {
                name: [],
                sign: []
            })
            Object.assign(errors,validate(formData,rules))
        }

        return () => (
            <MainLayout>{{
                title: () => '新建标签',
                icon: () => <img src={comeback} alt='一个返回' onClick={back}/>,
                default: () =><form onSubmit={onSubmit}>
                    <div class={s.wrapper}>
                    <div class={s.mainCreateTag}>
                    <header class={s.inputClass}>
                        <span class={s.tagNameClass}>标签名</span>
                        <input type='text' placeholder='2到4个汉字' v-model={formData.name} value={formData.name}/>
                        <span class={s.blank}>{errors.name ? errors.name:'　'}</span>
                    </header>
                    <main class={s.mainClass}>
                        <IconList v-model:modelValue={formData.sign} />
                        <div class={s.secondBlank}>{errors.sign ? errors.sign:'　'}</div>
                    </main>
                    <footer class={s.upButton}>
                        <button class={s.buttonClass} type='submit' >确定</button>
                    </footer>
                    </div>
                </div>
                </form>

            }}</MainLayout>
        )

    }
})