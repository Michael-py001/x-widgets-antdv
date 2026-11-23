import { defineComponent, unref } from 'vue'
import { XLayoutProps } from './types/props'

import { Layout } from 'ant-design-vue'

export default defineComponent<XLayoutProps>({
    name: 'XLayout',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XLayoutProps

        return () => {
            return <Layout {...propsData}>{slots}</Layout>
        }
    },
})
