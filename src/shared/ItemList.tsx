import { computed, defineComponent, nextTick, onMounted, onUpdated, reactive, ref, watch } from "vue";
import purpleAdd from '../assets/icons/addpurple.svg'
import s from './ItemList.module.scss'
import { useRoute, useRouter } from "vue-router";
import { http } from "./Http";
import { useTags } from "./useTags";

export const ItemList = defineComponent({
    props: {
        kind: {
            type: String,
            required: true,
        },
        id:String

    },
    emits:['update:id'],
    setup: (props, context) => {
        const router = useRouter()
        const tags = ref([])
        const Icon = ref()
        const selectIcon = (e: any) => {
            Icon.value = e.target.innerText
            context.emit('update:id',e.target.id)
        }
        watch(()=>props.kind,

            async () => {
            const value = await useTags(props.kind, 1)
            const { resources } = value
            tags.value.length = 0
            tags.value.push(...resources)
        }, { immediate: true })




        return () => (
            <div class={s.wrapper}>
                <div class={s.mainList}>
                    <div>
                        <img src={purpleAdd} alt='一个+' class={s.addIcon} onClick={() => router.push('/tagCreate?kind=' + `${props.kind}`)} />
                        新增
                    </div>
                    {tags.value.map(item =>
                        <div>
                            <div class={Icon.value === item.sign ? s.selected : ''}
                                 onClick={selectIcon}
                                 id={item.id}
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