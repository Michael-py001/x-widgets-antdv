import { defineComponent, unref } from 'vue'
import { XSpaceProps } from './types/props'
import { Space } from 'ant-design-vue'

export default defineComponent<XSpaceProps>({
    name: 'XSpace',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XSpaceProps

        return () => {
            return <Space {...propsData}>{slots}</Space>
        }
    },
})
