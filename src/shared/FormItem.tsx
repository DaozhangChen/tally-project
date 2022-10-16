import {computed, defineComponent, PropType, ref, watch} from "vue";
import s from "./FormItem.module.scss";

export const FormItem=defineComponent({
        props: {
            type: String as PropType<string>,
            email:String,
            validationCode:String,
            error:Array
        },
        emits:['update:email','update:validationCode'],
        setup: (props, context) => {
            const onTimeout=ref()
            const countNumber=ref(0)
            const onSendValidateCode=()=>{
                countNumber.value=3
                onTimeout.value=setInterval(()=>{
                    countNumber.value -= 1
                    if (countNumber.value===0){
                        clearInterval(onTimeout.value)
                        onTimeout.value=0
                    }
                },1000)
            }
            const content = computed(() => {
                switch (props.type) {
                    case 'sign_in':
                        return <div>
                            <div class={s.emailClass}>
                                <span>邮箱地址</span>
                                <input type='text'
                                       placeholder='请输入邮箱，然后点击发送验证码'
                                       value={props.email}
                                       onInput={(e:any)=>context.emit('update:email',e.target.value)}
                                />
                                <div class={s.error}>{props.error?.[1] ? props.error[1]:''}</div>
                            </div>
                            <div class={s.verificationCode}>
                                <span>验证码</span>
                                <div class={s.sendClass}>
                                    <input type="text"
                                           placeholder='六位验证码'
                                           value={props.validationCode}
                                           onInput={(e:any)=>context.emit('update:validationCode',e.target.value)}
                                    />
                                    <button type='button' disabled={onTimeout.value} onClick={onSendValidateCode}>{onTimeout.value ? `${countNumber.value}`:'发送验证码'}</button>
                                </div>
                                <div class={s.error}>{props.error?.[0] ? props.error[0]:''}</div>
                            </div>
                        </div>
                }
            })
            return () => (
                <>
                    {content.value}
                </>
            )

        }
    }
)