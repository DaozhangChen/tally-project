import {computed, defineComponent, nextTick, onMounted, onUpdated, reactive, ref, watch} from "vue";
import purpleAdd from '../assets/icons/addpurple.svg'
import s from './ItemList.module.scss'
import {useRouter} from "vue-router";
import {http} from "./Http";

export const ItemList=defineComponent({
    props:{
        kind:{
            type:String,
            required:true,
        },

    },
    setup:(props,context)=>{
        const router =useRouter()
        const tags=ref([])
        const Icon=ref()
        const refKind=ref(props.kind)
        const selectIcon=(e:any)=>{
            Icon.value=e.target.innerText
        }
        onMounted(async ()=>{
            const response=await http.get('/tags',{
                kind:props.kind,
                page:1
            })
            const {resources} = response.data
            tags.value.push(...resources)
            console.log(props.kind)
        })
        watch(props,async ()=>{
            const response=await http.get('/tags',{
                kind:props.kind,
                page:1
            })
            const {resources} = response.data
            tags.value.length=0
            tags.value.push(...resources)
            console.log(props.kind)
        })


        return ()=>(
            <div class={s.wrapper}>
                <div class={s.mainList}>
                    <div>
              <img src={purpleAdd} alt='一个+' class={s.addIcon} onClick={()=>router.push('/tagCreate')}/>
                        新增{props.kind}
                    </div>
                    {tags.value.map(item=>
                        <div>
                            <div class={Icon.value===item.sign ? s.selected :''} onClick={selectIcon}>{item.sign}</div>
                            {item?.name}
                        </div>
                    )}
                </div>
            </div>
        )
    }
})