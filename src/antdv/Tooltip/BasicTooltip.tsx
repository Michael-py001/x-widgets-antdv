import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { XTooltipProps } from './types/props'

export default defineComponent<XTooltipProps>({
    name: 'XTooltip',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Tooltip {...attrs} {...props}>
                    {{ ...slots }}
                </Tooltip>
            )
        }
    },
})
