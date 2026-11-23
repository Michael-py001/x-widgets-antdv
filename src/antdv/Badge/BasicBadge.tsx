import { defineComponent } from 'vue'
import { Badge } from 'ant-design-vue'
import { XBadgeProps } from './types/props'

export default defineComponent<XBadgeProps>({
    name: 'XBadge',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Badge {...attrs} {...props}>
                    {{ ...slots }}
                </Badge>
            )
        }
    },
})
