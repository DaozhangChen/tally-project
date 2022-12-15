import {defineComponent, reactive, ref} from "vue";
import {MainLayout} from "../shared/MainLayout";
import comeback from "../assets/icons/comeback.svg";
import lobster from  '../assets/icons/lobster.svg'
import s from './SignInPage.module.scss'
import {FormItem} from "../shared/FormItem";
import {Rules, validate} from "../shared/validate";
import {http} from "../shared/Http";
import {useRouter} from "vue-router";

export const SignInPage=defineComponent({
    setup:()=>{
        const router=useRouter()
        const formData=reactive({
            email:'1205308740@qq.com',
            code:'123456',
        })
        const errors=reactive({
            email:[],
            code:[]
        })

        const onSubmit=(e:Event)=>{
            e.preventDefault()
            Object.assign(errors,{
                email:[],
                code:[]
            })
            const rules:Rules=[
                {key:'email',type:'required',message:'必填'},
                {key:'email',type:'pattern',regex:/.+@.+/,message:'必须是邮箱地址'},
                {key:'code',type:'required',message:'必填'}
            ]
            Object.assign(errors,validate(formData,rules))
            onSignIn().then((response)=>{return response},(error)=>{throw error})

        }

        const onSignIn=async ()=>{
            for (const i in errors){
                if (errors.email.length>0 ||errors.code.length>0){
                    throw errors
                }else {
                 const response =await http.post<{jwt:string}>('/session',formData,{_autoLoading:true})
                     .catch(onError)
                    localStorage.setItem('jwt',response.data.jwt)
                     await router.push('/account')
                }
            }
        }
        const startCount=ref()
        const onError=(error:any)=>{
            if (error.response.status===422){
                Object.assign(errors,error.response.data.errors)
            }
            throw error
        }
        const onSendValidateCode=async ()=>{
            await http.post('/validation_codes',{email:formData.email},{_autoLoading:true})
                .catch(error=>{onError(error)})
            startCount.value.startCount()
        }

        return ()=>
            <MainLayout>{{
                title:()=>'登录',
                icon:()=><img src={comeback} alt='一个返回' onClick={()=>{router.push('/start')}}/>,
                default:()=>
                <div>
                <header class={s.headerIcon}>
                    <img src={lobster} alt='一只龙虾'/>
                    <h1>深蓝记账</h1>
                </header>
                    <form class={s.mainClass} onSubmit={onSubmit}>
                        <FormItem type='sign_in'
                                  v-model:email={formData.email}
                                  v-model:validationCode={formData.code}
                                  error={[errors.code,errors.email]}
                                  onClick={onSendValidateCode}
                                  ref={startCount}
                        />
                        <button class={s.submitButton} type='submit'>确定</button>
                    </form>
                </div>
            }}</MainLayout>
    }
})