import {defineComponent} from "vue";
import purpleAdd from '../assets/icons/addpurple.svg'
import s from './ItemList.module.scss'
import {useRouter} from "vue-router";

export const ItemList=defineComponent({
    setup:()=>{
        const router =useRouter()
        return ()=>(
            <div class={s.wrapper}>
                <div class={s.mainList}>
                    <div>
              <img src={purpleAdd} alt='一个+' class={s.addIcon} onClick={()=>router.push('/tagCreate')}/>
                        新增
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+" />
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+"/>
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+"/>
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+" />
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+"/>
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+"/>
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+"/>
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+" />
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+"/>
                        打车
                    </div>
                    <div>
                        <img src={purpleAdd} alt="一个+"/>
                        打车
                    </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div><div>
                    <img src={purpleAdd} alt="一个+"/>
                    打车
                </div>



                </div>
            </div>
        )
    }
})