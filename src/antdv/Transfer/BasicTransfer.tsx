import { defineComponent } from 'vue'
import { Transfer } from 'ant-design-vue'
import { XTransferProps } from './types/props'

export default defineComponent<XTransferProps>({
    name: 'XTransfer',

    inheritAttrs: true, // TAG: Props Reactive
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Transfer {...attrs} {...props}>
                    {{ ...slots }}
                </Transfer>
            )
        }
    },
})
