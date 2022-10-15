import {defineComponent} from "vue";
import {MainLayout} from "../shared/MainLayout";
import comeback from "../assets/icons/comeback.svg";
import mangosteen from '../assets/icons/mangosteen.svg'
import s from './SignInPage.module.scss'

export const SignInPage=defineComponent({
    setup:()=>{
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
                    <form class={s.mainClass}>
                        <div>
                        <div class={s.emailClass}>
                            <span>邮箱地址</span>
                            <input type='text' placeholder='请输入邮箱，然后点击发送验证码'/>
                        </div>
                        <div class={s.verificationCode}>
                            <span>验证码</span>
                            <div class={s.sendClass}>
                                <input type="text" placeholder='六位验证码'/>
                                <button>发送验证码</button>
                            </div>
                        </div>
                        </div>
                        <button class={s.submitButton} type='submit'>确定</button>
                    </form>
                </div>
            }}</MainLayout>
    }
})