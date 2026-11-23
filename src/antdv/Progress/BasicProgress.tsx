import { defineComponent } from 'vue'
import { Progress } from 'ant-design-vue'
import { XProgressProps } from './types/props'

export default defineComponent<XProgressProps>({
    name: 'XProgress',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Progress {...attrs} {...props}>
                    {{ ...slots }}
                </Progress>
            )
        }
    },
})
