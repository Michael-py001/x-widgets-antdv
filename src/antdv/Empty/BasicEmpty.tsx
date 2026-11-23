import { defineComponent } from 'vue'
import { Empty } from 'ant-design-vue'
import { XEmptyProps } from './types/props'

export default defineComponent<XEmptyProps>({
    name: 'XEmpty',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Empty {...attrs} {...props}>
                    {{ ...slots }}
                </Empty>
            )
        }
    },
})
