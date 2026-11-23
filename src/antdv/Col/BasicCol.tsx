import { defineComponent } from 'vue'
import { XColProps } from './types/props'
import { Col } from 'ant-design-vue'

export default defineComponent({
    name: 'XCol',
    inheritAttrs: true,
    setup(props: XColProps, { attrs, slots }) {
        return () => {
            return (
                <Col {...attrs} {...props}>
                    {slots}
                </Col>
            )
        }
    },
})
