import { defineComponent } from 'vue'
import { XRowProps } from './types/props'
import { Row } from 'ant-design-vue'

export default defineComponent({
    name: 'XRow',
    inheritAttrs: true, // TAG: Props Reactive
    setup(props: XRowProps, { attrs, slots }) {
        return () => {
            return (
                <Row {...attrs} {...props}>
                    {slots}
                </Row>
            )
        }
    },
})
