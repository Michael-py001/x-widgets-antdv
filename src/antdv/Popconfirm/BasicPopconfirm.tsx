import { defineComponent } from 'vue'
import { Popconfirm } from 'ant-design-vue'
import { XPopconfirmProps } from './types/props'

export default defineComponent<XPopconfirmProps>({
    name: 'XPopconfirm',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Popconfirm {...attrs} {...props}>
                    {{ ...slots }}
                </Popconfirm>
            )
        }
    },
})
