import { defineComponent } from 'vue'
import { Card } from 'ant-design-vue'
import { XCardProps } from './types/props'

export default defineComponent<XCardProps>({
    name: 'XCard',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Card {...attrs} {...props}>
                    {{ ...slots }}
                </Card>
            )
        }
    },
})
