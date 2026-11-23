import { defineComponent } from 'vue'
import { Descriptions } from 'ant-design-vue'
import { XDescriptionsProps } from './types/props'

export default defineComponent<XDescriptionsProps>({
    name: 'XDescriptions',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Descriptions {...attrs} {...props}>
                    {{ ...slots }}
                </Descriptions>
            )
        }
    },
})
