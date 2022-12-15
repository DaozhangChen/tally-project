import {defineComponent, ref, Transition} from "vue";
import menu from "../assets/icons/menu.svg";
import s from "./Meun.module.scss";
import {Sidebar} from "./Sidebar";

export const Menu=defineComponent({
    setup:()=>{
        const openSidebar=()=>{refSidebarOpen.value = !refSidebarOpen.value}
        const refSidebarOpen=ref(false)
        return ()=>(
             <>
                 <img src={menu} alt='一个菜单' class={s.titleIcon} onClick={openSidebar}/>
                 <div >
                     <Transition enterFromClass={s.slide_enter_from}
                                 enterToClass={s.slide_enter_to}
                                 enterActiveClass={s.slide_enter_active}
                                 leaveToClass={s.slide_leave_to}
                                 leaveFromClass={s.slide_leave_from}
                                 leaveActiveClass={s.slide_leave_active}>
                     <Sidebar v-show={refSidebarOpen.value} onClose={()=>refSidebarOpen.value=false}/>
                     </Transition>
                     <Transition enterFromClass={s.fade_enter_from}
                                 enterToClass={s.fade_enter_to}
                                 enterActiveClass={s.fade_enter_active}
                                 leaveToClass={s.fade_leave_to}
                                 leaveFromClass={s.fade_leave_from}
                                 leaveActiveClass={s.fade_leave_active}>
                     <div v-show={refSidebarOpen.value} class={s.mask} onClick={()=>refSidebarOpen.value=false}></div>
                     </Transition>
                 </div>
             </>
        )
    }
})