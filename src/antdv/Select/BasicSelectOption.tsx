import { defineComponent } from 'vue'
import { SelectOption } from 'ant-design-vue'

export default defineComponent({
    name: 'XSelectOption',
    props: SelectOption.props,
    setup(props, { attrs, slots }) {
        return (
            <SelectOption {...attrs} {...props}>
                {{ ...slots }}
            </SelectOption>
        )
    },
})
