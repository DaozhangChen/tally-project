import {defineComponent, Transition, VNode} from "vue";
import {RouteLocationNormalizedLoaded, RouterView} from "vue-router";
import mangosteen from '../assets/mangosteen.svg'
import s from './AdvertisingPage.module.scss'

export const AdvertisingPage=defineComponent({
    setup:()=>{
        const skipFeatures=()=>{
            localStorage.setItem('skipFeatures','yes')
        }
        return ()=>(
            <>
            <div class={s.wrapper}>
            <header class={s.title}>
                <img src={mangosteen} alt='一个山竹' class={s.icon}/>
                <h1 class={s.titleText}>山竹记账</h1>
            </header>
            <main class={s.bodyText}>
              <RouterView name='main'>
                  {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
                      <Transition
                          enterFromClass={s.slide_fade_enter_from}
                          enterToClass={s.slide_fade_enter_to}
                          enterActiveClass={s.slide_fade_enter_active}
                          leaveToClass={s.slide_fade_leave_to}
                          leaveFromClass={s.slide_fade_leave_from}
                          leaveActiveClass={s.slide_fade_leave_active}>
                          {X}
                      </Transition>
                  }
              </RouterView>
            </main>
            <footer class={s.footerText} onClick={skipFeatures}>
              <RouterView name='footer' />
            </footer>
            </div>
            </>
        )
    }
})