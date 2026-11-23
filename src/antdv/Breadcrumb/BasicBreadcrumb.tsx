import { defineComponent, unref } from 'vue'
import { XBreadcrumbProps } from './types/props'
import { Breadcrumb } from 'ant-design-vue'

export default defineComponent<XBreadcrumbProps>({
    name: 'XBreadcrumb',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XBreadcrumbProps

        return () => {
            return <Breadcrumb {...propsData}>{slots}</Breadcrumb>
        }
    },
})
