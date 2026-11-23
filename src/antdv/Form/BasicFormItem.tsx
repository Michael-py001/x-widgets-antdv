import { defineComponent } from 'vue'
import { FormItem } from 'ant-design-vue'

export default defineComponent({
    name: 'XFormItem',
    setup(props, { attrs, slots }) {
        return () => {
            const propsData = { ...attrs, ...props }
            return <FormItem {...propsData}>{slots}</FormItem>
        }
    },
})
