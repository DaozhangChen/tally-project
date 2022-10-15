import {defineComponent, reactive} from "vue";
import {MainLayout} from "../shared/MainLayout";
import comeback from "../assets/icons/comeback.svg";
import mangosteen from '../assets/icons/mangosteen.svg'
import s from './SignInPage.module.scss'
import {FormItem} from "../shared/FormItem";
import {Rules, validate} from "../shared/validate";

export const SignInPage=defineComponent({
    setup:()=>{
        const formData=reactive({
            email:'',
            code:'',
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


        }
        return ()=>
            <MainLayout>{{
                title:()=>'登录',
                icon:()=><img src={comeback} alt='一个返回'/>,
                default:()=>
                <div>
                <header class={s.headerIcon}>
                    <img src={mangosteen} alt='一个山竹'/>
                    <h1>山竹记账</h1>
                </header>
                    <form class={s.mainClass} onSubmit={onSubmit}>
                        <FormItem type='sign_in'
                                  v-model:email={formData.email}
                                  v-model:validationCode={formData.code}
                                  error={[errors.code,errors.email]}
                        />
                        <button class={s.submitButton} type='submit'>确定</button>
                    </form>
                </div>
            }}</MainLayout>
    }
})