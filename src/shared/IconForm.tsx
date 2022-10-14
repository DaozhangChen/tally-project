import {defineComponent, PropType, reactive} from "vue";
import {IconList} from "./IconList";
import {Rules, validate} from "./validate";
import s from './IconForm.module.scss'

export const IconForm =defineComponent({
    props:{
        buttonType:{
            type:String as PropType<'create'|'edit'>
        }
    },
    setup: (props, context) => {
        const formData = reactive<Partial<Tag>>({
            name: '',
            sign: '',
        })
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