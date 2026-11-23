import { defineComponent } from 'vue'
import { Tree } from 'ant-design-vue'
import { XTreeProps } from './types/props'
import style from './style/tree.module.less'

export default defineComponent<XTreeProps>({
    name: 'XTree',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Tree {...attrs} {...props} class={style.xTree}>
                    {{ ...slots }}
                </Tree>
            )
        }
    },
})
