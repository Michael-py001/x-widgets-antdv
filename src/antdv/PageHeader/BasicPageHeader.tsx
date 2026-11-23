import { defineComponent, unref } from 'vue'
import { XPageHeaderProps } from './types/props'
import { PageHeader } from 'ant-design-vue'

export default defineComponent<XPageHeaderProps>({
    name: 'XPageHeader',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        const propsData = { ...unref(attrs), ...props } as XPageHeaderProps

        return () => {
            return <PageHeader {...propsData}>{slots}</PageHeader>
        }
    },
})
