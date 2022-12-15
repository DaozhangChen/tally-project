import {defineComponent, ref} from "vue";
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
                     {refSidebarOpen.value && (
                         <Sidebar onClose={()=>refSidebarOpen.value=false}/>)}
                 </div>
             </>
        )
    }
})