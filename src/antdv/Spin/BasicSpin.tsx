import { defineComponent, unref } from 'vue'
import { Spin } from 'ant-design-vue'
import { XSpinProps } from './types/props'

export default defineComponent({
    name: 'XSpin',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XSpinProps

        return () => {
            return <Spin {...propsData}>{slots}</Spin>
        }
    },
})
