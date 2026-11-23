import { defineComponent, unref } from 'vue'
import { BreadcrumbItem } from 'ant-design-vue'

export default defineComponent({
    name: 'XBreadcrumbItem',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props }

        return () => {
            return <BreadcrumbItem {...propsData}>{slots}</BreadcrumbItem>
        }
    },
})
