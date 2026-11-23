import { defineComponent } from 'vue'
import { Rate } from 'ant-design-vue'
import { XRateProps } from './types/props'

export default defineComponent<XRateProps>({
    name: 'XRate',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Rate {...attrs} {...props}>
                    {{ ...slots }}
                </Rate>
            )
        }
    },
})
