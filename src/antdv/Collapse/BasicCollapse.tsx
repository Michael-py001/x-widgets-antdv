import { defineComponent } from 'vue'
import { Collapse } from 'ant-design-vue'
import { XCollapseProps } from './types/props'

export default defineComponent<XCollapseProps>({
    name: 'XCollapse',
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Collapse {...attrs} {...props}>
                    {{ ...slots }}
                </Collapse>
            )
        }
    },
})
