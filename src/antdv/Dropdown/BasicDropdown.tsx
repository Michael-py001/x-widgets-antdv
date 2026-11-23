import { defineComponent } from 'vue'
import { XDropdownProps } from './types/props'
import { Dropdown } from 'ant-design-vue'

export default defineComponent<XDropdownProps>({
    name: 'XDropdown',
    setup(props, { attrs, slots }) {
        return () => {
            return (
                <Dropdown {...attrs} {...props}>
                    {slots}
                </Dropdown>
            )
        }
    },
})
