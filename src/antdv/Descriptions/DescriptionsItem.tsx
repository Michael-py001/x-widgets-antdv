import { defineComponent } from 'vue'
import { DescriptionsItem } from 'ant-design-vue'

export default defineComponent({
    name: 'XDescriptionsItem',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <DescriptionsItem {...attrs} {...props}>
                    {{ ...slots }}
                </DescriptionsItem>
            )
        }
    },
})
