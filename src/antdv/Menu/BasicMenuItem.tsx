import { defineComponent } from 'vue'
import { MenuItem } from 'ant-design-vue'

export default defineComponent({
    name: 'XMenuItem',
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <MenuItem {...attrs} {...props}>
                    {slots}
                </MenuItem>
            )
        }
    },
})
