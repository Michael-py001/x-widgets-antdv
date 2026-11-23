import { defineComponent } from 'vue'
import { Menu } from 'ant-design-vue'

export default defineComponent({
    name: 'XMenu',
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Menu {...attrs} {...props}>
                    {slots}
                </Menu>
            )
        }
    },
})
