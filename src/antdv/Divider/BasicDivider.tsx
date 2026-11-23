import { defineComponent, unref } from 'vue'
import { XDividerProps } from './types/props'
import { Divider } from 'ant-design-vue'

export default defineComponent<XDividerProps>({
    name: 'XDivider',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XDividerProps

        return () => {
            return <Divider {...propsData}>{slots}</Divider>
        }
    },
})
