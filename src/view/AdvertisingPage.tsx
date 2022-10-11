import {defineComponent} from "vue";
import {RouterView} from "vue-router";
import mangosteen from '../assets/mangosteen.svg'
import s from './AdvertisingPage.module.scss'

export const AdvertisingPage=defineComponent({
    setup:()=>{
        return ()=>(
            <>
            <main class={s.wrapper}>
            <header class={s.title}>
                <img src={mangosteen} alt='一个山竹' class={s.icon}/>
                <h1 class={s.titleText}>山竹记账</h1>
            </header>
            <body class={s.bodyText}>
              <RouterView />
            </body>
            <footer class={s.footerText}>
              <RouterView name='footer' />
            </footer>
            </main>
            </>
        )
    }
})