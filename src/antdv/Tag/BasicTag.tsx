import { defineComponent } from 'vue'
import { Tag } from 'ant-design-vue'
import { XTagProps } from './types/props'

export default defineComponent<XTagProps>({
    name: 'XTag',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Tag {...attrs} {...props}>
                    {{ ...slots }}
                </Tag>
            )
        }
    },
})
