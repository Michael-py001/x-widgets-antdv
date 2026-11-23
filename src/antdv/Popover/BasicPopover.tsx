import { defineComponent } from 'vue'
import { Popover } from 'ant-design-vue'
import { XPopoverProps } from './types/props'

export default defineComponent<XPopoverProps>({
    name: 'XPopover',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Popover {...attrs} {...props}>
                    {{ ...slots }}
                </Popover>
            )
        }
    },
})
