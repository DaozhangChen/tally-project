import {computed, defineComponent, PropType, ref, watch} from "vue";
import s from './IconList.module.scss'
import {emojiList} from "./emojiList";

export const IconList =defineComponent({
    props:{
        modelValue:{
            type:String as PropType<string>
        }
    },
    emits:['update:modelValue'],
    setup:(props,context)=>{
        //标签栏
        const table: [string, string[]][] = [
            ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
                'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
                'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
            ]],
            ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
                'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
            ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
                'person-activity', 'person-sport', 'person-resting']],
            ['衣服', ['clothing']],
            ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
                'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
            ['植物', ['plant-flower', 'plant-other']],
            ['自然', ['sky & weather', 'science']],
            ['食物', [
                'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
                'food-marine', 'food-sweet'
            ]],
            ['运动', ['sport', 'game']],
        ]
        const navIndex=ref(0)

        //内部icon
        const refSelectIcon=(emoji:string)=>{
            context.emit('update:modelValue',emoji)
        }


        const emojis=computed(()=>{
            const emojiListTitle=table[navIndex.value][1]
            return emojiListTitle
                .map(nav=>emojiList
                    .find(iconList => iconList[0]===nav)?.[1]
                    .map( icon => <li class={props.modelValue === icon ? s.selectIcon:''}
                        onClick={()=>{refSelectIcon(icon)}}>
                        {icon}
                    </li>))

        })


        return ()=>(
            <div class={s.wrapper}>
                <span class={s.signClass}>符号 {props.modelValue}</span>
                <main class={s.mainListClass}>
                    <ul class={s.listTag}>
                        {table.map((item,index)=>
                        <li class={navIndex.value===index ? s.selected : ''}
                            onClick={()=>navIndex.value=index}>
                            {item[0]}
                        </li>
                        )}
                    </ul>
                    <ul class={s.mainEmojiListClass}>
                        {emojis.value}
                    </ul>
                </main>
            </div>
        )
    }
})