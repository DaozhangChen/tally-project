import {defineComponent, onMounted, ref, watch} from "vue";
import purpleAdd from '../assets/icons/addblue.svg'
import s from './ItemList.module.scss'
import {  useRouter } from "vue-router";
import { useTags } from "./useTags";


type Resources={
    created_at:string,
    deleted_at:null|string,
    id:number,
    kind:'expenses'|'income',
    name:string,
    sign:string,
    updated_at:string,
    user_id:number
}
export const ItemList = defineComponent({
    props: {
        kind: {
            type: String,
            required: true,
        },
        id: Array,
        longPress:String

    },
    emits: ['update:id'],
    setup: (props, context) => {
        const router = useRouter()
        const tags = ref<Resources[]>([])
        const Icon = ref()
        const selectIcon = (e: any) => {
            Icon.value = e.target.id
            const refId=ref<Array<string>>([])
            refId.value.push(e.target.id)
            context.emit('update:id', refId.value)
        }

        watch(() => props.kind,
            async () => {
                const value= await useTags(props.kind, 1)
                const { resources } = value
                tags.value.length = 0
                tags.value.push(...resources)
            }, { immediate: true }
        )

        return () => (
            <div class={s.wrapper}>
                <div class={s.mainList}>
                    <div>
                        <img src={purpleAdd} alt='一个+' class={s.addIcon} onClick={() => router.push('/tagCreate?kind=' + `${props.kind}`)} />
                        新增
                    </div>
                    {tags.value.map(item =>
                        <div>
                            <div class={`${Number(Icon.value) === item.id ? s.selected : ''} ${''}`}
                                onClick={selectIcon}
                                id={item.id.toString()}
                                 title={item.name}
                            >
                                {item.sign}
                            </div>
                            {item?.name}
                        </div>
                    )}
                </div>
            </div>
        )
    }
})